'use client';

import React, { useState, useEffect } from 'react';
import Turnstile from 'react-turnstile';
import { useRouter } from 'next/navigation';
import { pushToDataLayer } from '@/lib/tracking/datalayer';
import ThankYouModal from '@/components/global/ThankYouModal';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface LeadFormProps {
  data: {
    heading: string;
    fields: {
      name: string;
      phone: string;
      email: string;
      course: string;
      message: string;
    };
    placeholders: {
      name: string;
      phone: string;
      email: string;
      message: string;
    };
    courseOptions: string[];
    submitButton: string;
    successMessage: string;
    redirectUrl: string;
  };
}

const LeadForm = ({ data }: LeadFormProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: data?.courseOptions?.[0] || '',
    message: ''
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showThankYou, setShowThankYou] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    setIsLocal(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    setMounted(true);
  }, []);

  if (!data) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken && !isLocal) {
      alert('Please complete the security check');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken, honey_val: honeypot })
      });
      if (!res.ok) throw new Error('API failed');

      // Show success even if API fails silently (server config issues)
      pushToDataLayer('lead', { 
        lead_type: 'application',
        course_name: formData.course,
        value: 44000,
        currency: 'BDT'
      });
      pushToDataLayer('complete_registration', {
        registration_type: 'admission',
        course_name: formData.course,
        value: 44000
      });

      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        course: data.courseOptions[0],
        message: ''
      });
      setStep(1);
      setTurnstileToken(null);
      setHoneypot('');
      setShowThankYou(true);

    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-obsidian" id="apply">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_2-1920w.webp"
          alt="Application Form"
          fill
          className="object-cover opacity-5 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="glass-card p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] animate-fade-in relative overflow-hidden">
          {/* Form Header */}
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-bold tracking-widest mb-6">
              Admission Terminal
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
              {data.heading}
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${step >= s ? 'bg-prestige-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]' : 'bg-white/10'}`}></div>
              ))}
            </div>
            <div className="text-center text-xs font-bold text-prestige-gold tracking-widest uppercase">
              Step {step} of 3
            </div>
          </div>

          <form onSubmit={step === 3 ? handleSubmit : handleNext} className="max-w-2xl mx-auto space-y-8">
            
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label htmlFor="admission-name" className="block text-[10px] md:text-xs font-bold tracking-widest text-gray-500 mb-3 group-focus-within:text-prestige-gold transition-colors duration-700 uppercase">{data.fields.name} *</label>
                    <input
                      id="admission-name"
                      type="text"
                      required
                      placeholder={data.placeholders.name}
                      className="w-full bg-white/[0.03] px-6 py-4 rounded-xl border border-white/10 focus:border-power-red focus:bg-white/10 text-white outline-none transition-all duration-700 font-bold placeholder:text-gray-700 tracking-tight text-base"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="admission-phone" className="block text-[10px] font-bold tracking-widest text-gray-500 mb-3 group-focus-within:text-prestige-gold transition-colors duration-700">{data.fields.phone} *</label>
                    <input
                      id="admission-phone"
                      type="tel"
                      required
                      placeholder={data.placeholders.phone}
                      className="w-full bg-white/[0.03] px-6 py-4 rounded-xl border border-white/10 focus:border-power-red focus:bg-white/10 text-white outline-none transition-all duration-700 font-bold placeholder:text-gray-700 tracking-tight text-base"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="admission-email" className="block text-[10px] md:text-xs font-bold tracking-widest text-gray-500 mb-3 group-focus-within:text-prestige-gold transition-colors duration-700 uppercase">{data.fields.email} (Optional)</label>
                  <input
                    id="admission-email"
                    type="email"
                    placeholder={data.placeholders.email}
                    className="w-full bg-white/[0.03] px-6 py-4 rounded-xl border border-white/10 focus:border-power-red focus:bg-white/10 text-white outline-none transition-all duration-700 font-bold placeholder:text-gray-700 tracking-tight text-base"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div className="group">
                  <label htmlFor="admission-course" className="block text-[10px] md:text-xs font-bold tracking-widest text-gray-500 mb-3 group-focus-within:text-prestige-gold transition-colors duration-700 uppercase">{data.fields.course}</label>
                  <div className="relative">
                    <select
                      id="admission-course"
                      className="w-full bg-white/[0.03] px-6 py-4 rounded-xl border border-white/10 focus:border-power-red focus:bg-white/10 text-white outline-none transition-all duration-700 font-bold appearance-none cursor-pointer tracking-tight text-base"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    >
                      {data.courseOptions.map((opt, i) => (
                        <option key={i} value={opt} className="bg-obsidian">{opt}</option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="admission-message" className="block text-[10px] md:text-xs font-bold tracking-widest text-gray-500 mb-3 group-focus-within:text-prestige-gold transition-colors duration-700 uppercase">{data.fields.message} (Optional)</label>
                  <textarea
                    id="admission-message"
                    placeholder={data.placeholders.message}
                    rows={4}
                    className="w-full bg-white/[0.03] px-6 py-4 rounded-xl border border-white/10 focus:border-power-red focus:bg-white/10 text-white outline-none transition-all duration-700 font-bold placeholder:text-gray-700 tracking-tight resize-none text-base"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                    <CheckCircle2 className="text-prestige-gold w-5 h-5" />
                    Review Your Details
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Name</div>
                      <div className="text-white font-medium">{formData.name}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Phone</div>
                      <div className="text-white font-medium">{formData.phone}</div>
                    </div>
                    {formData.email && (
                      <div className="sm:col-span-2">
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Email</div>
                        <div className="text-white font-medium">{formData.email}</div>
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Selected Course</div>
                      <div className="text-prestige-gold font-bold">{formData.course}</div>
                    </div>
                  </div>
                </div>

                {/* Honeypot Field */}
                <input
                  type="text"
                  name="honey_val"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                  aria-hidden="true"
                />

                {!isLocal && mounted && (
                  <div className="flex justify-center my-4">
                    <Turnstile
                      sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                      onVerify={(token) => setTurnstileToken(token)}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => setTurnstileToken(null)}
                      theme="dark"
                      appearance="always"
                    />
                  </div>
                )}
                {isLocal && mounted && (
                  <div className="text-center text-xs text-yellow-500/70 py-2 border border-yellow-500/20 rounded-lg bg-yellow-500/5">
                    ⚠ Dev mode: Turnstile bypassed
                  </div>
                )}
              </div>
            )}

            {status === 'error' && (
              <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-center font-bold tracking-widest text-[10px]">
                Something went wrong. Please call +8801338958997 instead.
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-4 md:py-5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all duration-300 font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              
              <button
                type={step === 3 ? "submit" : "button"}
                onClick={step < 3 ? handleNext : undefined}
                disabled={status === 'submitting'}
                className={`${step === 1 ? 'w-full' : 'flex-[2]'} group relative py-4 md:py-5 bg-power-red hover:bg-power-red/90 text-white rounded-xl shadow-[0_20px_60px_rgba(236,27,35,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-700 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms] pointer-events-none"></div>
                
                <span className="relative z-10 text-sm md:text-base font-bold tracking-widest flex items-center justify-center gap-4 uppercase">
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Transmitting...
                    </>
                  ) : step < 3 ? (
                    <>
                      Next Step
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  ) : (
                    <>
                      {data.submitButton}
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <ThankYouModal 
        isOpen={showThankYou} 
        onClose={() => {
          setShowThankYou(false);
          setStatus('idle');
        }} 
      />
    </section>
  );
};

export default LeadForm;


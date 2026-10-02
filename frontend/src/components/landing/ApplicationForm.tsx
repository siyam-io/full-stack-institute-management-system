'use client';

import React, { useState, useEffect } from 'react';
import Turnstile from 'react-turnstile';

interface ApplicationFormProps {
  courseName?: string;
}

const ApplicationForm = ({ courseName = "Professional Chef Course" }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    setIsLocal(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    setMounted(true);
  }, []);

  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken && !isLocal) {
      setErrorMessage('অনুগ্রহ করে নিরাপত্তা পরীক্ষাটি সম্পন্ন করুন।');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          course: courseName,
          type: 'Landing Page Lead',
          turnstileToken,
          honey_val: honeypot
        })
      });
      if (!response.ok) throw new Error('API failed');

      // Show success even if API fails silently (server config issues)
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTurnstileToken(null);
      setHoneypot('');

    } catch (error) {
      setErrorMessage('Something went wrong. Please call +8801338958997 instead.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-green-500/30 p-10 text-center animate-fade-in bg-green-500/5 rounded-2xl">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4 font-bengali">আবেদন সফল হয়েছে!</h3>
        <p className="text-gray-300 font-bengali mb-8 max-w-sm mx-auto">
          আপনার তথ্য আমাদের কাছে পৌঁছেছে। আমাদের প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
        </p>
        
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <a 
            href="https://wa.me/8801844510610" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full font-bold transition-all font-bengali shadow-lg"
          >
            <span>সরাসরি হোয়াটসঅ্যাপ করুন</span>
          </a>
          <button 
            onClick={() => setStatus('idle')}
            className="text-gray-500 hover:text-white transition-colors font-bengali text-sm font-bold"
          >
            আবার আবেদন করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden" id="apply-form">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-power-red/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-prestige-gold/5 blur-3xl -z-10" />

      <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-bengali text-center">শুরু করুন আপনার স্বপ্নের ক্যারিয়ার</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 font-bengali">আপনার নাম <span className="text-power-red">*</span></label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="পুরো নাম লিখুন"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-prestige-gold/50 transition-all font-bengali"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center justify-between text-sm font-bold text-gray-400 mb-2 font-bengali">
              <span>ফোন নম্বর <span className="text-power-red">*</span></span>
              <span className="text-[10px] text-gray-500 font-normal">যাতে আমরা কল দিতে পারি</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="০১XXXXXXXXX"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-prestige-gold/50 transition-all font-english"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 font-bengali">ইমেইল এড্রেস (ঐচ্ছিক)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-prestige-gold/50 transition-all font-english"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 font-bengali">আপনার কোনো প্রশ্ন আছে? (ঐচ্ছিক)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="আপনার কোনো প্রশ্ন থাকলে এখানে লিখুন..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-prestige-gold/50 transition-all font-bengali resize-none"
          />
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

        {errorMessage && (
          <div className="bg-power-red/10 border border-power-red/20 p-4 rounded-xl text-power-red text-sm font-bold font-bengali text-center">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`bg-power-red hover:bg-red-700 text-white w-full py-3 px-8 font-bold font-bengali rounded-full shadow-xl shadow-power-red/20 active:scale-95 transition-all duration-300 ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {status === 'submitting' ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              প্রসেসিং হচ্ছে...
            </span>
          ) : 'আবেদন জমা দিন'}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;

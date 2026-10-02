'use client';

import React, { useState, useEffect } from 'react';
import Turnstile from 'react-turnstile';
import { pushToDataLayer } from '@/lib/tracking/datalayer';
import ThankYouModal from '@/components/global/ThankYouModal';

interface ContactFormProps {
  data: {
    heading: string;
    fields: {
      name: string;
      phone: string;
      email: string;
      message: string;
    };
    placeholders: {
      name: string;
      phone: string;
      email: string;
      message: string;
    };
    submitButton: string;
    successMessage: string;
  };
}



const ContactForm = ({ data }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    setIsLocal(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    setMounted(true);
  }, []);

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
        body: JSON.stringify({ ...formData, type: 'Contact', turnstileToken, honey_val: honeypot })
      });
      if (!res.ok) throw new Error('API failed');

      // Show success even if API fails silently (server config issues)
      pushToDataLayer('lead', { 
        lead_type: 'contact',
        course_name: 'General Inquiry',
        value: 0,
        currency: 'BDT'
      });
      pushToDataLayer('complete_registration', {
        registration_type: 'contact',
        course_name: 'General Inquiry',
        value: 0
      });

      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTurnstileToken(null);
      setHoneypot('');
      setShowThankYou(true);

    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="glass-card p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl animate-fade-in relative overflow-hidden group">
      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-power-red to-transparent"></div>
      
      <h3 className="text-2xl md:text-4xl font-black text-white text-center mb-10 tracking-tighter uppercase">
        {data.heading}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group/field">
            <label htmlFor="contact-name" className="block text-[10px] font-black tracking-[0.2em] text-white/40 mb-3 group-focus-within/field:text-prestige-gold transition-colors uppercase">{data.fields.name} *</label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder={data.placeholders.name}
              className="w-full bg-white/5 px-6 py-4 rounded-xl border border-white/10 focus:border-prestige-gold focus:bg-white/10 text-white outline-none transition-all font-bold placeholder:text-gray-600 text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="group/field">
            <label htmlFor="contact-phone" className="block text-[10px] font-black tracking-[0.2em] text-white/40 mb-3 group-focus-within/field:text-prestige-gold transition-colors uppercase">{data.fields.phone} *</label>
            <input
              id="contact-phone"
              type="tel"
              required
              placeholder={data.placeholders.phone}
              className="w-full bg-white/5 px-6 py-4 rounded-xl border border-white/10 focus:border-prestige-gold focus:bg-white/10 text-white outline-none transition-all font-bold placeholder:text-gray-600 text-sm"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="group/field">
          <label htmlFor="contact-email" className="block text-[10px] font-black tracking-[0.2em] text-white/40 mb-3 group-focus-within/field:text-prestige-gold transition-colors uppercase">{data.fields.email} (Optional)</label>
          <input
            id="contact-email"
            type="email"
            placeholder={data.placeholders.email}
            className="w-full bg-white/5 px-6 py-4 rounded-xl border border-white/10 focus:border-prestige-gold focus:bg-white/10 text-white outline-none transition-all font-bold placeholder:text-gray-600 text-sm"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="group/field">
          <label htmlFor="contact-message" className="block text-[10px] font-black tracking-[0.2em] text-white/40 mb-3 group-focus-within/field:text-prestige-gold transition-colors uppercase">{data.fields.message} *</label>
          <textarea
            id="contact-message"
            required
            placeholder={data.placeholders.message}
            rows={5}
            className="w-full bg-white/5 px-6 py-4 rounded-xl border border-white/10 focus:border-prestige-gold focus:bg-white/10 text-white outline-none transition-all font-bold placeholder:text-gray-600 resize-none text-sm"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
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

        {status === 'error' && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center font-black text-[10px] tracking-widest uppercase">
            Something went wrong. Please call +880 1700 000000 instead.
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary w-full py-5 text-[10px] font-black tracking-widest uppercase shadow-[0_15px_40px_rgba(236,27,35,0.3)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all"
        >
          {status === 'submitting' ? (
            <span className="flex items-center justify-center gap-4">
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Transmitting Protocol...
            </span>
          ) : data.submitButton}
        </button>
      </form>

      <ThankYouModal 
        isOpen={showThankYou} 
        onClose={() => {
          setShowThankYou(false);
          setStatus('idle');
        }} 
      />
    </div>
  );
};

export default ContactForm;

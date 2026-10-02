"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';
import Turnstile from 'react-turnstile';

export default function QuickContactPanel({ locale = 'en' }: { locale?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const isBn = locale === 'bn';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      alert(isBn ? 'অনুগ্রহ করে সিকিউরিটি চেক সম্পন্ন করুন' : 'Please complete the security check');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          course: 'General Inquiry (Quick Contact)',
          turnstileToken 
        })
      });
      if (!res.ok) throw new Error('API failed');

      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setTurnstileToken(null);
      
      // Auto close after success
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 3000);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] w-14 h-14 bg-power-red text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(236,27,35,0.4)] hover:bg-power-red/90 hover:scale-110 transition-all duration-300"
        aria-label="Quick Contact"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[360px] max-w-[90vw] bg-obsidian border-l border-white/10 shadow-2xl z-[80] transform transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {isBn ? 'যোগাযোগ করুন' : 'Quick Contact'}
          </h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Quick Links Section */}
          <div className="space-y-4">
            <Link
              href="https://wa.me/8801338958997"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-white hover:bg-[#25D366]/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold">WhatsApp</div>
                <div className="text-xs text-gray-400">+880 1338-958997</div>
              </div>
            </Link>

            <div className="grid grid-cols-2 gap-4">
              <Link
                href="tel:+8801338958997"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </div>
                <div className="font-bold text-sm">{isBn ? 'কল করুন' : 'Call'}</div>
              </Link>

              <Link
                href="mailto:info@cibdhk.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm">{isBn ? 'ইমেইল' : 'Email'}</div>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-obsidian px-3 text-xs text-gray-500 uppercase tracking-widest font-bold">
                {isBn ? 'অথবা বার্তা পাঠান' : 'Or Send A Message'}
              </span>
            </div>
          </div>

          {/* Mini Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                required
                placeholder={isBn ? 'আপনার নাম' : 'Your Name'}
                className="w-full bg-white/[0.03] px-4 py-3 rounded-xl border border-white/10 focus:border-power-red focus:bg-white/10 text-white outline-none transition-colors text-sm placeholder:text-gray-600"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <input
                type="tel"
                required
                placeholder={isBn ? 'ফোন নম্বর' : 'Phone Number'}
                className="w-full bg-white/[0.03] px-4 py-3 rounded-xl border border-white/10 focus:border-power-red focus:bg-white/10 text-white outline-none transition-colors text-sm placeholder:text-gray-600"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <textarea
                required
                placeholder={isBn ? 'আপনার বার্তা...' : 'Your Message...'}
                rows={3}
                className="w-full bg-white/[0.03] px-4 py-3 rounded-xl border border-white/10 focus:border-power-red focus:bg-white/10 text-white outline-none transition-colors text-sm placeholder:text-gray-600 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {mounted && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && (
              <div className="overflow-hidden rounded-xl">
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

            {status === 'error' && (
              <div className="text-red-500 text-xs font-bold bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-center">
                {isBn ? 'কিছু সমস্যা হয়েছে।' : 'Something went wrong.'}
              </div>
            )}
            
            {status === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center text-sm font-bold animate-fade-in">
                {isBn ? 'বার্তা পাঠানো হয়েছে!' : 'Message sent successfully!'}
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 bg-white text-obsidian hover:bg-gray-200 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {status === 'submitting' ? (
                  <span className="animate-pulse">{isBn ? 'পাঠানো হচ্ছে...' : 'Sending...'}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {isBn ? 'বার্তা পাঠান' : 'Send Message'}
                  </>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}


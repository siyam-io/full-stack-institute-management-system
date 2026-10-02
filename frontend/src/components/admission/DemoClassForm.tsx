'use client';

import React, { useState, useEffect } from 'react';
import { pushToDataLayer } from '@/lib/tracking/datalayer';
import { COURSE_CONFIG } from '@/lib/courseConfig';
import Turnstile from 'react-turnstile';

const DemoClassForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [mounted, setMounted] = useState(false);
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
        body: JSON.stringify({ 
          ...formData, 
          type: 'Demo Class Registration',
          course: 'Professional Chef Course',
          turnstileToken,
          honey_val: honeypot
        })
      });
      if (!res.ok) throw new Error('API failed');

      // Show success even if API fails silently (server config issues)
      pushToDataLayer('schedule', {
        appointment_type: 'demo_class',
        course_name: COURSE_CONFIG.courseName,
        intake: COURSE_CONFIG.intakeName
      });
      setStatus('success');
      setFormData({ name: '', phone: '', email: '' });
      setTurnstileToken(null);
      setHoneypot('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 max-w-xl mx-auto my-12 text-center">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Register for Free Demo Class</h3>
      <p className="text-gray-400 text-sm mb-6">Experience our facilities and meet the instructors before you enroll.</p>
      
      {status === 'success' ? (
        <div className="bg-green-600/20 text-green-400 p-4 rounded-xl border border-green-600/30">
          Demo class registered successfully! We will contact you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" required placeholder="Full Name" 
            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-black/30 p-3 rounded-lg border border-white/10 text-white" 
          />
          <input 
            type="tel" required placeholder="Phone Number" 
            value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-black/30 p-3 rounded-lg border border-white/10 text-white" 
          />
          <input 
            type="email" placeholder="Email Address (Optional)" 
            value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-black/30 p-3 rounded-lg border border-white/10 text-white" 
          />
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
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold mb-4">
              Something went wrong. Please call +8801338958997 instead.
            </div>
          )}

          <button type="submit" disabled={status === 'submitting'} className="w-full py-3 bg-prestige-gold text-black font-bold rounded-lg mt-4">
            {status === 'submitting' ? 'Registering...' : 'Schedule Demo'}
          </button>
        </form>
      )}
    </div>
  );
};

export default DemoClassForm;

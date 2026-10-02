'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  // Target: May 12, 2026, 10:30 AM Bangladesh Time (UTC+6)
  const TARGET_DATE = new Date('2026-05-12T10:30:00+06:00').getTime();

  const calculateTimeLeft = () => {
    const now = Date.now();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
      return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      expired: false,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState({
    expired: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isClient) return <div className="h-[120px] md:h-[150px]"></div>; // Placeholder for SSR

  if (timeLeft.expired) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-prestige-gold/30 bg-white/5 px-8 py-5 text-center backdrop-blur-xl shadow-2xl">
        <p className="font-bengali text-xl font-bold text-prestige-gold animate-pulse">
          নতুন ব্যাচ শুরু হয়েছে! ভর্তি চলছে।
        </p>
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: 'দিন', labelEn: 'DAYS' },
    { value: timeLeft.hours, label: 'ঘণ্টা', labelEn: 'HRS' },
    { value: timeLeft.minutes, label: 'মিনিট', labelEn: 'MIN' },
    { value: timeLeft.seconds, label: 'সেকেন্ড', labelEn: 'SEC' },
  ];

  return (
    <div className="mx-auto mt-6 md:mt-10 max-w-xl">
      <div className="flex items-center justify-center gap-4 mb-4">
         <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-prestige-gold/30" />
         <p className="text-center font-english text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase font-black">
           Enrollment Countdown
         </p>
         <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-prestige-gold/30" />
      </div>
      
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {units.map((unit, idx) => (
          <div key={unit.labelEn} className="flex items-center gap-2 sm:gap-4">
            <div className="relative group">
              <div className={`flex flex-col h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:border-prestige-gold/30 group-hover:bg-white/10 ${idx === 3 ? 'border-prestige-gold/20' : ''}`}>
                <span className="font-english text-2xl sm:text-3xl md:text-4xl font-black text-white tabular-nums tracking-tighter leading-none mb-1">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="font-bengali text-[9px] sm:text-[10px] md:text-xs text-white/30 font-bold uppercase tracking-widest">
                  {unit.label}
                </span>
              </div>
              {idx === 3 && (
                <div className="absolute -inset-1 bg-prestige-gold/10 blur-lg rounded-2xl -z-10 animate-pulse" />
              )}
            </div>
            {idx < units.length - 1 && (
              <span className="font-english text-xl sm:text-2xl font-black text-prestige-gold/20 mb-4 sm:mb-6">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
};

const LanguageToggle = ({ label, locale: propLocale }: { label: string; locale?: string }) => {
  const router = useRouter();
  const { setLanguage } = useLanguage();
  const targetLocale = propLocale === 'en' ? 'bn' : 'en';
  const targetLanguageName = targetLocale === 'bn' ? 'Bengali' : 'English';

  const switchLanguage = () => {
    setCookie('cib_locale', targetLocale);
    window.localStorage.setItem('cib_locale', targetLocale);
    setLanguage(targetLocale);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className="text-white hover:text-prestige-gold font-bold uppercase tracking-widest text-[10px] transition-all duration-500 px-5 py-2 border border-white/10 rounded-full hover:border-prestige-gold/50 bg-white/5 backdrop-blur-md shadow-2xl hover:scale-105 active:scale-95"
      aria-label={`${label} - Switch to ${targetLanguageName}`}
    >
      {label}
    </button>
  );
};

export default LanguageToggle;

'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Language = 'en' | 'bn';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const normalizeLanguage = (value: string | null | undefined): Language => (value === 'bn' ? 'bn' : 'en');

const writeLanguage = (language: Language) => {
  document.cookie = `cib_locale=${language};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  window.localStorage.setItem('cib_locale', language);
};

export function LanguageProvider({ initialLanguage = 'en', children }: { initialLanguage?: Language; children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    setLanguageState(normalizeLanguage(window.localStorage.getItem('cib_locale') || initialLanguage));
  }, [initialLanguage]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: (nextLanguage) => {
      const normalized = normalizeLanguage(nextLanguage);
      writeLanguage(normalized);
      setLanguageState(normalized);
    },
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}

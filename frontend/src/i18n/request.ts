import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'bn'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({ locale }) => {
  const finalLocale = locale || 'en';

  const messages = (await import(`../messages/${finalLocale}.json`)).default;

  return {
    locale: finalLocale,
    messages
  };
});

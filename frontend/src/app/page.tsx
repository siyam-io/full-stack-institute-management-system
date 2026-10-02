import { cookies } from 'next/headers';
import HomePage, { generateMetadata as generateLocaleMetadata } from './[locale]/page';

const getLocale = () => (cookies().get('cib_locale')?.value === 'bn' ? 'bn' : 'en');

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: getLocale() } });
}

export default function RootPage() {
  return <HomePage params={{ locale: getLocale() }} />;
}

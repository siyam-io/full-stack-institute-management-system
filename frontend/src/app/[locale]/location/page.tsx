import { locationContent } from '@/content';
import LocationHero from '@/components/location/LocationHero';
import LocationMap from '@/components/location/LocationMap';
import CampusInfo from '@/components/location/CampusInfo';
import TravelTimes from '@/components/location/TravelTimes';
import NearbyLandmarks from '@/components/location/NearbyLandmarks';
import LocationCTA from '@/components/location/LocationCTA';
import SchemaInjector from '@/components/global/SchemaInjector';
import { generateWebPageSchema, generateLocalBusinessSchema } from '@/lib/seo';
import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const content = locationContent[locale as 'en' | 'bn'];

  const title = `Location | ${content.hero.heading}`;
  const description = content.hero.subheading;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cibdhk.com/${locale}/location`,
      type: 'website',
      siteName: 'Culinary Institute of Bangladesh',
      images: [{ url: 'https://cibdhk.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://cibdhk.com/images/og-default.png'],
    },
    alternates: {
      canonical: `https://cibdhk.com/${locale}/location`,
      languages: {
        'en': `https://cibdhk.com/en/location`,
        'bn': `https://cibdhk.com/bn/location`,
        'x-default': `https://cibdhk.com/en/location`,
      }
    }
  };
}

export default function LocationPage({ params: { locale } }: { params: { locale: string } }) {
  const content = locationContent[locale as 'en' | 'bn'];

  return (
    <main className="w-full">
      <SchemaInjector 
        schemas={[
          generateWebPageSchema({
            title: `Location | ${content.hero.heading}`,
            description: content.hero.subheading,
            url: `https://cibdhk.com/${locale}/location`
          }),
          generateLocalBusinessSchema()
        ]} 
      />
      <LocationHero 
        badge={content.hero.badge}
        heading={content.hero.heading}
        subheading={content.hero.subheading}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-12 md:mb-16">
          <LocationMap />
        </div>

        <div className="mb-12 md:mb-16">
          <CampusInfo campus={content.campus} />
        </div>

        <div className="mb-12 md:mb-16">
          <TravelTimes travelTimes={content.travel_times} />
        </div>

        <div className="mb-12 md:mb-16">
          <NearbyLandmarks landmarks={content.nearby_landmarks} />
        </div>
      </div>

      <LocationCTA cta={content.cta} />
    </main>
  );
}
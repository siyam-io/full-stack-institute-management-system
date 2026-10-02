import MentorsHero from "@/components/about/MentorsHero";
import MentorCard from "@/components/about/MentorCard";
import FinalCTA from "@/components/home/FinalCTA";
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { getMarketingPage, getPublicMentorsList } from "@/lib/marketingApi";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const pageData = await getMarketingPage("mentors", locale);
  const mentorsData = pageData?.content || { hero: { heading: 'Expert Culinary Mentors' } };

  return {
    title: pageData?.seo_title || `Meet the Mentors | ${mentorsData.hero.heading} | CIB`,
    description: pageData?.seo_description || `Learn from the industry experts at The Culinary Institute of Bangladesh.`,
    alternates: {
      canonical: `https://cibdhk.com/${locale}/expert-culinary-mentors`,
      languages: {
        'en': 'https://cibdhk.com/en/expert-culinary-mentors',
        'bn': 'https://cibdhk.com/bn/expert-culinary-mentors',
        'x-default': 'https://cibdhk.com/en/expert-culinary-mentors',
      }
    }
  };
}

import Image from 'next/image';

export default async function MentorsPage({ params: { locale } }: { params: { locale: string } }) {
  // Load mentors data from DB / Fallback
  const pageData = await getMarketingPage("mentors", locale);
  const mentorsData: any = pageData?.content || { 
    hero: { heading: "Expert Culinary Mentors", subheading: "" },
    mentors: [],
    finalCta: { heading: "", subheading: "", buttonText: "", buttonHref: "" }
  };

  // Get dynamic employees list from database
  let mentorsList = await getPublicMentorsList(locale);
  if (mentorsList.length === 0) {
    mentorsList = mentorsData.mentors || [];
  }

  return (
    <main className="bg-obsidian relative overflow-hidden">
      {/* Immersive Background for the Grid Section */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/practical_class_2-1920w.webp"
          alt="CIB Training Lab"
          fill
          className="object-cover opacity-5 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="relative z-10">
        <MentorsHero data={mentorsData.hero} />
        
        <section className="py-24 md:py-32 section-padding">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {mentorsList.map((mentor: any, i: number) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                  <MentorCard mentor={mentor} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA data={mentorsData.finalCta} />
      </div>
    </main>
  );
}

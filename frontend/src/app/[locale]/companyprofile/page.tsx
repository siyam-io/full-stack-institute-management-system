import React from 'react';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import CompanyHero from '@/components/company/CompanyHero';
import MissionVision from '@/components/company/MissionVision';
import TrainingTracks from '@/components/company/TrainingTracks';
import IndustrialProcess from '@/components/company/IndustrialProcess';
import ComplianceSection from '@/components/company/ComplianceSection';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const filePath = path.join(process.cwd(), `content/${locale}/company-profile.json`);
  let data: any = { hero: { heading: "Company Profile" }, tagline: "Culinary Institute of Bangladesh" };
  
  try {
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.error("Error loading company profile metadata:", e);
  }

  return {
    title: `${data?.hero?.heading || 'Company Profile'} | CIB`,
    description: data?.tagline || '',
    alternates: {
      canonical: `https://cibdhk.com/${locale}/companyprofile`,
      languages: {
        'en': 'https://cibdhk.com/en/companyprofile',
        'bn': 'https://cibdhk.com/bn/companyprofile',
        'x-default': 'https://cibdhk.com/en/companyprofile',
      }
    }
  };
}

export default function CompanyProfilePage({ params: { locale } }: Props) {
  const filePath = path.join(process.cwd(), `content/${locale}/company-profile.json`);
  let data: any = { 
    hero: { heading: "Company Profile", subheading: "" },
    tagline: "",
    mission: { heading: "", text: "" },
    vision: { heading: "", text: "" },
    tracks: { heading: "", items: [] },
    process: { heading: "", steps: [] },
    compliance: { heading: "", items: [] },
    address: "",
    fee: { phone: "", text: "", verification: "" },
    social: {}
  };

  try {
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading company profile page data:", error);
  }

  return (
    <main className="min-h-screen bg-obsidian">
      <CompanyHero 
        heading={data?.hero?.heading}
        subheading={data?.hero?.subheading}
        tagline={data?.tagline}
      />
      
      <div className="relative z-10">
        <MissionVision 
          mission={data?.mission}
          vision={data?.vision}
        />
        
        <TrainingTracks 
          heading={data?.tracks?.heading}
          items={data?.tracks?.items}
        />
        
        <IndustrialProcess 
          heading={data?.process?.heading}
          steps={data?.process?.steps}
        />
        
        <ComplianceSection 
          heading={data?.compliance?.heading}
          items={data?.compliance?.items}
        />

        {/* Institutional Footer Info */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="animate-fade-in">
                <div className="inline-block px-4 py-1.5 rounded-full bg-power-red/10 border border-power-red/20 text-prestige-gold text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                  Connect with CIB
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 tracking-tight leading-tight">
                  Institutional <span className="text-prestige-gold">Intelligence</span>
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-power-red group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-black uppercase tracking-widest mb-1 opacity-50">Headquarters</p>
                      <p className="text-white text-xl font-medium">{data.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-power-red group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1.017a16 16 0 01-12.423-5.388A16 16 0 013 5.617V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-black uppercase tracking-widest mb-1 opacity-50">Direct Hotline</p>
                      <p className="text-white text-xl font-medium">{data.fee.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-16">
                  {Object.entries(data?.social || {}).map(([platform, link]) => (
                    <a 
                      key={platform}
                      href={link as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-power-red hover:border-power-red text-white transition-all duration-500 shadow-xl group"
                    >
                      <span className="text-lg font-black uppercase tracking-tighter group-hover:scale-110 transition-transform">
                        {platform.substring(0, 2)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-12 md:p-16 rounded-[3rem] text-center border border-white/10 shadow-2xl relative overflow-hidden group">
                {/* Decorative Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-prestige-gold"></div>
                
                <div className="w-24 h-24 bg-prestige-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:rotate-12 transition-transform duration-700">
                  <svg className="w-12 h-12 text-prestige-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>

                <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">Credential Integrity</h3>
                <p className="text-gray-400 mb-12 text-lg leading-relaxed italic">
                  "{data.fee.text}"
                </p>
                <a 
                  href="https://verification.cibdhk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-4 py-5 px-14 rounded-2xl text-lg font-black uppercase tracking-widest shadow-[0_0_50px_rgba(236,27,35,0.3)] hover:scale-105 transition-all"
                >
                  {data.fee.verification}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

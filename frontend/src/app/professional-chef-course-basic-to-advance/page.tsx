import React from 'react';
import Hero from '@/components/landing/Hero';
import CourseFeatures from '@/components/landing/CourseFeatures';
import MonthlyCurriculum from '@/components/landing/MonthlyCurriculum';
import CuisineGrid from '@/components/landing/CuisineGrid';
import CurriculumDetails from '@/components/landing/CurriculumDetails';
import CompetencyDrills from '@/components/landing/CompetencyDrills';
import CertificateSection from '@/components/landing/CertificateSection';
import BatchSelector from '@/components/landing/BatchSelector';
import SocialProof from '@/components/landing/SocialProof';
import FAQSection from '@/components/landing/FAQSection';
import PhotoGallery from '@/components/landing/PhotoGallery';
import LocationMap from '@/components/landing/LocationMap';
import LandingFooter from '@/components/landing/LandingFooter';
import StickyCTA from '@/components/landing/StickyCTA';
import ExitIntentPopup from '@/components/landing/ExitIntentPopup';

import AuthorBox from "@/components/global/AuthorBox";
import VideoWithTranscript from "@/components/global/VideoWithTranscript";
import { getBtvVideoData } from "@/lib/videoData";
import SchemaInjector from "@/components/global/SchemaInjector";
import { courseData } from '@/components/landing/courseData';
import { getCmsSection } from '@/lib/cmsApi';
import { 
  generateWebPageSchema, 
  generateOrganizationSchema, 
  generateCourseSchema, 
  generateProductSchema,
  generateLocalBusinessSchema,
  generateFAQSchema
} from "@/lib/seo";

export const metadata = {
  title: 'Professional Chef Course | Culinary Institute of Bangladesh',
  description: 'Join the top-rated Professional Chef Course in Bangladesh. Master 16+ global cuisines, get NSDA & ISO certified, and launch your international culinary career.',
};

export default async function LandingPage() {
  const btvVideo = getBtvVideoData('en');
  const cmsChefCourse = await getCmsSection("professional_chef_course", "bn");

  const faqSchema = generateFAQSchema(
    courseData.faqs.map(f => ({
      question: f.question,
      seoAnswer: f.answer
    }))
  );

  return (
    <main className="bg-obsidian min-h-screen selection:bg-power-red selection:text-white">
      <SchemaInjector 
        schemas={[
          generateWebPageSchema({
            title: 'Professional Chef Course | Culinary Institute of Bangladesh',
            description: 'Join the top-rated Professional Chef Course in Bangladesh. Master 16+ global cuisines, get NSDA & ISO certified, and launch your international culinary career.',
            url: 'https://cibdhk.com/professional-chef-course-basic-to-advance'
          }),
          generateOrganizationSchema(),
          generateLocalBusinessSchema(),
          generateCourseSchema({
            name: "Professional Chef Course (Basic to Advance)",
            description: "Become a professional chef with hands-on training on 120+ recipes across 16+ cuisines. Level 2 & 3 NSDA certified, ISO-HACCP standards.",
            provider: "Culinary Institute of Bangladesh",
            location: "House-160, Road-2, Dhanmondi, Dhaka"
          }),
          generateProductSchema({
            name: "Professional Chef Course (Basic to Advance)",
            description: "Become a professional chef with hands-on training on 120+ recipes across 16+ cuisines. Level 2 & 3 NSDA certified, ISO-HACCP standards.",
            price: "44000",
            ratingValue: "4.8",
            reviewCount: "150"
          }),
          faqSchema
        ]} 
      />
      <Hero />





      <CourseFeatures />
      <MonthlyCurriculum />
      <CuisineGrid />
      <CurriculumDetails />
      <CompetencyDrills />
      <CertificateSection />
      <BatchSelector cmsData={cmsChefCourse?.data} />
      <SocialProof />





      <PhotoGallery />
      <LocationMap />

      {/* AEO Direct Answer Block */}
      <section className="py-16 bg-white/[0.02] border-t border-b border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] bg-power-red/10 border border-power-red/20 px-3 py-1 rounded-full text-prestige-gold font-bold tracking-[0.25em] uppercase inline-block mb-4">
            Direct Answer
          </span>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed tracking-tight">
            The Professional Chef Course (Basic to Advance) at the Culinary Institute of Bangladesh (CIB) is a premier 6-month hands-on culinary program in Dhaka. Priced at 44,000 BDT with flexible installment options, this course covers 120+ recipes across 16+ cuisines. Graduates receive national NSDA Level 2 & 3 certifications, international ISO-HACCP credentials, and direct 5-star hotel job placement support.
          </p>
        </div>
      </section>

      {/* AEO Key Facts Table */}
      <section className="py-12 relative z-10 bg-obsidian border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <h3 className="text-prestige-gold font-bold text-xs uppercase tracking-widest mb-6 text-center">
              Professional Chef Course Key Facts
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase text-xs tracking-wider">
                    <th className="py-3 px-4 font-bold">Parameter</th>
                    <th className="py-3 px-4 font-bold">Value / Description</th>
                    <th className="py-3 px-4 font-bold">Verification / Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80 font-medium">
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Course Name</td>
                    <td className="py-3 px-4">Professional Chef Course (Basic to Advance)</td>
                    <td className="py-3 px-4 text-green-400 font-bold">Flagship Program</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Total Tuition Fee</td>
                    <td className="py-3 px-4">৳44,000 (No Hidden Charges)</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">3 Easy Installments</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Installment Breakdown</td>
                    <td className="py-3 px-4">৳16,000 at admission + two monthly installments of ৳14,000</td>
                    <td className="py-3 px-4 text-green-400 font-bold">Interest-Free</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Course Duration</td>
                    <td className="py-3 px-4">6 Months (2 Months Kitchen Lab + 4 Months Hotel Internship)</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">100% Practical Training</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Curriculum Depth</td>
                    <td className="py-3 px-4">120+ Recipes across 16+ Global Cuisines</td>
                    <td className="py-3 px-4 text-white/60">Free Pastry Module Included</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">State Accreditation</td>
                    <td className="py-3 px-4">National Skills Development Authority (NSDA), PMO</td>
                    <td className="py-3 px-4 text-prestige-gold font-bold">Level 2 & 3 Certified</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Food Safety Audits</td>
                    <td className="py-3 px-4">ISO 22000:2018 & HACCP Standards</td>
                    <td className="py-3 px-4 text-green-400 font-bold">SGS Switzerland Certified</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Job Placement</td>
                    <td className="py-3 px-4">5-Star Hotel Internship & Conditional Placement Support</td>
                    <td className="py-3 px-4 text-white/40">Local & International Hubs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>


      <FAQSection />

      {/* Author Box Section */}
      <section className="py-12 bg-black/10 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <AuthorBox 
            name="Dewan Ismail"
            title="Principal & Founder, CIB"
            photo="/images/dewan-ismail-portrait.jpg"
            profileUrl="/expert-culinary-mentors/dewan-ismail"
            lastReviewed="June 2026"
            locale="en"
          />
        </div>
      </section>

      <LandingFooter />
      <StickyCTA />
      <ExitIntentPopup />
    </main>
  );
}

'use client';

import React from 'react';
import { courseData } from './courseData';

const CourseSchedule = () => {
  return (
    <section className="py-24 bg-obsidian">
      <div className="container mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-16 relative overflow-hidden">
          {/* Decorative Corner Blur */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-prestige-gold/5 blur-[100px] -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-bengali">
                ক্লাস শিডিউল ও <span className="text-prestige-gold">ফরম্যাট</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-power-red/10 flex items-center justify-center text-power-red border border-power-red/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-bengali text-xl mb-1">সাপ্তাহিক ক্লাস</h4>
                    <p className="text-gray-400 font-bengali">{courseData.classStructure.weekly}</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-power-red/10 flex items-center justify-center text-power-red border border-power-red/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-bengali text-xl mb-1">ট্রেনিং ফরম্যাট</h4>
                    <p className="text-gray-400 font-bengali">{courseData.classStructure.format}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-power-red/10 flex items-center justify-center text-power-red border border-power-red/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-bengali text-xl mb-1">ব্যাচ অপশন</h4>
                    <p className="text-gray-400 font-bengali">{courseData.classStructure.batches}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold text-white mb-8 font-bengali">ক্যাম্পাস লোকেশন</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-prestige-gold mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 font-bengali leading-relaxed">
                    {courseData.classStructure.location}
                  </p>
                </div>
                
                {/* Embedded Map or Placeholder */}
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all border border-white/10">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d322.78753610106565!2d90.37910819710673!3d23.750086204847523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b95e7a43bf21%3A0xd1c7ee1fe52d6a70!2sCIB%20-%20The%20Culinary%20Institute%20of%20Bangladesh!5e0!3m2!1sen!2sbd!4v1777794969457!5m2!1sen!2sbd" 
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSchedule;

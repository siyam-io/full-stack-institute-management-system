"use client";

import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

const questions = {
  en: [
    { question: "What is your primary goal?", options: ["Become a Professional Chef", "Open my own cafe/restaurant", "Learn as a hobby"] },
    { question: "How much time can you commit?", options: ["Full-time (6 months)", "Part-time/Weekends", "Short courses"] },
    { question: "Which cuisine interests you most?", options: ["Multi-cuisine & Culinary Arts", "Baking & Pastry", "Coffee & Barista"] }
  ],
  bn: [
    { question: "আপনার প্রধান লক্ষ্য কী?", options: ["প্রফেশনাল শেফ হওয়া", "নিজের ক্যাফে/রেস্তোরাঁ খোলা", "শখ হিসেবে শেখা"] },
    { question: "আপনি কতটুকু সময় দিতে পারবেন?", options: ["ফুল-টাইম (৬ মাস)", "পার্ট-টাইম/সাপ্তাহিক ছুটি", "শর্ট কোর্স"] },
    { question: "কোন ধরনের খাবার আপনাকে বেশি আকর্ষণ করে?", options: ["মাল্টি-কুইজিন ও কালিনারি আর্টস", "বেকিং এবং পেস্ট্রি", "কফি এবং বারিস্তা"] }
  ]
};

export default function CourseQuiz({ locale = 'en' }: { locale?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const isBn = locale === 'bn';
  const qData = isBn ? questions.bn : questions.en;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < qData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    if (answers[0]?.includes('Professional') || answers[0]?.includes('প্রফেশনাল')) return isBn ? 'প্রফেশনাল শেফ কোর্স' : 'Professional Chef Course';
    if (answers[2]?.includes('Baking') || answers[2]?.includes('বেকিং')) return isBn ? 'বেকারি এবং পেস্ট্রি কোর্স' : 'Bakery & Pastry Course';
    if (answers[2]?.includes('Coffee') || answers[2]?.includes('কফি')) return isBn ? 'প্রফেশনাল বারিস্তা কোর্স' : 'Professional Barista Course';
    return isBn ? 'প্রফেশনাল শেফ কোর্স' : 'Professional Chef Course';
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-prestige-gold/20 to-power-red/20 border border-prestige-gold/30 text-white font-bold hover:from-prestige-gold/30 hover:to-power-red/30 transition-all shadow-[0_0_20px_rgba(202,152,73,0.2)] group w-full md:w-auto"
      >
        <Sparkles className="w-5 h-5 text-prestige-gold group-hover:animate-pulse" />
        {isBn ? 'আমার জন্য সঠিক কোর্স খুঁজুন' : 'Find Your Perfect Course'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          
          <div className="glass-card relative z-10 w-full max-w-lg bg-obsidian border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl animate-fade-in">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!showResult ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-2">
                    {qData.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${i <= currentStep ? 'w-8 bg-prestige-gold' : 'w-4 bg-white/10'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400 font-medium">Step {currentStep + 1} of {qData.length}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {qData[currentStep].question}
                </h3>

                <div className="space-y-3">
                  {qData[currentStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-prestige-gold/50 text-white transition-all group flex justify-between items-center"
                    >
                      <span>{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:text-prestige-gold transform -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6 animate-fade-in py-8">
                <div className="w-20 h-20 bg-prestige-gold/20 rounded-full flex items-center justify-center mx-auto text-prestige-gold mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <h3 className="text-sm font-bold text-power-red tracking-widest uppercase">
                  {isBn ? 'আপনার জন্য সেরা' : 'Best Match For You'}
                </h3>
                <h2 className="text-3xl font-black text-white">
                  {getRecommendation()}
                </h2>
                <p className="text-gray-400">
                  {isBn ? 'আপনার লক্ষ্যের উপর ভিত্তি করে এই কোর্সটি আপনার জন্য উপযুক্ত।' : 'Based on your goals, this is the perfect course to start your culinary journey.'}
                </p>
                
                <div className="pt-6 flex flex-col gap-3">
                  <Link
                    href={`/${locale}/admission`}
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center py-4 rounded-xl bg-power-red hover:bg-power-red/90 text-white font-bold transition-colors"
                  >
                    {isBn ? 'এখনই আবেদন করুন' : 'Apply Now'}
                  </Link>
                  <button
                    onClick={resetQuiz}
                    className="w-full py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors"
                  >
                    {isBn ? 'পুনরায় শুরু করুন' : 'Retake Quiz'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

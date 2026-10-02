export const getBtvVideoData = (locale: string) => {
  const isBn = locale === 'bn';
  return {
    videoId: 'ayKFD3Nzqag',
    title: isBn 
      ? 'বিটিভি কভারেজ: কালিনারি একাডেমি কীভাবে বাংলাদেশে প্রফেশনাল কালিনারি শিক্ষার বিপ্লব ঘটাচ্ছে' 
      : 'BTV Feature: The Rise of Professional Culinary Education in Bangladesh',
    summary: isBn
      ? 'কালিনারি একাডেমি কীভাবে কারিগরি শিক্ষাকে আন্তর্জাতিক মানে উন্নীত করছে এবং শিক্ষার্থীদের গ্লোবাল ৫-স্টার হোটেলের জন্য পেশাদার শেফ হিসেবে গড়ে তুলছে তা তুলে ধরা হয়েছে।'
      : 'Highlights how Culinary Academy is elevating vocational culinary education to international standards, preparing students for professional chef careers globally.',
    transcript: isBn
      ? `[বর্ণনাকারী]: বাংলাদেশে কারিগরি ও বৃত্তিমূলক শিক্ষা এখন নতুন এক উচ্চতায়। কালিনারি একাডেমি এর নেতৃত্ব দিচ্ছে। অভিজ্ঞ আন্তর্জাতিক মাস্টার শেফদের তত্ত্বাবধানে শিক্ষার্থীরা সরাসরি বাণিজ্যিক রান্নাঘরে প্রশিক্ষণ নিচ্ছেন।

[ইন্সট্রাক্টর]: কালিনারি একাডেমি-র মূল লক্ষ্য হলো শিক্ষার্থীদের আন্তর্জাতিক মানের সার্টিফিকেট এবং আইএসও-এইচএসিসিপি খাদ্য নিরাপত্তা মানদণ্ডে প্রশিক্ষণ দিয়ে বিশ্বমানের প্রফেশনাল শেফে রূপান্তর করা। আমাদের শিক্ষার্থীরা ১৬টির বেশি দেশের ১২০টির বেশি রেসিপি হাতে-কলমে শিখছেন।

[বর্ণনাকারী]: কালিনারি একাডেমির স্নাতকরা বিশ্বজুড়ে ৫-তারকা হোটেল ও ক্রুজ লাইনারে সরাসরি ইন্টার্নশিপ ও প্লেসমেন্ট সুবিধা পাচ্ছেন, যা তাদের উজ্জ্বল ক্যারিয়ার নিশ্চিত করছে।`
      : `[Narrator]: In Bangladesh, vocational and culinary training has entered a new era. Culinary Academy leads the way. Under the guidance of certified Executive Chefs, students are trained in state-of-the-art commercial kitchens.

[Lead Instructor]: At Culinary Academy, our mission is to equip aspiring chefs with internationally recognized certifications, ISO, and HACCP food safety standards, turning them into high-income, professional culinary assets globally.

[Narrator]: Graduates from Culinary Academy receive placement support in 5-star hotels globally, making Culinary Academy a benchmark for professional culinary success.`,
    platform: isBn ? 'বিটিভি' : 'BTV'
  };
};

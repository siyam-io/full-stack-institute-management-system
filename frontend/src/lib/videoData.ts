export const getBtvVideoData = (locale: string) => {
  const isBn = locale === 'bn';
  return {
    videoId: 'ayKFD3Nzqag',
    title: isBn 
      ? 'বিটিভি কভারেজ: সিআইবি কীভাবে বাংলাদেশে প্রফেশনাল কালিনারি শিক্ষার বিপ্লব ঘটাচ্ছে' 
      : 'BTV Feature: The Rise of Professional Culinary Education in Bangladesh',
    summary: isBn
      ? 'প্রিন্সিপাল দেওয়ান ইসমাইল আলোচনা করেছেন কীভাবে কালিনারি ইনস্টিটিউট অফ বাংলাদেশ (সিআইবি) বাংলাদেশে কারিগরি শিক্ষাকে আন্তর্জাতিক মানে উন্নীত করছে এবং সাধারণ অদক্ষ শ্রমিকের পরিবর্তে শিক্ষার্থীদের গ্লোবাল ৫-স্টার হোটেলের জন্য পেশাদার শেফ হিসেবে গড়ে তুলছে।'
      : 'Principal Dewan Ismail discusses how the Culinary Institute of Bangladesh (CIB) is elevating vocational education in Bangladesh to international standards, preparing students for professional chef careers globally instead of low-wage labor.',
    transcript: isBn
      ? `[বর্ণনাকারী]: বাংলাদেশে কারিগরি ও বৃত্তিমূলক শিক্ষা এখন নতুন এক উচ্চতায়। ঢাকার ধানমন্ডিতে অবস্থিত কালিনারি ইনস্টিটিউট অফ বাংলাদেশ (সিআইবি) এর নেতৃত্ব দিচ্ছে। প্রিন্সিপাল দেওয়ান ইসমাইলের তত্ত্বাবধানে শিক্ষার্থীরা সরাসরি আন্তর্জাতিক মানের বাণিজ্যিক রান্নাঘরে প্রশিক্ষণ নিচ্ছেন।

[দেওয়ান ইসমাইল]: সিআইবি-র মূল লক্ষ্য হলো বিদেশে আমাদের যুবসমাজ যাতে কম বেতনের সাধারণ অদক্ষ শ্রমিকের কাজ করতে বাধ্য না হয়। তাদের প্রধানমন্ত্রীর কার্যালয়ের অধীনে এনএসডিএ লেভেল ২ ও ৩ সার্টিফিকেট এবং আইএসও-এইচএসিসিপি খাদ্য নিরাপত্তা মানদণ্ডে প্রশিক্ষণ দিয়ে আমরা তাদের প্রফেশনাল শেফে রূপান্তর করছি। আমাদের শিক্ষার্থীরা ১৬টির বেশি দেশের ১২০টির বেশি রেসিপি হাতে-কলমে শিখছেন।

[বর্ণনাকারী]: সিআইবি-র স্নাতকরা বিশ্বজুড়ে ৫-তারকা হোটেল ও ক্রুজ লাইনারে সরাসরি ইন্টার্নশিপ ও প্লেসমেন্ট সুবিধা পাচ্ছেন, যা তাদের উজ্জ্বল ক্যারিয়ার নিশ্চিত করছে।`
      : `[Narrator]: In Bangladesh, vocational and technical training has entered a new era. The Culinary Institute of Bangladesh, located in Dhanmondi, Dhaka, leads the way. Under the leadership of Principal Dewan Ismail, students are trained in state-of-the-art commercial kitchens.

[Dewan Ismail]: At CIB, our mission is to eliminate the trend of Bangladeshis taking low-wage, unskilled labor jobs abroad. By equipping them with NSDA Level 2 and 3 certifications, and training them under ISO and HACCP food safety standards, we turn them into high-income, professional culinary assets. Our students learn over 120 recipes from 16 countries.

[Narrator]: Graduates from CIB receive placement support in 5-star hotels globally, making CIB a benchmark for professional culinary success.`,
    platform: isBn ? 'বিটিভি' : 'BTV'
  };
};

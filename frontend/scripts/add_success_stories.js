const fs = require('fs');
const path = require('path');

const enStoriesToAdd = [
  {
    "name": "Tanvir Rahman",
    "batch": "Batch 19",
    "course": "Professional Chef Course (Level 3)",
    "currentRole": "Commis Chef",
    "company": "Radisson Blu Water Garden, Dhaka",
    "photo": "/images/student_1-1280w.webp",
    "isPlaceholder": true,
    "quote": "The practical classes at CIB gave me the confidence to handle the pressure in a busy 5-star hotel kitchen. The training under expert mentors made my transition seamless.",
    "achievements": [
      "Secured Radisson Blu placement immediately after graduation",
      "Aces the high-volume Continental banquet operations",
      "Recognized for outstanding hygiene log compliance"
    ]
  },
  {
    "name": "Farhana Yeasmin",
    "batch": "Batch 20",
    "course": "Professional Pastry & Bakery Arts",
    "currentRole": "Pastry Chef",
    "company": "The Westin, Dhaka",
    "photo": "/images/student_2_holding_beverage_glass-1280w.webp",
    "isPlaceholder": true,
    "quote": "Baking is all about chemical precision. CIB taught me the exact science behind sourdoughs and French pastries, helping me lead the dessert section at The Westin.",
    "achievements": [
      "Heads the French pastry & custom mousse section",
      "Reduced dessert wastage by 15% using portion scaling",
      "Awarded Star Performer of the Month in hospitality"
    ]
  },
  {
    "name": "Imtiaz Ahmed",
    "batch": "Batch 21",
    "course": "Professional Chef Course (Level 3)",
    "currentRole": "Junior Sous Chef in Dubai",
    "company": "Crowne Plaza, Dubai",
    "photo": "/images/student_3_practicing-1280w.webp",
    "isPlaceholder": true,
    "quote": "My dream was to work in Dubai. CIB's NSDA and ISO-HACCP certifications made my visa processing smooth, and the trade tests were easy due to CIB's rigorous practice labs.",
    "achievements": [
      "Passed Dubai culinary trade test on first attempt",
      "Promoted to Junior Sous Chef in under 2 years",
      "Specializes in Mediterranean cuisine and seafood station management"
    ]
  },
  {
    "name": "Sajjad Hossain",
    "batch": "Batch 22",
    "course": "Chef + Barista Combo Course",
    "currentRole": "Kitchen Manager",
    "company": "Cloud Kitchen Dhaka",
    "photo": "/images/student-practice-5-1280w.webp",
    "isPlaceholder": true,
    "quote": "Running a cloud kitchen requires deep knowledge of food costing and inventory. CIB's entrepreneurship classes were critical in showing me how to maintain margins.",
    "achievements": [
      "Manages operations of a multi-brand cloud kitchen in Dhaka",
      "Optimized menu costing, achieving 35% profit margin",
      "Supervises a team of 8 cooks and delivery managers"
    ]
  },
  {
    "name": "Kamrul Hasan",
    "batch": "Batch 23",
    "course": "Professional Chef Course (Level 3)",
    "currentRole": "Chef de Partie",
    "company": "Le Meridien, Dhaka",
    "photo": "/images/student-practice-6-1280w.webp",
    "isPlaceholder": true,
    "quote": "The knife skills and classic sauce training at CIB are exactly what premium kitchens look for. I started as Commis and was promoted to CDP within 18 months.",
    "achievements": [
      "Heads the Hot Kitchen section at Le Meridien",
      "Trained in classic French mother sauces and stock reduction",
      "Maintains strict ISO-22000 food safety standards daily"
    ]
  },
  {
    "name": "Jannatul Fardous",
    "batch": "Batch 24",
    "course": "Professional Pastry & Bakery Arts",
    "currentRole": "Cake Decorator & Owner",
    "company": "Baker's Palette, Dhaka",
    "photo": "/images/practical_class_1-1280w.webp",
    "isPlaceholder": true,
    "quote": "CIB's hands-on training in fondant work and sugar craft allowed me to start my own custom cake business. I currently serve over 50 corporate orders monthly.",
    "achievements": [
      "Founded a highly successful custom cake studio in Dhaka",
      "Averages BDT 80,000+ monthly profit from home bakery",
      "Specializes in complex 3D fondant structures & tier cakes"
    ]
  },
  {
    "name": "Mahbub Alam",
    "batch": "Batch 25",
    "course": "6-Month Diploma in Culinary Arts",
    "currentRole": "Commis Chef",
    "company": "Hilton, Abu Dhabi",
    "photo": "/images/practical_class_2-1280w.webp",
    "isPlaceholder": true,
    "quote": "CIB's curriculum prepares you for global standards. Learning HACCP was key to passing the strict food safety interview for Hilton in Abu Dhabi.",
    "achievements": [
      "Secured Abu Dhabi placement through CIB partner network",
      "Works in premium international buffet and banquets",
      "ISO-HACCP certified expert in cross-contamination prevention"
    ]
  },
  {
    "name": "Rashedul Islam",
    "batch": "Batch 26",
    "course": "Professional Chef Course (Level 3)",
    "currentRole": "Sous Chef",
    "company": "Secret Recipe, Dhaka",
    "photo": "/images/practical_class_3-1280w.webp",
    "isPlaceholder": true,
    "quote": "The portion control and plating classes at CIB help me run a tight ship. I supervise the entire kitchen line, maintaining high consistency across all dishes.",
    "achievements": [
      "Manages kitchen operations for a premium restaurant brand",
      "Leads recipe standardization and new menu development",
      "Ensures zero delay in dish turnaround during rush hours"
    ]
  },
  {
    "name": "Sadia Afrin",
    "batch": "Batch 27",
    "course": "Chef + Barista Combo Course",
    "currentRole": "Beverage Head",
    "company": "Tabaq Coffee, Dhaka",
    "photo": "/images/student_practice_session_1-1280w.webp",
    "isPlaceholder": true,
    "quote": "Tasting and milk texturing were skills I perfected at CIB. The combo course makes you highly employable in premium coffee shops and lounges.",
    "achievements": [
      "Heads the beverage development team at Tabaq",
      "Designed a new seasonal mocktail menu that boosted sales by 20%",
      "Specialist in advanced latte art and custom flavor profiling"
    ]
  },
  {
    "name": "Nayeem Islam",
    "batch": "Batch 28",
    "course": "Professional Chef Course (Level 3)",
    "currentRole": "Kitchen Executive",
    "company": "Foodpanda Cloud Kitchen, Dhaka",
    "photo": "/images/student_practice_session_2-1280w.webp",
    "isPlaceholder": true,
    "quote": "CIB's focus on high-speed prep work and commercial kitchen layouts was the best preparation for managing high-volume cloud kitchen orders.",
    "achievements": [
      "Coordinates operations for 4 virtual restaurant brands",
      "Maintains food prep times under 12 minutes average",
      "Strict compliance with municipal health & safety rules"
    ]
  }
];

const bnStoriesToAdd = [
  {
    "name": "তানভীর রহমান",
    "batch": "ব্যাচ ১৯",
    "course": "প্রফেশনাল শেফ কোর্স (লেভেল ৩)",
    "currentRole": "কমিস শেফ",
    "company": "রেডিসন ব্লু ওয়াটার গার্ডেন, ঢাকা",
    "photo": "/images/student_1-1280w.webp",
    "isPlaceholder": true,
    "quote": "সিআইবি-র প্র্যাকটিক্যাল ক্লাসগুলো আমাকে একটি ব্যস্ত ৫-স্টার হোটেলের রান্নাঘরের চাপ সামলানোর আত্মবিশ্বাস জুগিয়েছে। অভিজ্ঞ মেন্টরদের অধীনে প্রশিক্ষণ আমার রূপান্তরকে সহজ করে তুলেছে।",
    "achievements": [
      "কোর্স শেষ করার পরপরই রেডিসন ব্লু-তে নিয়োগ লাভ",
      "উচ্চ-ভলিউম কন্টিনেন্টাল ব্যাংকুয়েট অপারেশন পরিচালনায় দক্ষ",
      "অসাধারণ স্বাস্থ্যবিধি লগ কমপ্লায়েন্সের জন্য প্রশংসিত"
    ]
  },
  {
    "name": "ফারহানা ইয়াসমিন",
    "batch": "ব্যাচ ২০",
    "course": "প্রফেশনাল পেস্ট্রি অ্যান্ড বেকারি আর্টস",
    "currentRole": "পেস্ট্রি শেফ",
    "company": "দ্য ওয়েস্টিন, ঢাকা",
    "photo": "/images/student_2_holding_beverage_glass-1280w.webp",
    "isPlaceholder": true,
    "quote": "বেকিং হলো পরিমাপের বিজ্ঞান। সিআইবি আমাকে টকদই রুটি ও ফ্রেঞ্চ পেস্ট্রির পেছনের সঠিক রন্ধনবিজ্ঞান শিখিয়েছে, যা আমাকে ওয়েস্টিনের ডেজার্ট সেকশন পরিচালনা করতে সাহায্য করছে।",
    "achievements": [
      "ফ্রেঞ্চ পেস্ট্রি ও কাস্টম মুস ডেজার্ট সেকশনের দায়িত্বে নিয়োজিত",
      "সঠিক পরিমাপের মাধ্যমে মিষ্টি অপচয় ১৫% কমিয়ে এনেছেন",
      "হসপিটালিটি সেক্টরে মাসের সেরা পারফরমার হিসেবে পুরস্কৃত"
    ]
  },
  {
    "name": "ইমতিয়াজ আহমেদ",
    "batch": "ব্যাচ ২১",
    "course": "প্রফেশনাল শেফ কোর্স (লেভেল ৩)",
    "currentRole": "জুনিয়র সু শেফ (দুবাই)",
    "company": "ক্রাউন প্লাজা, দুবাই",
    "photo": "/images/student_3_practicing-1280w.webp",
    "isPlaceholder": true,
    "quote": "আমার স্বপ্ন ছিল দুবাইয়ে কাজ করা। সিআইবি-র NSDA এবং ISO-HACCP সার্টিফিকেট আমার ভিসা প্রসেসিংকে সহজ করেছে এবং সিআইবি-র ল্যাবের কঠোর প্র্যাকটিস আমার ট্রেড টেস্ট সহজ করে দিয়েছে।",
    "achievements": [
      "প্রথমবারেই দুবাই কালিনারি ট্রেড টেস্টে সফলভাবে উত্তীর্ণ",
      "২ বছরেরও কম সময়ে জুনিয়র সু শেফ পদে পদোন্নতি",
      "মেডিটেরেনিয়ান কুইজিন এবং সি-ফুড স্টেশন পরিচালনায় পারদর্শী"
    ]
  },
  {
    "name": "সাজ্জাদ হোসেন",
    "batch": "ব্যাচ ২২",
    "course": "শেফ + বারিস্তা কম্বো কোর্স",
    "currentRole": "কিচেন ম্যানেজার",
    "company": "ক্লাউড কিচেন ঢাকা",
    "photo": "/images/student-practice-5-1280w.webp",
    "isPlaceholder": true,
    "quote": "একটি ক্লাউড কিচেন চালাতে ফুড কস্টিং এবং ইনভেন্টরির গভীর জ্ঞান প্রয়োজন। সিআইবি-র এন্টারপ্রেনারশিপ ক্লাসগুলো আমাকে সঠিক প্রফিট মার্জিন ধরে রাখতে শিখিয়েছে।",
    "achievements": [
      "ঢাকায় একটি মাল্টি-ব্র্যান্ড ক্লাউড কিচেনের কার্যক্রম পরিচালনা",
      "মেনু কস্টিং অপ্টিমাইজ করে ৩৫% প্রফিট মার্জিন অর্জন",
      "৮ জন বাবুর্চি ও ডেলিভারি ম্যানেজারের টিম পরিচালনা"
    ]
  },
  {
    "name": "কামরুল হাসান",
    "batch": "ব্যাচ ২৩",
    "course": "প্রফেশনাল শেফ কোর্স (লেভেল ৩)",
    "currentRole": "শেফ ডি পার্টি",
    "company": "লে মেরিডিয়ান, ঢাকা",
    "photo": "/images/student-practice-6-1280w.webp",
    "isPlaceholder": true,
    "quote": "সিআইবি-র নাইফ স্কিলস এবং ক্লাসিক সস ট্রেনিং ফাইভ-স্টার কিচেনের চাহিদার সাথে হুবহু মিলে যায়। আমি কমিস হিসেবে শুরু করে ১৮ মাসের মধ্যে সিডিপি হয়েছি।",
    "achievements": [
      "লে মেরিডিয়ানের হট কিচেন সেকশনের প্রধান হিসেবে কর্মরত",
      "ক্লাসিক ফ্রেঞ্চ মাদার সস এবং স্টক তৈরিতে বিশেষ পারদর্শী",
      "প্রতিদিন কঠোরভাবে ISO-২২০০০ ফুড সেফটি স্ট্যান্ডার্ড বজায় রাখেন"
    ]
  },
  {
    "name": "জান্নাতুল ফেরদৌস",
    "batch": "ব্যাচ ২৪",
    "course": "প্রফেশনাল পেস্ট্রি অ্যান্ড বেকারি আর্টস",
    "currentRole": "কেক ডেকোরেটর ও স্বত্বাধিকারী",
    "company": "বেকারস প্যালেট, ঢাকা",
    "photo": "/images/practical_class_1-1280w.webp",
    "isPlaceholder": true,
    "quote": "ফন্ড্যান্ট এবং সুগার ক্রাফটের ওপর সিআইবি-র বাস্তব প্রশিক্ষণ আমাকে নিজের কেক বিজনেস শুরু করতে সাহায্য করেছে। বর্তমানে আমি মাসে ৫০টিরও বেশি কর্পোরেট অর্ডার পেয়ে থাকি।",
    "achievements": [
      "ঢাকায় একটি অত্যন্ত সফল কাস্টম কেক স্টুডিও প্রতিষ্ঠা",
      "হোম বেকারি থেকে মাসে গড়ে ৮০,০০০+ টাকা লাভ করছেন",
      "জটিল ত্রিমাত্রিক (3D) ফন্ড্যান্ট কেক তৈরিতে বিশেষ পারদর্শী"
    ]
  },
  {
    "name": "মাহবুব আলম",
    "batch": "ব্যাচ ২৫",
    "course": "৬-মাসের প্রফেশনাল ডিপ্লোমা কোর্স",
    "currentRole": "কমিস শেফ",
    "company": "হিলটন, আবুধাবি",
    "photo": "/images/practical_class_2-1280w.webp",
    "isPlaceholder": true,
    "quote": "সিআইবি-র কারিকুলাম আন্তর্জাতিক মানের। আবুধাবির হিলটন হোটেলে কঠোর ফুড সেফটি ইন্টারভিউতে উত্তীর্ণ হতে আমার হ্যাসাপ (HACCP) ট্রেনিংটি সহায়ক ছিল।",
    "achievements": [
      "সিআইবি প্লেসমেন্ট নেটওয়ার্কের মাধ্যমে আবুধাবিতে নিয়োগ লাভ",
      "প্রিমিয়াম আন্তর্জাতিক বুফে এবং ব্যাংকুয়েট সেকশনে কর্মরত",
      "খাদ্যে জীবাণুমুক্তকরণ ও অপচয় রোধে ISO-HACCP প্রত্যয়িত বিশেষজ্ঞ"
    ]
  },
  {
    "name": "রাশেদুল ইসলাম",
    "batch": "ব্যাচ ২৬",
    "course": "প্রফেশনাল শেফ কোর্স (লেভেল ৩)",
    "currentRole": "সু শেফ",
    "company": "সিক্রেট রেসিপি, ঢাকা",
    "photo": "/images/practical_class_3-1280w.webp",
    "isPlaceholder": true,
    "quote": "সিআইবি-র পোরশন কন্ট্রোল এবং প্লেটিং ক্লাসগুলো আমাকে কিচেন নিয়ন্ত্রণে সাহায্য করে। আমি পুরো কিচেন লাইন সুপারভাইজ করি এবং খাবারের মান বজায় রাখি।",
    "achievements": [
      "প্রিমিয়াম রেস্টুরেন্ট ব্র্যান্ডের কিচেন অপারেশন পরিচালনা",
      "রেসিপি স্ট্যান্ডার্ডাইজেশন এবং নতুন মেনু ডেভেলপমেন্টে নেতৃত্বদান",
      "ব্যস্ত সময়ে খাবারের দ্রুত ডেলিভারি ও কিচেন চেইন নিশ্চিতকরণ"
    ]
  },
  {
    "name": "সাদিয়া আফরিন",
    "batch": "ব্যাচ ২৭",
    "course": "শেফ + বারিস্তা কম্বো কোর্স",
    "currentRole": "বেভারেজ প্রধান",
    "company": "তাবাক কফি, ঢাকা",
    "photo": "/images/student_practice_session_1-1280w.webp",
    "isPlaceholder": true,
    "quote": "কফির স্বাদ পরীক্ষা এবং মিল্ক টেক্সচারিংয়ের দক্ষতা আমি সিআইবি থেকে অর্জন করেছি। এই কম্বো কোর্সটি ক্যাফে এবং লাউঞ্জে চাকরির জন্য অত্যন্ত কার্যকরী।",
    "achievements": [
      "তাবাক কফির বেভারেজ ডেভেলপমেন্ট টিমের প্রধান হিসেবে দায়িত্ব পালন",
      "নতুন সিজনাল মকটেল মেনু চালু করে বিক্রি ২০% বৃদ্ধি করেছেন",
      "অ্যাডভান্সড ল্যাটে আর্ট এবং কাস্টম ফ্লেভার মিক্সিংয়ে বিশেষজ্ঞ"
    ]
  },
  {
    "name": "নাঈম ইসলাম",
    "batch": "ব্যাচ ২৮",
    "course": "প্রফেশনাল শেফ কোর্স (লেভেল ৩)",
    "currentRole": "কিচেন এক্সিকিউটিভ",
    "company": "ফুডপান্ডা ক্লাউড কিচেন, ঢাকা",
    "photo": "/images/student_practice_session_2-1280w.webp",
    "isPlaceholder": true,
    "quote": "সিআইবি-র দ্রুত প্রস্তুতি (Prep Work) এবং বাণিজ্যিক কিচেন ডিজাইন সংক্রান্ত ক্লাসগুলো আমাকে ক্লাউড কিচেন অর্ডারের দ্রুত ডেলিভারি নিশ্চিত করতে সাহায্য করেছে।",
    "achievements": [
      "৪টি ভার্চুয়াল রেস্টুরেন্ট ব্র্যান্ডের কিচেন কার্যক্রম সমন্বয়",
      "গড় ফুড প্রিপারেশন সময় ১২ মিনিটের নিচে বজায় রাখতে সক্ষম",
      "সিটি কর্পোরেশনের নিরাপদ খাদ্য ও স্বাস্থ্যবিধি আইন বাস্তবায়নে নিয়োজিত"
    ]
  }
];

function appendStories(filePath, storiesToAdd) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  raw.stories = [...raw.stories, ...storiesToAdd];
  fs.writeFileSync(filePath, JSON.stringify(raw, null, 2), 'utf8');
  console.log(`Successfully added ${storiesToAdd.length} stories to ${filePath}`);
}

const enPath = path.join(__dirname, '../content/en/success-stories.json');
const bnPath = path.join(__dirname, '../content/bn/success-stories.json');

appendStories(enPath, enStoriesToAdd);
appendStories(bnPath, bnStoriesToAdd);

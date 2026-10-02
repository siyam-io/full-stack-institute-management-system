const fs = require('fs');
const path = require('path');

const CONTENT_DIR_EN = path.join(__dirname, '../content/en');
const CONTENT_DIR_BN = path.join(__dirname, '../content/bn');

const shortCoursesData = [
  {
    slug: 'cooking-course-dhaka',
    en: {
      slug: 'cooking-course-dhaka',
      meta: {
        title: 'Cooking Course in Dhaka for Housewives & Entrepreneurs | CIB',
        description: 'Enrol in the best cooking course in Dhaka. Tailored for housewives, home chefs, and food entrepreneurs. Learn 40+ recipes, kitchen safety, and costing.'
      },
      hero: {
        badge: 'Short Course Pathway 2026',
        heading: 'Cooking Course in Dhaka',
        subheading: 'Master global and domestic cooking techniques. Designed specifically for home makers, home chefs, and food startup entrepreneurs.'
      },
      overview: {
        title: 'Empower Your Kitchen & Business',
        text: 'Whether you want to upgrade your daily family meals or start a profitable home-based food delivery business, our intensive cooking course is the perfect starting point.\n\nThis course focuses on practical hands-on kitchen training. We cover knife skills, classic mother sauces, culinary hygiene, and menu planning. CIB ensures you build real confidence under professional executive chefs in a state-of-the-art training environment.'
      },
      highlights: [
        { title: '40+ Recipes', description: 'From daily home cooked favorites to gourmet restaurant appetizers.' },
        { title: '4 Weeks', description: 'Intensive weekend and weekday schedules (8 sessions).' },
        { title: 'Kitchen Costing', description: 'Learn recipe cost calculation to run a profitable food business.' },
        { title: 'Official Certificate', description: 'CIB institutional credential recognized across local eateries.' }
      ],
      features: [
        'Hands-on practical cooking using premium fresh ingredients',
        'Learn classic Bangladeshi, Chinese, and Indian recipes',
        'ISO-HACCP basic kitchen sanitation and food safety rules',
        'Perfect for home bakers, housewives, and small cloud kitchen owners',
        'Flexible batch timings (morning / afternoon / weekend)',
        'Direct feedback and grading from certified chef mentors'
      ],
      table: {
        heading: 'Course Details & Fee Structure',
        headers: ['Criteria', 'CIB Cooking Course Details'],
        rows: [
          ['Duration', '4 Weeks (8 Classes, 4 hours each)'],
          ['Schedule', 'Fridays & Saturdays or Mon & Wed'],
          ['Total Fee', 'BDT 12,500 (All-inclusive, no hidden charges)'],
          ['Materials Provided', 'Free recipe guides, chef apron, and ingredients']
        ]
      },
      faqs: [
        { question: 'Do I need any prior cooking experience to join?', answer: 'No. This course starts from basic knife handling and food preparation, making it perfect for absolute beginners.' },
        { question: 'Is this course suitable if I want to open a cloud kitchen?', answer: 'Yes. It includes basic food costing, bulk prep tips, and hygiene standards that are essential for starting a commercial delivery kitchen.' },
        { question: 'Can I pay the course fee in installments?', answer: 'For short courses under BDT 15,000, we require full payment at admission, but credit card EMI options are available.' }
      ],
      cta: {
        heading: 'Start Your Cooking Journey Today',
        subheading: 'Upgrade your skills, eat healthier, or launch your own home catering brand.',
        buttonText: 'Enroll in Upcoming Batch Now',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'cooking-course-dhaka',
      meta: {
        title: 'ঢাকায় গৃহিণী ও নতুন উদ্যোক্তাদের জন্য কুকিং কোর্স | সিআইবি',
        description: 'ঢাকায় সেরা কুকিং কোর্সে ভর্তি হন। গৃহিণী, হোম শেফ এবং ফুড এন্টারপ্রেনারদের জন্য বিশেষভাবে তৈরি। ৪০+ রেসিপি, সেফটি ও কস্টিং শিখুন।'
      },
      hero: {
        badge: 'শর্ট কোর্স পাথওয়ে ২০২৬',
        heading: 'ঢাকায় কুকিং কোর্স',
        subheading: 'হাতে-কলমে আন্তর্জাতিক ও দেশীয় রান্না শিখুন। গৃহিণী, হোম শেফ এবং নতুন ফুড উদ্যোক্তাদের জন্য বিশেষভাবে তৈরি কারিকুলাম।'
      },
      overview: {
        title: 'আপনার রান্নার দক্ষতা ও ফুড বিজনেস গড়ে তুলুন',
        text: 'পরিবারের জন্য স্বাস্থ্যকর সুস্বাদু খাবার তৈরি করা কিংবা বাসা থেকে একটি লাভজনক হোম-মেড ফুড বিজনেস শুরু করার জন্য আমাদের কুকিং কোর্সটি অত্যন্ত কার্যকর।\n\nএই কোর্সে সরাসরি প্র্যাক্টিক্যাল কিচেনে ক্লাস নেওয়া হয়। নাইফ স্কিলস, ক্লাসিক ফ্রেঞ্চ সস, কিচেন হাইজিন ও ফুড কস্টিংয়ের মতো প্রয়োজনীয় বিষয়গুলো ঢাকার ধানমন্ডিতে সিআইবি ক্যম্পাসে প্রফেশনাল শেফদের তত্ত্বাবধানে শেখানো হয়।'
      },
      highlights: [
        { title: '৪০+ রেসিপি', description: 'ঘরোয়া সুস্বাদু খাবার থেকে শুরু করে রেস্টুরেন্ট স্টাইল এপেটাইজার।' },
        { title: '৪ সপ্তাহ', description: 'ইনটেনসিভ উইকেন্ড এবং উইকডে শিডিউল (৮টি ব্যবহারিক ক্লাস)।' },
        { title: 'ফুড কস্টিং', description: 'ব্যবসায়িক লাভের জন্য রেসিপি খরচের সঠিক হিসাব ও অপচয় রোধ।' },
        { title: 'অফিশিয়াল সার্টিফিকেট', description: 'সিআইবি ইনস্টিটিউশনাল সার্টিফিকেট যা ক্যারিয়ারে সাহায্য করবে।' }
      ],
      features: [
        'প্রিমিয়াম কাঁচামাল ব্যবহার করে সরাসরি প্র্যাক্টিক্যাল কুকিং ক্লাস',
        'অথেন্টিক বাংলাদেশি, চাইনিজ এবং ইন্ডিয়ান রেসিপি মেকিং',
        'বেসিক কিচেন স্যানিটেশন ও নিরাপদ খাদ্য আইন ট্রেইনিং',
        'হোম বেকার, হাউজওয়াইফ এবং নতুন ক্লাউড কিচেন উদ্যোক্তাদের জন্য সেরা',
        'সুবিধাজনক ব্যাচ সময় (সকাল / দুপুর / শুক্রবার ও শনিবার)',
        'সার্টিফাইড মেন্টর শেফদের কাছ থেকে সরাসরি রেসিপি গ্রেডিং'
      ],
      table: {
        heading: 'কোর্সের বিবরণ ও ফি কাঠামো',
        headers: ['যোগ্যতা মানদণ্ড', 'সিআইবি কুকিং কোর্স বিবরণ'],
        rows: [
          ['কোর্সের মেয়াদ', '৪ সপ্তাহ (৮টি ক্লাস, প্রতিদিন ৪ ঘণ্টা)'],
          ['ক্লাস সময়সূচী', 'শুক্রবার ও শনিবার অথবা সোম ও বুধবার'],
          ['মোট কোর্স ফি', '৳১২,৫০০ (এককালীন, কোনো গোপন চার্জ নেই)'],
          ['প্রদেয় সামগ্রী', 'ফ্রি রেসিপি গাইড, শেফ অ্যাপ্রন ও রান্নার কাঁচামাল']
        ]
      },
      faqs: [
        { question: 'ভর্তি হতে কি রান্নার পূর্ব অভিজ্ঞতার প্রয়োজন আছে?', answer: 'না। এই কোর্সটি সম্পূর্ণ শূন্য থেকে শুরু করা হয়, তাই যে কেউ এতে অংশগ্রহণ করতে পারবেন।' },
        { question: 'কোর্সটি কি হোম ডেলিভারি ফুড ব্যবসা চালুর জন্য উপকারী?', answer: 'হ্যাঁ। এটিতে ফুড কস্টিং, কমার্শিয়াল কিচেন সেটআপ এবং নিরাপদ খাদ্য আইন শেখানো হয় যা ফুড ব্যবসার জন্য আবশ্যক।' },
        { question: 'কোর্স ফি কি কিস্তিতে পরিশোধ করা যাবে?', answer: '৳১৫,০০০ এর নিচের শর্ট কোর্সের জন্য ভর্তির সময়েই সম্পূর্ণ ফি পরিশোধ করতে হয়, তবে ক্রেডিট কার্ডের মাধ্যমে ইএমআই (EMI) সুবিধা রয়েছে।' }
      ],
      cta: {
        heading: 'আজই আপনার রান্নার প্রশিক্ষণ শুরু করুন',
        subheading: 'দক্ষতা বাড়ান, স্বাস্থ্যকর খাবার তৈরি করুন অথবা নিজের হোম ক্যাটারিং ব্র্যান্ড চালু করুন।',
        buttonText: 'আসন্ন ব্যাচে ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'japanese-cooking-course-dhaka',
    en: {
      slug: 'japanese-cooking-course-dhaka',
      meta: {
        title: 'Japanese Cuisine Course in Dhaka | Sushi, Ramen & More | CIB',
        description: 'Master authentic Japanese cooking in Dhaka. Hands-on training for Sushi making, Ramen broths, Tempura, and plating. Ideal for chefs and hobbyists.'
      },
      hero: {
        badge: 'Specialty Certification 2026',
        heading: 'Japanese Cuisine Course in Dhaka',
        subheading: 'Learn the precise art of Japanese culinary science. Master authentic Sushi rolling, rich Ramen broths, and tempura frying.'
      },
      overview: {
        title: 'The Art of Washoku',
        text: 'Japanese cuisine is renowned for its focus on seasonality, ingredient purity, and meticulous presentation. In 2026, Japanese dining is booming in Dhaka, creating a massive demand for skilled sushi rollers and hot kitchen chefs.\n\nOur specialty short course teaches you the foundations of Japanese culinary arts. You will train directly under expert chefs who have managed high-end Japanese kitchens in 5-star hotels.'
      },
      highlights: [
        { title: 'Sushi Mastery', description: 'Maki, Nigiri, and Temaki rolling techniques with sushi rice prep.' },
        { title: '2 Weeks', description: 'Focused specialty schedule (4 intensive hands-on classes).' },
        { title: 'Ramen & Dashi', description: 'Learn to extract rich umami broths and compile authentic ramen.' },
        { title: 'Exotic Ingredients', description: 'Work with premium Nori, Gyoza wrappers, Wasabi, and Mirin.' }
      ],
      features: [
        'Hands-on slicing techniques for sashimi and sushi rolls',
        'Learn the science of dashi (Japanese stock base) extraction',
        'Master the tempura batter technique for maximum crispiness',
        'Understand traditional Japanese plating rules and aesthetics',
        'All raw ingredients and premium fish provided by CIB',
        'Accredited institutional specialty certificate awarded upon completion'
      ],
      table: {
        heading: 'Specialty Course Fee & Schedule',
        headers: ['Criteria', 'CIB Japanese Course Details'],
        rows: [
          ['Duration', '2 Weeks (4 Classes, 4 hours each)'],
          ['Total Fee', 'BDT 15,000 (All ingredients included)'],
          ['Recipes Covered', 'Sushi (Maki & Nigiri), Ramen, Gyoza, Tempura, Teriyaki'],
          ['Accreditation', 'CIB Specialty Certificate in Japanese Gastronomy']
        ]
      },
      faqs: [
        { question: 'Are ingredients like raw salmon provided in the course fee?', answer: 'Yes. CIB provides all premium fresh salmon, crab sticks, nori sheets, and specialty sauces required for the practical classes.' },
        { question: 'Is this course useful for securing jobs in international Japanese restaurants?', answer: 'Absolutely. Japanese cuisine chefs command higher salaries globally. Having certified sushi rolling skills gives you a major advantage in the Gulf and Europe.' }
      ],
      cta: {
        heading: 'Master Japanese Gastronomy',
        subheading: 'Stand out from standard cooks. Gain high-value sushi and ramen skills.',
        buttonText: 'Enroll in Specialty Course Now',
        buttonHref: '/admission'
      }
    },
    bn: {
      title: 'Japanese Cuisine Course in Dhaka | Sushi, Ramen & More | CIB',
      slug: 'japanese-cooking-course-dhaka',
      meta: {
        title: 'ঢাকায় জাপানিজ কুকিং কোর্স | সুশি, রামেন ও অন্যান্য রেসিপি | সিআইবি',
        description: 'ঢাকায় অথেন্টিক জাপানিজ রান্না শিখুন। সুশি মেকিং, রামেন ব্রথ, টেম্পুরা এবং প্লেটিংয়ের সরাসরি প্র্যাক্টিক্যাল ক্লাস। শেফ ও ভোজনরসিকদের জন্য আদর্শ।'
      },
      hero: {
        badge: 'স্পেশালিস্ট সার্টিফিকেশন ২০২৬',
        heading: 'ঢাকায় জাপানিজ কুকিং কোর্স',
        subheading: 'জাপানিজ রান্নার সূক্ষ্ম কলাকৌশল ও রন্ধনবিজ্ঞান শিখুন। অথেন্টিক সুশি রোলিং, রামেন ব্রথ এবং জাপানিজ ডিশ মেকিং।'
      },
      overview: {
        title: 'ওয়াশোকু রন্ধনশিল্পের মূল রহস্য',
        text: 'জাপানিজ খাবার তার সতেজ কাঁচামাল, পুষ্টিমান এবং শৈল্পিক পরিবেশনের জন্য বিশ্বজুড়ে সমাদৃত। ২০২৬ সালে ঢাকায় জাপানিজ রেস্টুরেন্টের জনপ্রিয়তা তুঙ্গে, যা দক্ষ সুশি মেকার ও জাপানিজ কিচেন শেফদের জন্য প্রচুর সুযোগ তৈরি করেছে।\n\nআমাদের এই স্পেশাল শর্ট কোর্সটি আপনাকে জাপানিজ রান্নার সব মৌলিক কলাকৌশল শেখাবে। ফাইভ-স্টার হোটেলের জাপানিজ কিচেন পরিচালনাকারী অভিজ্ঞ শেফদের অধীনে সরাসরি ক্যম্পাস ল্যাবে এই ক্লাসগুলো নেওয়া হয়।'
      },
      highlights: [
        { title: 'সুশি রোলিং', description: 'মাকি, নিগিরি ও তেমাকি রোলিং এবং সুশি রাইস তৈরির সঠিক পদ্ধতি।' },
        { title: '২ সপ্তাহ', description: 'স্পেশালিটি ব্যাচ শিডিউল (৪টি ইনটেনসিভ প্র্যাক্টিক্যাল ক্লাস)।' },
        { title: 'রামেন ও দাশি', description: 'অথেন্টিক রামেন সুপ ও জাপানিজ ডিশ তৈরির সিক্রেট ব্রথ রেসিপি।' },
        { title: 'প্রিমিয়াম উপাদান', description: 'আমদানিকৃত নোশি শিট, ওয়াসাবি, মিরিন ও গিওজা র‍্যাপার্স ব্যবহার।' }
      ],
      features: [
        'সাসিমি ও সুশি কাটিংয়ের জন্য প্রফেশনাল জাপানিজ নাইফ স্কিলস',
        'দাশি (জাপানিজ খাবারের বেসিক স্টক) তৈরির ব্যবহারিক ক্লাস',
        'মুচমুচে জাপানিজ টেম্পুরা ও ফ্রাইং টেকনিকস',
        'জাপানিজ ঐতিহ্যবাহী থালা সাজানো বা প্লেটিং নন্দনতত্ত্ব',
        'প্রয়োজনীয় সব সি-ফুড ও মাছ সিআইবি থেকে সরবরাহ করা হয়',
        'কোর্স শেষে জাপানিজ গ্যাস্ট্রোনমিতে বিশেষ প্রাতিষ্ঠানিক সার্টিফিকেট'
      ],
      table: {
        heading: 'জাপানিজ কালিনারি কোর্স ফি ও বিবরণ',
        headers: ['যোগ্যতা মানদণ্ড', 'সিআইবি জাপানিজ কোর্স বিবরণ'],
        rows: [
          ['কোর্সের মেয়াদ', '২ সপ্তাহ (৪টি ক্লাস, প্রতিদিন ৪ ঘণ্টা)'],
          ['মোট কোর্স ফি', '৳১৫,০০০ (সকল কাঁচামালের খরচ অন্তর্ভুক্ত)'],
          ['প্রধান রেসিপিস', 'সুশি (মাকি ও নিগিরি), রামেন, টেম্পুরা, গিওজা, তেরিয়াকি'],
          ['অনুমোদন', 'জাপানিজ গ্যাস্ট্রোনমিতে সিআইবি স্পেশালিস্ট সার্টিফিকেট']
        ]
      },
      faqs: [
        { question: 'কোর্সের জন্য প্রয়োজনীয় মাছ ও কাঁচামাল কি ফি-র মধ্যে অন্তর্ভুক্ত?', answer: 'হ্যাঁ, ক্লাসের জন্য প্রয়োজনীয় সব স্যামন মাছ, ক্র্যাব স্টিকস, নোশি শিট ও বিশেষ জাপানিজ উপাদান সিআইবি সরবরাহ করে থাকে।' },
        { question: 'এই কোর্সটি কি আন্তর্জাতিক রেস্টুরেন্টে চাকরি পেতে সাহায্য করবে?', answer: 'হ্যাঁ। বিশ্বজুড়ে জাপানিজ শেফ ও সুশি আর্ট মেকারদের বেতন সাধারণ শেফদের চেয়ে অনেক বেশি হয়। এই কোর্সটি মধ্যপ্রাচ্য ও ইউরোপের জবের জন্য অত্যন্ত কার্যকর।' }
      ],
      cta: {
        heading: 'জাপানিজ রন্ধনশিল্পের মাস্টার হোন',
        subheading: 'সাধারণ রান্নার গন্ডি ছাড়িয়ে সুশি ও রামেন মেকিংয়ের বিশেষ দক্ষতা অর্জন করুন।',
        buttonText: 'জাপানিজ স্পেশালিটি কোর্সে ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'korean-cooking-course-dhaka',
    en: {
      slug: 'korean-cooking-course-dhaka',
      meta: {
        title: 'Korean Cuisine Course in Dhaka | K-Food & BBQ | CIB',
        description: 'Learn authentic Korean cooking in Dhaka. Master Kimchi fermentation, Korean BBQ, Bulgogi, Bibimbap, and K-Street food. Professional training.'
      },
      hero: {
        badge: 'Specialty Certification 2026',
        heading: 'Korean Cuisine Course in Dhaka',
        subheading: 'Ride the Hallyu wave in the culinary world. Master the art of Kimchi fermentation, Korean BBQ grilling, Bulgogi, and Bibimbap.'
      },
      overview: {
        title: 'Master the Bold Flavors of K-Food',
        text: 'Korean cuisine has taken the global culinary scene by storm. In Dhaka, K-dramas have fueled a massive craving for authentic Korean food like Kimchi, Bulgogi, Gimbap, and Korean Fried Chicken.\n\nAt CIB, our Korean Cuisine Short Course teaches you the traditional fermentation sciences and modern street food recipes that are highly profitable for restaurants and cloud kitchens.'
      },
      highlights: [
        { title: 'Kimchi Science', description: 'Traditional fermentation of Baechu (napa cabbage) Kimchi.' },
        { title: '2 Weeks', description: 'Focused weekend and weekday classes (4 sessions).' },
        { title: 'Korean BBQ', description: 'Mastering Bulgogi marinades and table-side grilling prep.' },
        { title: 'K-Street Food', description: 'Learn Tteokbokki, Gimbap, and Korean Fried Chicken.' }
      ],
      features: [
        'Learn authentic Korean marination and fermentation methods',
        'Master the spice profiles of Gochugaru and Gochujang',
        'Hands-on preparation of Bibimbap and traditional side dishes (Banchan)',
        'Ideal for entrepreneurs launching virtual K-food brands',
        'All Korean ingredients provided by CIB',
        'Receive a recognized CIB Specialty Certificate in Korean Cuisine'
      ],
      table: {
        heading: 'Specialty Course Fee & Schedule',
        headers: ['Criteria', 'CIB Korean Course Details'],
        rows: [
          ['Duration', '2 Weeks (4 Classes, 4 hours each)'],
          ['Total Fee', 'BDT 15,000 (All ingredients included)'],
          ['Recipes Covered', 'Kimchi, Bulgogi, Bibimbap, Gimbap, Korean Fried Chicken'],
          ['Accreditation', 'CIB Specialty Certificate in Korean Cuisine']
        ]
      },
      faqs: [
        { question: 'Do you teach the fermentation process for Kimchi?', answer: 'Yes. We teach the complete science of Korean lactic acid fermentation, cabbage brining, and spice paste preparation.' },
        { question: 'Is Korean food profitable for cloud kitchens in Dhaka?', answer: 'Extremely. The target audience of K-food (Gen Z & millennials) is highly active on delivery apps, yielding high margins on street food items.' }
      ],
      cta: {
        heading: 'Ride the Korean Culinary Wave',
        subheading: 'Capitalize on the Hallyu trend by mastering authentic K-food recipes.',
        buttonText: 'Enroll in Korean Course Now',
        buttonHref: '/admission'
      }
    },
    bn: {
      title: 'Korean Cuisine Course in Dhaka | K-Food & BBQ | CIB',
      slug: 'korean-cooking-course-dhaka',
      meta: {
        title: 'ঢাকায় কোরিয়ান কুকিং কোর্স | কে-ফুড ও বারবিকিউ রেসিপি | সিআইবি',
        description: 'ঢাকায় কোরিয়ান রান্না শিখুন। কিমচি ফার্মেন্টেশন, কোরিয়ান বারবিকিউ, বুলগোগি, বিবিলবাপ এবং কে-স্ট্রিট ফুড রেসিপি তৈরির প্র্যাক্টিক্যাল ক্লাস।'
      },
      hero: {
        badge: 'স্পেশালিস্ট সার্টিফিকেশন ২০২৬',
        heading: 'ঢাকায় কোরিয়ান কুকিং কোর্স',
        subheading: 'বিশ্বজুড়ে জনপ্রিয় কোরিয়ান খাবারের মূল সিক্রেট জানুন। কিমচি তৈরি, বুলগোগি মেরিনেশন এবং অথেন্টিক কোরিয়ান রেসিপি।'
      },
      overview: {
        title: 'কোরিয়ান খাবারের বৈচিত্র্যময় স্বাদ',
        text: 'কোরিয়ান ওয়েভ (Hallyu) এবং কে-পপের প্রভাবে বাংলাদেশে কোরিয়ান খাবারের ডিমান্ড এখন তুঙ্গে। কিমচি, রামিয়ন, বিবিলবাপ ও কোরিয়ান ফ্রাইড চিকেন এখন তরুণ প্রজন্মের অন্যতম প্রিয় খাবার।\n\nসিআইবি-তে আমাদের কোরিয়ান শর্ট কোর্সটি আপনাকে কিমচি তৈরি, বুলগোগি মারিনেশন এবং কোরিয়ান স্ট্রিট ফুড রেসিপি তৈরিতে পারদর্শী করে তুলবে যা যেকোনো রেস্তোরাঁ ও হোম বিজনেসের জন্য দারুণ লাভজনক।'
      },
      highlights: [
        { title: 'কিমচি ফার্মেন্টেশন', description: 'ঐতিহ্যবাহী নাপা ক্যাবেজ কিমচি তৈরি ও সংরক্ষণের বৈজ্ঞানিক নিয়ম।' },
        { title: '২ সপ্তাহ', description: 'সংক্ষিপ্ত স্পেশালিটি শিডিউল (৪টি ব্যবহারিক প্র্যাক্টিক্যাল ক্লাস)।' },
        { title: 'কোরিয়ান বারবিকিউ', description: 'বুলগোগি ও গলবি মেরিনেশনের সঠিক মসলার অনুপাত।' },
        { title: 'কে-স্ট্রিট ফুড', description: 'তকবোক্কি (Tteokbokki), গিমবাপ ও ক্রিস্পি কোরিয়ান ফ্রাইড চিকেন।' }
      ],
      features: [
        'অথেন্টিক কোরিয়ান মেরিনেশন ও ঝাল মিষ্টি মসলার ব্যবহার',
        'গোচুজাং (Gochujang) ও গোচুগারু মরিচ পেস্টের সঠিক ব্যবহার',
        'বিবিলবাপ ও ট্র্যাডিশনাল কোরিয়ান সাইড ডিশ (Banchan) মেকিং',
        'অনলাইনে কোরিয়ান ক্লাউড কিচেন শুরু করার জন্য বিশেষ উপযোগী',
        'সব ধরণের ইমপোর্টেড কোরিয়ান সস ও উপাদান সিআইবি সরবরাহ করে',
        'কোর্স শেষে কোরিয়ান কুকিংয়ে সিআইবি স্পেশালিস্ট সার্টিফিকেট'
      ],
      table: {
        heading: 'কোরিয়ান কুকিং কোর্স ফি ও বিবরণ',
        headers: ['যোগ্যতা মানদণ্ড', 'সিআইবি কোরিয়ান কোর্স বিবরণ'],
        rows: [
          ['কোর্সের মেয়াদ', '২ সপ্তাহ (৪টি ক্লাস, প্রতিদিন ৪ ঘণ্টা)'],
          ['মোট কোর্স ফি', '৳১৫,০০০ (সকল কাঁচামালের খরচ অন্তর্ভুক্ত)'],
          ['প্রধান রেসিপিস', 'কিমচি, বুলগোগি, বিবিলবাপ, গিমবাপ, কোরিয়ান ফ্রাইড চিকেন'],
          ['অনুমোদন', 'কোরিয়ান কালিনারিতে সিআইবি স্পেশালিস্ট সার্টিফিকেট']
        ]
      },
      faqs: [
        { question: 'কিমচি কি ক্লাসেই তৈরি করা শেখানো হবে?', answer: 'হ্যাঁ। ক্লাসে শুরু থেকে নাপা ক্যাবেজ প্রসেসিং, মসলা মাখানো এবং ফারমেন্টেশন বা গেঁজানোর পুরো পদ্ধতি হাতে-কলমে শেখানো হবে।' },
        { question: 'ঢাকায় কোরিয়ান ফুডের মার্কেট কেমন?', answer: 'অত্যন্ত ভালো। কে-ড্রামার জনপ্রিয়তার কারণে ফেসবুক পেজ ও অ্যাপের মাধ্যমে কোরিয়ান খাবারের হোম ডেলিভারি ব্যবসায় চমৎকার লাভ করা যাচ্ছে।' }
      ],
      cta: {
        heading: 'কোরিয়ান রান্নার পেশাদার শেফ হোন',
        subheading: 'বিশ্বমানের রেসিপি শিখে নিজের ইউনিক অনলাইন ফুড ব্র্যান্ড চালু করুন।',
        buttonText: 'কোরিয়ান স্পেশালিটি কোর্সে ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'pizza-pasta-course-dhaka',
    en: {
      slug: 'pizza-pasta-course-dhaka',
      meta: {
        title: 'Pizza & Pasta Course in Dhaka | Italian Cooking | CIB',
        description: 'Learn the secrets of artisan Italian pizza and fresh pasta making in Dhaka. Master sourdough doughs, wood-fire techniques, and classic sauces.'
      },
      hero: {
        badge: 'Culinary Masterclass 2026',
        heading: 'Pizza & Pasta Course in Dhaka',
        subheading: 'Master the secrets of authentic Italian cuisine. Learn sourdough pizza dough fermentation, hand-rolled fresh pasta, and classic sauces.'
      },
      overview: {
        title: 'The Italian Culinary Heritage',
        text: 'Authentic Italian pizza and pasta are among the highest margin products in the restaurant industry. However, creating a perfect thin-crust Neapolitan pizza or hand-stretched fettuccine requires a deep understanding of flour hydration, yeast activity, and emulsified sauces.\n\nOur Pizza & Pasta Course teaches you these precise Italian techniques, preparing you to work in high-end Italian eateries or launch your own pizzeria.'
      },
      highlights: [
        { title: 'Sourdough Pizza', description: 'High hydration dough prep, stretching, and temperature control.' },
        { title: '2 Weeks', description: 'Intensive practical cooking labs (4 sessions).' },
        { title: 'Fresh Pasta', description: 'Hand-rolling tagliatelle, fettuccine, and filling ravioli.' },
        { title: 'Classic Sauces', description: 'Mastering Pomodoro, Pesto, Carbonara, and Alfredo.' }
      ],
      features: [
        'Hands-on flour hydration and gluten development science',
        'Learn wood-fire and high-temperature electric deck oven baking',
        'Master the emulsion techniques for classic egg yolk and cheese sauces',
        'Understand olive oil selections and fresh herb integrations',
        'All high-grade durum wheat and cheese provided by CIB',
        'Awarded a CIB Italian Culinary Specialty Certificate'
      ],
      table: {
        heading: 'Course Details & Fee Structure',
        headers: ['Criteria', 'CIB Pizza & Pasta Details'],
        rows: [
          ['Duration', '2 Weeks (4 Classes, 4 hours each)'],
          ['Total Fee', 'BDT 12,000 (All ingredients included)'],
          ['Recipes Covered', 'Neapolitan Pizza, Fresh Pasta (Tagliatelle, Ravioli), Pesto, Marinara'],
          ['Certification', 'Specialty Certificate in Italian Culinary Arts']
        ]
      },
      faqs: [
        { question: 'Do you teach how to make pizza dough from scratch?', answer: 'Yes. We teach flour selections (00 flour), yeast fermentation, dough proofing, and hand-stretching techniques (no rolling pins).' },
        { question: 'What ovens do we practice on?', answer: 'CIB labs are equipped with high-temperature commercial deck ovens that replicate wood-fired pizza environments.' }
      ],
      cta: {
        heading: 'Master the Art of Italian Cooking',
        subheading: 'Acquire high-demand skills to launch a pizzeria or work in gourmet restaurants.',
        buttonText: 'Enroll in Pizza & Pasta Course Now',
        buttonHref: '/admission'
      }
    },
    bn: {
      title: 'Pizza & Pasta Course in Dhaka | Italian Cooking | CIB',
      slug: 'pizza-pasta-course-dhaka',
      meta: {
        title: 'ঢাকায় পিৎজা ও পাস্তা মেকিং কোর্স | ইতালীয় কুকিং ট্রেনিং | সিআইবি',
        description: 'ঢাকায় ইতালীয় পিৎজা ও তাজা পাস্তা তৈরির সিক্রেট জানুন। টক-মিষ্টি সস, ওভেন সেটআপ এবং ক্লাসিক ইতালীয় রেসিপি মেকিং।'
      },
      hero: {
        badge: 'কালিনারি মাস্টারক্লাস ২০২৬',
        heading: 'ঢাকায় পিৎজা ও পাস্তা কোর্স',
        subheading: 'অথেন্টিক ইতালীয় রান্নার মাস্টার হোন। প্রফেশনাল পিৎজা ডো ফারমেন্টেশন, হ্যান্ড-রোল্ড পাস্তা এবং ঐতিহ্যবাহী সস মেকিং।'
      },
      overview: {
        title: 'ইতালীয় রান্নার ঐতিহ্য ও কৌশল',
        text: 'বিশ্বমানের ইতালীয় পিৎজা ও পাস্তা যেকোনো রেস্টুরেন্টের মেনুতে সবচেয়ে বেশি বিক্রি হওয়া লাভজনক আইটেম। তবে পারফেক্ট পাতলা ক্রাস্টের নিওপলিটান পিৎজা বা ঘরে তৈরি ফ্রেশ পাস্তা বানাতে হলে ময়দার হাইড্রেশন ও ইস্ট ফারমেন্টেশনের পদ্ধতি নির্ভুল হতে হবে।\n\nআমাদের শর্ট কোর্সটি আপনাকে ইতালীয় রান্নার সব টেকনিক হাতে-কলমে শেখাবে, যা আপনাকে ফাইন ডাইনিং ইতালীয় রেস্তোরাঁতে কাজ করতে অথবা নিজস্ব পিৎজা ক্যাফে খুলতে সাহায্য করবে।'
      },
      highlights: [
        { title: 'নিওপলিটান পিৎজা', description: 'সঠিক ডো মেকিং, হাই-হাইড্রেশন পদ্ধতি ও হাতে পিৎজা ক্রাস্ট ছড়ানো।' },
        { title: '২ সপ্তাহ', description: '৪টি নিবিড় ব্যবহারিক প্র্যাক্টিক্যাল ক্লাস সেশন।' },
        { title: 'ফ্রেশ পাস্তা মেকিং', description: 'হাতে পাস্তা রোলিং করে নুডলস ও রাভিওলি ফিলিং মেকিং।' },
        { title: 'ক্লাসিক সস মাস্টার', description: 'পোমোডোরো, পেস্টো, কার্বোনারা ও হোয়াইট সসের সিক্রেট রেসিপি।' }
      ],
      features: [
        'হাতে-কলমে ময়দা ময়ান ও গ্লুটেন ডেভলপমেন্টের সঠিক বিজ্ঞান',
        'কমার্শিয়াল হাই-টেম্পারেচার ডেক ওভেনে পিৎজা বেকিং ট্রেনিং',
        'ডিম ও পনিরের সস তৈরির নিখুঁত ইমালশন টেকনিকস',
        'এক্সট্রা ভার্জিন অলিভ অয়েল ও ফ্রেশ ভেষজের সঠিক ভারসাম্য',
        'প্রয়োজনীয় ডুরাম হুইট সুজি ও প্রিমিয়াম পনির সিআইবি থেকে সরবরাহ',
        'ইতালীয় কালিনারি আর্টসে সিআইবি স্পেশালিস্ট সার্টিফিকেট'
      ],
      table: {
        heading: 'ইতালীয় পাস্তা ও পিৎজা কোর্স বিবরণ',
        headers: ['যোগ্যতা মানদণ্ড', 'সিআইবি ইতালি কোর্স বিবরণ'],
        rows: [
          ['কোর্সের মেয়াদ', '২ সপ্তাহ (৪টি ক্লাস, প্রতিদিন ৪ ঘণ্টা)'],
          ['মোট কোর্স ফি', '৳১২,০০০ (সকল উপাদানের খরচ অন্তর্ভুক্ত)'],
          ['প্রধান রেসিপিস', 'নিওপলিটান পিৎজা, ফ্রেশ পাস্তা (Tagliatelle), পেস্টো, আলফ্রেডো সস'],
          ['অনুমোদন', 'ইতালীয় রন্ধনশিল্পে সিআইবি স্পেশালিস্ট সার্টিফিকেট']
        ]
      },
      faqs: [
        { question: 'পিৎজা ডো কি ক্লাসেই শেখানো হবে?', answer: 'হ্যাঁ। আটা মাখানো থেকে শুরু করে ইস্টের গাঁজন প্রক্রিয়া ও হাত দিয়ে পিৎজা গোল করার পুরো পদ্ধতি শেখানো হবে।' },
        { question: 'কোন ওভেনে প্র্যাক্টিস করানো হয়?', answer: 'সিআইবি ল্যাবগুলোতে অত্যাধুনিক হাই-টেম্পারেচার কমার্শিয়াল ডেক ওভেন রয়েছে যা নিওপলিটান পিৎজার জন্য পারফেক্ট।' }
      ],
      cta: {
        heading: 'ইতালীয় রান্নার শৈল্পিক শিল্প শিখুন',
        subheading: 'রেস্টুরেন্ট কোয়ালিটির পিৎজা বানিয়ে নিজের ক্যাফে শুরু করার আত্মবিশ্বাস অর্জন করুন।',
        buttonText: 'পিৎজা ও পাস্তা কোর্সে ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'baking-course-dhaka',
    en: {
      slug: 'baking-course-dhaka',
      meta: {
        title: 'Baking Course in Dhaka | Pastry, Cake & Bread | CIB',
        description: 'Professional baking course in Dhaka. Learn celebration cake decoration, French pastries, and commercial bread baking. Ideal for home bakers.'
      },
      hero: {
        badge: 'Professional Pathway 2026',
        heading: 'Baking Course in Dhaka',
        subheading: 'Master the chemistry of pastry arts and baking. Learn celebrity cake decoration, artisan breads, and classic French pastries.'
      },
      overview: {
        title: 'Baking is a Precise Science',
        text: 'Unlike general cooking, baking requires absolute precision. A difference of a few grams or degrees can ruin a recipe. In 2026, the demand for custom cakes, croissants, and artisan breads in Dhaka is higher than ever, creating excellent home business opportunities.\n\nOur Baking Course at CIB is 100% practical. You will master everything from yeast fermentation chemistry to high-end fondant and buttercream cake decorations.'
      },
      highlights: [
        { title: 'Cake Decoration', description: ' buttercream, whipping cream, and fondant cake designs.' },
        { title: '4 Weeks', description: 'Comprehensive hands-on training (8 sessions).' },
        { title: 'French Pastry', description: 'Choux pastry, éclairs, tarts, and puff pastry doughs.' },
        { title: 'Artisan Breads', description: 'Yeasted breads, dinner rolls, and pizza dough baking.' }
      ],
      features: [
        'Hands-on weight calculations using baker\'s percentage rules',
        'Learn to decorate celebration cakes from scratch',
        'Master the piping bag techniques for intricate floral designs',
        'Understand commercial bakery ovens and proofing cabinets',
        'All premium baking butter, cream, and flour provided by CIB',
        'Receive a recognized CIB Professional Baking Certification'
      ],
      table: {
        heading: 'Course Details & Fee Structure',
        headers: ['Criteria', 'CIB Baking Course Details'],
        rows: [
          ['Duration', '4 Weeks (8 Classes, 4 hours each)'],
          ['Total Fee', 'BDT 18,000 (All-inclusive, ingredients included)'],
          ['Topics Covered', 'Cake Baking & Decor, Breads, Puff Pastry, French Tarts'],
          ['Schedule', 'Fridays & Saturdays / Weekday option']
        ]
      },
      faqs: [
        { question: 'Do I need to buy any baking tools for the course?', answer: 'No. CIB provides all piping bags, cake boards, ovens, and baking ingredients during the practical classes.' },
        { question: 'Can I start a home baking business after this course?', answer: 'Yes. Most CIB baking graduates launch custom cake brands immediately, earning BDT 30k-50k per month from home.' }
      ],
      cta: {
        heading: 'Become a Certified Baker',
        subheading: 'Turn your passion for baking into a highly profitable home business.',
        buttonText: 'Enroll in Baking Course Now',
        buttonHref: '/admission'
      }
    },
    bn: {
      title: 'Baking Course in Dhaka | Pastry, Cake & Bread | CIB',
      slug: 'baking-course-dhaka',
      meta: {
        title: 'ঢাকায় বেকিং কোর্স | প্রফেশনাল পেস্ট্রি, কেক ও ব্রেড মেকিং | সিআইবি',
        description: 'ঢাকায় প্রফেশনাল বেকিং কোর্স। কাস্টমাইজড কেক ডেকোরেশন, ফ্রেঞ্চ পেস্ট্রি এবং কমার্শিয়াল পাউরুটি তৈরির প্র্যাক্টিক্যাল ক্লাস। হোম বেকারদের জন্য সেরা।'
      },
      hero: {
        badge: 'পেশাদার পাথওয়ে ২০২৬',
        heading: 'ঢাকায় বেকিং কোর্স',
        subheading: 'বেকিং ও পেস্ট্রি আর্টসের রাসায়নিক রসায়ন ও বিজ্ঞান শিখুন। কাস্টম কেক ডেকোরেশন, আর্ট অ্যান্ড ক্রাফট ব্রেড ও ফ্রেঞ্চ ডেজার্ট।'
      },
      overview: {
        title: 'বেকিং হলো একটি নিখুঁত রন্ধনবিজ্ঞান',
        text: 'সাধারণ রান্নার চেয়ে বেকিং একেবারেই আলাদা, যেখানে পরিমাপের সামান্য হেরফের রেসিপি নষ্ট করে দিতে পারে। ২০২৬ সালে ঢাকায় কাস্টমাইজড থিম কেক ও ইউরোপীয় পেস্ট্রির চাহিদা তুঙ্গে, যা বেকারদের জন্য লাভজনক হোম বিজনেস বা ওভেন কিচেন গড়ার বিশাল সুযোগ দিচ্ছে।\n\nসিআইবি-র প্রফেশনাল বেকিং কোর্সটি ১০০% প্র্যাকটিক্যাল ল্যাব-ভিত্তিক। ইস্ট ও বাটারের গাঁজন পদ্ধতি থেকে শুরু করে প্রফেশনাল ফন্ডেন্ট কেক ডেকোরেশন ডিজাইন এখানে শেখানো হয়।'
      },
      highlights: [
        { title: 'কেক ডেকোরেশন', description: 'বাটারক্রিম, হুইপিং ক্রিম ও ফন্ডেন্ট থিম কেকের প্রফেশনাল আর্ট।' },
        { title: '৪ সপ্তাহ', description: '৮টি প্র্যাক্টিক্যাল ব্যবহারিক ল্যাব ক্লাস সেশন।' },
        { title: 'ফ্রেঞ্চ পেস্ট্রি', description: 'শু পেস্ট্রি (Choux), এক্লেয়ার (Eclairs) ও প্রফেশনাল পাফ পেস্ট্রি ডো।' },
        { title: 'বাণিজ্যিক পাউরুটি', description: 'রেস্টুরেন্ট স্টাইল ডিনার রোল, সুইট ব্রেড ও পাউরুটি বেকিং।' }
      ],
      features: [
        'বেকার্স পারসেন্টেজ নিয়ম অনুযায়ী প্রতিটি উপাদানের গ্রাম পরিমাপ',
        'শূন্য থেকে কেক বেকিং ও ডেকোরেশনের বাস্তবসম্মত ক্লাস',
        'নরম ও স্পঞ্জি কেকের সিক্রেট রেসিপি টেকনিক',
        'কমার্শিয়াল ওভেন ও প্রুফার কেবিনের সঠিক ব্যবহার',
        'প্রয়োজনীয় সব প্রিমিয়াম মাখন, ক্রিম ও চকোলেট সিআইবি থেকে সরবরাহ',
        'কোর্স শেষে পেশাদার বেকিংয়ে সিআইবি ভেরিফাইড সার্টিফিকেট'
      ],
      table: {
        heading: 'বেকিং কোর্সের বিবরণ ও ফি কাঠামো',
        headers: ['যোগ্যতা মানদণ্ড', 'সিআইবি বেকিং কোর্স বিবরণ'],
        rows: [
          ['কোর্সের মেয়াদ', '৪ সপ্তাহ (৮টি ক্লাস, প্রতিদিন ৪ ঘণ্টা)'],
          ['মোট কোর্স ফি', '৳১৮,০০০ (এককালীন, সকল মালামালের খরচ অন্তর্ভুক্ত)'],
          ['প্রধান মডিউল', 'কেক বেকিং ও ডেকোরেশন, পাউরুটি, পাফ পেস্ট্রি, ফরাসি টার্ট'],
          ['ক্লাস সময়সূচী', 'শুক্রবার ও শনিবার অথবা সপ্তাহের অন্যান্য দিন']
        ]
      },
      faqs: [
        { question: 'ক্লাসের জন্য কি কোনো বেকিং টুলস কিনতে হবে?', answer: 'না। ক্লাসের জন্য প্রয়োজনীয় পাইপিং ব্যাগ, কেক বোর্ড, ওভেন ও সমস্ত কাঁচামাল সিআইবি প্রোভাইড করবে।' },
        { question: 'কোর্স শেষে কি নিজের বিজনেস শুরু করা সম্ভব?', answer: 'হ্যাঁ। আমাদের অনেক শিক্ষার্থী কোর্স শেষ করেই থিম কেক ও পেস্ট্রির কাস্টম ফেসবুক পেজ খুলে মাসে ৩০-৫০ হাজার টাকা আয় করছেন।' }
      ],
      cta: {
        heading: 'একজন সার্টিফাইড পেস্ট্রি শেফ হোন',
        subheading: 'আপনার বেকিংয়ের প্যাশনকে একটি লাভজনক হোম বিজনেসে রূপান্তর করুন।',
        buttonText: 'বেকিং কোর্সে ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'culinary-institute-comparison-bangladesh',
    en: {
      slug: 'culinary-institute-comparison-bangladesh',
      meta: {
        title: 'Culinary Institute Comparison in Bangladesh 2026 | Choose the Best',
        description: 'Detailed analysis and comparison of top culinary institutes in Bangladesh for 2026. Evaluate accreditation, kitchen facilities, and placement records.'
      },
      hero: {
        badge: 'Industry Analysis 2026',
        heading: 'Culinary Institute Comparison',
        subheading: 'Make an informed decision for your career. Compare CIB with ordinary cooking schools on credentials, kitchen size, and job assistance.'
      },
      overview: {
        title: 'How to Choose the Best Culinary Academy',
        text: 'Entering the culinary profession is a significant investment of time and capital. In 2026, many ordinary training centers operate out of domestic kitchens without government accreditation or experienced mentors.\n\nTo help you evaluate, this comparison details the exact parameters you must check—such as National Skills Development Authority (NSDA) alignments, ISO-HACCP compliance, and placement records.'
      },
      highlights: [
        { title: 'Accreditation check', description: 'Ensure the institute is registered under the prime minister\'s office (NSDA).' },
        { title: 'Facility Size', description: 'A proper training center must have commercial-grade hot and cold kitchen labs.' },
        { title: 'Mentors Experience', description: 'Verify that mentors have served as executive chefs in 5-star hotels.' },
        { title: 'Internship Success', description: 'Choose academies with verified placement support in luxury hotel chains.' }
      ],
      features: [
        'CIB: 2,000 sq. ft. commercial kitchen lab in Dhaka',
        'Ordinary Centers: Small domestic home kitchen setups',
        'CIB: NSDA and ISO-HACCP certified curriculum',
        'Ordinary Centers: Private unaccredited local certificates',
        'CIB: Mentorship by 5-star Executive Chef Dewan Ismail',
        'Ordinary Centers: Non-professional domestic cook instructors',
        'CIB: Verified recruitment links with Westin, Radisson, and Gulf hotels'
      ],
      table: {
        heading: 'Detailed Parameters Comparison Table',
        headers: ['Feature / Parameter', 'CIB Professional Academy', 'Ordinary Local Centers'],
        rows: [
          ['Government Accreditation', 'Approved by NSDA (Level 2 & 3)', 'Unapproved / Unaccredited'],
          ['Food Safety Standard', 'ISO-HACCP Food Safety Training', 'Basic domestic cleanliness only'],
          ['Mentorship Level', '5-Star Executive Chefs', 'Domestic cooks / hobbyist instructors'],
          ['Recipes and Cuisines', '120+ Recipes, 16+ Cuisines', '20-30 basic local recipes'],
          ['Internship Placements', '100% conditional placement support', 'No internship support']
        ]
      },
      faqs: [
        { question: 'Why is NSDA accreditation important for visas?', answer: 'NSDA is the government apex body. Foreign embassies and visa centers verify NSDA certificates to process skilled worker culinary visas.' },
        { question: 'How do I check if an institute is genuinely accredited?', answer: 'You can verify their registration number on the official NSDA online portal. CIB\'s accreditation is public and easily verifiable.' }
      ],
      cta: {
        heading: 'Choose the Standard of Excellence',
        subheading: 'Do not waste money on non-professional courses. Secure your career with the best.',
        buttonText: 'Start Your Professional Journey',
        buttonHref: '/admission'
      }
    },
    bn: {
      title: 'Culinary Institute Comparison in Bangladesh 2026 | Choose the Best',
      slug: 'culinary-institute-comparison-bangladesh',
      meta: {
        title: 'বাংলাদেশে সেরা কালিনারি ইনস্টিটিউট তুলনা ২০২৬ | সিআইবি বনাম অন্যান্য',
        description: '২০২৬ সালে বাংলাদেশের শীর্ষস্থানীয় কালিনারি ইনস্টিটিউটগুলোর তুলনামূলক আলোচনা। কাজের সুযোগ, ল্যাব সাইজ এবং সরকারি স্বীকৃতির যাচাইকরণ।'
      },
      hero: {
        badge: 'ইন্ডাস্ট্রি বিশ্লেষণ ২০২৬',
        heading: 'কালিনারি ইনস্টিটিউট তুলনা',
        subheading: 'আপনার ক্যারিয়ারের জন্য সঠিক সিদ্ধান্ত নিন। অনুমোদন সনদ, কিচেন ল্যাব এবং প্লেসমেন্ট সফলতায় সিআইবি-র সাথে অন্যান্যদের তুলনা।'
      },
      overview: {
        title: 'সঠিক কালিনারি একাডেমি বেছে নেওয়ার নিয়মাবলী',
        text: 'কালিনারি আর্টস শেখা আপনার ক্যারিয়ারের জন্য একটি বড় বিনিয়োগ। ২০২৬ সালে বাংলাদেশে অনেক সাধারণ রান্নার স্কুল ঘরোয়া কিচেনে কোনো সরকারি অনুমোদন বা ফাইভ-স্টার এক্সিকিউটিভ শেফ মেন্টর ছাড়াই কার্যক্রম চালাচ্ছে।\n\nআপনার সুবিধার্থে এই তুলনামূলক গাইডটি তৈরি করা হয়েছে যাতে আপনি জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ (NSDA) নিবন্ধন, আইএসও সেফটি স্ট্যান্ডার্ড এবং হোটেল ইন্টার্নশিপের মতো বিষয়গুলো যাচাই করতে পারেন।'
      },
      highlights: [
        { title: 'অনুমোদন যাচাই', description: 'নিশ্চিত করুন প্রতিষ্ঠানটি প্রধানমন্ত্রীর কার্যালয়ের (NSDA) অধীন নিবন্ধিত কিনা।' },
        { title: 'কিচেন সাইজ', description: 'প্রফেশনাল কিচেনে অবশ্যই কমার্শিয়াল বার্নার ও স্টিল কাউন্টার থাকতে হবে।' },
        { title: 'শেফদের অভিজ্ঞতা', description: 'চেক করুন মেন্টররা ফাইভ-স্টার হোটেলে এক্সিকিউটিভ শেফ হিসেবে কাজ করেছেন কিনা।' },
        { title: 'ইন্টার্নশিপ রেকর্ড', description: 'র‌্যাডিসন বা ওয়েস্টিনের মতো বিলাসবহুল হোটেলে প্লেসমেন্ট প্রদানের ক্ষমতা।' }
      ],
      features: [
        'সিআইবি: ঢাকার ধানমন্ডিতে ২০০০ বর্গফুটের কমার্শিয়াল কিচেন ল্যাব',
        'অন্যান্য সেন্টার: ঘরোয়া সাধারণ রান্নাঘর সেটআপ',
        'সিআইবি: এনএসডিএ এবং আইএসও-এইচএসিসিপি অনুমোদিত সিলেবাস',
        'অন্যান্য সেন্টার: সাধারণ ঘরোয়া আনসার্টিফাইড সনদ',
        'সিআইবি: ৫-স্টার এক্সিকিউটিভ শেফ দেওয়ান ইসমাইলের সরাসরি মেন্টরশিপ',
        'অন্যান্য সেন্টার: সাধারণ গৃহিণী বা রান্নার লোক দ্বারা ক্লাস পরিচালনা',
        'সিআইবি: ওয়েস্টিন, র‌্যাডিসন ও ক্রুজলাইনের সাথে সরাসরি ইন্টার্নশিপ লিংক'
      ],
      table: {
        heading: 'বিস্তারিত তুলনামূলক বিবরণী',
        headers: ['যোগ্যতা মানদণ্ড', 'সিআইবি কালিনারি একাডেমি', 'সাধারণ লোকাল সেন্টার'],
        rows: [
          ['সরকারি অনুমোদন', 'এনএসডিএ (লেভেল ২ ও ৩) অনুমোদিত', 'অননুমোদিত / সাধারণ লোকাল সাইন'],
          ['খাদ্য নিরাপত্তা স্ট্যান্ডার্ড', 'আইএসও-এইচএসিসিপি সেফটি ম্যাপ', 'শুধু মৌলিক পরিচ্ছন্নতা নির্দেশিকা'],
          ['মেন্টরশিপ কোয়ালিটি', '৫-তারকা হোটেলের এক্সিকিউটিভ শেফ', 'ঘরোয়া রাঁধুনি / শৌখিন রাঁধুনি'],
          ['রেসিপি ও কুইজিন', '১২০+ রেসিপি, ১৬+ আন্তর্জাতিক কুইজিন', '২০-৩০টি ঘরোয়া বাংলা খাবার'],
          ['ইন্টার্নশিপ নিশ্চয়তা', '১০০% শর্তসাপেক্ষ প্লেসমেন্ট সাপোর্ট', 'কোনো প্লেসমেন্ট বা ইন্টার্নশিপ সাপোর্ট নেই']
        ]
      },
      faqs: [
        { question: 'ভিসার জন্য এনএসডিএ (NSDA) অনুমোদন কেন জরুরি?', answer: 'এনএসডিএ হলো সরকারি শিক্ষা বোর্ড। বিদেশী দূতাবাসগুলো কাজের ভিসা প্রদানের পূর্বে এনএসডিএ সনদ অনলাইন পোর্টাল থেকে ভেরিফাই করে।' },
        { question: 'প্রতিষ্ঠানের সরকারি স্বীকৃতি কীভাবে চেক করব?', answer: 'জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষের অফিশিয়াল ওয়েবসাইট থেকে যেকোনো রেজিস্টার্ড ট্রেইনিং সেন্টারের তালিকা ও কোড চেক করা যায়।' }
      ],
      relatedLinks: [
        { text: "পেশাদার শেফ হওয়ার গাইড", url: "/blog/how-to-become-a-professional-chef-bangladesh" }
      ],
      cta: {
        heading: 'সেরা কালিনারি মানদণ্ড বেছে নিন',
        subheading: 'অস্বীকৃত জায়গায় ভর্তি হয়ে অর্থ নষ্ট করবেন না। আপনার গ্লোবাল ক্যারিয়ার গড়ুন সিআইবি-র সাথে।',
        buttonText: 'আপনার ক্যারিয়ার যাত্রা শুরু করুন',
        buttonHref: '/admission'
      }
    }
  }
];

// Write child pages data
shortCoursesData.forEach(page => {
  fs.writeFileSync(
    path.join(CONTENT_DIR_EN, `${page.slug}.json`),
    JSON.stringify(page.en, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(CONTENT_DIR_BN, `${page.slug}.json`),
    JSON.stringify(page.bn, null, 2),
    'utf8'
  );
});

// Also write Hub Page JSON files
const hubDataEn = {
  slug: 'short-courses',
  meta: {
    title: 'Short Culinary Courses in Dhaka | Quick Professional Training | CIB',
    description: 'Explore CIB short culinary courses in Dhaka. Intensive 2 to 4-week certificate programs in Sushi rolling, Korean BBQ, Baking, and Sourdough pizza.'
  },
  hero: {
    badge: 'Express Professional Training 2026',
    heading: 'Short Culinary Courses in Dhaka',
    subheading: 'Acquire high-demand specialty skills in under 4 weeks. Ideal for home bakers, chefs expanding their menu, and food entrepreneurs.'
  },
  overview: {
    title: 'Acquire Niche Culinary Mastery',
    text: 'A full-term culinary diploma is a major commitment. If you are a specialized food entrepreneur, housewife, or working professional seeking specific skills, our short courses provide intensive hands-on execution without the fluff.\n\nOur kitchen labs in Dhanmondi run specialized batches led by industry veterans. Learn authentic international standards, ISO-HACCP hygiene, and ingredient costing.'
  },
  highlights: [
    { title: 'Specialty Skills', description: 'Sushi rolling, Korean Bulgogi, Sourdough Pizza, Artisan Cakes.' },
    { title: '2-4 Weeks', description: 'Fast-paced, high-velocity practical programs.' },
    { title: 'High Margins', description: 'Learn commercial costing to maximize food business profits.' },
    { title: 'Bilingual Classes', description: 'Bilingual support (English & Bengali) for easy learning.' }
  ],
  features: [
    'Artisan Sourdough Pizza & Pasta Course (2 Weeks)',
    'Specialty Japanese Gastronomy & Sushi Course (2 Weeks)',
    'Authentic Korean K-Food & BBQ Course (2 Weeks)',
    'Professional Baking, Bread & Celebration Cake Course (4 Weeks)',
    'Cooking Course for Housewives & Small Cloud Kitchens (4 Weeks)',
    '100% hands-on practical classes with all raw ingredients provided'
  ],
  table: {
    heading: 'Short Course Fees & Duration Comparison',
    headers: ['Specialty Course', 'Duration', 'Total Course Fee (BDT)', 'Key Recipes Covered'],
    rows: [
      ['Japanese Cooking (Sushi & Ramen)', '2 Weeks (4 Classes)', 'BDT 15,000', 'Maki, Nigiri, Ramen, Tempura, Gyoza'],
      ['Korean Cooking (K-Food & BBQ)', '2 Weeks (4 Classes)', 'BDT 15,000', 'Kimchi, Bulgogi, Bibimbap, Gimbap'],
      ['Pizza & Pasta (Italian Arts)', '2 Weeks (4 Classes)', 'BDT 12,000', 'Neapolitan Pizza, Fresh Tagliatelle'],
      ['Baking & Celebration Cakes', '4 Weeks (8 Classes)', 'BDT 18,000', 'Fondant Cake, French Pastries, Artisan Bread'],
      ['Cooking Course for Home Chefs', '4 Weeks (8 Classes)', 'BDT 12,500', 'Appetizers, Bengali & Chinese Entrees']
    ]
  },
  faqs: [
    { question: 'What is the schedule for these short courses?', answer: 'We offer weekend-only classes (Friday/Saturday) for busy professionals, as well as weekday afternoon options.' },
    { question: 'Do I get a certificate after completing a short course?', answer: 'Yes. CIB awards a Specialty Institutional Certificate upon successful completion and recipe testing.' },
    { question: 'How do I register for a class?', answer: 'You can submit an online application via our Admission portal or visit our Dhanmondi campus to secure your seat.' }
  ],
  cta: {
    heading: 'Upgrade Your Culinary Portfolio',
    subheading: 'Enroll in Month Three batches. Limited seats per specialty kitchen table.',
    buttonText: 'Register for Short Course Now',
    buttonHref: '/admission'
  }
};

const hubDataBn = {
  slug: 'short-courses',
  meta: {
    title: 'Short Culinary Courses in Dhaka | Quick Professional Training | CIB',
    description: 'ঢাকায় সিআইবি-র বিশেষ কালিনারি শর্ট কোর্সসমূহ। ২ থেকে ৪ সপ্তাহের প্রফেশনাল সুশি মেকিং, কোরিয়ান বারবিকিউ, বেকিং এবং পিৎজা-পাস্তা মেকিং ট্রেনিং।'
  },
  hero: {
    badge: 'এক্সপ্রেস প্রফেশনাল ট্রেনিং ২০২৬',
    heading: 'ঢাকায় কালিনারি শর্ট কোর্সসমূহ',
    subheading: 'মাত্র ৪ সপ্তাহের মধ্যে অর্জন করুন বিশেষ রান্নার দক্ষতা। হোম বেকার, নতুন শেফ এবং ফুড বিজনেস উদ্যোক্তাদের জন্য বিশেষ উপযোগী।'
  },
  overview: {
    title: 'নির্দিষ্ট কালিনারি দক্ষতা অর্জন করুন',
    text: 'একটি দীর্ঘমেয়াদী ডিপ্লোমা কোর্স করা সবার জন্য সম্ভব হয় না। আপনি যদি নির্দিষ্ট কোনো খাবার তৈরির নিখুঁত দক্ষতা অর্জন করতে চান বা নিজের ক্যাফে/হোম বিজনেসের জন্য নতুন মেনু যোগ করতে চান, তবে আমাদের শর্ট কোর্সগুলো আপনার জন্য আদর্শ।\n\nধানমন্ডির অত্যাধুনিক প্র্যাক্টিক্যাল কিচেনে অভিজ্ঞ শেফদের অধীনে সরাসরি হাতে-কলমে ক্লাস নেওয়া হয়। আন্তর্জাতিক রেসিপি মানদণ্ড ও ফুড কস্টিংয়ের মতো ব্যবসায়িক খুঁটিনাটি এখানে খুব সহজে শেখানো হয়।'
  },
  highlights: [
    { title: 'বিশেষ দক্ষতা', description: 'সুশি রোলিং, কোরিয়ান বুলগোগি, ইতালিয়ান পিৎজা ও আর্ট কেক।' },
    { title: '২-৪ সপ্তাহ', description: 'দ্রুত সম্পন্ন হওয়ার মতো ইনটেনসিভ প্র্যাক্টিক্যাল কোর্স।' },
    { title: 'উচ্চ মুনাফা', description: 'খাবারের কস্টিং ও বর্জ্য কমানোর কমার্শিয়াল টেকনিক।' },
    { title: 'দ্বিভাষিক ক্লাস', description: 'ইংরেজি ও বাংলা উভয় ভাষায় মেন্টরশিপ সুবিধা।' }
  ],
  features: [
    'ইতালিয়ান পিৎজা ও পাস্তা মেকিং কোর্স (২ সপ্তাহ)',
    'জাপানিজ কুকিং ও সুশি রোলিং কোর্স (২ সপ্তাহ)',
    'কোরিয়ান ফুড ও বারবিকিউ কুকিং কোর্স (২ সপ্তাহ)',
    'প্রফেশনাল বেকিং, পেস্ট্রি ও কেক ডেকোরেশন কোর্স (৪ সপ্তাহ)',
    'গৃহিণী ও ছোট ক্লাউড কিচেন কুকিং কোর্স (৪ সপ্তাহ)',
    '১০০% ব্যবহারিক প্র্যাক্টিক্যাল ক্লাস এবং সকল কাঁচামাল ইনস্টিটিউট থেকে সরবরাহ'
  ],
  table: {
    heading: 'শর্ট কোর্স ফি এবং মেয়াদের তুলনা বিবরণী',
    headers: ['কোর্সের নাম', 'মেয়াদকাল', 'সর্বমোট কোর্স ফি (BDT)', 'প্রধান প্রধান রেসিপিস'],
    rows: [
      ['জাপানিজ কুকিং (সুশি ও রামেন)', '২ সপ্তাহ (৪টি ক্লাস)', '৳১৫,০০০', 'মাকি সুশি, নিগিরি, রামেন, গিওজা'],
      ['কোরিয়ান কুকিং (কে-ফুড ও বিবি কিউ)', '২ সপ্তাহ (৪টি ক্লাস)', '৳১৫,০০০', 'কিমচি, বুলগোগি, বিবিলবাপ, গিমবাপ'],
      ['পিৎজা ও পাস্তা (ইতালীয় রন্ধনশিল্প)', '২ সপ্তাহ (৪টি ক্লাস)', '৳১২,০০০', 'নিওপলিটান পিৎজা, ফ্রেশ পাস্তা'],
      ['বেকিং ও কাস্টম কেক ডেকোরেশন', '৪ সপ্তাহ (৮টি ক্লাস)', '৳১৮,০০০', 'ফন্ডেন্ট কেক, ফ্রেঞ্চ পেস্ট্রি, টার্টস'],
      ['হোম শেফ ও কুকিং ট্রেইনিং', '৪ সপ্তাহ (৮টি ক্লাস)', '৳১২,৫০০', 'এপেটাইজার, কন্টিনেন্টাল ও চাইনিজ খাবার']
    ]
  },
  faqs: [
    { question: 'শর্ট কোর্সগুলোর ক্লাস কখন নেওয়া হয়?', answer: 'চাকুরিজীবী ও ছাত্রদের সুবিধার্থে শুধুমাত্র সাপ্তাহিক ছুটির দিনে (শুক্রবার ও শনিবার) এবং সাধারণ দিনগুলোর বিকেলে ক্লাস অফার করা হয়।' },
    { question: 'কোর্স শেষে কি সার্টিফিকেট দেওয়া হবে?', answer: 'হ্যাঁ। প্রতিটি শর্ট কোর্স সফলভাবে সম্পন্ন ও রেসিপি টেস্ট পাসের পর সিআইবি-র পক্ষ থেকে বিশেষ প্রাতিষ্ঠানিক সার্টিফিকেট প্রদান করা হবে।' },
    { question: 'ভর্তির জন্য কীভাবে আবেদন করতে হবে?', answer: 'অনলাইনে আমাদের অ্যাডমিশন পোর্টালের মাধ্যমে আবেদন করতে পারেন অথবা সরাসরি আমাদের ধানমন্ডি ক্যাম্পাসে এসে সিট বুকিং দিতে পারেন।' }
  ],
  cta: {
    heading: 'আপনার রন্ধনশিল্পের দক্ষতা আরও বাড়ান',
    subheading: 'নতুন ব্যাচের ভর্তি চলছে। আসন সংখ্যা অত্যন্ত সীমিত।',
    buttonText: 'শর্ট কোর্সে ভর্তি হোন',
    buttonHref: '/admission'
  }
};

fs.writeFileSync(
  path.join(CONTENT_DIR_EN, 'short-courses.json'),
  JSON.stringify(hubDataEn, null, 2),
  'utf8'
);
fs.writeFileSync(
  path.join(CONTENT_DIR_BN, 'short-courses.json'),
  JSON.stringify(hubDataBn, null, 2),
  'utf8'
);

console.log('Successfully generated all 14 short-course JSON files.');

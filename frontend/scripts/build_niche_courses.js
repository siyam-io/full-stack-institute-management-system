const fs = require('fs');
const path = require('path');

const pages = [
  {
    slug: 'sushi-course-dhaka',
    en: {
      slug: 'sushi-course-dhaka',
      meta: {
        title: 'Sushi Making Course in Dhaka | Japanese Cuisine | CIB',
        description: 'Learn the art of authentic Japanese sushi making in Dhaka. Master sushi rice preparation, rolling Maki, Nigiri, Temaki, and premium plating. Hands-on training.'
      },
      hero: {
        badge: 'Specialty Masterclass 2026',
        heading: 'Sushi Making Course in Dhaka',
        subheading: 'Learn the precise art of Japanese sushi from 5-star master chefs. 100% hands-on practical training in rolling and presentation.'
      },
      overview: {
        title: 'The Precision of Sushi Craft',
        text: 'Sushi is a global culinary sensation, and professional sushi rollers are highly sought after by luxury hotels and premium restaurants in Bangladesh and abroad. This specialty short course focuses entirely on the traditional techniques of Washoku, specifically the art of sushi.\n\nFrom washing, cooking, and vinegar-seasoning the perfect sushi rice (Shari) to masterfully slicing raw salmon and tuna, you will learn the exact steps required to create restaurant-grade sushi.'
      },
      highlights: [
        { title: 'Sushi Rice Science', description: 'Mastering vinegar seasoning, cooling, and rice texture.' },
        { title: '4 Roll Styles', description: 'Maki, Nigiri, Temaki, and Uramaki rolling techniques.' },
        { title: 'Sashimi Slicing', description: 'Learn professional knife skills for slicing fresh fish.' },
        { title: 'Premium Ingredients', description: 'Work with grade-A Nori, Salmon, Wasabi, and Gari.' }
      ],
      features: [
        'Hands-on rice preparation and cooking temperature control',
        'Traditional bamboo mat rolling and cutting techniques',
        'Plating aesthetics and dynamic presentation formats',
        'Handling fresh raw seafood and sanitation safety',
        'Ingredient sourcing guides for local and imported materials',
        'Accredited specialty certificate awarded upon completion'
      ],
      table: {
        heading: 'Course Details & Intake Info',
        headers: ['Criteria', 'Course Specifications'],
        rows: [
          ['Duration', '2 Weeks (4 Intensive Hands-on Classes)'],
          ['Total Fee', 'BDT 12,000 (All premium ingredients included)'],
          ['Accreditation', 'CIB Specialty Certificate in Japanese Gastronomy'],
          ['Eligibility', 'Age 16+ with basic kitchen interest. No prior chef experience required.']
        ]
      },
      faqs: [
        { question: 'Do I need to buy ingredients like salmon myself?', answer: 'No. CIB provides all raw materials including fresh salmon, nori sheets, crab sticks, and specialty sushi rice for all practical sessions.' },
        { question: 'Will this course help me start a business?', answer: 'Yes. Sushi businesses have high-profit margins in Dhaka. We cover portion costing and commercial presentation styles designed for restaurant owners.' }
      ],
      cta: {
        heading: 'Master the Art of Sushi Rolling',
        subheading: 'Upgrade your culinary skills and stand out as a certified specialty chef.',
        buttonText: 'Secure Your Seat Now',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'sushi-course-dhaka',
      meta: {
        title: 'ঢাকায় সুশি তৈরির কোর্স | জাপানিজ কুইজিন ট্রেনিং | সিআইবি',
        description: 'ঢাকায় প্রফেশনাল সুশি তৈরির কোর্স। জাপানিজ সুশি রাইস প্রস্তুতকরণ, মাকি ও নিগিরি রোলিং এবং চমৎকার প্লাটিং শিখুন সশরীরে। শতভাগ প্র্যাকটিক্যাল ক্লাস।'
      },
      hero: {
        badge: 'স্পেশালিটি মাস্টারক্লাস ২০২৬',
        heading: 'ঢাকায় সুশি তৈরির কোর্স',
        subheading: 'অভিজ্ঞ জাপানিজ কুইজিন শেফদের অধীনে সুশি রোলিং-এর সূক্ষ্ম কলাকৌশল শিখুন। শতভাগ ব্যবহারিক প্রশিক্ষণ ও পরিবেশন।'
      },
      overview: {
        title: 'সুশি তৈরির নিখুঁত শিল্প',
        text: 'সুশি এখন একটি বৈশ্বিক আকর্ষণ এবং বাংলাদেশ ও বিদেশে সুশি মেকারদের বেশ ভালো চাহিদা রয়েছে। এই স্পেশালিটি শর্ট কোর্সটি মূলত ঐতিহ্যবাহী জাপানিজ রান্নার পদ্ধতি ও সুশি তৈরির কৌশলের ওপর ভিত্তি করে তৈরি।\n\nভিনেগার সহযোগে সুশি রাইস প্রস্তুত করা থেকে শুরু করে প্রফেশনাল স্যামন স্লাইস ও চমৎকার ডেকোরেশন — সবই এই কোর্সে হাতে-কলমে শেখানো হবে।'
      },
      highlights: [
        { title: 'সুশি রাইস বিজ্ঞান', description: 'ভিনেগার প্রিপারেশন, কুলিং এবং রাইসের সঠিক টেক্সচার তৈরি।' },
        { title: '৪ ধরনের সুশি রোল', description: 'মাকি, নিগিরি, তেমাকি এবং উরামাকি রোলিং কৌশল।' },
        { title: 'সাশিমি স্লাইসিং', description: 'তাজা মাছ নিখুঁতভাবে কাটার প্রফেশনাল নাইফ স্কিলস।' },
        { title: 'প্রিমিয়াম ইনগ্রেডিয়েন্টস', description: 'গ্রেড-এ নোড়ি শিট, স্যামন, ওয়াসাবি ও গারির বাস্তব ব্যবহার।' }
      ],
      features: [
        'হাতে-কলমে সুশি রাইস প্রস্তুত ও তাপমাত্রা নিয়ন্ত্রণ',
        'ঐতিহ্যবাহী বাঁশের ম্যাট ব্যবহার করে রোলিং ও কাটিং আর্ট',
        'সুশির দৃষ্টিনন্দন প্লেটিং ও ডেকোরেশন টেকনিক',
        'তাজা সামুদ্রিক মাছ স্টোরিং ও হাইজিন প্রটোকল',
        'সুশি তৈরির প্রয়োজনীয় দেশি-বিদেশি উপাদান সোর্সিং গাইড',
        'সফলভাবে কোর্স সম্পন্ন করার পর বিশেষ একাডেমি সার্টিফিকেট'
      ],
      table: {
        heading: 'কোর্স বিবরণী ও ভর্তি সংক্রান্ত তথ্য',
        headers: ['যোগ্যতা মানদণ্ড', 'বিস্তারিত বিবরণ'],
        rows: [
          ['কোর্সের মেয়াদ', '২ সপ্তাহ (৪টি প্র্যাকটিক্যাল ক্লাস)'],
          ['মোট ফি', '১২,০০০ টাকা (সব উপাদান ইনস্টিটিউট থেকে দেওয়া হবে)'],
          ['অনুমোদন সনদ', 'জাপানিজ গ্যাস্ট্রোনমিতে সিআইবি স্পেশাল সার্টিফিকেট'],
          ['ভর্তির যোগ্যতা', 'ন্যূনতম ১৬ বছর বয়স। রান্নার পূর্ব অভিজ্ঞতার প্রয়োজন নেই।']
        ]
      },
      faqs: [
        { question: 'আমাকে কি মাছ বা রাইস আলাদা কিনে আনতে হবে?', answer: 'না। কোর্সে প্রয়োজনীয় মাছ, নোড়ি শিট ও রাইসসহ সমস্ত উপকরণের খরচ কোর্স ফি-র মধ্যে অন্তর্ভুক্ত রয়েছে।' },
        { question: 'সুশি নিয়ে কি হোম ক্লাউড কিচেন শুরু করা সম্ভব?', answer: 'হ্যাঁ। বর্তমানে ঢাকায় সুশির ব্যাপক চাহিদা রয়েছে। কস্টিং মডিউলে আমরা কীভাবে লাভজনক উপায়ে সুশি মেনু ডিজাইন করা যায় তা বিস্তারিত শিখিয়ে থাকি।' }
      ],
      cta: {
        heading: 'সুশি তৈরির প্রফেশনাল টেকনিক শিখুন',
        subheading: 'আপনার রন্ধনশিল্পের দক্ষতা বাড়িয়ে নিন জাপানিজ সুশির বিশ্বস্ত একাডেমি সার্টিফিকেটের সাথে।',
        buttonText: 'আজই বুক করুন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'thai-cooking-course-dhaka',
    en: {
      slug: 'thai-cooking-course-dhaka',
      meta: {
        title: 'Thai Cooking Course in Dhaka | Authentic Thai Cuisine | CIB',
        description: 'Master authentic Thai cuisine in Dhaka. Hands-on training for green/red curry pastes, Pad Thai, Tom Yum Goong, and traditional stir-fry. Standard recipe sheets.'
      },
      hero: {
        badge: 'Asian Culinary Arts 2026',
        heading: 'Thai Cooking Course in Dhaka',
        subheading: 'Learn to balance sweet, sour, salty, and spicy notes of authentic Thai cuisine under expert 5-star culinary mentors.'
      },
      overview: {
        title: 'The Five Tastes of Thailand',
        text: 'Thai cooking is all about flavor composition. Achieving the perfect balance between lemongrass aroma, kaffir lime zest, chili heat, palm sugar sweetness, and fish sauce salinity is what defines authentic Thai food.\n\nAt CIB, you will not use store-bought curry pastes. Instead, you will learn to grind herbs and spices from scratch using traditional pestle and mortar methods, ensuring that you understand the soul of Thai gastronomy.'
      },
      highlights: [
        { title: 'Scratch Curry Pastes', description: 'Pound green, red, and yellow curry pastes from scratch.' },
        { title: 'Wok Stir-Fry', description: 'Learn high-heat wok controls for Pad Thai and basil chicken.' },
        { title: 'Balance of Flavors', description: 'Master the 4-flavor balance (sour, sweet, salty, spicy).' },
        { title: 'Herb Infusions', description: 'Work with Lemongrass, Galangal, Kaffir Lime, and Fish Sauce.' }
      ],
      features: [
        'Making fresh Thai green curry and massaman curry from scratch',
        'Stir-frying techniques with precise wok temperature management',
        'Preparation of Tom Yum and clear soup bases',
        'Understanding how to balance pungent and sweet ingredients',
        'Sourcing guide for authentic Thai sweet basil and galangal in Dhaka',
        'CIB Institutional Specialty Certificate in Thai Culinary Arts'
      ],
      table: {
        heading: 'Course Details & Fees',
        headers: ['Parameter', 'Details'],
        rows: [
          ['Duration', '2 Weeks (4 Hands-on Sessions, 4 hours each)'],
          ['Total Tuition', 'BDT 10,000 (Ingredients and recipes included)'],
          ['Location', 'CIB Dhanmondi Campus, Dhaka'],
          ['Key Recipes', 'Pad Thai, Tom Yum Goong, Green Curry, Basil Beef, Mango Sticky Rice']
        ]
      },
      faqs: [
        { question: 'Is this course suitable for beginners?', answer: 'Yes, we teach you starting from ingredient familiarity, slicing, and paste preparation before doing actual stove-top cooking.' },
        { question: 'Do we cook in individual workstations?', answer: 'Yes. CIB has commercial kitchen setups where students practice in groups or individually to ensure real learning.' }
      ],
      cta: {
        heading: 'Learn Authentic Thai Cooking',
        subheading: 'Stop using pre-made pastes. Cook real Thai street food and fine dining classics.',
        buttonText: 'Enroll in Thai Course Now',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'thai-cooking-course-dhaka',
      meta: {
        title: 'ঢাকায় থাই কুকিং কোর্স | অথেন্টিক থাই কুইজিন | সিআইবি',
        description: 'ঢাকায় অথেন্টিক থাই রান্নার কোর্স। স্ক্র্যাচ থেকে থাই গ্রিন/রেড কারি পেস্ট, প্যাড থাই, টম ইয়াম সুপ এবং প্রফেশনাল ওক ফ্রাইং শিখুন সরাসরি।'
      },
      hero: {
        badge: 'এশিয়ান কালিনারি আর্টস ২০২৬',
        heading: 'ঢাকায় থাই কুকিং কোর্স',
        subheading: 'থাই খাবারের মিষ্টি, টক, নোনতা ও ঝাল স্বাদের নিখুঁত ভারসাম্য তৈরি করা শিখুন। ফাইভ-স্টার শেফদের অধীনে ব্যবহারিক প্রশিক্ষণ।'
      },
      overview: {
        title: 'থাই রান্নার আসল গোপন ফর্মুলা',
        text: 'থাই রান্নার মূল বৈশিষ্ট্য হল এর জটিল এবং বৈচিত্র্যময় স্বাদ। লেমনগ্রাসের সুবাস, ক্যাফির লাইমের টক ভাব, গোলমরিচের ঝাল এবং পাম সুগারের মিষ্টি স্বাদের ভারসাম্যই থাই খাবারকে অনন্য করে তোলে।\n\nসিআইবি-তে কোনো কেনা মশলার পেস্ট ব্যবহার করা হয় না। আমরা প্রতিটি শিক্ষার্থীকে ঐতিহ্যবাহী নোড়া-শীল ব্যবহার করে সম্পূর্ণ ভেষজ মশলা থেকে গ্রিন ও রেড কারি পেস্ট তৈরি শেখাই।'
      },
      highlights: [
        { title: 'হাতে তৈরি কারি পেস্ট', description: 'সম্পূর্ণ নতুন উপাদান থেকে গ্রিন, রেড ও ইয়োলো কারি পেস্ট তৈরি।' },
        { title: 'ওক স্টিয়ার-ফ্রাই', description: 'প্যাড থাই ও বাসিল চিকেনের জন্য হাই-হিট ওক কন্ট্রোল।' },
        { title: 'স্বাদের পারফেক্ট ব্যালেন্স', description: 'টক, মিষ্টি, নোনতা ও ঝাল স্বাদের সঠিক আনুপাতিক মিশ্রণ।' },
        { title: 'ভেষজ উপাদানের ব্যবহার', description: 'লেমনগ্রাস, গালঙ্গাল, ক্যাফির লাইম ও ফিশ সসের সঠিক ব্যবহার।' }
      ],
      features: [
        'স্ক্র্যাচ থেকে থাই গ্রিন কারি ও মাসামান কারি তৈরি',
        'ওক টসিং ও ফ্লেম কন্ট্রোল স্টিয়ার-ফ্রাইং আর্ট',
        'বিখ্যাত টম ইয়াম সুপ ও থাই ক্লিয়ার সুপ প্রস্তুতি',
        'টক-মিষ্টি ও ঝালের অনুপাতিক সামঞ্জস্য করার নিয়ম',
        'ঢাকায় আসল থাই তুলসী ও গালঙ্গাল সোর্সিং গাইডলাইন',
        'সিআইবি স্পেশালিটি সার্টিফিকেট ইন থাই কালিনারি আর্টস'
      ],
      table: {
        heading: 'কোর্স সিডিউল ও ফি তথ্য',
        headers: ['কোর্স প্যারামিটার', 'বিবরণ'],
        rows: [
          ['কোর্সের সময়সীমা', '২ সপ্তাহ (৪টি প্র্যাকটিক্যাল সেশন)'],
          ['মোট ফি', '১০,০০০ টাকা (সব উপকরণ অন্তর্ভুক্ত)'],
          ['ক্যাম্পাস', 'সিআইবি ধানমন্ডি ক্যাম্পাস, ঢাকা'],
          ['প্রধান রেসিপিস', 'প্যাড থাই, টম ইয়াম গোং, গ্রিন কারি, বাসিল বিফ, ম্যাঙ্গো স্টিকি রাইস']
        ]
      },
      faqs: [
        { question: 'রান্নায় একেবারে নতুন হলে কি এই কোর্সটি করা যাবে?', answer: 'হ্যাঁ, আমরা একদম মৌলিক উপাদান পরিচিতি ও চপিং দিয়ে ক্লাস শুরু করি, ফলে নতুনদের জন্য এটি সহজ।' },
        { question: 'প্র্যাকটিক্যাল ক্লাসে আমরা কী নিজেরা রান্না করার সুযোগ পাই?', answer: 'অবশ্যই। সিআইবি-র কমার্শিয়াল রান্নাঘরে শিক্ষার্থীরা গ্রুপ বা এককভাবে সরাসরি চুলায় রান্নার অনুশীলন করে থাকেন।' }
      ],
      cta: {
        heading: 'অথেন্টিক থাই রান্না শিখুন',
        subheading: 'প্যাকেটজাত মশলা এড়িয়ে আসল থাই স্ট্রিট ফুড ও রেস্টুরেন্ট রেসিপি তৈরি করতে প্রস্তুত হোন।',
        buttonText: 'ভর্তি হতে আবেদন করুন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'chinese-cooking-course-dhaka',
    en: {
      slug: 'chinese-cooking-course-dhaka',
      meta: {
        title: 'Chinese Cooking Course in Dhaka | Wok & Stir-Fry | CIB',
        description: 'Join the best Chinese cooking course in Dhaka. Master wok hei, stir-fry techniques, dim sum folding, Szechuan sauces, and restaurant-style plating.'
      },
      hero: {
        badge: 'Specialty Certification 2026',
        heading: 'Chinese Cooking Course in Dhaka',
        subheading: 'Command the flames. Master wok tossing, dim sum folding, and the secret sauces of authentic Szechuan and Cantonese cuisines.'
      },
      overview: {
        title: 'The Flame and the Wok',
        text: 'Authentic Chinese cuisine is a masterclass in fire control (Wok Hei) and precise choping. In Dhaka, Chinese food has evolved, but the demand for authentic, high-fidelity Cantonese and Szechuan cooking remains extremely strong for restaurant-tier chefs.\n\nCIB\'s Chinese Cooking Course teaches you the technical rules of high-heat cooking. You will learn to control wok fire, execute traditional dim sum folding, and draft complex Chinese stocks and sauces.'
      },
      highlights: [
        { title: 'Wok Hei Mastery', description: 'Learn flame management and tossing for authentic wok breath.' },
        { title: 'Dim Sum Folding', description: 'Master dumpling dough prep and intricate folding techniques.' },
        { title: 'Mother Sauces', description: 'Prepare Szechuan, Kung Pao, Sweet & Sour, and Black Bean bases.' },
        { title: 'Texture Control', description: 'Understand velvetting meat and crisp vegetable blanching.' }
      ],
      features: [
        'Mastering high-heat wok tossing and flame safety protocols',
        'Folding dim sums, momos, and traditional spring rolls',
        'Preparing clear broths and traditional Chinese chicken stocks',
        'Velvetting chicken and beef for soft, restaurant-grade texture',
        'Making custom chili oil, Szechuan paste, and sweet soy reduction',
        'Accredited specialty certificate in Chinese Gastronomy'
      ],
      table: {
        heading: 'Chinese Course Outline & Intake',
        headers: ['Specification', 'Details'],
        rows: [
          ['Duration', '2 Weeks (4 Hands-on Classes, 4 hours each)'],
          ['Total Fee', 'BDT 10,000 (All ingredients, worksheets, and uniform included)'],
          ['Intake Limit', '12 students per batch for kitchen safety'],
          ['Class Timings', 'Flexible batches (Fridays / weekdays)']
        ]
      },
      faqs: [
        { question: 'What dishes are taught in this course?', answer: 'We cover Dim Sum/Dumplings, Kung Pao Chicken, Beef with Black Bean Sauce, Szechuan Fried Rice, Hakka Noodles, and Hot & Sour Soup.' },
        { question: 'Is this the same as local Bangla-Chinese cooking?', answer: 'No. While we briefly explain the history of Chinese-Bangla adaptation, this course focuses primarily on authentic Szechuan and Cantonese techniques.' }
      ],
      cta: {
        heading: 'Master the Flame & Wok',
        subheading: 'Develop professional stir-frying skills and enter commercial kitchens with confidence.',
        buttonText: 'Register for Chinese Course',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'chinese-cooking-course-dhaka',
      meta: {
        title: 'ঢাকায় চাইনিজ কুকিং কোর্স | ওক ও স্টার-ফ্রাই টেকনিক | সিআইবি',
        description: 'ঢাকায় চাইনিজ রান্নার সেরা কোর্স। ওক টসিং, ডিম সাম ফোল্ডিং, সেচুয়ান সস এবং কমার্শিয়াল চাইনিজ রেসিপি ও রেস্টুরেন্ট প্লেটিং শিখুন সরাসরি।'
      },
      hero: {
        badge: 'স্পেশালিটি সার্টিফিকেশন ২০২৬',
        heading: 'ঢাকায় চাইনিজ কুকিং কোর্স',
        subheading: 'কমার্শিয়াল কিচেনে আগুনের ব্যবহার। ওক টসিং, ডিম সাম ফোল্ডিং এবং অথেন্টিক সেচুয়ান ও ক্যান্টনিজ খাবারের সিক্রেট সস তৈরি।'
      },
      overview: {
        title: 'চুলা ও ওকের নিখুঁত নিয়ন্ত্রণ',
        text: 'অথেন্টিক চাইনিজ রান্নার মূল বিষয় হল উচ্চ তাপের চুলার আগুন এবং ওক টস করার কৌশল (Wok Hei)। ঢাকায় হসপিটালিটি সেক্টর বৃদ্ধির কারণে দক্ষ চাইনিজ কুইজিন শেফদের ব্যাপক চাহিদা রয়েছে।\n\nসিআইবি-র চাইনিজ কুকিং কোর্সটি শিক্ষার্থীদের ওক আগুনের তাপমাত্রা নিয়ন্ত্রণ, ঐতিহ্যবাহী ডিম সামের বিভিন্ন ভাঁজ করা এবং চাইনিজ স্টক ও রিচ সস তৈরি শেখায়।'
      },
      highlights: [
        { title: 'ওক হেই (Wok Hei) আয়ত্ত', description: 'চাইনিজ রান্নার আসল স্বাদ আনতে ফ্লেম ম্যানেজমেন্ট ও ওক টসিং।' },
        { title: 'ডিম সাম ফোল্ডিং', description: 'ডাম্পলিং ডো তৈরি ও রিং ফোল্ডিংয়ের বিভিন্ন আকর্ষণীয় টেকনিক।' },
        { title: 'সিগনেচার সসেস', description: 'সেচুয়ান, কুং পাও, সুইট অ্যান্ড সাওয়ার ও ব্ল্যাক বিন সস তৈরি।' },
        { title: 'টেক্সচার ও কালার কন্ট্রোল', description: 'মাংস নরম রাখা এবং শাকসবজির মচমচে ভাব ধরে রাখার কৌশল।' }
      ],
      features: [
        'উচ্চ তাপের ওক টসিং ও ফায়ার সেফটি গাইডলাইন',
        'ডিম সাম, মোমো এবং ট্র্যাডিশনাল স্প্রিং রোল ফোল্ডিং',
        'চাইনিজ ক্লিয়ার ব্রোথ ও চিকেন স্টক প্রস্তুতকরণ',
        'মাংস নরম রাখতে চাইনিজ কালিনারি ভেলভেটিং টেকনিক',
        'নিজস্ব চিলি অয়েল, সেচুয়ান পেস্ট ও সুইট সয় রিডাকশন তৈরি',
        'চাইনিজ গ্যাস্ট্রোনমিতে সিআইবি স্পেশাল সার্টিফিকেট'
      ],
      table: {
        heading: 'চাইনিজ কোর্স বিবরণী',
        headers: ['যোগ্যতা মানদণ্ড', 'বিস্তারিত বিবরণ'],
        rows: [
          ['কোর্সের মেয়াদ', '২ সপ্তাহ (৪টি প্র্যাকটিক্যাল ক্লাস)'],
          ['মোট ফি', '১০,০০০ টাকা (সব কাঁচামালের খরচ অন্তর্ভুক্ত)'],
          ['ব্যাচ সাইজ', 'নিরাপদ প্র্যাকটিসের স্বার্থে সর্বোচ্চ ১২ জন শিক্ষার্থী'],
          ['ক্লাসের সময়', 'ছাত্র ও চাকরিজীবীদের জন্য নমনীয় ক্লাসের সময়']
        ]
      },
      faqs: [
        { question: 'এই কোর্সে কী কী খাবার শেখানো হবে?', answer: 'আমরা ডিম সাম/ডাম্পলিংস, কুং পাও চিকেন, বিফ উইথ ব্ল্যাক বিন সস, সেচুয়ান ফ্রাইড রাইস, হাক্কা নুডলস এবং হট অ্যান্ড সাওয়ার সুপ কাভার করি।' },
        { question: 'এটি কি আমাদের দেশের রেস্টুরেন্টের বাংলা-চাইনিজ রান্নার মতো?', answer: 'না। এই কোর্সটি মূলত ট্র্যাডিশনাল চাইনিজ রান্নার পদ্ধতি ও ওকের ব্যবহারিক প্রয়োগ শেখায়, যা আন্তর্জাতিক কমার্শিয়াল কিচেনে ব্যবহৃত হয়।' }
      ],
      cta: {
        heading: 'ওক ও চুলার নিয়ন্ত্রণে পেশাদার হন',
        subheading: 'হাতে-কলমে চাইনিজ রন্ধনশৈলী শিখে আধুনিক বাণিজ্যিক রেস্তোরাঁর উপযোগী যোগ্যতা অর্জন করুন।',
        buttonText: 'আজই ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'mediterranean-cuisine-course-dhaka',
    en: {
      slug: 'mediterranean-cuisine-course-dhaka',
      meta: {
        title: 'Mediterranean Cuisine Course in Dhaka | Healthy Cooking | CIB',
        description: 'Learn healthy Mediterranean cooking in Dhaka. Master Greek salads, Hummus, Falafel, grilled seafood, Shawarma, and healthy olive oil dressings.'
      },
      hero: {
        badge: 'Specialty Certification 2026',
        heading: 'Mediterranean Cuisine Course in Dhaka',
        subheading: 'Master the world\'s healthiest diet. Learn Greek, Italian, and Levantine classics with premium olive oil, fresh herbs, and seafood.'
      },
      overview: {
        title: 'The Bounty of the Mediterranean',
        text: 'The Mediterranean diet is globally celebrated for its health benefits, relying on olive oil, fresh citrus, rich garlic, and aromatic herbs. As healthy eating trends grow in Dhaka, premium cafes and health-conscious food setups require chefs specialized in Mediterranean gastronomy.\n\nFrom blending velvety smooth hummus to baking fresh pita and grilling seafood with traditional spice rubs, this course covers the vibrant flavors of Greece, Italy, and the Levant.'
      },
      highlights: [
        { title: 'Levantine Dips', description: 'Prepare smooth Hummus, Baba Ganoush, and garlic Tzatziki.' },
        { title: 'Seafood Grills', description: 'Learn direct-fire grilling for sea bass, calamari, and prawns.' },
        { title: 'Flatbreads & Pita', description: 'Bake fresh pita bread and dynamic manakeesh from scratch.' },
        { title: 'Olive Oil Dressings', description: 'Master emulsion sauces and fresh herb vinaigrettes.' }
      ],
      features: [
        'Making authentic Levant flatbreads and fresh pita bread',
        'Blending emulsified dressings and olive oil vinaigrettes',
        'Direct flame grilling of Mediterranean style fish and seafood',
        'Portion costing and organic raw material storage',
        'Aromatic spice rubs (Za\'atar, Sumac, and Cumin) blending',
        'Specialty Certificate in Mediterranean Gastronomy from CIB'
      ],
      table: {
        heading: 'Mediterranean Course Details',
        headers: ['Criteria', 'Details'],
        rows: [
          ['Duration', '2 Weeks (4 Hands-on Classes, 4 hours each)'],
          ['Total Fee', 'BDT 12,000 (All premium ingredients included)'],
          ['Key Dishes', 'Hummus, Falafel, Pita Bread, Tabbouleh, Grilled Calamari, Tzatziki'],
          ['Location', 'CIB Campus, Dhanmondi, Dhaka']
        ]
      },
      faqs: [
        { question: 'What ingredients will we work with?', answer: 'We provide premium Extra Virgin Olive Oil, Tahini, fresh herbs, chickpeas, lamb, and seafood for all practical sessions.' },
        { question: 'Is this course suitable for home makers?', answer: 'Yes. It is excellent for homemakers who wish to cook healthy, restaurant-quality Mediterranean meals for their families or start a healthy cloud kitchen.' }
      ],
      cta: {
        heading: 'Master Mediterranean Gastronomy',
        subheading: 'Gain the skills to cook healthy, vibrant, and incredibly delicious Mediterranean classics.',
        buttonText: 'Enroll in Mediterranean Course',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'mediterranean-cuisine-course-dhaka',
      meta: {
        title: 'ঢাকায় মেডিটেরেনিয়ান কুকিং কোর্স | স্বাস্থ্যকর রান্না | সিআইবি',
        description: 'ঢাকায় মেডিটেরেনিয়ান কুইজিন কোর্স। গ্রীক সালাদ, হুমুস, ফালাফেল, গ্রিলড সি-ফুড এবং স্বাস্থ্যকর অলিভ অয়েল ড্রেসিংস হাতে-কলমে শিখুন।'
      },
      hero: {
        badge: 'স্পেশালিটি সার্টিফিকেশন ২০২৬',
        heading: 'ঢাকায় মেডিটেরেনিয়ান কুকিং কোর্স',
        subheading: 'বিশ্বের সবচেয়ে স্বাস্থ্যকর ডায়েট। অলিভ অয়েল, তাজা হার্বস ও সি-ফুডের সাহায্যে গ্রীক, ইতালীয় ও লেভান্টাইন ক্লাসিক রান্না শিখুন।'
      },
      overview: {
        title: 'মেডিটেরেনিয়ানের স্বাস্থ্যকর ও সুস্বাদু রন্ধনশৈলী',
        text: 'মেডিটেরেনিয়ান ডায়েট তার চমৎকার পুষ্টিগুণ ও স্বাস্থ্যগত উপকারের জন্য বিশ্বজুড়ে সমাদৃত। এই রান্নায় অতিরিক্ত ভার্জিন অলিভ অয়েল, সাইট্রাস, রসুন এবং তাজা পুদিনা ও পার্সলে পাতার প্রচুর ব্যবহার রয়েছে। ঢাকায় স্বাস্থ্যকর খাদ্যাভ্যাসের ট্রেন্ড বাড়ার সাথে সাথে এই কুইজিনের শেফদের চাহিদা ক্রমশ বাড়ছে।\n\nভেলভেটি হুমুস তৈরি থেকে শুরু করে সরাসরি ওভেনে পিটা ব্রেড এবং তাজা সি-ফুড গ্রিল করা — সবই আমাদের কিচেন ল্যাবে ব্যবহারিকভাবে শেখানো হবে।'
      },
      highlights: [
        { title: 'লেভান্টাইন ডিপস', description: 'প্রস্তুতকরণ: মসৃণ হুমুস, বাবা গানুশ এবং গার্লিক জালিকি সস।' },
        { title: 'সি-ফুড গ্রিলস', description: 'স্যামন, কোরাল, স্কুইড এবং চিংড়ি নিখুঁতভাবে গ্রিল করার টেকনিক।' },
        { title: 'ফ্ল্যাটব্রেড ও পিটা', description: 'স্ক্র্যাচ থেকে তাজা পিটা ব্রেড ও সুস্বাদু মানাকিশ বেকিং।' },
        { title: 'অলিভ অয়েল ড্রেসিংস', description: 'ইমালশন সস এবং সালাদের জন্য তাজা ভেষজ ভিনেগ্রেট।' }
      ],
      features: [
        'অথেন্টিক লেভান্টাইন ফ্ল্যাটব্রেড ও তাজা পিটা ব্রেড বেকিং',
        'অলিভ অয়েল ভিনেগ্রেট ও ইমালসিফাইড সালাদ ড্রেসিং তৈরি',
        'মেডিটেরেনিয়ান স্টাইলে তাজা মাছ ও সামুদ্রিক ক্যালমারি গ্রিলিং',
        'উপাদান অপচয় রোধে সঠিক স্টোরেজ ও খরচ নিয়ন্ত্রণ',
        'মেডিটেরেনিয়ান মশলার মিশ্রণ (জাত আর, সুমাক ও জিরা) তৈরি',
        'মেডিটেরেনিয়ান গ্যাস্ট্রোনমিতে সিআইবি স্পেশাল সার্টিফিকেট'
      ],
      table: {
        heading: 'মেডিটেরেনিয়ান কোর্স বিবরণী',
        headers: ['প্যারামিটার', 'বিস্তারিত বিবরণ'],
        rows: [
          ['কোর্সের মেয়াদ', '২ সপ্তাহ (৪টি প্র্যাকটিক্যাল সেশন)'],
          ['মোট ফি', '১২,০০০ টাকা (কাঁচামাল ও রেসিপি শীট সহ)'],
          ['প্রধান খাবার সমূহ', 'হুমুস, ফালাফেল, পিটা ব্রেড, তাবুলা সালাদ, গ্রিলড ক্যালমারি, জাজিকি'],
          ['ক্যাম্পাস লোকেশন', 'সিআইবি ক্যাম্পাস, কলাবাগান লেক সার্কাস, ধানমন্ডি, ঢাকা']
        ]
      },
      faqs: [
        { question: 'ব্যবহারিক ক্লাসের উপকরণ কি ইনস্টিটিউট থেকে দেওয়া হবে?', answer: 'হ্যাঁ। প্রিমিয়াম এক্সট্রা ভার্জিন অলিভ অয়েল, তাহিনি, টাটকা ভেষজ পাতা ও সি-ফুড আমাদের ল্যাব থেকেই সরবরাহ করা হবে।' },
        { question: 'গৃহিণীদের জন্য কি এই কোর্সটি উপযোগী?', answer: 'অবশ্যই। যারা পরিবারের জন্য স্বাস্থ্যকর অথচ চমৎকার স্বাদের খাবার তৈরি করতে চান বা হেলদি ক্লাউড কিচেন শুরু করতে চান, তাদের জন্য এটি দারুণ কোর্স।' }
      ],
      cta: {
        heading: 'স্বাস্থ্যকর রন্ধনশিল্পে দক্ষ হোন',
        subheading: 'মেডিটেরেনিয়ান ডায়েটের সুস্বাদু খাবার তৈরির কলাকৌশল শিখে নিজেকে অন্যদের চেয়ে এগিয়ে রাখুন।',
        buttonText: 'আজই ভর্তি ফর্ম পূরণ করুন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'indian-cuisine-course-dhaka',
    en: {
      slug: 'indian-cuisine-course-dhaka',
      meta: {
        title: 'Indian Cuisine Course in Dhaka | Curry & Tandoor | CIB',
        description: 'Master professional Indian cooking in Dhaka. Learn curry gravy bases, tandoori marinades, naan baking, and aromatic spice roasting. Traditional clay oven skills.'
      },
      hero: {
        badge: 'Specialty Certification 2026',
        heading: 'Indian Cuisine Course in Dhaka',
        subheading: 'Unlock the secrets of subcontinental spices. Master rich restaurant gravies, tandoori baking, and aromatic spice blending.'
      },
      overview: {
        title: 'The Art of Curry and Spice',
        text: 'Subcontinental cuisine is a complex dance of spice tempering (Tadka) and slow-cooked gravy reduction. Restaurant-grade Indian cooking is highly technical, demanding knowledge of base gravies, clay oven (Tandoor) heat, and custom spice blends.\n\nCIB\'s Indian Cuisine Course teaches you how to replicate 5-star restaurant flavors. You will learn the science of Indian mother gravies, yogurt marinades, and how to bake soft, pillowy naan on direct commercial heat.'
      },
      highlights: [
        { title: 'Clay Oven Baking', description: 'Master Naan and Tandoori Roti baking on direct heat.' },
        { title: '4 Mother Gravies', description: 'Learn Makhani, Onion-Tomato Masala, Korma, and Palak bases.' },
        { title: 'Tandoori Marinades', description: 'Master yogurt-spice marination for tikka and kebabs.' },
        { title: 'Spice Roasting', description: 'Learn to roast and blend custom Garam Masalas.' }
      ],
      features: [
        'Preparing Makhani gravy and onion-tomato masala base from scratch',
        'Marinating and baking chicken tikka, seekh kebab, and fish tandoori',
        'Baking butter naan, garlic naan, and paratha on hot griddles/tandoor',
        'Understanding tadka (tempering) science for lentil and vegetable dishes',
        'Calculating spice yields and commercial portion controls',
        'CIB Institutional Specialty Certificate in Indian Culinary Arts'
      ],
      table: {
        heading: 'Indian Course Details',
        headers: ['Specification', 'Course Specifications'],
        rows: [
          ['Duration', '2 Weeks (4 Hands-on Classes, 4 hours each)'],
          ['Total Fee', 'BDT 10,000 (All raw materials and recipe books included)'],
          ['Key Recipes', 'Butter Chicken, Mutton Rogan Josh, Chicken Tikka, Garlic Naan, Biryani Aromatics'],
          ['Intake Limit', '15 students per batch']
        ]
      },
      faqs: [
        { question: 'Will we learn how to make Mughlai dishes?', answer: 'Yes. We cover aromatic rice preparations, slow-cooking (Dum) basics, and rich korma gravies that form the basis of Mughlai gastronomy.' },
        { question: 'Is this course useful for opening a catering business?', answer: 'Yes. Indian cuisine is the most popular catering option in Dhaka. We focus on batch cooking and maintaining taste consistency.' }
      ],
      cta: {
        heading: 'Master Indian Culinary Science',
        subheading: 'Replicate 5-star restaurant flavors. Learn the core principles of subcontinental cooking.',
        buttonText: 'Enroll in Indian Course Now',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'indian-cuisine-course-dhaka',
      meta: {
        title: 'ডিজিটাল অডিট ইন্ডিয়ান কুকিং কোর্স | কারি ও তন্দুর স্পেশাল | সিআইবি',
        description: 'ঢাকায় প্রফেশনাল ইন্ডিয়ান রান্না শিখুন। কারি গ্রেভি বেস, তন্দুরি মেরিনেশন, নান বেকিং এবং মশলার সুগন্ধি রোস্টিং শিখুন সরাসরি কিচেন ল্যাবে।'
      },
      hero: {
        badge: 'স্পেশালিটি সার্টিফিকেশন ২০২৬',
        heading: 'ঢাকায় ইন্ডিয়ান কুকিং কোর্স',
        subheading: 'উপমহাদেশীয় মশলার সিক্রেট রেসিপি। রিচ রেস্টুরেন্ট গ্রেভি, তন্দুরি বেকিং এবং তাজা মশলার নিখুঁত মিশ্রণ তৈরি করা শিখুন।'
      },
      overview: {
        title: 'উপমহাদেশীয় মশলা ও কারির আসল রসায়ন',
        text: 'ইন্ডিয়ান রান্নার মূল রহস্য লুকিয়ে আছে মশলার সঠিক টেম্পারিং (ফোড়ন) এবং ধীর আঁচে গ্রেভি রিডাকশনের ওপর। রেস্টুরেন্ট কোয়ালিটির ইন্ডিয়ান খাবার তৈরি করা অত্যন্ত টেকনিক্যাল, যার জন্য মাদার গ্রেভি বেস, তন্দুরের সঠিক তাপমাত্রা ও কাস্টম মশলার অনুপাত জানা আবশ্যক।\n\nসিআইবি-র ইন্ডিয়ান কুকিং কোর্সে ফাইভ-স্টার হোটেলের কারি ও তন্দুর আইটেমগুলো হুবহু তৈরি করতে শেখানো হয়। আপনি নান বেকিং ও তাজা টিক্কা মেরিনেশনের সিক্রেট জানতে পারবেন।'
      },
      highlights: [
        { title: 'তন্দুরি ওভেন বেকিং', description: 'সরাসরি হিটে নান ব্রেড ও তন্দুরি রুটি বেক করার কৌশল।' },
        { title: '৪টি মাদার গ্রেভি', description: 'মাখনি, ওনিয়ন-টমেটো মশলা, কোরমা এবং পালং কারির বেস তৈরি।' },
        { title: 'তন্দুরি মেরিনেশন', description: 'চিকেন টিক্কা ও কাবাবের জন্য টকদই-মশলার নিখুঁত মেরিনেশন।' },
        { title: 'মশলা রোস্টিং', description: 'তাজা মশলা রোস্ট করে কাস্টম গরম মশলা ব্লেন্ড করার কৌশল।' }
      ],
      features: [
        'স্ক্র্যাচ থেকে মাখনি গ্রেভি ও পেঁয়াজ-টমেটো মশলা বেস প্রস্তুতকরণ',
        'চিকেন টিক্কা, শিক কাবাব ও ফিশ তন্দুরি মেরিনেট ও বেকিং',
        'তাওয়া ও তন্দুরে বাটার নান, গার্লিক নান ও লাচ্ছা পরোটা বেকিং',
        'ডাল ও সবজি রান্নায় সঠিক ফোড়ন (Tempering) দেওয়ার বৈজ্ঞানিক নিয়ম',
        'কমার্শিয়াল পোর্শন কন্ট্রোল ও মশলার সঠিক আনুপাতিক ব্যবহার',
        'ইন্ডিয়ান কালিনারি আর্টসে সিআইবি স্পেশাল একাডেমি সার্টিফিকেট'
      ],
      table: {
        heading: 'ইন্ডিয়ান কোর্স বিবরণী',
        headers: ['প্যারামিটার', 'বিস্তারিত বিবরণ'],
        rows: [
          ['কোর্সের মেয়াদ', '২ সপ্তাহ (৪টি প্র্যাকটিক্যাল ক্লাস)'],
          ['মোট ফি', '১০,০০০ টাকা (সব উপকরণের খরচ ফি-র মধ্যে অন্তর্ভুক্ত)'],
          ['প্রধান খাবার সমূহ', 'বাটার চিকেন, মাটন রোগান জোশ, চিকেন টিক্কা, গার্লিক নান, বিরিয়ানি মশলা'],
          ['ব্যাচ লিমিট', 'প্রতি ব্যাচে সর্বোচ্চ ১৫ জন শিক্ষার্থী']
        ]
      },
      faqs: [
        { question: 'এই কোর্সে কি মোঘলাই খাবার অন্তর্ভুক্ত রয়েছে?', answer: 'হ্যাঁ। সুগন্ধি পোলাও, বিরিয়ানি এবং ধীর আঁচে দম দেওয়ার রান্নাসহ ঐতিহ্যবাহী মোঘলাই কারি গ্রেভি শেখানো হবে।' },
        { question: 'ক্যাটারিং বিজনেস শুরু করতে কি এই কোর্সটি কার্যকর?', answer: 'অবশ্যই। ঢাকায় যেকোনো অনুষ্ঠান ও ক্যাটারিংয়ে ইন্ডিয়ান কারির চাহিদা সবচেয়ে বেশি। কস্টিং মডিউলে আমরা বড় ব্যাচে স্বাদ ঠিক রাখার উপায় শেখাই।' }
      ],
      cta: {
        heading: 'ইন্ডিয়ান মশলার সঠিক রসায়ন শিখুন',
        subheading: 'রেস্টুরেন্টের মতো স্বাদে ও গন্ধে উপমহাদেশীয় খাবার তৈরি করার পেশাদার দক্ষতা অর্জন করুন।',
        buttonText: 'আজই ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  }
];

// Helper to create directory recursively if it doesn't exist
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

console.log('Starting niche landing page generation...');

pages.forEach((page) => {
  const slug = page.slug;

  // 1. Write content JSON files
  const enJsonPath = path.join(process.cwd(), `content/en/${slug}.json`);
  const bnJsonPath = path.join(process.cwd(), `content/bn/${slug}.json`);

  ensureDirectoryExistence(enJsonPath);
  ensureDirectoryExistence(bnJsonPath);

  fs.writeFileSync(enJsonPath, JSON.stringify(page.en, null, 2), 'utf8');
  fs.writeFileSync(bnJsonPath, JSON.stringify(page.bn, null, 2), 'utf8');
  console.log(`Generated JSON files for: ${slug}`);

  // 2. Write page.tsx file
  const pageRouteDir = path.join(process.cwd(), `src/app/[locale]/${slug}`);
  const pageFile = path.join(pageRouteDir, 'page.tsx');

  ensureDirectoryExistence(pageFile);

  const pageCode = `import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CommercialLandingPage from '@/components/global/CommercialLandingPage';

interface PageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const slug = '${slug}';
  const filePath = path.join(process.cwd(), \`content/\${locale}/\${slug}.json\`);
  if (!fs.existsSync(filePath)) return {};
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return {
    title: data.meta.title,
    description: data.meta.description,
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      url: \`https://cibdhk.com/\${locale}/\${slug}\`,
      type: 'website',
    },
    alternates: {
      canonical: \`https://cibdhk.com/\${locale}/\${slug}\`,
      languages: {
        'en': \`https://cibdhk.com/en/\${slug}\`,
        'bn': \`https://cibdhk.com/bn/\${slug}\`,
        'x-default': \`https://cibdhk.com/en/\${slug}\`,
      }
    }
  };
}

export default function Page({ params: { locale } }: PageProps) {
  const slug = '${slug}';
  const filePath = path.join(process.cwd(), \`content/\${locale}/\${slug}.json\`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return <CommercialLandingPage data={data} locale={locale} />;
}
`;

  fs.writeFileSync(pageFile, pageCode, 'utf8');
  console.log(`Generated page.tsx for route: /${slug}`);
});

console.log('Niche landing page generation complete!');

const fs = require('fs');
const path = require('path');

const pages = [
  {
    slug: 'chef-course-bangladesh',
    en: {
      slug: 'chef-course-bangladesh',
      meta: {
        title: 'Chef Course in Bangladesh | Professional Culinary Institute | CIB',
        description: 'Looking for the best chef course in Bangladesh? CIB offers NSDA accredited culinary training, 120+ recipes, and international placement support.'
      },
      hero: {
        badge: 'Professional Pathway 2026',
        heading: 'Chef Course in Bangladesh',
        subheading: 'Master professional culinary arts under 5-star executive mentors. Secure global employment with NSDA-accredited training.'
      },
      overview: {
        title: 'Culinary Career Powerhouse',
        text: 'The hospitality and food service industry in Bangladesh is expanding rapidly, offering lucrative career paths for trained professionals. CIB is the premier culinary institute in Bangladesh, bridging the gap between domestic cooking and high-performance commercial kitchen environments.\n\nOur curriculum is mapped to international guidelines and accredited by the National Skills Development Authority (NSDA) under the Prime Minister\'s Office. This ensures your credentials are recognized globally by embassies, visa processing centers, and 5-star hotels.'
      },
      highlights: [
        { title: '120+ Recipes', description: 'From basic culinary science to advanced international menus.' },
        { title: '16+ Cuisines', description: 'Italian, French, Mediterranean, Turkish, Asian, and more.' },
        { title: 'NSDA Certification', description: 'Government-approved Level 2 and Level 3 vocational certificates.' },
        { title: '5-Star Placement', description: 'Conditional internships and jobs at Radisson, Westin, and InterContinental.' }
      ],
      features: [
        'State-of-the-art 2,000 sq. ft. commercial kitchen lab in Dhaka',
        'Direct hands-on practical classes with premium ingredients',
        'ISO-HACCP food safety & kitchen hygiene standards training',
        'Comprehensive pastry and baking bonus module included free',
        'Flexible class schedules (Fridays / weekdays) for students & professionals',
        'Job placement cell with verified local and Middle East hotel partnerships'
      ],
      table: {
        heading: 'Chef Course Details & Comparison',
        headers: ['Criteria', 'CIB Professional Course', 'Ordinary Institutes'],
        rows: [
          ['Accreditation', 'NSDA & ISO-HACCP Standards', 'Unaccredited / Domestic'],
          ['Curriculum Depth', '120+ Recipes, 16+ Cuisines', 'Basic local dishes only'],
          ['Mentorship', 'Executive 5-Star Chefs', 'Instructors with basic skills'],
          ['Kitchen Size', '2,000 sq. ft. Commercial Lab', 'Home kitchen setup'],
          ['Internship Support', '100% conditional placement support', 'No internship support']
        ]
      },
      faqs: [
        { question: 'What is the eligibility for a chef course in Bangladesh?', answer: 'A minimum education of SSC/HSC or equivalent is recommended, with age 16+ and a passion for cooking. No prior kitchen experience is required.' },
        { question: 'Are CIB certificates accepted for visa processing?', answer: 'Yes. CIB\'s NSDA-accredited vocational certificates are government-approved and widely accepted by embassies for skilled worker visas in Europe, Canada, and the Gulf.' },
        { question: 'Can I pay the course fees in installments?', answer: 'Yes, CIB offers a flexible payment structure where the total fee of BDT 44,000 is payable in three easy installments: BDT 16,000 admission + two installments of BDT 14,000.' }
      ],
      cta: {
        heading: 'Become a Certified Professional Chef',
        subheading: 'Stop surviving on odd jobs. Get the skills that give you a high-paying career worldwide.',
        buttonText: 'Enroll in Month 1 Batch Now',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'chef-course-bangladesh',
      meta: {
        title: 'বাংলাদেশে শেফ কোর্স | প্রফেশনাল কালিনারি ট্রেনিং ইনস্টিটিউট | সিআইবি',
        description: 'বাংলাদেশে সেরা শেফ কোর্স খুঁজছেন? সিআইবি (CIB) দিচ্ছে এনএসডিএ অনুমোদিত কালিনারি ট্রেনিং, ১২০+ আন্তর্জাতিক রেসিপি ও সরাসরি প্লেসমেন্ট সহায়তা।'
      },
      hero: {
        badge: 'পেশাদার ক্যারিয়ার ২০২৬',
        heading: 'বাংলাদেশে শেফ কোর্স',
        subheading: '৫-তারকা এক্সিকিউটিভ মেন্টরদের অধীনে প্রফেশনাল কালিনারি আর্টস শিখুন। এনএসডিএ অনুমোদিত সনদের সাথে বিশ্বব্যাপী ক্যারিয়ার গড়ুন।'
      },
      overview: {
        title: 'রন্ধনশিল্পে ক্যারিয়ার গড়ার নির্ভরযোগ্য প্রতিষ্ঠান',
        text: 'বাংলাদেশের হসপিটালিটি ও ফুড সার্ভিস সেক্টর দ্রুত বিকশিত হচ্ছে, যা দক্ষ পেশাদারদের জন্য উচ্চ আয়ের সুযোগ তৈরি করছে। সিআইবি (CIB) হল বাংলাদেশের শীর্ষস্থানীয় কালিনারি ইনস্টিটিউট, যা সাধারণ রান্নার সাথে পেশাদার বাণিজ্যিক রান্নাঘরের দূরত্ব দূর করে।\n\nআমাদের কারিকুলাম আন্তর্জাতিক মানসম্পন্ন এবং মাননীয় প্রধানমন্ত্রীর কার্যালয়ের অধীন জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ (NSDA) দ্বারা অনুমোদিত। এটি নিশ্চিত করে যে আপনার কাজের যোগ্যতা বিশ্বজুড়ে দূতাবাস, ভিসা প্রসেসিং সেন্টার এবং ৫-তারকা হোটেলসমূহে গ্রহণযোগ্য।'
      },
      highlights: [
        { title: '১২০+ রেসিপি', description: 'মৌলিক রন্ধনবিজ্ঞান থেকে শুরু করে অ্যাডভান্সড আন্তর্জাতিক মেনু।' },
        { title: '১৬+ কুইজিন', description: 'ইতালীয়, ফ্রেঞ্চ, ভূমধ্যসাগরীয়, তুর্কি, এশিয়ান এবং আরও অনেক কিছু।' },
        { title: 'এনএসডিএ সনদ', description: 'সরকার অনুমোদিত লেভেল ২ এবং লেভেল ৩ ভোকেশনাল সার্টিফিকেট।' },
        { title: '৫-স্টার প্লেসমেন্ট', description: 'র‌্যাডিসন, ওয়েস্টিন এবং ইন্টারকন্টিনেন্টাল হোটেলে ইন্টার্নশিপ সুবিধা।' }
      ],
      features: [
        'ঢাকার ধানমন্ডিতে অবস্থিত ২০০০ বর্গফুটের অত্যাধুনিক কমার্শিয়াল রান্নাঘর',
        'প্রিমিয়াম উপাদান ব্যবহার করে সরাসরি প্র্যাক্টিক্যাল ক্লাস',
        'আইএসও-এইচএসিসিপি ফুড সেফটি ও রান্নাঘর হাইজিন ট্রেনিং',
        'সম্পূর্ণ বিনামূল্যে প্রফেশনাল পেস্ট্রি ও বেকিং মডিউল অন্তর্ভুক্ত',
        'ছাত্র ও চাকুরিজীবীদের জন্য সুবিধাজনক ক্লাস শিডিউল (শুক্রবার / সপ্তাহের অন্যান্য দিন)',
        'স্থানীয় এবং মধ্যপ্রাচ্যের ফাইভ-স্টার হোটেলের সাথে প্লেসমেন্ট সেল পার্টনারশিপ'
      ],
      table: {
        heading: 'শেফ কোর্স বিবরণী ও তুলনা',
        headers: ['যোগ্যতা মানদণ্ড', 'সিআইবি প্রফেশনাল কোর্স', 'সাধারণ ট্রেনিং সেন্টার'],
        rows: [
          ['অনুমোদন সনদ', 'এনএসডিএ ও আইএসও-এইচএসিসিপি', 'অননুমোদিত / ঘরোয়া সার্টিফিকেট'],
          ['রেসিপির গভীরতা', '১২০+ রেসিপি, ১৬+ আন্তর্জাতিক কুইজিন', 'শুধু সাধারণ দেশি খাবার'],
          ['মেন্টরশিপ', '৫-তারকা হোটেলের এক্সিকিউটিভ শেফ', 'সাধারণ রান্নার লোক'],
          ['রান্নাঘর ল্যাব', '২০০০ বর্গফুট বাণিজ্যিক রান্নাঘর', 'ঘরোয়া রান্নাঘর সেটআপ'],
          ['ইন্টার্নশিপ সুবিধা', '১০০% শর্তসাপেক্ষ প্লেসমেন্ট সহায়তা', 'কোনো প্লেসমেন্ট সহায়তা নেই']
        ]
      },
      faqs: [
        { question: 'বাংলাদেশে শেফ কোর্সে ভর্তি হওয়ার যোগ্যতা কী?', answer: 'ন্যূনতম এসএসসি/এইচএসসি বা সমমানের শিক্ষাগত যোগ্যতা থাকা ভালো। বয়স কমপক্ষে ১৬ বছর এবং রান্নার প্রতি আগ্রহ থাকতে হবে। রান্নার পূর্ব অভিজ্ঞতার প্রয়োজন নেই।' },
        { question: 'সিআইবি-র সার্টিফিকেট কি ভিসা প্রসেসিংয়ের জন্য কার্যকর?', answer: 'হ্যাঁ। সিআইবি-র এনএসডিএ অনুমোদিত ভোকেশনাল সার্টিফিকেট সরকারিভাবে স্বীকৃত, যা ইউরোপ, কানাডা এবং মধ্যপ্রাচ্যে স্কিলড ক্যাটাগরিতে ভিসা পেতে অত্যন্ত কার্যকরী।' },
        { question: 'আমি কি কিস্তিতে কোর্সের ফি দিতে পারবো?', answer: 'হ্যাঁ, সিআইবি-তে মোট ৪৪,০০০ টাকা ফি ৩টি সহজ কিস্তিতে দেওয়া যাবে: ভর্তি ফি ১৬,০০০ টাকা এবং পরবর্তী দুটি কিস্তি ১৪,০০০ টাকা করে।' }
      ],
      cta: {
        heading: 'একজন প্রত্যয়িত পেশাদার শেফ হয়ে উঠুন',
        subheading: 'অদক্ষ শ্রমিক হিসেবে নয়, দক্ষ পেশাদার হিসেবে বিশ্বজুড়ে আকর্ষণীয় বেতনে কালিনারি ক্যারিয়ার শুরু করুন।',
        buttonText: 'এখনই অ্যাডমিশন নিন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'chef-course-dhaka',
    en: {
      slug: 'chef-course-dhaka',
      meta: {
        title: 'Chef Course in Dhaka 2026 | Professional Culinary Academy | CIB',
        description: 'Join the top-rated professional chef course in Dhaka. Learn from executive mentors in Dhanmondi. 100% hands-on kitchen training with ISO-HACCP standards.'
      },
      hero: {
        badge: 'Dhaka Campus Enrollment',
        heading: 'Chef Course in Dhaka',
        subheading: 'Step into Dhaka\'s most advanced commercial kitchen lab. Master international cuisines and secure 5-star hotel internships.'
      },
      overview: {
        title: 'Dhaka\'s Premier Culinary Academy',
        text: 'Dhaka is the center of Bangladesh\'s gastronomy boom. As luxury hotels, international food brands, and fine-dining cafes populate the capital, the demand for highly skilled culinary experts has peaked. CIB offers Dhaka\'s most intensive hands-on chef course, right in the heart of Dhanmondi.\n\nOur training lab is situated at Kalabagan, adjacent to major transport lines, making it easily accessible from all parts of Dhaka. We train students from Mirpur, Uttara, Gulshan, and Old Dhaka, equipping them with professional skills designed for global fine-dining establishments.'
      },
      highlights: [
        { title: 'Dhanmondi Location', description: 'Central Dhaka campus with excellent transit links.' },
        { title: '2,000 Sq. Ft. Lab', description: 'Equipped with commercial ovens, gas ranges, and workstations.' },
        { title: 'Demo Classes', description: 'Free demo sessions before enrollment.' },
        { title: 'Executive Faculty', description: 'Learn from local and international executive chefs.' }
      ],
      features: [
        'Hands-on practice for every student in our commercial lab',
        'Centrally located on Lake Circus, Kalabagan (Dhanmondi)',
        'Accreditation from NSDA (Prime Minister\'s Office)',
        'Curriculum including 120+ recipes from 16+ countries',
        'Direct credit transfer pathways to culinary institutes in Malaysia & Canada',
        'State-of-the-art security, fire safety, and waste management setups'
      ],
      table: {
        heading: 'Travel Times & Transit Guide to Dhanmondi Campus',
        headers: ['Starting Point', 'Transit Mode', 'Approx. Travel Time'],
        rows: [
          ['Mirpur 10 / Shewrapara', 'Metro Rail + Bus / Rickshaw', '25 - 35 Mins'],
          ['Uttara Sector 10', 'Metro Rail + Rickshaw / Bus', '40 - 50 Mins'],
          ['Gulshan 2 / Banani', 'Bus / Car / CNG', '30 - 45 Mins'],
          ['Motijheel / Old Dhaka', 'Bus / CNG / Rickshaw', '20 - 30 Mins'],
          ['Mohammadpur / Lalmatia', 'Rickshaw / Walking', '10 - 15 Mins']
        ]
      },
      faqs: [
        { question: 'Where is the CIB campus in Dhaka located?', answer: 'Our campus is located at House-160, Lake Circus, Kalabagan, Dhanmondi, Dhaka 1205 (Right beside Longlife Hospital).' },
        { question: 'Do you offer weekend classes in Dhaka?', answer: 'Yes. We offer special Friday-only classes for working professionals and university students who cannot attend weekday sessions.' },
        { question: 'Can I visit the campus for a demo class?', answer: 'Absolutely. You can call +880 1338 958997 to schedule a free campus visit and experience our commercial kitchen demo.' }
      ],
      cta: {
        heading: 'Start Your Culinary Training in Dhaka',
        subheading: 'Visit our campus in Dhanmondi to speak with admissions counselors and tour our training lab.',
        buttonText: 'Book a Campus Visit',
        buttonHref: '/contact'
      }
    },
    bn: {
      slug: 'chef-course-dhaka',
      meta: {
        title: 'ঢাকায় শেফ কোর্স ২০২৬ | প্রফেশনাল কুকিং ট্রেনিং একাডেমি | সিআইবি',
        description: 'ঢাকার ধানমন্ডিতে সেরা প্রফেশনাল শেফ কোর্সে ভর্তি হোন। ফাইভ-স্টার এক্সিকিউটিভ মেন্টরদের অধীনে প্র্যাক্টিক্যাল ক্লাস, আইএসও ও এনএসডিএ সার্টিফিকেশন।'
      },
      hero: {
        badge: 'ঢাকা ক্যাম্পাস ভর্তি',
        heading: 'ঢাকায় শেফ কোর্স',
        subheading: 'ঢাকার সবচেয়ে উন্নত বাণিজ্যিক রান্নাঘর ল্যাবে কালিনারি আর্টস প্র্যাকটিস করুন। আন্তর্জাতিক মানের রান্না শিখুন এবং ৫-তারকা ইন্টার্নশিপ নিশ্চিত করুন।'
      },
      overview: {
        title: 'ঢাকার সেরা কালিনারি একাডেমি',
        text: 'ঢাকা এখন রন্ধনশিল্পের মূল কেন্দ্র। রাজধানীতে লাক্সারি হোটেল, আন্তর্জাতিক রেস্টুরেন্ট চেইন এবং ফাইন-ডাইনিং ক্যাফে ক্রমাগত বৃদ্ধির সাথে সাথে দক্ষ শেফদের চাহিদা বহুগুণ বেড়েছে। সিআইবি (CIB) ঢাকার ধানমন্ডির কেন্দ্রস্থলে সবচেয়ে নিবিড় ও প্র্যাক্টিক্যাল শেফ কোর্স দিচ্ছে।\n\nআমাদের আধুনিক কমার্শিয়াল কিচেন ল্যাব কলাবাগান লেক সার্কাসে অবস্থিত, যা ঢাকার যেকোনো প্রান্ত থেকে যাতায়াতের জন্য অত্যন্ত সহজ। মিরপুর, উত্তরা, গুলশান এবং পুরান ঢাকা থেকে আমাদের শিক্ষার্থীরা সহজে এসে ক্লাস সম্পন্ন করছেন।'
      },
      highlights: [
        { title: 'ধানমন্ডি ক্যাম্পাস', description: 'ঢাকার প্রাণকেন্দ্রে চমৎকার যাতায়াত সুবিধা।' },
        { title: '২০০০ বর্গফুট ল্যাব', description: 'বাণিজ্যিক ওভেন, হাই-প্রেসার বার্নার ও ওয়ার্কস্টেশন সম্বলিত।' },
        { title: 'ডেমো ক্লাস', description: 'ভর্তির পূর্বে ফ্রি ডেমো ক্লাস করার সুযোগ।' },
        { title: 'এক্সিকিউটিভ মেন্টর', description: 'দেশি-বিদেশি এক্সিকিউটিভ শেফদের অধীনে সরাসরি ক্লাস।' }
      ],
      features: [
        'আমাদের বাণিজ্যিক কিচেনে প্রতিটি শিক্ষার্থীর জন্য নিজস্ব প্র্যাক্টিস স্পেস',
        'ধানমন্ডির কলাবাগান লেক সার্কাসে কেন্দ্রীয়ভাবে অবস্থিত ক্যাম্পাস',
        'মাননীয় প্রধানমন্ত্রীর কার্যালয়ের অধীন এনএসডিএ (NSDA) কর্তৃক অনুমোদিত',
        '১৬+ দেশের ১২০+ রেসিপির বৈচিত্র্যপূর্ণ কারিকুলাম',
        'মালয়েশিয়া ও কানাডার রন্ধন বিশ্ববিদ্যালয়ে ক্রেডিট ট্রান্সফারের পথ সুগম',
        'আইএসও ফায়ার সেফটি ও হাইজিন কমপ্লায়েন্ট কিচেন সেটআপ'
      ],
      table: {
        heading: 'ধানমন্ডি ক্যাম্পাসে যাতায়াত ও রুট গাইড',
        headers: ['শুরুর স্থান', 'যাতায়াত মাধ্যম', 'আনুমানিক সময়'],
        rows: [
          ['মিরপুর ১০ / শেওড়াপাড়া', 'মেট্রোরেল + বাস / রিকশা', '২৫ - ৩৫ মিনিট'],
          ['উত্তরা সেক্টর ১০', 'মেট্রোরেল + রিকশা / বাস', '৪০ - ৫০ মিনিট'],
          ['গুলশান ২ / বনানী', 'বাস / কার / সিএনজি', '৩০ - ৪৫ মিনিট'],
          ['মতিঝিল / পুরান ঢাকা', 'বাস / সিএনজি / রিকশা', '২০ - ৩০ মিনিট'],
          ['মোহাম্মদপুর / লালমাটিয়া', 'রিকশা / হেঁটে', '১০ - ১৫ মিনিট']
        ]
      },
      faqs: [
        { question: 'ঢাকায় সিআইবি ক্যাম্পাসটি কোথায় অবস্থিত?', answer: 'আমাদের মূল ক্যাম্পাসটি ঢাকার ধানমন্ডি, কলাবাগান লেক সার্কাস (হাউস-১৬০, লংলাইফ হাসপাতালের পাশে) অবস্থিত।' },
        { question: 'চাকুরিজীবীদের জন্য ঢাকায় কি উইকএন্ড ব্যাচ আছে?', answer: 'হ্যাঁ, চাকুরিজীবী ও বিশ্ববিদ্যালয়ের শিক্ষার্থীদের সুবিধার জন্য আমাদের প্রতি শুক্রবার বিশেষ উইকএন্ড ব্যাচ চালু রয়েছে।' },
        { question: 'ভর্তির আগে কি ক্যাম্পাস পরিদর্শন করা যাবে?', answer: 'অবশ্যই। আমাদের ল্যাব ও কমার্শিয়াল কিচেন সশরীরে দেখার জন্য +880 1338 958997 নম্বরে যোগাযোগ করে ফ্রি ক্যাম্পাস ভিজিট সিডিউল করতে পারেন।' }
      ],
      cta: {
        heading: 'ঢাকায় আপনার রন্ধনশিল্পের প্রশিক্ষণ শুরু করুন',
        subheading: 'আমাদের ধানমন্ডি ক্যাম্পাসে এসে অ্যাডমিশন কাউন্সিলরদের সাথে কথা বলুন এবং কমার্শিয়াল রান্নাঘরটি ঘুরে দেখুন।',
        buttonText: 'ক্যাম্পাস ভিজিট বুক করুন',
        buttonHref: '/contact'
      }
    }
  },
  {
    slug: 'culinary-course-bangladesh',
    en: {
      slug: 'culinary-course-bangladesh',
      meta: {
        title: 'Culinary Course in Bangladesh | Professional Food Production | CIB',
        description: 'Explore premier culinary courses in Bangladesh. Master 16+ international cuisines, advanced food safety, and kitchen operations. Join CIB in Dhaka.'
      },
      hero: {
        badge: 'Professional Culinary Arts',
        heading: 'Culinary Course in Bangladesh',
        subheading: 'Master global food production and kitchen management standards. Earn recognized credentials for international hotel careers.'
      },
      overview: {
        title: 'Culinary Arts & Science Education',
        text: 'A professional culinary course goes beyond simple recipe following; it is an education in food science, kitchen chemistry, and high-volume cost optimization. CIB\'s culinary course in Bangladesh teaches the precise technical disciplines that separate executive culinary managers from basic home cooks.\n\nOur program focuses heavily on global food operations, recipe drafting, ingredient yield calculations, and the execution of 16+ international cuisines. This comprehensive structure guarantees that our graduates are fully qualified to lead commercial kitchens worldwide.'
      },
      highlights: [
        { title: 'Food Chemistry', description: 'Understanding taste profiles, emulsions, and ingredient properties.' },
        { title: '120+ Recipes', description: 'Comprehensive coverage of Western, Asian, and Mediterranean menus.' },
        { title: 'ISO-HACCP Safety', description: 'Strict training in international kitchen sanitation.' },
        { title: 'BTEB & NSDA', description: 'Fully approved national and international vocational standards.' }
      ],
      features: [
        '100% practical lab lessons focusing on precision and technique',
        'Comprehensive study of commercial recipe costing and portion control',
        'ISO-HACCP standards that prevent foodborne hazards in restaurant setups',
        'Special guest lectures and classes conducted by 5-star Executive Chefs',
        'Structured industrial internships at premier hotels in Dhaka',
        'Post-course support and career counseling for international placements'
      ],
      table: {
        heading: 'Our Culinary Courses & Modules Comparison',
        headers: ['Program Level', 'Duration', 'Key Focus Area', 'Best Suited For'],
        rows: [
          ['Fast Food Course', '1 Month (Short)', 'Burgers, Pizza, Snacks', 'Entrepreneurs / Cafes'],
          ['Pro Chef Course', '3 Months (Intensive)', '120+ Recipes, Multi-cuisine', 'Job Seekers / Placements'],
          ['Culinary Diploma', '6 Months (Comprehensive)', 'Advanced Management & Plating', 'Cruises / Executive Careers']
        ]
      },
      faqs: [
        { question: 'What is the difference between home cooking and culinary arts?', answer: 'Home cooking is domestic and simple. Culinary arts involves professional kitchen hierarchy, commercial cooking equipment, precision plating, portion costing, and strict food safety compliance (HACCP).' },
        { question: 'Will I learn pastry and baking in this course?', answer: 'Yes, CIB\'s culinary courses include a dedicated bonus module on baking and pastry arts, covering breads, doughs, cakes, and decoration.' },
        { question: 'Are there scholarship opportunities?', answer: 'Yes. CIB offers partial merit-based scholarships and fee waivers for outstanding candidates. Contact our admissions desk for details.' }
      ],
      cta: {
        heading: 'Enroll in the Premier Culinary Academy',
        subheading: 'Take the first step to professional mastery. Get the skills that give you a high-paying career.',
        buttonText: 'View Admission Requirements',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'culinary-course-bangladesh',
      meta: {
        title: 'কালিনারি কোর্স ইন বাংলাদেশ | প্রফেশনাল ফুড প্রোডাকশন ও শেফ ট্রেনিং | সিআইবি',
        description: 'বাংলাদেশে প্রফেশনাল কালিনারি কোর্স করুন। ১৬+ আন্তর্জাতিক কুইজিন, উন্নত ফুড সেফটি ও রান্নাঘর ব্যবস্থাপনা শিখুন। ধানমন্ডিতে সিআইবি ক্যাম্পাস।'
      },
      hero: {
        badge: 'প্রফেশনাল কালিনারি আর্টস',
        heading: 'বাংলাদেশে কালিনারি কোর্স',
        subheading: 'বিশ্বমানের ফুড প্রোডাকশন ও রান্নাঘর ব্যবস্থাপনা আর্টস শিখুন। আন্তর্জাতিক হোটেল সেক্টরে কাজ করার জন্য প্রয়োজনীয় সরকারি সনদ অর্জন করুন।'
      },
      overview: {
        title: 'কালিনারি আর্টস ও ফুড সায়েন্স এডুকেশন',
        text: 'একটি পেশাদার কালিনারি কোর্স কেবল সাধারণ রেসিপি তৈরি শেখায় না; এটি খাদ্য বিজ্ঞান, পুষ্টিমান এবং বাণিজ্যিক খরচ নিয়ন্ত্রণের একটি পূর্ণাঙ্গ শিক্ষা। সিআইবি (CIB) বাংলাদেশের সেরা কালিনারি কোর্স প্রদান করছে, যা একজন সাধারণ রাঁধুনিকে একজন আধুনিক কালিনারি ম্যানেজারে রূপান্তর করে।\n\nআমাদের কারিকুলামে ফুড সায়েন্স, রেসিপি কস্টিং, কুইজিন ম্যানেজমেন্ট এবং বিশ্বখ্যাত ১৬টি দেশের ঐতিহ্যবাহী রেসিপি অন্তর্ভুক্ত রয়েছে। এই পূর্ণাঙ্গ শিক্ষা নিশ্চিত করে যে আমাদের শিক্ষার্থীরা বিশ্বজুড়ে যেকোনো কমার্শিয়াল কিচেনে সফল হতে পারবেন।'
      },
      highlights: [
        { title: 'খাদ্য বিজ্ঞান', description: 'খাবারের পুষ্টিগুণ, স্বাদ তৈরি এবং উপাদানের বৈজ্ঞানিক ব্যবহার।' },
        { title: '১২০+ রেসিপি', description: 'ইউরোপীয়, এশিয়ান এবং ওয়েস্টার্ন ফুড আর্টসের বিস্তারিত শিক্ষণ।' },
        { title: 'আইএসও-এইচএসিসিপি', description: 'খাদ্য নিরাপত্তা ও স্বাস্থ্যবিধির আন্তর্জাতিক নিয়মের কড়া অনুশীলন।' },
        { title: 'এনএসডিএ ও বিটিইবি', description: 'ভোকেশনাল দক্ষতার সর্বোচ্চ সরকারি মানদণ্ড।' }
      ],
      features: [
        'শতভাগ ব্যবহারিক ক্লাস যা আপনার নিখুঁত কাটিং ও প্লাটিং দক্ষতা নিশ্চিত করে',
        'বাণিজ্যিক রেসিপি কস্টিং এবং ওয়েস্টেজ কন্ট্রোলের ওপর বিশেষ ধারণা',
        'রেস্তোরাঁর খাবার সুরক্ষিত রাখতে আন্তর্জাতিক ফুড হাইজিন প্রশিক্ষণ',
        'ফাইভ-স্টার হোটেলের এক্সিকিউটিভ শেফদের দ্বারা মাস্টারক্লাস পরিচালনা',
        'ঢাকার শীর্ষস্থানীয় ফাইভ-স্টার হোটেলগুলোতে ৩ মাসের ইন্টার্নশিপ সুযোগ',
        'বিদেশি হোটেল ও বিলাসবহুল ক্রুজে চাকরির আবেদন এবং ক্যারিয়ার গাইডলাইন'
      ],
      table: {
        heading: 'আমাদের কালিনারি কোর্স ও মডিউল তুলনা',
        headers: ['কোর্সের নাম', 'সময়সীমা', 'মূল ফোকাস এরিয়া', 'কাদের জন্য উপযোগী'],
        rows: [
          ['ফাস্ট ফুড কোর্স', '১ মাস (শর্ট)', 'বার্গার, পিৎজা, কন্টিনেন্টাল সস', 'নতুন উদ্যোক্তা / ক্যাফে'],
          ['প্রফেশনাল শেফ কোর্স', '৩ মাস (নিবিড়)', '১২০+ রেসিপি, মাল্টি-কুইজিন', 'চাকরিপ্রার্থী / বিদেশগামী'],
          ['কালিনারি ডিপ্লোমা', '৬ মাস (পূর্ণাঙ্গ)', 'অ্যাডভান্সড কিচেন ম্যানেজমেন্ট', 'ক্রুজশিপ / ক্যারিয়ার অর্জনকারী']
        ]
      },
      faqs: [
        { question: 'ঘরোয়া রান্না আর কালিনারি আর্টস-এর মধ্যে পার্থক্য কী?', answer: 'ঘরোয়া রান্না সাধারণত ঘরোয়া উপায়ে করা হয়। কালিনারি আর্টস-এ কমার্শিয়াল কিচেন ইকুইপমেন্ট ব্যবহার, সূক্ষ্ম কাটিং, চমৎকার প্লেটিং ও ফুড সেফটি রুলস (HACCP) মেনে রান্না শেখানো হয়।' },
        { question: 'এই কালিনারি কোর্সে কি বেকিং অন্তর্ভুক্ত আছে?', answer: 'হ্যাঁ, সিআইবি-র কালিনারি কোর্সে ফ্রি বেকিং ও পেস্ট্রি বোনাস মডিউল রয়েছে, যেখানে রুটি, পেস্ট্রি, ডো এবং কেক ডেকোরেশন শেখানো হয়।' },
        { question: 'যোগ্য শিক্ষার্থীদের জন্য কি স্কলারশিপের সুযোগ আছে?', answer: 'হ্যাঁ, প্রতি ব্যাচেই মেধাবী ও আর্থিকভাবে অসচ্ছল শিক্ষার্থীদের জন্য আংশিক স্কলারশিপের ব্যবস্থা রয়েছে। বিস্তারিত জানতে আমাদের ক্যাম্পাসে কথা বলুন।' }
      ],
      cta: {
        heading: 'সেরা কালিনারি একাডেমিতে আজই যোগ দিন',
        subheading: 'দক্ষ পেশাদার হিসেবে ক্যারিয়ার গড়তে প্রস্তুত হোন। আপনার কালিনারি স্বপ্নকে বাস্তবে রূপ দিন।',
        buttonText: 'ভর্তির নিয়মাবলী দেখুন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'fast-food-course-dhaka',
    en: {
      slug: 'fast-food-course-dhaka',
      meta: {
        title: 'Fast Food Course in Dhaka | Short Baking & Cooking Course | CIB',
        description: 'Enroll in our Fast Food Course in Dhaka. Learn commercial secrets for burgers, pizza, pasta, and appetizers. 3,999 BDT total fee. Certified short course.'
      },
      hero: {
        badge: 'Short Course Enrollment',
        heading: 'Fast Food Course in Dhaka',
        subheading: 'Learn the commercial recipes behind Dhaka\'s most popular fast-food items. Perfect for aspiring cafe entrepreneurs. Only BDT 3,999.'
      },
      overview: {
        title: 'Fast Food & Appetizer Mastery',
        text: 'Dhaka\'s street food and cafe culture is thriving. Launching a successful fast-food outlet or cloud kitchen requires standardized recipes that guarantee consistency and profit margins. CIB\'s Fast Food Course in Dhaka is a highly structured, 1-month short program designed to teach the commercial preparation of premium fast-food items.\n\nFrom baking the perfect soft brioche burger buns to preparing signature pizza doughs, gourmet pastas, and signature sauces, this course covers the exact items that dominate cafe menus today.'
      },
      highlights: [
        { title: 'BDT 3,999 Total Fee', description: 'Affordable fee covering all raw ingredients.' },
        { title: '1-Month Duration', description: 'Short, intensive, highly practical syllabus.' },
        { title: 'Commercial Recipes', description: 'Standardized methods designed for business success.' },
        { title: 'Certificate Issued', description: 'CIB institutional certificate upon completion.' }
      ],
      features: [
        'Hands-on preparation of burgers, pizzas, pastas, and dynamic wraps',
        'Learn the chemistry of commercial sauces and dressing formulas',
        'Detailed lessons on dough fermentation and baking conditions',
        'Food costing advice to maximize profit margins for cafe startups',
        'HACCP-compliant raw material handling and kitchen hygiene training',
        'Direct career counseling on starting your own home bakery or cafe business'
      ],
      table: {
        heading: 'Fast Food Course Curriculum & Recipes',
        headers: ['Module', 'Items Taught', 'Skills Covered'],
        rows: [
          ['Burgers & Sandwiches', 'Gourmet Beef Burger, Crispy Chicken, Sandwiches', 'Patty seasoning, brioche buns, commercial dressings'],
          ['Pizzas & Breads', 'Italian Pizza, Garlic Bread, Calzone', 'Yeast fermentation, stretching, commercial baking'],
          ['Pasta & Appetizers', 'White Sauce Pasta, Baked Pasta, French Fries', 'Emulsions, saucing, deep-frying controls'],
          ['Beverages & Mocktails', 'Cold Coffee, Mint Lemonade, Mojito', 'Blending, layering, cafe beverage service']
        ]
      },
      faqs: [
        { question: 'What is the total fee for the Fast Food Course in Dhaka?', answer: 'The total fee is only BDT 3,999, which covers all raw ingredients, training materials, and certification. There are no hidden charges.' },
        { question: 'Is this course suitable for beginners?', answer: 'Yes. Most of our students start with zero commercial cooking experience. We guide you step-by-step from raw materials to final plating.' },
        { question: 'Do I get a certificate after completing this course?', answer: 'Yes, CIB issues a recognized institutional certificate of achievement in Fast Food and Commercial Appetizer Production upon completion.' }
      ],
      cta: {
        heading: 'Launch Your Cafe Business Today',
        subheading: 'Learn the commercial recipes that guarantee customers and profits.',
        buttonText: 'Register for Fast Food Course',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'fast-food-course-dhaka',
      meta: {
        title: 'ঢাকায় ফাস্ট ফুড কোর্স | শর্ট কুকিং ও বেকিং কোর্স মাত্র ৩,৯৯৯ টাকা | সিআইবি',
        description: 'ঢাকার সিআইবিতে প্রফেশনাল ফাস্ট ফুড শর্ট কোর্স করুন। বার্গার, পিৎজা, পাস্তা ও সস তৈরির কমার্শিয়াল রেসিপি শিখুন মাত্র ৩,৯৯৯ টাকায়।'
      },
      hero: {
        badge: 'শর্ট কোর্স ভর্তি ২০২৬',
        heading: 'ঢাকায় ফাস্ট ফুড কোর্স',
        subheading: 'ঢাকার ক্যাফে ও রেস্টুরেন্টগুলোর জনপ্রিয় ফাস্ট ফুড রেসিপি কমার্শিয়াল পদ্ধতিতে শিখুন। উদ্যোক্তাদের জন্য বিশেষ উপযোগী। কোর্স ফি মাত্র ৩,৯৯৯ টাকা।'
      },
      overview: {
        title: 'ফাস্ট ফুড ও অ্যাপেটাইজার প্রস্তুতকরণ প্রশিক্ষণ',
        text: 'ঢাকায় ক্যাফে সংস্কৃতি এবং কুইক সার্ভিস রেস্টুরেন্টের ব্যবসা দ্রুত বাড়ছে। একটি সফল ফাস্ট ফুড শপ বা ক্লাউড কিচেন শুরু করার জন্য রেসিপির ধারাবাহিকতা ও সঠিক প্রফিট মার্জিন জানা জরুরি। সিআইবি (CIB) ১ মাস মেয়াদী কমার্শিয়াল ফাস্ট ফুড কোর্স দিচ্ছে, যা অত্যন্ত জনপ্রিয় ফাস্ট ফুড আইটেমগুলো হাতের-কলমে শেখায়।\n\nনরম বার্গার বান তৈরি, পারফেক্ট পিৎজা ডো, হোয়াইট সস ও বেকড পাস্তা এবং বিভিন্ন ধরনের সস ও মেয়নেজ তৈরির গোপন ফর্মুলা শিখতে পারবেন আমাদের এই প্রফেশনাল কোর্সে।'
      },
      highlights: [
        { title: '৩,৯৯৯ টাকা মোট ফি', description: 'সমস্ত কাঁচামালের খরচ ফি-র মধ্যে অন্তর্ভুক্ত।' },
        { title: '১ মাস মেয়াদ', description: 'সংক্ষিপ্ত, সম্পূর্ণ প্র্যাক্টিক্যাল ভিত্তিক সিলেবাস।' },
        { title: 'কমার্শিয়াল রেসিপি', description: 'ব্যবসা ও বিক্রির জন্য পারফেক্ট স্বাদ ও ফর্মুলা।' },
        { title: 'সার্টিফিকেট প্রদান', description: 'সফলভাবে কোর্স সমাপ্তির পর সিআইবি সনদ।' }
      ],
      features: [
        'হাতে-কলমে বার্গার, পিৎজা, পাস্তা এবং র‍্যাপ তৈরি',
        'কমার্শিয়াল সস, মেয়োনেজ ও ড্রেসিং তৈরির গোপন সূত্র',
        'ডো তৈরি, গাঁজন (Fermentation) এবং বেকিং তাপমাত্রা নিয়ন্ত্রণ',
        'ফুড কস্টিং ও মেনু প্ল্যানিং সংক্রান্ত বিশেষ ধারণা',
        'খাবারের কাঁচামাল স্টোরিং এবং নিরাপদ ফুড সেফটি গাইডলাইন',
        'নিজস্ব কফি শপ, হোম বেকারি বা রেস্টুরেন্ট শুরু করার ব্যবসায়িক পরামর্শ'
      ],
      table: {
        heading: 'ফাস্ট ফুড কোর্স কারিকুলাম ও রেসিপি সমূহ',
        headers: ['মডিউল', 'শেখানো আইটেম', 'দক্ষতা ক্ষেত্র'],
        rows: [
          ['বার্গার ও স্যান্ডউইচ', 'বিফ বার্গার, ক্রিস্পি চিকেন বার্গার, ক্লাব স্যান্ডউইচ', 'প্যাটি মশলাকরণ, বান টোস্টিং, সিগনেচার সস'],
          ['পিৎজা ও ব্রেডস', 'ইতালীয় পিৎজা, গার্লিক ব্রেড, ক্যালজোন', 'ইস্ট ফার্মেন্টেশন, পিৎজা সস, ওভেন বেকিং'],
          ['পাস্তা ও ফ্রেঞ্চ ফ্রাই', 'হোয়াইট সস পাস্তা, বেকড পাস্তা, মচমচে ফ্রেঞ্চ ফ্রাই', 'সস ইমালশন, ডিপ-ফ্রাইং সময় ও তাপমাত্রা নিয়ন্ত্রণ'],
          ['ড্রিংকস ও মকটেলস', 'কোল্ড কফি, মিন্ট লেমনেড, ভার্জিন মোহিতো', 'ব্লেন্ডিং, ক্যাফে ড্রিংকস প্রস্তুত ও পরিবেশন']
        ]
      },
      faqs: [
        { question: 'ঢাকায় ফাস্ট ফুড কোর্সের মোট ফি কত টাকা?', answer: 'ফাস্ট ফুড শর্ট কোর্সের মোট ফি মাত্র ৩,৯৯৯ টাকা। এই ফি-র মধ্যে সকল কাঁচামাল এবং সার্টিফিকেট অন্তর্ভুক্ত রয়েছে। কোনো অতিরিক্ত চার্জ নেই।' },
        { question: 'রান্নার কোনো অভিজ্ঞতা না থাকলে কি এই কোর্স করা যাবে?', answer: 'হ্যাঁ, আমাদের শিক্ষার্থীদের একটি বড় অংশই রান্নার শূন্য অভিজ্ঞতা নিয়ে শুরু করেন। আমরা প্রথম থেকে প্রতিটি রেসিপি হাতে-কলমে শিখিয়ে থাকি।' },
        { question: 'কোর্স শেষে কি সার্টিফিকেট দেওয়া হবে?', answer: 'হ্যাঁ, সফলভাবে কোর্স সমাপ্তির পর সিআইবি (Culinary Institute of Bangladesh) থেকে একটি প্রাতিষ্ঠানিক সার্টিফিকেট প্রদান করা হবে।' }
      ],
      cta: {
        heading: 'আপনার ক্যাফে ব্যবসা শুরু করার এখনই সময়',
        subheading: 'শিখুন সেই সব কমার্শিয়াল রেসিপি যা কাস্টমার বাড়াবে এবং প্রফিট মার্জিন বজায় রাখবে।',
        buttonText: 'ফাস্ট ফুড কোর্সে ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'barista-course-dhaka',
    en: {
      slug: 'barista-course-dhaka',
      meta: {
        title: 'Barista Course in Dhaka | Chef & Coffee Brewing Combo | CIB',
        description: 'Become a certified barista in Dhaka. Master espresso brewing, latte art, coffee science, and beverage management. Join our Chef+Barista Combo.'
      },
      hero: {
        badge: 'Beverage Specialty 2026',
        heading: 'Barista Course in Dhaka',
        subheading: 'Master espresso extraction, latte art, and coffee shop operations. Secure premium jobs in global coffee chains.'
      },
      overview: {
        title: 'Professional Barista & Coffee Science',
        text: 'The specialty coffee industry is expanding at a record pace. From local artisan cafes in Dhaka to global brands in Europe and North America, certified baristas are in exceptionally high demand. CIB\'s Barista Course in Dhaka (included in our Chef+Barista Combo) provides intensive training in espresso physics, milk texturing, latte art, and cafe workflow management.\n\nUnder the guidance of professional beverage mentors, you will train directly on commercial Italian espresso machines and grinders, mastering coffee extraction, grind adjustment, and the chemistry behind the perfect cup.'
      },
      highlights: [
        { title: 'Espresso Physics', description: 'Understanding pressure, temperature, and extraction rates.' },
        { title: 'Latte Art Mastery', description: 'Hands-on pouring techniques for hearts, rosettas, and tulips.' },
        { title: 'Cafe Operations', description: 'Equipment maintenance, workflow, and customer service.' },
        { title: 'Barista Certification', description: 'Accredited certificate for domestic & international coffee jobs.' }
      ],
      features: [
        'Direct practice on commercial multi-boiler Italian espresso machines',
        'Learn coffee bean origins, roasting science, and sensory cupping',
        'Perfecting micro-foam steaming and pouring high-fidelity latte art',
        'Complete hot and cold cafe beverage menu training',
        'Daily cleaning, backflushing, and maintenance of barista tools',
        'Guidance on starting a specialty coffee shop with high profit margins'
      ],
      table: {
        heading: 'Barista Course Modules & Skills Taught',
        headers: ['Module Title', 'Beverage Coverage', 'Key Barista Skills'],
        rows: [
          ['Espresso Foundations', 'Solo Espresso, Ristretto, Americano', 'Grinder calibration, tamping pressure, extraction logs'],
          ['Milk Texturing & Art', 'Cappuccino, Flat White, Cafe Latte', 'Micro-foam steaming, temperature control, free-pour art'],
          ['Cold Beverage Menu', 'Iced Latte, Affogato, Frappuccino, Flavor syrups', 'Ice blending controls, portioning, aesthetic layering'],
          ['Cafe Business Management', 'Menu planning, cost optimization', 'Inventory, equipment selection, barista operations']
        ]
      },
      faqs: [
        { question: 'What is the duration of the Barista training in Dhaka?', answer: 'The barista training is integrated within our 3-Month Chef + Barista Combo, ensuring you gain comprehensive food and beverage skills.' },
        { question: 'Is prior experience needed to learn barista skills?', answer: 'No. Our program starts with the basic anatomy of coffee beans and grinder adjustments before progressing to advanced latte art.' },
        { question: 'Are there jobs for baristas abroad?', answer: 'Yes, certified baristas are highly sought after in the UAE, Saudi Arabia, UK, and Australia, commanding excellent wages.' }
      ],
      cta: {
        heading: 'Master the Art of Specialty Coffee',
        subheading: 'Get certified and start your career in the booming coffee industry.',
        buttonText: 'Apply for Chef + Barista Combo',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'barista-course-dhaka',
      meta: {
        title: 'ঢাকায় বারিস্তা কোর্স | শেফ ও কফি ব্রিউইং কম্বো ট্রেনিং | সিআইবি',
        description: 'ঢাকায় প্রফেশনাল বারিস্তা ও কফি মেকিং কোর্স করুন। এসপ্রেসো এক্সট্রাকশন, ল্যাটে আর্ট এবং ক্যাফে ম্যানেজমেন্ট শিখুন আমাদের শেফ+বারিস্তা কম্বোতে।'
      },
      hero: {
        badge: 'বেভারেজ স্পেশালিটি ২০২৬',
        heading: 'ঢাকায় বারিস্তা কোর্স',
        subheading: 'এসপ্রেসো এক্সট্রাকশন, ল্যাটে আর্ট এবং কফি শপ ম্যানেজমেন্ট শিখুন। আন্তর্জাতিক কফি চেইনে উচ্চ বেতনের চাকরি নিশ্চিত করুন।'
      },
      overview: {
        title: 'প্রফেশনাল বারিস্তা ও কফি সায়েন্স',
        text: 'স্পেশালিটি কফি ইন্ডাস্ট্রির বর্তমান বাজার অত্যন্ত সম্ভাবনাময়। ঢাকার নামিদামি ক্যাফে থেকে শুরু করে ইউরোপ ও কানাডার গ্লোবাল কফি শপগুলোতে দক্ষ বারিস্তাদের প্রচুর চাহিদা রয়েছে। সিআইবি (CIB) ঢাকার সেরা বারিস্তা কোর্সটি প্রদান করছে (আমাদের শেফ+বারিস্তা কম্বোর অংশ হিসেবে), যা এসপ্রেসো মেকিং, মিল্ক টেক্সচারিং ও ল্যাটে আর্ট তৈরিতে সম্পূর্ণ কমার্শিয়াল কিচেন প্রশিক্ষণ দেয়।\n\nপেশাদার বেভারেজ মেন্টরদের অধীনে সরাসরি ইতালিয়ান কমার্শিয়াল এসপ্রেসো মেশিনে ও গ্রাইন্ডার দিয়ে কফি গ্রাইন্ডিং, ট্যাম্পিং এবং সঠিক এক্সট্রাকশন টেকনিক শিখতে পারবেন।'
      },
      highlights: [
        { title: 'এসপ্রেসো সায়েন্স', description: 'প্রেসার, ওয়াটার টেম্পারেচার এবং এক্সট্রাকশন টাইমিং নিয়ন্ত্রণ।' },
        { title: 'ল্যাটে আর্ট দক্ষতা', description: 'হার্ট, রোজেটা এবং টিউলিপ আর্ট তৈরির প্র্যাক্টিক্যাল POURING কৌশল।' },
        { title: 'ক্যাফে অপারেশনস', description: 'কমার্শিয়াল কফি মেশিন রক্ষণাবেক্ষণ ও ক্যাফে সার্ভিস রুলস।' },
        { title: 'বারিস্তা সার্টিফিকেট', description: 'দেশি ও বিদেশি কফি শপে কাজের জন্য আন্তর্জাতিক মানসম্মত সনদ।' }
      ],
      features: [
        'কমার্শিয়াল ইতালিয়ান এসপ্রেসো মেশিনে সরাসরি কাজ করার শতভাগ প্র্যাক্টিক্যাল ক্লাস',
        'কফি বিনের প্রকারভেদ, রোস্টিং সায়েন্স এবং কফি টেস্টিং (Sensory Cupping)',
        'পারফেক্ট ক্যাপুচিনো ও ল্যাটের জন্য কড়া ফেনা (Micro-foam) তৈরি করা',
        'হট এবং কোল্ড ক্যাফে ড্রিংকস মেনুর পূর্ণাঙ্গ রেসিপি',
        'বারিস্তা টুলস ক্লিনিং এবং মেশিন ব্যাকফ্লাশিং নিয়মিত তদারকি',
        'বিশেষ লভ্যাংশ সহ কফি শপ ও ক্যাফে শুরু করার গোপন টিপস'
      ],
      table: {
        heading: 'বারিস্তা কোর্স মডিউল ও শেখানো দক্ষতাসমূহ',
        headers: ['মডিউল শিরোনাম', 'বেভারেজ আইটেম', 'বারিস্তা দক্ষতা ক্ষেত্র'],
        rows: [
          ['এসপ্রেসো ফাউন্ডেশনস', 'সোলো এসপ্রেসো, রিস্ট্রেটো, আমেরিকান কফি', 'গ্রাইন্ডার ক্যালিব্রেশন, ট্যাম্পিং প্রেসার, ওয়াটার ফ্লো রেট'],
          ['মিল্ক টেক্সচারিং ও ল্যাটে আর্ট', 'ক্যাপুচিনো, ফ্ল্যাট হোয়াইট, ক্যাফে ল্যাটে', 'স্টিমিং টেম্পারেচার, ফোম লেভেল, ফ্রি-পৌর আর্ট'],
          ['কোল্ড বেভারেজ মেনু', 'আইসড ল্যাটে, অ্যাফোগাতো, ফ্র্যাপুচিনো, কোল্ড ব্রিউ', 'আইস ব্লেন্ডার ব্যবহার, সুন্দর লেয়ারিং, ফ্লেভার সিরাপ ব্যালেন্স'],
          ['কফি শপ ম্যানেজমেন্ট', 'মেনু সিলেকশন, মেটেরিয়াল কস্টিং', 'কফি বিন ইনভেন্টরি, ক্যাফে লেআউট, বারিস্তা কাজ শিডিউলিং']
        ]
      },
      faqs: [
        { question: 'ঢাকায় বারিস্তা ট্রেনিংয়ের সময়সীমা কতদিন?', answer: 'বারিস্তা কোর্সটি আমাদের ৩ মাস মেয়াদী শেফ + বারিস্তা কম্বো কোর্সের অন্তর্ভুক্ত, যা আপনাকে ফুড এবং বেভারেজ দুই সেক্টরেই দক্ষ করে তোলে।' },
        { question: 'বারিস্তা কোর্স করতে কি পূর্ব অভিজ্ঞতার প্রয়োজন আছে?', answer: 'না, কফি বিন কী এবং কীভাবে গ্রাইন্ডার অ্যাডজাস্ট করতে হয় সেখান থেকে শুরু করে আমরা অ্যাডভান্স ল্যাটে আর্ট পর্যন্ত ধাপে ধাপে শেখাই।' },
        { question: 'বারিস্তাদের জন্য কি বিদেশে চাকরির সুযোগ আছে?', answer: 'হ্যাঁ, বিশেষ করে দুবাই, কাতার, সৌদি আরব এবং অস্ট্রেলিয়াতে সার্টিফাইড বারিস্তাদের প্রচুর চাহিদা রয়েছে এবং বেতনও অনেক আকর্ষণীয়।' }
      ],
      cta: {
        heading: 'স্পেশালিটি কফির পেশাদার জগতে প্রবেশ করুন',
        subheading: 'সনদ অর্জন করুন এবং বিশ্বের দ্রুত বর্ধনশীল কফি ইন্ডাস্ট্রিতে বারিস্তা হিসেবে ক্যারিয়ার গড়ুন।',
        buttonText: 'শেফ + বারিস্তা কম্বো কোর্সে ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'pastry-bakery-course-dhaka',
    en: {
      slug: 'pastry-bakery-course-dhaka',
      meta: {
        title: 'Pastry & Bakery Course in Dhaka | Professional Baking Academy | CIB',
        description: 'Learn artisanal baking and French pastry arts. Master bread making, cakes, puff pastry, desserts, and bakery business management in Dhaka.'
      },
      hero: {
        badge: 'Baking Specialty 2026',
        heading: 'Pastry & Bakery Course in Dhaka',
        subheading: 'Master French pastry arts and commercial bakery operations. Learn the science of baking and launch your home business.'
      },
      overview: {
        title: 'Artisanal Baking & French Pastry Arts',
        text: 'Baking is a science governed by weight, temperature, and chemical reactions. To succeed in the commercial baking sector, you must understand the physics of gluten development, yeast fermentation, and sugar crystallization. CIB\'s Pastry & Bakery Course in Dhaka offers a premium, hands-on path to master artisanal baking and French pastry arts.\n\nFrom baking crusty baguettes and soft croissants to creating high-end multi-layered entremets, cheesecakes, and custom fondant decorations, our course covers the exact skills demanded by premium hotels and successful home bakers.'
      },
      highlights: [
        { title: 'Baking Chemistry', description: 'Understanding flour types, hydration, and leaveners.' },
        { title: 'Artisanal Breads', description: 'Sourdough, baguettes, croissants, and brioche.' },
        { title: 'French Pastry', description: 'Macarons, tarts, eclairs, and entremets.' },
        { title: 'Home Business Support', description: 'Marketing, packaging, and pricing advice.' }
      ],
      features: [
        'Hands-on practice using commercial deck ovens and spiral mixers',
        'Learn advanced bread lamination techniques for croissants and puff pastries',
        'Gourmet cake baking, slicing, filling, and sharp-edge frosting methods',
        'HACCP-compliant raw material handling and baking hygiene standards',
        'Mentorship under certified pastry chefs with years of hotel experience',
        'Direct business coaching for launching a premium boutique bakery or home kitchen'
      ],
      table: {
        heading: 'Pastry & Bakery Course Modules',
        headers: ['Module Name', 'Items Taught', 'Baking Skills Covered'],
        rows: [
          ['Artisanal Yeast Breads', 'Baguette, Sourdough, Brioche, Burger Buns', 'Gluten structure, shaping, proving, steam injection'],
          ['Laminated Doughs', 'Croissants, Danish Pastry, Puff Pastry', 'Butter block preparation, folding, baking temperature'],
          ['Classic Cakes & Frosting', 'Red Velvet, Vanilla, Chocolate Fudge, Cheesecakes', 'Sponge preparation, crumb coating, piping, sharp-edge finishing'],
          ['Premium French Desserts', 'Macarons, Chocolate Tarts, Cream Eclairs', 'Meringue science, ganache emulsions, pastry cream prep']
        ]
      },
      faqs: [
        { question: 'What is the duration of the Pastry & Bakery Course in Dhaka?', answer: 'The Pastry and Bakery module is offered as a specialized track and is also included as a bonus within our Professional Chef Course.' },
        { question: 'Can I start a home bakery business after this course?', answer: 'Absolutely. Many of our alumni have successfully launched profitable home bakeries in Dhaka, earning BDT 50,000+ per month.' },
        { question: 'Do you provide all baking ingredients?', answer: 'Yes. CIB covers the cost of all premium raw baking ingredients, baking kits, and recipes. There are no additional expenses.' }
      ],
      cta: {
        heading: 'Become a Certified Master Baker',
        subheading: 'Master the science of baking and turn your passion into a profitable career.',
        buttonText: 'Register for Baking Course',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'pastry-bakery-course-dhaka',
      meta: {
        title: 'ঢাকায় পেস্ট্রি ও বেকারি কোর্স | প্রফেশনাল বেকিং ও ডেজার্ট মেকিং | সিআইবি',
        description: 'ঢাকায় সেরা পেস্ট্রি ও বেকারি কোর্স করুন। ফ্রেঞ্চ পেস্ট্রি, আর্টিসানাল রুটি, কেক ও ডেজার্ট তৈরির কলাকৌশল এবং বেকারি ব্যবসা ব্যবস্থাপনা শিখুন।'
      },
      hero: {
        badge: 'বেকিং স্পেশালিটি ২০২৬',
        heading: 'ঢাকায় পেস্ট্রি ও বেকারি কোর্স',
        subheading: 'ফ্রেঞ্চ পেস্ট্রি আর্টস এবং কমার্শিয়াল বেকারি ডিজাইন শিখুন। বেকিংয়ের বিজ্ঞান শিখে নিজের লাভজনক হোম-বেকিং ব্যবসা শুরু করুন।'
      },
      overview: {
        title: 'আর্টিসানাল বেকিং ও ফ্রেঞ্চ পেস্ট্রি আর্টস',
        text: 'বেকিং এমন একটি বিজ্ঞান যা ময়দা, তাপমাত্রা ও রাসায়নিক প্রতিক্রিয়ার ওপর নির্ভর করে। কমার্শিয়াল বেকিং সেক্টরে সফল হতে হলে গ্লুটেন গঠন, ইস্ট ফারমেন্টেশন এবং সুগার ক্রিস্টালাইজেশনের বিজ্ঞান বুঝতে হবে। সিআইবি (CIB) ঢাকার সেরা পেস্ট্রি ও বেকারি কোর্স অফার করছে, যা আর্টিসানাল বেকিং ও ফ্রেঞ্চ পেস্ট্রি তৈরির সঠিক কৌশল শিখিয়ে থাকে।\n\nমুচমুচে ফ্রেঞ্চ ক্রোস্যান্ট (Croissants) তৈরি থেকে শুরু করে প্রফেশনাল মাল্টি-লেয়ার এন্ট্রিমেটস, চিজকেক ও কাস্টম ফন্ডেন্ট ডেকোরেশন—সবই আমাদের কোর্সে অত্যন্ত বিস্তারিতভাবে শেখানো হয়।'
      },
      highlights: [
        { title: 'বেকিং রসায়ন', description: 'ময়দার প্রকারভেদ, হাইড্রেশন ও ইস্ট-এর সঠিক অনুপাত।' },
        { title: 'আর্টিসানাল ব্রেড', description: 'টক-মিষ্টি সাওয়ারডো, ফ্রেঞ্চ ব্যাগেট ও নরম ক্রোস্যান্ট।' },
        { title: 'ফ্রেঞ্চ পেস্ট্রি', description: 'রঙিন ম্যাকারণস, চকলেট টার্টস ও সুস্বাদু এক্লেয়ার্স।' },
        { title: 'হোম বিজনেস গাইড', description: 'প্যাকেজিং, মার্কেটিং ও সঠিক প্রফিট মার্জিন নির্ধারণ।' }
      ],
      features: [
        'কমার্শিয়াল ডেক ওভেন ও স্পাইরাল মিক্সার মেশিন ব্যবহারের প্র্যাক্টিক্যাল ক্লাস',
        'ক্রোস্যান্ট ও পাফ পেস্ট্রির জন্য মাখন ভাঁজ করার (Lamination) উন্নত কৌশল',
        'স্পঞ্জ কেক তৈরি, লেয়ারিং এবং নিখুঁত শার্প-এজ হুইপড ক্রিম ডেকোরেশন',
        'খাবারের স্বাস্থ্যবিধি বজায় রাখতে আইএসও খাদ্য নিরাপত্তা নিয়ম অনুসরণ',
        'বহু বছরের ফাইভ-স্টার হোটেল অভিজ্ঞতাসম্পন্ন পেস্ট্রি শেফদের মেন্টরশিপ',
        'নিজের ব্র্যান্ডের অধীনে কাস্টমাইজড কেক ও ডেজার্ট শপ শুরু করার ব্যবসায়িক কৌশল'
      ],
      table: {
        heading: 'পেস্ট্রি ও বেকারি কোর্সের সিলেবাস',
        headers: ['মডিউলের নাম', 'শেখানো আইটেমসমূহ', 'বেকিং দক্ষতার ক্ষেত্র'],
        rows: [
          ['আর্টিসানাল ব্রেড মেকিং', 'ফ্রেঞ্চ ব্যাগেট, সাওয়ারডো, ব্রোশ রুটি, বার্গার বান', 'ময়দার খামির গঠন, শেপিং, স্টিম ওভেন বেকিং'],
          ['ভাঁজ করা ডো (Laminated)', 'ক্রোস্যান্টস, ড্যানিশ পেস্ট্রি, পাফ পেস্ট্রি', 'বাটার ব্লক ফোল্ডিং কৌশল, রোলিং এবং ল্যামিনেশন'],
          ['ক্লাসিক কেক ও ডেকোরেশন', 'রেড ভেলভেট কেক, চকলেট ফাজ, চিজকেক, পেস্ট্রি কেক', 'স্পঞ্জ স্পিনিং, ক্রাম্ব কোটিং, পাইপিং ও হুইপড ক্রিম ফিনিশিং'],
          ['প্রিমিয়াম ফ্রেঞ্চ ডেজার্ট', 'রঙিন ম্যাকারণস, চকলেট টার্টস, ক্রিম এক্লেয়ার্স', 'মেরিংউ বিজ্ঞান, চকলেট গানাশ ইমালশন, পেস্ট্রি ক্রিম প্রস্তুতকরণ']
        ]
      },
      faqs: [
        { question: 'ঢাকায় পেস্ট্রি ও বেকারি কোর্সের মেয়াদ কতদিন?', answer: 'বেকারি ও পেস্ট্রি মডিউলটি আমাদের প্রফেশনাল শেফ কোর্সের অংশ হিসেবে বোনাস আকারে অন্তর্ভুক্ত রয়েছে, যা শিক্ষার্থীদের অলরাউন্ডার হতে সাহায্য করে।' },
        { question: 'কোর্স শেষ করে কি হোম-বেকিং ব্যবসা শুরু করা সম্ভব?', answer: 'অবশ্যই। আমাদের অনেক শিক্ষার্থী কোর্স শেষে সফলভাবে হোম-বেকিং ব্র্যান্ড শুরু করেছেন এবং ঘরে বসেই মাসে ৫০,০০০+ টাকা আয় করছেন।' },
        { question: 'বেকিংয়ের জন্য প্রয়োজনীয় উপাদান কি নিজেকে কিনতে হবে?', answer: 'না, বেকিং ক্লাসের জন্য প্রয়োজনীয় সকল প্রিমিয়াম উপাদান ও টুলকিট সিআইবি থেকেই সরবরাহ করা হয়। ভর্তির পর কোনো বাড়তি খরচ নেই।' }
      ],
      cta: {
        heading: 'একজন দক্ষ মাস্টার বেকার হয়ে উঠুন',
        subheading: 'বেকিং বিজ্ঞানের আসল রহস্য শিখুন এবং আপনার শখকে একটি লাভজনক ক্যারিয়ারে রূপ দিন।',
        buttonText: 'বেকিং কোর্সে ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'culinary-diploma-bangladesh',
    en: {
      slug: 'culinary-diploma-bangladesh',
      meta: {
        title: 'Culinary Diploma Bangladesh | 6-Month Professional Chef Course | CIB',
        description: 'Get a 6-Month professional Culinary Diploma in Bangladesh. Comprehensive training, 5-star hotel internship, ISO standards, and global placement support.'
      },
      hero: {
        badge: '6-Month Career Track',
        heading: 'Culinary Diploma in Bangladesh',
        subheading: 'Earn our premier 6-Month Culinary Diploma. Combine advanced kitchen production with a guaranteed 3-month 5-star industrial internship.'
      },
      overview: {
        title: 'Executive Culinary Career Track',
        text: 'A Culinary Diploma is the gold standard for individuals aiming to secure careers in premium global cruise liners, international resort chains, and high-paying European kitchens. CIB\'s 6-Month Culinary Diploma in Bangladesh is an intensive program structured specifically around global hospitality frameworks.\n\nThe first 3 months are dedicated to master-level practical kitchen training in our Dhanmondi campus, covering advanced hot kitchen production, food science, cost controls, and fine-dining plating. The remaining 3 months consist of a guaranteed industrial internship placement at one of our partner 5-star hotels, providing crucial real-world experience and industry networks.'
      },
      highlights: [
        { title: '6-Month Duration', description: '3 months campus training + 3 months 5-star hotel internship.' },
        { title: 'Advanced Plating', description: 'Mastering modern gastronomy and fine-dining aesthetics.' },
        { title: 'Guaranteed Internship', description: 'Direct placement in top hotels like Radisson and Westin.' },
        { title: 'Global Recognition', description: 'NSDA & ISO certification easily verified abroad.' }
      ],
      features: [
        'Advanced masterclass modules covering complex sauces and cold-kitchen guards',
        'Intensive training on international HACCP compliance and food safety laws',
        'Direct practice in recipe costing, buffet planning, and banqueting operations',
        'Guaranteed internship placement support with 100% full-time job transition rates',
        'Comprehensive interview preparation and trade test drills for jobs abroad',
        'Special pricing of BDT 110,000 with flexible installment options'
      ],
      table: {
        heading: '6-Month Culinary Diploma Syllabus Breakdown',
        headers: ['Phase', 'Duration', 'Modules Covered', 'Outcome / Milestone'],
        rows: [
          ['Phase 1: Foundations', 'Month 1 - 2', 'Knife skills, Stocks, Sauces, basic cuisines', 'Safe Food & Knife Skills Certificate'],
          ['Phase 2: Master Cuisines', 'Month 3', 'Italian, French, Mediterranean, Plating', 'Advanced Culinary Arts Certificate'],
          ['Phase 3: Hotel Placement', 'Month 4 - 6', '3-Month Internship at 5-Star Hotel', '5-Star Internship Experience Letter']
        ]
      },
      faqs: [
        { question: 'What is the fee for the 6-Month Culinary Diploma in Bangladesh?', answer: 'The total fee is BDT 110,000, payable in customized installments. This fee includes all raw materials, uniforms, knives, and the guaranteed 5-star internship placement.' },
        { question: 'Are CIB diploma holders eligible to work on international cruise ships?', answer: 'Yes, cruise lines require certified diplomas and 5-star hotel experience. CIB\'s diploma combined with our partner internships meets the exact prerequisites for major lines like Royal Caribbean and Carnival.' },
        { question: 'Is the internship placement guaranteed?', answer: 'Yes. CIB guarantees a 3-month industrial internship at a 5-star hotel for every student who maintains a 90% attendance record and passes our internal practical exams.' }
      ],
      cta: {
        heading: 'Accelerate Your Path to Executive Chef',
        subheading: 'Earn the diploma that opens doors to high-paying international culinary careers.',
        buttonText: 'Enroll in Diploma Track Now',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'culinary-diploma-bangladesh',
      meta: {
        title: 'কালিনারি ডিপ্লোমা বাংলাদেশ | ৬ মাসের প্রফেশনাল শেফ ডিপ্লোমা কোর্স | সিআইবি',
        description: 'বাংলাদেশে ৬ মাসের প্রফেশনাল কালিনারি ডিপ্লোমা করুন। ৫-তারকা হোটেল ইন্টার্নশিপ, এনএসডিএ ও আইএসও সার্টিফিকেট এবং বিশ্বব্যাপী ক্যারিয়ারের সুযোগ।'
      },
      hero: {
        badge: '৬ মাসের ক্যারিয়ার ট্র্যাক',
        heading: 'কালিনারি ডিপ্লোমা বাংলাদেশ',
        subheading: 'আমাদের প্রিমিয়ার ৬ মাসের কালিনারি ডিপ্লোমা অর্জন করুন। কমার্শিয়াল কিচেন ট্রেনিংসহ ৫-তারকা হোটেলে নিশ্চিত ৩ মাসের ইন্টার্নশিপ।'
      },
      overview: {
        title: 'এক্সিকিউটিভ কালিনারি ক্যারিয়ার ট্র্যাক',
        text: 'একটি কালিনারি ডিপ্লোমা হল তাদের জন্য সবচেয়ে বড় সুযোগ যারা বিশ্বমানের লাক্সারি ক্রুজ লাইনার, আন্তর্জাতিক রিসোর্ট চেইন এবং ইউরোপের হাই-স্যালারি রেস্টুরেন্টে ক্যারিয়ার গড়তে চান। সিআইবি (CIB) ৬ মাস মেয়াদী কালিনারি ডিপ্লোমা প্রদান করছে, যা আন্তর্জাতিক হসপিটালিটি সেক্টরের প্রয়োজন অনুযায়ী ডিজাইন করা হয়েছে।\n\nপ্রথম ৩ মাস আমাদের ধানমন্ডি ক্যাম্পাসে প্রাক-পেশাদারি নিবিড় রান্নাঘর প্রশিক্ষণ (অ্যাডভান্সড হট কিচেন, ফুড সায়েন্স, কস্টিং ও ফাইন-ডাইনিং প্লেটিং) প্রদান করা হয়। পরবর্তী ৩ মাস আমাদের পার্টনার ৫-তারকা হোটেলসমূহে নিশ্চিত ইন্টার্নশিপ করানো হয়, যা শিক্ষার্থীদের বাস্তব কাজের অভিজ্ঞতা ও ভালো নেটওয়ার্ক তৈরি করে।'
      },
      highlights: [
        { title: '৬ মাস মেয়াদ', description: '৩ মাস ক্যাম্পাসে প্র্যাক্টিক্যাল ক্লাস + ৩ মাস ৫-তারকা ইন্টার্নশিপ।' },
        { title: 'অ্যাডভান্সড প্লেটিং', description: 'মডার্ন গ্যাস্ট্রোনমি এবং ৫-তারকা ফুড প্রেজেন্টেশন আর্টস।' },
        { title: 'নিশ্চিত ইন্টার্নশিপ', description: 'র‌্যাডিসন ও ওয়েস্টিনের মতো দেশের সেরা হোটেলে সরাসরি প্লেসমেন্ট।' },
        { title: 'গ্লোবাল রিকগনিশন', description: 'সহজে বিদেশ থেকে যাচাইযোগ্য এনএসডিএ ও আইএসও অনুমোদিত সনদ।' }
      ],
      features: [
        'জটিল ফ্রেঞ্চ সস এবং কোল্ড-কিচেন লার্ডার ম্যানেজমেন্টের অ্যাডভান্সড ক্লাস',
        'ইন্টারন্যাশনাল হ্যাসাপ (HACCP) কমপ্লায়েন্স ও বিশ্বজনীন ফুড হাইজিন রুলস',
        'রেসিপি কস্টিং, বুফে ডেকোরেশন ও ব্যাঙ্কোয়েট কিচেন অপারেশন প্রশিক্ষণ',
        'নিশ্চিত ৩ মাসের ৫-স্টার ইন্টার্নশিপ এবং পরবর্তীতে সরাসরি চাকরির সুযোগ',
        'বিদেশে চাকরির ইন্টারভিউ ও প্র্যাক্টিক্যাল ট্রেড টেস্টের শতভাগ প্রস্তুতি',
        'সহজ কিস্তি সুবিধায় মাত্র ১,১০,০০০ টাকায় সম্পূর্ণ ডিপ্লোমা কোর্স'
      ],
      table: {
        heading: '৬ মাসের কালিনারি ডিপ্লোমা সিলেবাস',
        headers: ['ধাপ', 'সময়সীমা', 'মডিউল সমূহ', 'শিক্ষাগত মাইলফলক'],
        rows: [
          ['ধাপ ১: কালিনারি ভিত্তি', '১ম - ২য় মাস', 'নাইফ স্কিলস, বেসিক ফ্রেঞ্চ সস, মৌলিক কুইজিন', 'ফুড সেফটি ও কাটিং সার্টিফিকেট'],
          ['ধাপ ২: মাস্টার কুইজিন', '৩য় মাস', 'ইতালীয়, ভূমধ্যসাগরীয় খাবার ও ফাইন-ডাইনিং প্লেটিং', 'কালিনারি আর্টস সার্টিফিকেট'],
          ['ধাপ ৩: হোটেল প্লেসমেন্ট', '৪র্থ - ৬ষ্ঠ মাস', '৫-তারকা হোটেলে নিশ্চিত ৩ মাসের কমার্শিয়াল ইন্টার্নশিপ', '৫-স্টার ইন্টার্নশিপ এক্সপেরিয়েন্স লেটার']
        ]
      },
      faqs: [
        { question: '৬ মাসের কালিনারি ডিপ্লোমা কোর্সের ফি কত টাকা?', answer: 'এই ডিপ্লোমা কোর্সের মোট ফি মাত্র ১,১০,০০০ টাকা, যা সহজ কিস্তিতে দেওয়া যায়। এই ফির মধ্যে সমস্ত কাঁচামাল, ইউনিফর্ম, কফি ড্রিংকস ও ইন্টার্নশিপ ফি অন্তর্ভুক্ত।' },
        { question: 'সিআইবি ডিপ্লোমা দিয়ে কি আন্তর্জাতিক ক্রুজ শিপে চাকরি করা যাবে?', answer: 'হ্যাঁ, বিলাসবহুল ক্রুজ লাইনগুলোতে চাকরি পেতে সার্টিফাইড ডিপ্লোমা ও ৫-স্টার হোটেল ইন্টার্নশিপ বাধ্যতামূলক। সিআইবি-র এই ডিপ্লোমা রয়্যাল ক্যারিবিয়ান ও কার্নিভালের মতো বড় ক্রুজ শিপের আবেদনের যোগ্যতা পূরণ করে।' },
        { question: '৫-স্টার হোটেল ইন্টার্নশিপ কি শতভাগ নিশ্চিত?', answer: 'হ্যাঁ। যেসকল শিক্ষার্থী ক্লাসে ৯০% উপস্থিতি বজায় রাখবেন এবং আমাদের নিজস্ব প্র্যাক্টিক্যাল পরীক্ষায় উত্তীর্ণ হবেন, তাদের সবার জন্য ৫-তারকা হোটেলে নিশ্চিত ৩ মাসের ইন্টার্নশিপের ব্যবস্থা করা হয়।' }
      ],
      cta: {
        heading: 'এক্সিকিউটিভ শেফ হওয়ার স্বপ্ন পূরণ করুন',
        subheading: 'অর্জন করুন এমন কালিনারি ডিপ্লোমা যা বিশ্বজুড়ে উচ্চ বেতনের চাকরির দরজা খুলে দেবে।',
        buttonText: 'ডিপ্লোমা কোর্সে এখনই ভর্তি হোন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'best-culinary-institute-dhaka',
    en: {
      slug: 'best-culinary-institute-dhaka',
      meta: {
        title: 'Best Culinary Institute in Dhaka | Compare Chef Academies | CIB',
        description: 'Why CIB is the best culinary institute in Dhaka. Compare mentors, commercial kitchen labs, government credentials, fees, and hotel placements.'
      },
      hero: {
        badge: 'Academy Comparison 2026',
        heading: 'Best Culinary Institute in Dhaka',
        subheading: 'Compare culinary academies in Dhaka. Discover why CIB ranks #1 for commercial kitchen lab setup, mentors, and placement rates.'
      },
      overview: {
        title: 'Dhaka\'s Premier Chef Training Academy',
        text: 'Choosing the right cooking school is the most important decision for your career. Dhaka hosts several training centers, but the difference lies in the fidelity of training. CIB is recognized as the best culinary institute in Dhaka because we prioritize hands-on practice, industrial kitchen hygiene, and 5-star executive chef mentorship over plain classroom lectures.\n\nOur campus features a 2,000 sq. ft. commercial-grade kitchen equipped with professional ovens and high-pressure burners. This allows students to practice in the exact environment they will encounter in 5-star hotels globally.'
      },
      highlights: [
        { title: '#1 in Dhaka', description: 'Highest-rated vocational culinary lab in the capital.' },
        { title: '5-Star Placements', description: 'Unmatched internship placements at Radisson and Westin.' },
        { title: 'NSDA Accredited', description: 'Approved national training standards.' },
        { title: 'Executive Chef Mentors', description: 'Direct instruction under master chefs.' }
      ],
      features: [
        'Central Dhaka campus in Dhanmondi with easy transit links',
        '2,000 sq. ft. commercial kitchen lab matching international standards',
        'NSDA Level-2 & Level-3 vocational certification approvals',
        'Conditional job and internship placement support in Dhaka\'s 5-star hotels',
        'Customized installment payment options with zero hidden costs',
        'Comprehensive pastry, baking, and barista modules included free'
      ],
      table: {
        heading: 'Why CIB Ranks as Dhaka\'s Best Culinary Institute',
        headers: ['Feature', 'CIB Dhaka', 'Other Institutes in Dhaka'],
        rows: [
          ['Kitchen Size & Design', '2,000 sq. ft. Commercial Lab', 'Domestic domestic kitchens'],
          ['Certification', 'NSDA & ISO-HACCP Standards', 'Unaccredited local certificates'],
          ['Mentors Panel', 'Executive 5-Star Chefs', 'Instructors with basic skills'],
          ['Hiring Partners', 'Radisson, Westin, InterContinental', 'None / Basic restaurants'],
          ['Ingredient Quality', 'Premium international ingredients', 'Basic local vegetables only']
        ]
      },
      faqs: [
        { question: 'Why is CIB considered the best culinary institute in Dhaka?', answer: 'CIB stands out due to its 2,000 sq. ft. commercial lab, instruction under Executive Chefs, NSDA accreditation, and verified 5-star hotel internship placements.' },
        { question: 'Can I visit the CIB campus to compare?', answer: 'Yes. We encourage prospective students to visit our campus at House-160, Lake Circus, Kalabagan, Dhanmondi, to compare our commercial setup with other schools.' },
        { question: 'What is the student placement rate at CIB?', answer: 'CIB maintains a 95% placement rate, with graduates working as Commis and Pastry Chefs in top hotels across Bangladesh, the Gulf, and Europe.' }
      ],
      cta: {
        heading: 'Join Dhaka\'s Top-Rated Culinary Institute',
        subheading: 'Get the elite vocational training that launches global hospitality careers.',
        buttonText: 'Book a Campus Tour',
        buttonHref: '/contact'
      }
    },
    bn: {
      slug: 'best-culinary-institute-dhaka',
      meta: {
        title: 'ঢাকায় সেরা কালিনারি ইনস্টিটিউট | সেরা শেফ ট্রেনিং একাডেমি তুলনা | সিআইবি',
        description: 'ঢাকায় সেরা কালিনারি ইনস্টিটিউট ও কুকিং স্কুল কীভাবে নির্বাচন করবেন? মেন্টর প্যানেল, কমার্শিয়াল ল্যাব, সরকারি সনদ ও প্লেসমেন্ট তুলনা করুন।'
      },
      hero: {
        badge: 'ইনস্টিটিউট তুলনা ২০২৬',
        heading: 'ঢাকায় সেরা কালিনারি ইনস্টিটিউট',
        subheading: 'ঢাকার কুকিং স্কুলগুলোর মধ্যে সঠিকটি নির্বাচন করুন। সিআইবি (CIB) কেন রান্নাঘর ল্যাব, মেন্টর প্যানেল এবং চাকরির প্লেসমেন্টে ঢাকার মধ্যে ১ নম্বর একাডেমি।'
      },
      overview: {
        title: 'ঢাকার প্রিমিয়ার শেফ ট্রেনিং একাডেমি',
        text: 'সঠিক রন্ধন স্কুল বেছে নেওয়া আপনার ক্যারিয়ারের সবচেয়ে গুরুত্বপূর্ণ সিদ্ধান্ত। ঢাকায় কয়েকটি রান্নার স্কুল রয়েছে, তবে তাদের প্রশিক্ষণের গুণগত মানে ব্যাপক পার্থক্য রয়েছে। সিআইবি (CIB) ঢাকার সেরা কালিনারি ইনস্টিটিউট হিসেবে স্বীকৃত কারণ আমরা থিওরি ক্লাসের চেয়ে ব্যবহারিক কাজ, পেশাদার হাইজিন এবং ফাইভ-স্টার এক্সিকিউটিভ শেফদের অধীনে সরাসরি প্রশিক্ষণে বিশ্বাস করি।\n\nআমাদের ক্যাম্পাসটিতে ২০০০ বর্গফুটের সম্পূর্ণ বাণিজ্যিক রান্নাঘর ল্যাব রয়েছে, যা বিশ্বমানের লাক্সারি হোটেলগুলোর মতো সাজানো। এটি আমাদের শিক্ষার্থীদের প্র্যাক্টিস নিশ্চিত করে যা তারা পরবর্তীতে ফাইভ-স্টার কিচেনে ফেস করবেন।'
      },
      highlights: [
        { title: 'ঢাকায় ১ম স্থান', description: 'রাজধানীর সবচেয়ে আধুনিক কালিনারি ল্যাব।' },
        { title: '৫-স্টার প্লেসমেন্ট', description: 'র‌্যাডিসন ও ওয়েস্টিন হোটেলে সেরা ইন্টার্নশিপ সুযোগ।' },
        { title: 'এনএসডিএ অনুমোদিত', description: 'প্রধানমন্ত্রীর কার্যালয়ের অধীনে অনুমোদিত মানদণ্ড।' },
        { title: 'এক্সিকিউটিভ মেন্টর', description: 'সরাসরি মাস্টার শেফদের অধীনে রন্ধন প্রশিক্ষণ।' }
      ],
      features: [
        'ঢাকার ধানমন্ডিতে সহজেই যাতায়াতযোগ্য কেন্দ্রীয় ক্যাম্পাস',
        'বিশ্বমানের বাণিজ্যিক রান্নাঘর ল্যাব যা আন্তর্জাতিক হোটেল স্ট্যান্ডার্ডের অনুরূপ',
        'জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ (NSDA) লেভেল ২ ও ৩ সার্টিফিকেট',
        'ঢাকার সেরা ৫-তারকা হোটেলগুলোতে ইন্টার্নশিপ ও চাকরির প্লেসমেন্ট',
        'কোনো গোপন চার্জ ছাড়া সহজ কিস্তিতে কোর্স ফি দেওয়ার ব্যবস্থা',
        'ফ্রি পেস্ট্রি, বেকিং এবং কফি মেকিং মডিউল সম্পূর্ণ বিনামূল্যে প্রদান'
      ],
      table: {
        heading: 'সিআইবি কেন ঢাকার সেরা কালিনারি ইনস্টিটিউট',
        headers: ['ফিচার / সুবিধা', 'সিআইবি ঢাকা', 'ঢাকার অন্যান্য কুকিং স্কুল'],
        rows: [
          ['কিচেন ল্যাব সাইজ', '২০০০ বর্গফুট বাণিজ্যিক ল্যাব', 'সাধারণ ঘরোয়া রান্নাঘর'],
          ['সার্টিফিকেট মান', 'এনএসডিএ ও আইএসও-এইচএসিসিপি সনদ', 'সাধারণ অননুমোদিত সার্টিফিকেট'],
          ['শিক্ষক প্যানেল', '৫-তারকা হোটেলের এক্সিকিউটিভ শেফ', 'স্থানীয় সাধারণ রাঁধুনি'],
          ['চাকরির নেটওয়ার্ক', 'র‌্যাডিসন, ওয়েস্টিন, ইন্টারকন্টিনেন্টাল', 'কোনো চাকরির নেটওয়ার্ক নেই'],
          ['কাঁচামালের মান', 'প্রিমিয়াম কন্টিনেন্টাল ও গ্লোবাল উপাদান', 'স্থানীয় সস্তা শাকসবজি মাত্র']
        ]
      },
      faqs: [
        { question: 'সিআইবি কেন ঢাকার সেরা কালিনারি ইনস্টিটিউট হিসেবে পরিচিত?', answer: 'আমাদের অত্যাধুনিক ২,০০০ বর্গফুট ল্যাব, ৫-স্টার এক্সিকিউটিভ শেফদের মেন্টরশিপ, এনএসডিএ সরকারি অনুমোদন এবং ১০০% ৫-স্টার হোটেল ইন্টার্নশিপ প্লেসমেন্টের কারণে সিআইবি ঢাকার সেরা একাডেমি।' },
        { question: 'ভর্তির আগে কি ক্যাম্পাস ঘুরে দেখা যাবে?', answer: 'হ্যাঁ। আমরা শিক্ষার্থীদের ধানমন্ডির কলাবাগান লেক সার্কাস (হাউস-১৬০) ক্যাম্পাসে আসার জন্য উৎসাহিত করি, যাতে তারা আমাদের বাণিজ্যিক কিচেন সেটআপ সশরীরে দেখে তুলনা করতে পারেন।' },
        { question: 'সিআইবি-র শিক্ষার্থীদের চাকরির হার কেমন?', answer: 'সিআইবি-র ৯৫% এর বেশি শিক্ষার্থী কোর্স শেষ করার সাথে সাথেই দেশ-বিদেশের পাঁচ তারকা হোটেল, বিলাসবহুল রেস্টুরেন্ট এবং মধ্যপ্রাচ্যের নামিদামি চেইনে চাকরি লাভ করেছেন।' }
      ],
      cta: {
        heading: 'ঢাকার সেরা কালিনারি একাডেমিতে যোগ দিন',
        subheading: 'কালিনারি জগতে আপনার ক্যারিয়ারকে একধাপ এগিয়ে নিয়ে যেতে আমাদের পেশাদার প্রশিক্ষণ গ্রহণ করুন।',
        buttonText: 'ক্যাম্পাস ভিজিট করুন',
        buttonHref: '/contact'
      }
    }
  },
  {
    slug: 'best-culinary-institute-bangladesh',
    en: {
      slug: 'best-culinary-institute-bangladesh',
      meta: {
        title: 'Best Culinary Institute in Bangladesh | Top Chef Training | CIB',
        description: 'CIB is recognized as the best culinary institute in Bangladesh. Explore national accreditation, success stories, BTEB and NSDA approvals, and global alliances.'
      },
      hero: {
        badge: 'National Leader 2026',
        heading: 'Best Culinary Institute in Bangladesh',
        subheading: 'Discover the national benchmark for culinary education. CIB offers government-accredited diplomas and premium placements.'
      },
      overview: {
        title: 'Bangladesh\'s Leading Culinary Institute',
        text: 'Culinary education is critical for skilled migration and national hospitality growth. CIB (Culinary Institute of Bangladesh) is widely recognized as the best culinary institute in Bangladesh due to our alignment with international standards, government approvals, and global university partnerships.\n\nWe provide standardized vocational training that empowers Bangladeshi youth to secure high-paying careers abroad. Our graduates skip entry-level roles and enter global kitchens as certified culinary professionals, transforming their remittance capacity and careers.'
      },
      highlights: [
        { title: 'National Benchmark', description: 'Accredited by NSDA (Prime Minister\'s Office) and BTEB.' },
        { title: 'Global Alliances', description: 'Credit transfer pathways to international institutes.' },
        { title: 'Alumni Network', description: '500+ successful graduates placed worldwide.' },
        { title: 'ISO-HACCP Certified', description: 'Fully compliant food safety and hygiene protocols.' }
      ],
      features: [
        'Government-approved NSDA Level 2 & Level 3 vocational courses',
        'State-of-the-art 2,000 sq. ft. commercial kitchen lab in Dhaka',
        'Guaranteed 3-month industrial placement in leading 5-star hotel chains',
        'Mentorship under Executive Chefs with decades of international pedigree',
        'Detailed business modules on starting cloud kitchens & food business setups',
        'Alumni working in over 16 countries including Germany, Dubai, and Canada'
      ],
      table: {
        heading: 'CIB Accreditations & Key Achievements',
        headers: ['Authority / Entity', 'Accreditation Status', 'Value to Students'],
        rows: [
          ['NSDA (Prime Minister\'s Office)', 'Government Approved Provider', 'Embassy-accepted vocational certificates'],
          ['ISO-HACCP Standards', 'Certified Safe Food compliance', 'Recognized by international fine-dining brands'],
          ['5-Star Hotel Chains', 'Official placement collaborations', 'Conditional internship and job entries'],
          ['Global Universities', 'Credit Transfer pathways', 'Study abroad options in Malaysia & Canada']
        ]
      },
      faqs: [
        { question: 'What makes CIB the best culinary institute in Bangladesh?', answer: 'CIB is the national leader due to its government NSDA approvals, ISO-HACCP compliance, state-of-the-art Dhaka lab, and a proven alumni track record in 16+ countries.' },
        { question: 'Are CIB certificates verified online?', answer: 'Yes. CIB\'s NSDA-accredited certificates are registered in the government database and can be easily verified online for visa purposes.' },
        { question: 'Can I study abroad after CIB training?', answer: 'Yes. CIB provides direct credit transfer pathways to premium hospitality universities in Malaysia, Canada, and Australia.' }
      ],
      cta: {
        heading: 'Build Your Global Chef Career',
        subheading: 'Join the national leader in culinary education and get certified for success.',
        buttonText: 'Explore Admission Options',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'best-culinary-institute-bangladesh',
      meta: {
        title: 'বাংলাদেশে সেরা কালিনারি ইনস্টিটিউট | সেরা শেফ ও কালিনারি স্কুল | সিআইবি',
        description: 'সিআইবি (CIB) কেন বাংলাদেশে সেরা কালিনারি ইনস্টিটিউট হিসেবে স্বীকৃত? সরকারি অনুমোদন, শিক্ষার্থীদের সাফল্যের গল্প এবং আন্তর্জাতিক পার্টনারশিপসমূহ জানুন।'
      },
      hero: {
        badge: 'জাতীয় র্যাঙ্কিং ২০২৬',
        heading: 'বাংলাদেশে সেরা কালিনারি ইনস্টিটিউট',
        subheading: 'বাংলাদেশের কালিনারি শিক্ষার সর্বোচ্চ মানদণ্ড। সিআইবি (CIB) দিচ্ছে সরকার অনুমোদিত ডিপ্লোমা এবং গ্লোবাল প্লেসমেন্ট সুবিধা।'
      },
      overview: {
        title: 'বাংলাদেশের শীর্ষস্থানীয় কালিনারি শিক্ষা প্রতিষ্ঠান',
        text: 'কালিনারি শিক্ষা দেশের পর্যটন খাত এবং দক্ষ অভিবাসনের (Skilled Migration) জন্য অত্যন্ত গুরুত্বপূর্ণ। কালিনারি ইনস্টিটিউট অফ বাংলাদেশ (CIB) সরকারি অনুমোদন, মানসম্পন্ন কারিকুলাম ও আন্তর্জাতিক বিশ্ববিদ্যালয়গুলোর সাথে অংশীদারিত্বের কারণে বাংলাদেশে সেরা কালিনারি ইনস্টিটিউট হিসেবে স্বীকৃত।\n\nআমরা তরুণদের এমন প্রফেশনাল স্কিলস প্রদান করি যা তাদের সরাসরি আন্তর্জাতিক চাকরি পেতে সাহায্য করে। আমাদের শিক্ষার্থীরা বিশ্বমানের মেন্টর দেওয়ান ইসমাইল ও রাফেয়া চৌধুরীর নির্দেশনায় সঠিক পেশাদারি অর্জন করেন।'
      },
      highlights: [
        { title: 'জাতীয় সেরা একাডেমি', description: 'প্রধানমন্ত্রীর কার্যালয়ের অধীন এনএসডিএ এবং বিটিইবি অনুমোদিত।' },
        { title: 'বিশ্বব্যাপী নেটওয়ার্ক', description: 'আন্তর্জাতিক ইনস্টিটিউটে সরাসরি ক্রেডিট ট্রান্সফারের সুযোগ।' },
        { title: 'বিশাল অ্যালামনাই', description: '৫০০+ সফল গ্র্যাজুয়েট বিশ্বজুড়ে বিভিন্ন বিলাসবহুল হোটেলে কর্মরত।' },
        { title: 'আইএসও-এইচএসিসিপি', description: 'খাদ্য নিরাপত্তা ও কমপ্লায়েন্স নিয়ন্ত্রণের সঠিক অনুশীলন।' }
      ],
      features: [
        'সরকার অনুমোদিত এনএসডিএ লেভেল ২ ও লেভেল ৩ ভোকেশনাল কালিনারি কোর্স',
        'ঢাকার ধানমন্ডিতে অবস্থিত বাংলাদেশের সেরা ২০০০ বর্গফুটের বাণিজ্যিক ল্যাব',
        'কোর্স শেষে দেশের শীর্ষস্থানীয় ৫-তারকা হোটেলসমূহে ৩ মাসের নিশ্চিত ইন্টার্নশিপ',
        'আন্তর্জাতিক ডিগ্রিধারী এবং ফাইভ-স্টার এক্সিকিউটিভ শেফদের মেন্টরশিপ',
        'ক্লাউড কিচেন এবং রেস্টুরেন্ট ব্যবসা শুরু করার ব্যবসায়িক মডিউল অন্তর্ভুক্ত',
        'জার্মানি, অস্ট্রেলিয়া, কানাডা ও দুবাইসহ ১৬টিরও বেশি দেশে শিক্ষার্থীরা কর্মরত'
      ],
      table: {
        heading: 'সিআইবি অনুমোদন ও শিক্ষার্থীদের সুযোগসমূহ',
        headers: ['অনুমোদনকারী সংস্থা', 'অনুমোদন স্ট্যাটাস', 'শিক্ষার্থীদের জন্য সুবিধা'],
        rows: [
          ['এনএসডিএ (প্রধানমন্ত্রীর কার্যালয়)', 'সরকারিভাবে অনুমোদিত ইনস্টিটিউট', 'দূতাবাস কর্তৃক স্বীকৃত ভোকেশনাল সার্টিফিকেট'],
          ['আইএসও-এইচএসিসিপি কমপ্লায়েন্স', 'নিরাপদ ফুড হাইজিন সার্টিফাইড', 'আন্তর্জাতিক ফাইন-ডাইনিং ব্র্যান্ডে অগ্রাধিকার'],
          ['ফাইভ-স্টার হোটেল চেইন', 'অফিশিয়াল রিক্রুটমেন্ট কোলাবরেশন', '৩ মাসের নিশ্চিত ইন্টার্নশিপ ও চাকরি প্লেসমেন্ট'],
          ['গ্লোবাল ইউনিভার্সিটিস', 'সরাসরি ক্রেডিট ট্রান্সফার লিংক', 'মালয়েশিয়া ও কানাডায় উচ্চশিক্ষার সহজ সুযোগ']
        ]
      },
      faqs: [
        { question: 'সিআইবি কেন বাংলাদেশে সেরা কালিনারি একাডেমি?', answer: 'সিআইবি-র সরকারি এনএসডিএ অনুমোদন, আন্তর্জাতিক মানসম্পন্ন ল্যাব, ৫-স্টার হোটেল ইন্টার্নশিপ ও শিক্ষার্থীদের ১৬+ দেশে চাকরির সাফল্যের কারণেই এটি দেশসেরা কালিনারি স্কুল।' },
        { question: 'সিআইবি-র সার্টিফিকেট কি সরকারিভাবে যাচাই করা যায়?', answer: 'হ্যাঁ। সিআইবি-র এনএসডিএ সার্টিফিকেটগুলো সরকারের ন্যাশনাল ডাটাবেজে রেজিস্টার্ড থাকে এবং অনলাইনে সহজে কোড দিয়ে যাচাই করা যায়।' },
        { question: 'কালিনারি কোর্স করে কি বিদেশে পড়াশোনা করতে যাওয়া যায়?', answer: 'হ্যাঁ। সিআইবি গ্র্যাজুয়েটদের জন্য মালয়েশিয়া, কানাডা এবং অস্ট্রেলিয়ার শীর্ষ কালিনারি বিশ্ববিদ্যালয়গুলোতে সরাসরি ক্রেডিট ট্রান্সফারের পথ খোলা রয়েছে।' }
      ],
      cta: {
        heading: 'বিশ্বমানের শেফ হিসেবে নিজেকে তৈরি করুন',
        subheading: 'বাংলাদেশের সেরা কালিনারি ইনস্টিটিউটে যোগ দিয়ে আপনার ক্যারিয়ারের নতুন দিগন্ত উন্মোচন করুন।',
        buttonText: 'ভর্তির তথ্য দেখুন',
        buttonHref: '/admission'
      }
    }
  },
  {
    slug: 'chef-course-fees-bangladesh',
    en: {
      slug: 'chef-course-fees-bangladesh',
      meta: {
        title: 'Chef Course Fees in Bangladesh 2026 | Installments & Costs | CIB',
        description: 'Complete breakdown of chef course fees in Bangladesh. Compare prices, installment plans, raw ingredient costs, and scholarships for CIB courses.'
      },
      hero: {
        badge: 'Fee Transparency 2026',
        heading: 'Chef Course Fees in Bangladesh',
        subheading: 'Explore CIB\'s affordable and transparent fee structures. Learn about our easy installment options with zero hidden costs.'
      },
      overview: {
        title: 'Transparent & High-ROI Fees',
        text: 'Investing in culinary training is an investment in your career. Chef course fees in Bangladesh vary, but CIB is committed to full transparency and providing the highest return on investment (ROI). We cover all premium training materials, kitchen gear, and high-quality raw ingredients within a single transparent fee.\n\nOur flagship Professional Chef Course costs BDT 44,000 in total. We do not charge any extra fees for ingredients, uniform, knife kits, or certification. To make this career training accessible to everyone, we offer customized installment options.'
      },
      highlights: [
        { title: 'BDT 44,000 Total', description: 'Flagship Professional Chef Course fee.' },
        { title: '3 Installments', description: 'Easy payment options: BDT 16k + BDT 14k + BDT 14k.' },
        { title: 'No Hidden Costs', description: 'All raw ingredients, uniform, and kits included.' },
        { title: 'BDT 3,999 Short Course', description: 'Affordable 1-month Fast Food Course fee.' }
      ],
      features: [
        'Complete chef uniform and professional knife kit provided free',
        'All raw cooking ingredients covered (including premium beef, cheese, salmon)',
        'Guaranteed 5-star hotel internship placement at no additional cost',
        'National Skill Development Authority (NSDA) assessment and registration fees covered',
        'Flexible monthly installment structures for students and low-income families',
        'Partial merit-based scholarships and waivers for deserving candidates'
      ],
      table: {
        heading: 'Complete Course Fee Breakdown 2026',
        headers: ['Course Name', 'Total Fee', 'Installment Option', 'Kits & Materials'],
        rows: [
          ['Fast Food Course', 'BDT 3,999', 'Single Payment', 'Included (No extra cost)'],
          ['Pro Chef Course', 'BDT 44,000', '3 Installments (16k + 14k + 14k)', 'Included (Uniform + Knife Kit + Raw materials)'],
          ['Chef + Barista Combo', 'BDT 55,000', '3 Installments (20k + 17.5k + 17.5k)', 'Included (Barista tools + ingredients)'],
          ['6-Month Diploma', 'BDT 110,000', 'Customized Monthly Installments', 'Included (Guaranteed 5-Star placement)']
        ]
      },
      faqs: [
        { question: 'Are there any extra charges for ingredients at CIB?', answer: 'No. Unlike other cooking schools that require students to purchase their own ingredients or pay extra kitchen fees, CIB covers the cost of all raw ingredients (from meats to continental sauces).' },
        { question: 'What is included in the BDT 44,000 Pro Chef fee?', answer: 'The BDT 44,000 fee includes admission, all practical class ingredients, a professional chef uniform, a chef knife, a cutting board, recipe books, and the final NSDA Level 2 assessment.' },
        { question: 'How can I apply for a fee waiver or scholarship?', answer: 'Deserving candidates, female entrepreneurs, and students from low-income families can apply for our CIB Opportunity Waiver, offering BDT 5,000 - BDT 10,000 off the total fee. Contact our counselor for details.' }
      ],
      cta: {
        heading: 'Invest in a High-Paying Global Career',
        subheading: 'With BDT 44,000 and easy installments, you can gain skills that command BDT 80,000+ monthly abroad.',
        buttonText: 'Download Fee Structure PDF',
        buttonHref: '/admission'
      }
    },
    bn: {
      slug: 'chef-course-fees-bangladesh',
      meta: {
        title: 'বাংলাদেশে শেফ কোর্সের ফি ২০২৬ | কিস্তি সুবিধা ও ভর্তি খরচ বিবরণী | সিআইবি',
        description: 'বাংলাদেশে শেফ কোর্সের ফির বিস্তারিত হিসাব। সিআইবি-র ভর্তি ফি, সহজ কিস্তির সুযোগ, কাঁচামালের খরচ এবং স্কলারশিপের সুবিধা সম্পর্কে জানুন।'
      },
      hero: {
        badge: 'ফি স্বচ্ছতা ২০২৬',
        heading: 'বাংলাদেশে শেফ কোর্সের ফি',
        subheading: 'সিআইবি (CIB) এর সাশ্রয়ী ও সম্পূর্ণ স্বচ্ছ কোর্স ফি কাঠামো জানুন। জিরো হিডেন কস্ট এবং সহজ কিস্তিতে ফি দেওয়ার সুবিধা।'
      },
      overview: {
        title: 'স্বচ্ছ এবং উচ্চ রিফান্ড-ভ্যালু কোর্স ফি',
        text: 'কালিনারি বা শেফ কোর্সে ভর্তি হওয়া আপনার ভবিষ্যতের সেরা বিনিয়োগ। বাংলাদেশে শেফ কোর্সের ফি বিভিন্ন হয়ে থাকে, তবে সিআইবি (CIB) সবসময় শতভাগ ফি স্বচ্ছতায় বিশ্বাসী। আমাদের প্র্যাক্টিক্যাল ক্লাসের সমস্ত কাঁচামাল, শেফ কিট ও পরীক্ষার ফি মূল ফির মধ্যেই অন্তর্ভুক্ত থাকে।\n\nআমাদের ফ্ল্যাগশিপ প্রফেশনাল শেফ কোর্সের মোট ফি মাত্র ৪৪,০০০ টাকা। এর বাইরে কাঁচামাল, শেফ ইউনিফর্ম, নাইফ সেট বা সার্টিফিকেটের জন্য কোনো বাড়তি টাকা দিতে হয় না। মধ্যবিত্ত ও শিক্ষার্থীদের সুবিধার্থে আমরা ৩টি সহজ কিস্তির সুযোগ দিচ্ছি।'
      },
      highlights: [
        { title: '৪৪,০০০ টাকা মোট ফি', description: '৩ মাসের নিবিড় প্রফেশনাল শেফ কোর্সের সম্পূর্ণ খরচ।' },
        { title: '৩টি সহজ কিস্তি', description: 'ভর্তি ফি ১৬,০০০ টাকা + পরবর্তী ২ কিস্তি ১৪,০০০ টাকা করে।' },
        { title: 'জিরো হিডেন কস্ট', description: 'সমস্ত কাঁচামাল, ইউনিফর্ম ও টুলকিট ফির মধ্যেই অন্তর্ভুক্ত।' },
        { title: '৩,৯৯৯ টাকা শর্ট কোর্স', description: '১ মাসের কমার্শিয়াল ফাস্ট ফুড কোর্সের সম্পূর্ণ ফি।' }
      ],
      features: [
        'সম্পূর্ণ ফ্রি প্রফেশনাল শেফ ইউনিফর্ম এবং স্টেইনলেস নাইফ কিট প্রদান',
        'প্রিমিয়াম কাঁচামালের খরচ (যেমন বিফ, সস, পনির, সালমন ফিশ) ফির ভেতরে অন্তর্ভুক্ত',
        '৫-স্টার হোটেলে ইন্টার্নশিপ প্লেসমেন্টের জন্য কোনো আলাদা চার্জ নেওয়া হয় না',
        'প্রধানমন্ত্রীর কার্যালয়ের অধীনে এনএসডিএ রেজিস্ট্রেশন ও পরীক্ষার ফি কভারড',
        'শিক্ষার্থী ও স্বল্প আয়ের পরিবারের জন্য নমনীয় মাসিক কিস্তির সুব্যবস্থা',
        'যোগ্য ও মেধাবী শিক্ষার্থীদের জন্য আংশিক স্কলারশিপ ও ওয়েভারের সুযোগ'
      ],
      table: {
        heading: 'কালিনারি কোর্সের ফি বিবরণী ২০২৬',
        headers: ['কোর্সের নাম', 'মোট কোর্স ফি', 'কিস্তির সুযোগ', 'টুলকিট ও ম্যাটেরিয়ালস'],
        rows: [
          ['ফাস্ট ফুড কোর্স', '৩,৯৯৯ টাকা', 'এককালীন পেমেন্ট', 'সম্পূর্ণ ফ্রি (কোনো বাড়তি খরচ নেই)'],
          ['প্রফেশনাল শেফ কোর্স', '৪৪,০০০ টাকা', '৩টি কিস্তি (১৬,০০০ + ১৪,০০০ + ১৪,০০০)', 'শেফ ড্রেস, নাইফ কিট, কাঁচামাল সম্পূর্ণ ফ্রি'],
          ['শেফ + বারিস্তা কম্বো', '৫৫,০০০ টাকা', '৩টি কিস্তি (২০,০০০ + ১৭,৫০০ + ১৭,৫০০)', 'বারিস্তা টুলস, কফি বিন ও কাঁচামাল ফ্রি'],
          ['৬ মাসের ডিপ্লোমা', '১,১০,০০০ টাকা', 'সহজ মাসিক কিস্তিতে পরিশোধযোগ্য', '৫-স্টার প্লেসমেন্ট ও ডিপ্লোমা কিট ফ্রি']
        ]
      },
      faqs: [
        { question: 'সিআইবি-তে কি কাঁচামালের জন্য আলাদা চার্জ নেওয়া হয়?', answer: 'না। অন্যান্য সাধারণ কুকিং একাডেমিতে প্রায়ই শিক্ষার্থীদের নিজেদের কাঁচামাল কিনতে হয় অথবা ক্লাসের আগে কিচেন চার্জ দিতে হয়। সিআইবি-তে ভর্তির পর কাঁচামালের জন্য কোনো আলাদা টাকা নেওয়া হয় না।' },
        { question: '৪৪,০০০ টাকার শেফ কোর্সের ফির মধ্যে কী কী অন্তর্ভুক্ত?', answer: 'এই ফির মধ্যে কমার্শিয়াল রান্নাঘর ব্যবহারের সুযোগ, ৩ মাসের ব্যবহারিক ক্লাসের সমস্ত প্রিমিয়াম উপকরণ, শেফ কোট, অ্যাপ্রন, কলার, শেফ ক্যাপ, প্রফেশনাল নাইফ সেট, রেসিপি বুক এবং জাতীয় এনএসডিএ লেভেল ২ মূল্যায়ন ফি অন্তর্ভুক্ত রয়েছে।' },
        { question: 'আমি কীভাবে ওয়েভার বা স্কলারশিপের জন্য আবেদন করতে পারি?', answer: 'মেধাবী শিক্ষার্থী, নারী উদ্যোক্তা এবং অসচ্ছল প্রার্থীদের জন্য আমাদের সিআইবি ওয়েভার স্কিম রয়েছে, যা মোট ফির ওপর ৫,০০০ থেকে ১০,০০০ টাকা পর্যন্ত ছাড় দিয়ে থাকে। বিস্তারিত জানতে আমাদের অ্যাডমিশন ডেস্কে যোগাযোগ করুন।' }
      ],
      cta: {
        heading: 'একটি উজ্জ্বল কালিনারি ক্যারিয়ারে বিনিয়োগ করুন',
        subheading: 'মাত্র ৪৪,০০০ টাকা ও সহজ কিস্তির বিনিময়ে অর্জন করুন এমন পেশাদার স্কিলস যা আপনাকে দেশে-বিদেশে আকর্ষণীয় ক্যারিয়ারের সুযোগ দেবে।',
        buttonText: 'ফি বিবরণী পিডিএফ ডাউনলোড',
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

// Generate the files
console.log('Starting landing page generation...');

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

console.log('Landing page generation complete!');

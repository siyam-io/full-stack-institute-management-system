/**
 * CIB Global SEO & Structured Data Library
 * 
 * Functions to generate valid JSON-LD for various entity types.
 * Aligned with 2026 schema standards for high-authority indexing.
 */

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "The Culinary Institute of Bangladesh (CIB)",
  "url": "https://cibdhk.com",
  "logo": "https://cibdhk.com/images/logo_cib.png",
  "sameAs": [
    "https://www.facebook.com/cibdhaka",
    "https://www.youtube.com/@cibdhaka",
    "https://www.instagram.com/cib.dhk/",
    "https://www.tiktok.com/@cibdhaka",
    "https://www.linkedin.com/company/cib-the-culinary-institute-of-bangladesh/",
    "https://wa.me/8801338958997",
    "https://maps.app.goo.gl/x7ovxN7EbqVaa2Sh8"
  ],
  "knowsAbout": [
    "Professional Chef Course",
    "Bakery Training",
    "Pastry Arts",
    "Barista Course",
    "Culinary Certification",
    "NSDA Food Production",
    "ISO-HACCP standards"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+8801338958997",
    "contactType": "customer service",
    "areaServed": ["Dhaka", "Bangladesh", "BD"],
    "availableLanguage": ["English", "Bengali"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "House-160, 1st Floor (Beside Longlife Hospital), Lake Circus, Kalabagan",
    "addressLocality": "Dhanmondi, Dhaka",
    "postalCode": "1205",
    "addressCountry": "BD"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Dhaka"
    },
    {
      "@type": "Country",
      "name": "Bangladesh"
    }
  ],
  "openingHours": "Sa-Th 10:00-19:00"
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "The Culinary Institute of Bangladesh (CIB)",
  "url": "https://cibdhk.com",
  "logo": "https://cibdhk.com/images/logo_cib.png",
  "image": "https://cibdhk.com/images/practical_class_1-1920w.webp",
  "telephone": "+8801338958997",
  "email": "contact@cibdhk.com",
  "priceRange": "BDT 3999 - BDT 110000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "House-160, 1st Floor (Beside Longlife Hospital), Lake Circus, Kalabagan",
    "addressLocality": "Dhanmondi, Dhaka",
    "postalCode": "1205",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.7513",
    "longitude": "90.3846"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    }
  ],
  "hasMap": "https://maps.app.goo.gl/QEkrd2fTHYhqC1tP9",
  "sameAs": [
    "https://www.facebook.com/cibdhaka",
    "https://www.youtube.com/@cibdhaka",
    "https://www.instagram.com/cib.dhk/",
    "https://www.tiktok.com/@cibdhaka",
    "https://www.linkedin.com/company/cib-the-culinary-institute-of-bangladesh/",
    "https://wa.me/8801338958997",
    "https://maps.app.goo.gl/x7ovxN7EbqVaa2Sh8"
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Dhaka"
    },
    {
      "@type": "Country",
      "name": "Bangladesh"
    }
  ],
  "knowsAbout": [
    "Professional Chef Course",
    "Bakery Training",
    "Pastry Arts",
    "Barista Course",
    "Culinary Certification",
    "NSDA Food Production"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5"
  }
});

export const generateCourseSchema = (course: {
  name: string,
  description: string,
  provider: string,
  startDate?: string,
  location: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name,
  "description": course.description,
  "timeRequired": "P3M",
  "educationalCredentialAwarded": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "NSDA Certification",
      "credentialCategory": "Certificate"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "ISO-HACCP Certification",
      "credentialCategory": "Certificate"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "CIB Institutional Certificate",
      "credentialCategory": "Certificate"
    }
  ],
  "numberOfUnits": "120 recipes",
  "about": [
    "120+ recipes",
    "16+ cuisines",
    "NSDA-accredited",
    "ISO-HACCP certified",
    "Free pastry module included",
    "5-star placement partners"
  ],
  "provider": {
    "@type": "EducationalOrganization",
    "name": course.provider,
    "sameAs": "https://cibdhk.com"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Onsite",
    ...(course.startDate ? { "startDate": course.startDate } : {}),
    "location": {
      "@type": "Place",
      "name": "CIB Main Campus",
      "address": course.location
    }
  }
});

export const generateProductSchema = (course: { 
  name: string; 
  description: string; 
  price: string; 
  priceValidUntil?: string;
  ratingValue?: string;
  reviewCount?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": course.name,
  "description": course.description,
  "image": "https://cibdhk.com/images/logo_cib.png",
  "offers": {
    "@type": "Offer",
    "price": course.price,
    "priceCurrency": "BDT",
    "availability": "https://schema.org/InStock",
    ...(course.priceValidUntil ? { "priceValidUntil": course.priceValidUntil } : {}),
    "eligibleCustomerType": "Student"
  },
  "brand": { "@type": "Brand", "name": "CIB" },
  ...(course.ratingValue && course.reviewCount ? {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.ratingValue,
      "reviewCount": course.reviewCount,
      "bestRating": "5"
    }
  } : {})
});

export const generateEducationEventSchema = (event: { name: string, startDate: string, endDate: string, price: string }) => ({
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  "name": event.name,
  "startDate": event.startDate,
  "endDate": event.endDate,
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "CIB Dhanmondi Campus",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "House-160, 1st Floor, Lake Circus, Kalabagan",
      "addressLocality": "Dhanmondi, Dhaka",
      "postalCode": "1205",
      "addressCountry": "BD"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": event.price,
    "priceCurrency": "BDT",
    "description": "Admission Fee"
  }
});

export const generateFAQSchema = (faqs: { question: string, seoAnswer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.seoAnswer
    }
  }))
});

export const generateWebPageSchema = (page: { title: string, description: string, url: string }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": page.title,
  "description": page.description,
  "url": page.url
});

export const generateArticleSchema = (article: {
  title: string,
  description: string,
  image: string,
  datePublished: string,
  author: string,
  locale?: string
}) => {
  const locale = article.locale || 'en';
  const authorUrl = `https://cibdhk.com/${locale}/expert-culinary-mentors`;
  let authorImage = "https://cibdhk.com/images/default-author.jpg";

  if (article.author === "Hasan Rizvee") {
    authorImage = "https://cibdhk.com/images/hasan-rizvee-portrait.jpg";
  } else if (article.author === "Dewan Ismail") {
    authorImage = "https://cibdhk.com/images/dewan-ismail-portrait.jpg";
  } else if (article.author === "Salman Iqbal") {
    authorImage = "https://cibdhk.com/images/salman-iqbal-portrait.jpg";
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "datePublished": article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": authorUrl,
      "image": authorImage,
      "sameAs": [
        "https://cibdhk.com",
        "https://www.linkedin.com/company/cibdhaka"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "CIB",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cibdhk.com/images/logo_cib.png"
      }
    }
  };
};

export const generateHowToSchema = (howto: {
  name: string,
  description: string,
  steps: { name: string, text: string }[]
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howto.name,
  "description": howto.description,
  "step": howto.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    "url": `https://cibdhk.com#step${index + 1}`
  }))
});

export const generateBreadcrumbSchema = (items: { name: string, item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.item
  }))
});

export const generateProfilePageSchema = (person: {
  name: string,
  image: string,
  jobTitle: string,
  worksFor: string,
  description: string,
  sameAs?: string[],
  url: string
}) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": person.name,
    "image": person.image,
    "jobTitle": person.jobTitle,
    "worksFor": {
      "@type": "Organization",
      "name": person.worksFor
    },
    "description": person.description,
    "sameAs": person.sameAs || [],
    "url": person.url
  }
});

export const generatePersonSchema = (person: {
  name: string,
  image: string,
  jobTitle: string,
  worksFor: string,
  description: string,
  sameAs?: string[],
  url: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  "image": person.image,
  "jobTitle": person.jobTitle,
  "worksFor": {
    "@type": "Organization",
    "name": person.worksFor
  },
  "description": person.description,
  "sameAs": person.sameAs || [],
  "url": person.url
});

export const generateVideoObjectSchema = (video: {
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  embedUrl: string
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": video.name,
  "description": video.description,
  "thumbnailUrl": video.thumbnailUrl,
  "uploadDate": video.uploadDate,
  "embedUrl": video.embedUrl
});


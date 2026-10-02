const fs = require('fs');
const path = require('path');

const targetPosts = [
  'chef-jobs-abroad-for-bangladeshi-students',
  'chef-salary-bangladesh-vs-abroad-comparison-2026',
  'executive-chef-salary-bangladesh-guide',
  'food-business-license-bangladesh-process',
  'how-to-become-a-professional-chef-bangladesh',
  'how-to-get-chef-job-abroad-from-bangladesh-2026',
  'italian-cuisine-training-dhaka-authentic-methods',
  'learning-from-best-culinary-mentors-in-bangladesh',
  'professional-baking-course-dhaka-opportunities',
  'start-cloud-kitchen-bangladesh-low-investment'
];

const linksMap = {
  en: {
    'chef-jobs-abroad-for-bangladeshi-students': {
      'chef course in Bangladesh': '/en/chef-course-bangladesh',
      'chef course in Dhaka': '/en/chef-course-dhaka'
    },
    'chef-salary-bangladesh-vs-abroad-comparison-2026': {
      'chef course fees in Bangladesh': '/en/chef-course-fees-bangladesh',
      'chef course in Bangladesh': '/en/chef-course-bangladesh'
    },
    'executive-chef-salary-bangladesh-guide': {
      'chef course in Bangladesh': '/en/chef-course-bangladesh',
      'culinary course in Bangladesh': '/en/culinary-course-bangladesh'
    },
    'food-business-license-bangladesh-process': {
      'chef course fees': '/en/chef-course-fees-bangladesh',
      'professional chef course': '/en/courses'
    },
    'how-to-become-a-professional-chef-bangladesh': {
      'chef course in Dhaka': '/en/chef-course-dhaka',
      'best culinary institute': '/en/best-culinary-institute-dhaka'
    },
    'how-to-get-chef-job-abroad-from-bangladesh-2026': {
      'chef course in Bangladesh': '/en/chef-course-bangladesh',
      'culinary diploma in Bangladesh': '/en/culinary-diploma-bangladesh'
    },
    'italian-cuisine-training-dhaka-authentic-methods': {
      'cooking course in Dhaka': '/en/cooking-course-dhaka',
      'pizza and pasta course': '/en/pizza-pasta-course-dhaka'
    },
    'learning-from-best-culinary-mentors-in-bangladesh': {
      'expert culinary mentors': '/en/expert-culinary-mentors',
      'best culinary institute in Bangladesh': '/en/best-culinary-institute-bangladesh'
    },
    'professional-baking-course-dhaka-opportunities': {
      'baking course in Dhaka': '/en/baking-course-dhaka',
      'pastry & bakery course': '/en/pastry-bakery-course-dhaka'
    },
    'start-cloud-kitchen-bangladesh-low-investment': {
      'fast food course': '/en/fast-food-course-dhaka',
      'short courses': '/en/short-courses'
    }
  },
  bn: {
    'chef-jobs-abroad-for-bangladeshi-students': {
      'শেফ কোর্স': '/bn/chef-course-bangladesh',
      'ঢাকায় শেফ কোর্স': '/bn/chef-course-dhaka'
    },
    'chef-salary-bangladesh-vs-abroad-comparison-2026': {
      'শেফ কোর্সের ফি': '/bn/chef-course-fees-bangladesh',
      'শেফ কোর্স': '/bn/chef-course-bangladesh'
    },
    'executive-chef-salary-bangladesh-guide': {
      'শেফ কোর্স': '/bn/chef-course-bangladesh',
      'রন্ধনশিল্প কোর্স': '/bn/culinary-course-bangladesh'
    },
    'food-business-license-bangladesh-process': {
      'শেফ কোর্সের ফি': '/bn/chef-course-fees-bangladesh',
      'প্রফেশনাল শেফ কোর্স': '/bn/courses'
    },
    'how-to-become-a-professional-chef-bangladesh': {
      'ঢাকায় শেফ কোর্স': '/bn/chef-course-dhaka',
      'সেরা রন্ধনশিল্প ইনস্টিটিউট': '/bn/best-culinary-institute-dhaka'
    },
    'how-to-get-chef-job-abroad-from-bangladesh-2026': {
      'শেফ কোর্স': '/bn/chef-course-bangladesh',
      'ডিপ্লোমা কোর্স': '/bn/culinary-diploma-bangladesh'
    },
    'italian-cuisine-training-dhaka-authentic-methods': {
      'কুকিং কোর্স': '/bn/cooking-course-dhaka',
      'পিজ্জা ও পাস্তা কোর্স': '/bn/pizza-pasta-course-dhaka'
    },
    'learning-from-best-culinary-mentors-in-bangladesh': {
      'অনন্য রন্ধনশিল্পী মেন্টর': '/bn/expert-culinary-mentors',
      'বাংলাদেশের সেরা রন্ধনশিল্প ইনস্টিটিউট': '/bn/best-culinary-institute-bangladesh'
    },
    'professional-baking-course-dhaka-opportunities': {
      'বেকিং কোর্স': '/bn/baking-course-dhaka',
      'প্যাস্ট্রি ও বেকিং কোর্স': '/bn/pastry-bakery-course-dhaka'
    },
    'start-cloud-kitchen-bangladesh-low-investment': {
      'ফাস্ট ফুড কোর্স': '/bn/fast-food-course-dhaka',
      'শর্ট কোর্স': '/bn/short-courses'
    }
  }
};

function linkKeywords(content, kwMap) {
  if (!content) return content;
  
  // Sort keywords by length descending to match longest phrases first
  const sortedKws = Object.keys(kwMap).sort((a, b) => b.length - a.length);
  
  // Split by markdown links to avoid replacing inside existing links or URLs
  // This matches standard markdown links [text](url)
  const parts = content.split(/(\[.*?\]\(.*?\))/g);
  
  for (let i = 0; i < parts.length; i++) {
    // Only perform replacements on plain text segments (even indices)
    if (i % 2 === 0) {
      let text = parts[i];
      for (const kw of sortedKws) {
        // Safe check for keyword (as a whole word/phrase case insensitively)
        // Since we want to support both English (word boundaries) and Bengali (no word boundaries)
        const isEnglish = /[a-zA-Z]/.test(kw);
        const regexStr = isEnglish 
          ? `\\b${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b` 
          : kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(regexStr, 'gi');
        
        // Find if the keyword is already linked or part of formatting
        // Let's replace the first matching occurrence in this text segment
        if (regex.test(text)) {
          const url = kwMap[kw];
          // We only replace the first occurrence of the keyword in the post
          text = text.replace(regex, (match) => `[${match}](${url})`);
          break; // move to next part or next keyword if we want one link per text block
        }
      }
      parts[i] = text;
    }
  }
  
  return parts.join('');
}

console.log('=== Starting GSC Top 10 Blog Refresh ===\n');

const locales = ['en', 'bn'];
let successCount = 0;

locales.forEach(locale => {
  targetPosts.forEach(slug => {
    const filePath = path.join(__dirname, '..', 'content', locale, 'blog', `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`[WARNING] File not found: ${filePath}`);
      return;
    }
    
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      // 1. Update lastReviewed
      data.lastReviewed = '2026-06-25';
      
      // 2. Add badge indicators or keywords internal links
      const kwMap = linksMap[locale][slug] || {};
      data.content = linkKeywords(data.content, kwMap);
      
      // Write back updated file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`[OK] Updated ${locale}/blog/${slug}.json with lastReviewed and internal links.`);
      successCount++;
    } catch (e) {
      console.error(`[ERROR] Failed to update ${locale}/blog/${slug}.json:`, e.message);
    }
  });
});

console.log(`\nBlog refresh completed. Successfully updated ${successCount} files.`);
process.exit(0);

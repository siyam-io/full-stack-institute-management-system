const http = require('http');

const routes = [
  '/en', '/en/about', '/en/expert-culinary-mentors', '/en/courses', '/en/admission', '/en/contact', '/en/gallery', '/en/blog', '/en/faq', '/en/privacy-policy', '/en/term-conditions', '/en/companyprofile',
  '/bn', '/bn/about', '/bn/expert-culinary-mentors', '/bn/courses', '/bn/admission', '/bn/contact', '/bn/gallery', '/bn/blog', '/bn/faq', '/bn/privacy-policy', '/bn/term-conditions', '/bn/companyprofile',
  '/en/blog/professional-baking-course-dhaka-opportunities',
  '/en/blog/learning-from-best-culinary-mentors-in-bangladesh',
  '/en/blog/international-culinary-certification-bangladesh-benefits',
  '/en/blog/how-to-become-a-professional-chef-bangladesh',
  '/en/blog/executive-chef-salary-bangladesh-guide',
  '/bn/blog/professional-baking-course-dhaka-opportunities',
  '/bn/blog/learning-from-best-culinary-mentors-in-bangladesh',
  '/bn/blog/international-culinary-certification-bangladesh-benefits'
];

async function checkRoutes() {
  console.log('Checking routes...');
  let hasError = false;
  
  for (const route of routes) {
    await new Promise(resolve => {
      http.get(`http://localhost:3000${route}`, (res) => {
        if (res.statusCode >= 400) {
          console.error(`ERROR: ${route} returned ${res.statusCode}`);
          hasError = true;
        } else {
          console.log(`OK: ${route} returned ${res.statusCode}`);
        }
        res.resume(); // consume response data to free up memory
        resolve();
      }).on('error', (e) => {
        console.error(`ERROR: ${route} failed with ${e.message}`);
        hasError = true;
        resolve();
      });
    });
  }
  
  if (!hasError) {
    console.log('ALL ROUTES OK');
  }
}

checkRoutes();

const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '../src/app/[locale]');

const slugs = [
  'japanese-cooking-course-dhaka',
  'korean-cooking-course-dhaka',
  'pizza-pasta-course-dhaka',
  'baking-course-dhaka',
  'culinary-institute-comparison-bangladesh'
];

slugs.forEach(slug => {
  const dirPath = path.join(APP_DIR, slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const pageContent = `import fs from 'fs';
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

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), pageContent, 'utf8');
});

console.log('Successfully created all 5 child course pages on disk.');

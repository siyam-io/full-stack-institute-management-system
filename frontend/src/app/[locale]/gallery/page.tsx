import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const galleryDataPath = path.join(process.cwd(), `content/${locale}/gallery.json`);
  let galleryData = { hero: { heading: 'Action Gallery' } };
  
  try {
    if (fs.existsSync(galleryDataPath)) {
      galleryData = JSON.parse(fs.readFileSync(galleryDataPath, 'utf8'));
    }
  } catch (e) {}

  return {
    title: `Action Gallery | ${galleryData.hero.heading} | CIB`,
    description: `A visual journey through the professional training labs and campus of The Culinary Institute of Bangladesh.`,
    alternates: {
      canonical: `https://cibdhk.com/${locale}/gallery`,
      languages: {
        'en': 'https://cibdhk.com/en/gallery',
        'bn': 'https://cibdhk.com/bn/gallery',
        'x-default': 'https://cibdhk.com/en/gallery',
      }
    }
  };
}

export default function GalleryPage({ params: { locale } }: { params: { locale: string } }) {
  // Load gallery data from JSON with fallback
  let galleryData: any = { 
    hero: { heading: "Action Gallery", subheading: "" },
    categories: [],
    images: []
  };

  try {
    const galleryDataPath = path.join(process.cwd(), `content/${locale}/gallery.json`);
    if (fs.existsSync(galleryDataPath)) {
      galleryData = JSON.parse(fs.readFileSync(galleryDataPath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading gallery page data:", error);
  }

  return (
    <main>
      <GalleryHero data={galleryData.hero} />
      <GalleryGrid 
        categories={galleryData.categories} 
        images={galleryData.images} 
      />
    </main>
  );
}

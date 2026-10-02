import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CommercialLandingPage from '@/components/global/CommercialLandingPage';
import { fetchFromBackend } from '@/lib/backendApi';
import fs from 'fs';
import path from 'path';

interface PageProps {
  params: {
    locale: string;
    rest: string[];
  };
}

async function fetchCoursePageBySlug(slug: string, locale: string) {
  try {
    const response = await fetchFromBackend(`/public/courses/${slug}?locale=${locale}`);
    if (response && response.success && response.data) {
      const page = response.data;
      let coverImg = page.coverImageUrl;
      if (coverImg && coverImg.startsWith("/uploads")) {
        coverImg = `http://localhost:3043${coverImg}`;
      }

      let parsedContent = page.content;
      if (typeof parsedContent === "string") {
        try {
          parsedContent = JSON.parse(parsedContent);
        } catch (e) {
          parsedContent = {};
        }
      }

      return {
        ...page,
        content: parsedContent,
        coverImageUrl: coverImg
      };
    }
  } catch (err) {
    console.warn(`Backend course page API for ${slug} failed, falling back to local JSON:`, err);
  }

  // Fallback to local JSON file
  try {
    const filePath = path.join(process.cwd(), `content/${locale}/${slug}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(content);
      return {
        slug,
        locale,
        title: parsed.hero?.heading || parsed.meta?.title || "",
        excerpt: parsed.meta?.description || parsed.hero?.subheading || "",
        content: parsed,
      };
    }
  } catch (error) {
    console.error(`Failed to read local course fallback file for ${slug}:`, error);
  }
  return null;
}

export async function generateMetadata({ params: { locale, rest } }: PageProps): Promise<Metadata> {
  const slug = rest[0];
  if (!slug) return {};

  const page = await fetchCoursePageBySlug(slug, locale);
  if (!page || !page.content) return {};

  const title = page.seoTitle || page.title || "";
  const description = page.seoDescription || page.excerpt || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://culinaryacademy.com/${locale}/${slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://culinaryacademy.com/${locale}/${slug}`,
      languages: {
        'en': `https://culinaryacademy.com/en/${slug}`,
        'bn': `https://culinaryacademy.com/bn/${slug}`,
        'x-default': `https://culinaryacademy.com/en/${slug}`,
      }
    }
  };
}

export default async function CatchAll({ params: { locale, rest } }: PageProps) {
  const slug = rest[0];
  if (!slug || rest.length > 1) {
    notFound();
  }

  const page = await fetchCoursePageBySlug(slug, locale);
  if (!page || !page.content || page.content.status === 'draft') {
    notFound();
  }

  // Merge content_en JSON with top-level DB fields (curriculum, outcomes, faqs, batchSlots)
  // Top-level DB fields take precedence over anything inside content_en when non-empty
  const mergedData = {
    slug: page.slug,
    ...page.content,
    // Override with top-level DB column data when they have content
    curriculum: (page.curriculum && page.curriculum.length > 0) ? page.curriculum : page.content?.curriculum,
    outcomes: (page.outcomes && page.outcomes.length > 0) ? page.outcomes : page.content?.outcomes,
    faqs: (page.faqs && page.faqs.length > 0) ? page.faqs : page.content?.faqs,
    batchSlots: (page.batchSlots && page.batchSlots.length > 0) ? page.batchSlots : page.content?.batchSlots,
    course: page.course,
    coverImageUrl: page.coverImageUrl,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
  };

  return <CommercialLandingPage data={mergedData} locale={locale} />;
}

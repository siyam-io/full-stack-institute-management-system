import { fetchFromBackend } from "./backendApi";

export interface CoursePublicPage {
  id?: string;
  courseId?: string;
  slug: string;
  locale: string;
  title: string;
  excerpt: string;
  content: any;
  curriculum: any[];
  faqs: any[];
  outcomes: any[];
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getCoursePageFromLocal(slug: string, locale: string): Promise<CoursePublicPage | null> {
  try {
    const fs = require("fs");
    const path = require("path");
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
        curriculum: parsed.curriculum ? (Array.isArray(parsed.curriculum) ? parsed.curriculum : [parsed.curriculum]) : [],
        faqs: parsed.faqs || [],
        outcomes: parsed.learningOutcomes ? (Array.isArray(parsed.learningOutcomes) ? parsed.learningOutcomes : [parsed.learningOutcomes]) : [],
        coverImageUrl: parsed.hero?.image || "",
        seoTitle: parsed.meta?.title || "",
        seoDescription: parsed.meta?.description || ""
      };
    }
  } catch (error) {
    console.error(`Failed to read local course page for slug ${slug}:`, error);
  }
  return null;
}

export async function fetchCoursePageBySlug(slug: string, locale: string): Promise<CoursePublicPage | null> {
  try {
    const response = await fetchFromBackend(`/public/courses/${slug}?locale=${locale}`);
    if (response && response.success && response.data) {
      const page = response.data;
      let coverImg = page.coverImageUrl;
      if (coverImg && coverImg.startsWith("/uploads")) {
        coverImg = `http://localhost:3043${coverImg}`;
      }

      // If the backend has a populated "content" field, parse it if it is a string
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
    console.warn(`Backend course page API for ${slug} failed, falling back to local JSON file:`, err);
  }

  // Fallback to local file
  return getCoursePageFromLocal(slug, locale);
}

export async function fetchAllCoursePages(locale: string): Promise<CoursePublicPage[]> {
  try {
    const response = await fetchFromBackend(`/public/courses?locale=${locale}`);
    if (response && response.success && Array.isArray(response.data)) {
      return response.data.map((page: any) => {
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
      });
    }
  } catch (err) {
    console.warn("Backend public courses list API failed, using local fallback files:", err);
  }

  // Fallback list of course pages
  const validSlugs = [
    "baking-course-dhaka",
    "barista-course-dhaka",
    "chef-course-bangladesh",
    "chef-course-dhaka",
    "chef-course-fees-bangladesh",
    "chinese-cooking-course-dhaka",
    "cooking-course-dhaka",
    "culinary-course-bangladesh",
    "culinary-diploma-bangladesh",
    "fast-food-course-dhaka",
    "indian-cuisine-course-dhaka",
    "japanese-cooking-course-dhaka",
    "korean-cooking-course-dhaka",
    "mediterranean-cuisine-course-dhaka",
    "pastry-bakery-course-dhaka",
    "pizza-pasta-course-dhaka",
    "sushi-course-dhaka",
    "thai-cooking-course-dhaka"
  ];

  const results: CoursePublicPage[] = [];
  for (const slug of validSlugs) {
    const page = await getCoursePageFromLocal(slug, locale);
    if (page) results.push(page);
  }
  return results;
}

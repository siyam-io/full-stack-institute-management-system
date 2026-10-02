import { fetchFromBackend } from "./backendApi";
import fs from "fs";
import path from "path";

export interface MarketingPageData {
  id?: string;
  locale: string;
  slug: string;
  title: string;
  content: any;
  seo_title?: string;
  seo_description?: string;
}

export async function getMarketingPage(slug: string, locale: string): Promise<MarketingPageData | null> {
  // 1. Try to fetch from backend API
  try {
    const res = await fetchFromBackend(`/v1/public/marketing-pages/${slug}?locale=${locale}`);
    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.warn(`Backend fetch failed for marketing page '${slug}' (${locale}), falling back to local file.`);
  }

  // 2. Fallback to local static JSON file
  try {
    const jsonName = slug === "mentors" ? "mentors" : slug;
    const filePath = path.join(process.cwd(), `content/${locale}/${jsonName}.json`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(fileContent);
      return {
        slug,
        locale,
        title: parsed.hero?.heading || slug.toUpperCase(),
        content: parsed,
        seo_title: parsed.hero?.heading || "",
        seo_description: parsed.hero?.subheading || ""
      };
    }
  } catch (localError) {
    console.error(`Local file read failed for marketing page '${slug}' (${locale}):`, localError);
  }

  return null;
}

export function parseEmployeeToMentor(emp: any, locale?: string): any {
  const isBn = locale === 'bn';
  const name = (isBn ? (emp.fullNameBn || emp.full_name_bn) : (emp.fullName || emp.full_name)) || emp.full_name || "";
  
  const achievementsText = (isBn ? (emp.achievementsBn || emp.achievements_bn) : (emp.achievements)) || "";
  let credentials = [];
  
  if (Array.isArray(emp.achievements) && emp.achievements.length > 0) {
    credentials = emp.achievements
      .map((a: any) => isBn ? a.titleBn || a.title_bn || a.titleEn || a.title_en : a.titleEn || a.title_en)
      .filter(Boolean);
  } else if (typeof achievementsText === "string" && achievementsText.trim()) {
    credentials = achievementsText
      .split("\n")
      .map((line: string) => line.trim())
      .filter(Boolean);
  } else {
    // Fallback to bio bullet points
    const bioText = (isBn ? (emp.bioBn || emp.bio_bn) : emp.bio) || "";
    const lines = bioText.split("\n");
    credentials = lines
      .filter((line: string) => /^\s*[-*•]\s+/.test(line))
      .map((line: string) => line.replace(/^\s*[-*•]\s+/, "").trim());
  }

  // Extract bio (excluding bullet points)
  const bioText = (isBn ? (emp.bioBn || emp.bio_bn) : emp.bio) || "";
  const bio = bioText
    .split("\n")
    .filter((line: string) => !/^\s*[-*•]\s+/.test(line))
    .join("\n")
    .trim();

  let photo = emp.photoUrl || emp.photo_url || "";
  if (photo && photo.startsWith("/uploads")) {
    photo = `http://localhost:3043${photo}`;
  } else if (!photo) {
    photo = "/images/og-default.png";
  }

  return {
    id: emp.username || emp.id,
    name,
    title: emp.designation || (isBn ? "প্রশিক্ষক" : "Instructor"),
    photo,
    bio: bio || (isBn ? `${name} সিআইবি-তে একজন কালিনারি প্রফেশনাল।` : `${name} is a culinary professional at CIB.`),
    credentials: credentials.length > 0 ? credentials : (isBn ? ["সার্টিফাইড কালিনারি ট্রেইনার"] : ["Certified Culinary Trainer"]),
    cta: isBn ? "আবেদন করুন" : "Apply Now"
  };
}

export async function getPublicMentorsList(locale?: string): Promise<any[]> {
  try {
    const res = await fetchFromBackend("/v1/public/marketing-pages/mentors/list");
    if (res && Array.isArray(res.data)) {
      return res.data.map(emp => parseEmployeeToMentor(emp, locale));
    }
  } catch (error) {
    console.warn("Backend fetch failed for mentors list, returning empty array:", error);
  }
  return [];
}

import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const COURSE_MAPPING = [
  { prefix: "chef-course-bangladesh", name: "Professional Chef Course (Bangladesh)", code: "CHEF-BD", baseFee: 44000, durationVal: 6, durationUnit: "months" },
  { prefix: "chef-course-dhaka", name: "Professional Chef Course (Dhaka)", code: "CHEF-DK", baseFee: 44000, durationVal: 6, durationUnit: "months" },
  { prefix: "chef-course-fees-bangladesh", name: "Professional Chef Course Fees (Bangladesh)", code: "CHEF-FEES", baseFee: 44000, durationVal: 6, durationUnit: "months" },
  { prefix: "barista-course", name: "Barista Training Course", code: "BAR-001", baseFee: 25000, durationVal: 1, durationUnit: "months" },
  { prefix: "baking-course", name: "Professional Baking & Pastry Arts", code: "BAKE-001", baseFee: 18000, durationVal: 1, durationUnit: "months" },
  { prefix: "pastry-bakery", name: "Professional Pastry & Bakery Course", code: "PAST-001", baseFee: 28000, durationVal: 1, durationUnit: "months" },
  { prefix: "fast-food", name: "Fast Food & Cloud Kitchen Course", code: "FF-001", baseFee: 30000, durationVal: 45, durationUnit: "days" },
  { prefix: "culinary-diploma", name: "Diploma in Culinary Arts", code: "DIP-001", baseFee: 110000, durationVal: 6, durationUnit: "months" },
  { prefix: "cooking-course", name: "General Cooking Course", code: "COOK-001", baseFee: 15000, durationVal: 1, durationUnit: "months" },
  { prefix: "culinary-course", name: "General Culinary Course", code: "CUL-001", baseFee: 20000, durationVal: 1, durationUnit: "months" },
  { prefix: "chinese-cooking", name: "Chinese Cuisine Short Course", code: "CHN-001", baseFee: 12000, durationVal: 7, durationUnit: "days" },
  { prefix: "indian-cuisine", name: "Indian Cuisine Short Course", code: "IND-001", baseFee: 12000, durationVal: 7, durationUnit: "days" },
  { prefix: "japanese-cooking", name: "Japanese Cuisine Short Course", code: "JPN-001", baseFee: 12000, durationVal: 7, durationUnit: "days" },
  { prefix: "korean-cooking", name: "Korean Cuisine Short Course", code: "KOR-001", baseFee: 12000, durationVal: 7, durationUnit: "days" },
  { prefix: "mediterranean-cuisine", name: "Mediterranean Cuisine Short Course", code: "MED-001", baseFee: 12000, durationVal: 7, durationUnit: "days" },
  { prefix: "pizza-pasta", name: "Pizza & Pasta Short Course", code: "PIZ-001", baseFee: 12000, durationVal: 7, durationUnit: "days" },
  { prefix: "sushi-course", name: "Sushi Short Course", code: "SUS-001", baseFee: 12000, durationVal: 7, durationUnit: "days" },
  { prefix: "thai-cooking", name: "Thai Cuisine Short Course", code: "THI-001", baseFee: 12000, durationVal: 7, durationUnit: "days" }
];

function getCourseMetaBySlug(slug) {
  for (const item of COURSE_MAPPING) {
    if (slug.startsWith(item.prefix)) {
      return item;
    }
  }
  // Default fallback if no match
  return {
    prefix: slug,
    name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    code: slug.substring(0, 4).toUpperCase() + "-001",
    baseFee: 15000,
    durationVal: 1,
    durationUnit: "months"
  };
}

async function getOrCreateCourse(meta, slug) {
  const existing = await prisma.$queryRaw`
    SELECT id FROM "courses" WHERE course_code = ${meta.code} LIMIT 1
  `;
  if (existing && existing.length > 0) {
    return existing[0].id;
  }

  const courseId = crypto.randomUUID();
  await prisma.$executeRaw`
    INSERT INTO "courses" (
      id, course_name, course_code, slug, duration_value, duration_unit, base_fee, is_active, created_at, updated_at
    )
    VALUES (
      CAST(${courseId} AS uuid),
      ${meta.name},
      ${meta.code},
      ${slug},
      ${meta.durationVal},
      ${meta.durationUnit},
      ${meta.baseFee},
      true,
      now(),
      now()
    )
  `;
  console.log(`Created Course: ${meta.name} (${meta.code})`);
  return courseId;
}

async function main() {
  console.log("Starting import of web1 course JSON pages...");

  const web1BaseDir = path.resolve(process.cwd(), "../frontend/content");
  const locales = ["en", "bn"];
  let importedCount = 0;
  let skippedCount = 0;

  const validCourseFiles = [
    "baking-course-dhaka.json",
    "barista-course-dhaka.json",
    "chef-course-bangladesh.json",
    "chef-course-dhaka.json",
    "chef-course-fees-bangladesh.json",
    "chinese-cooking-course-dhaka.json",
    "cooking-course-dhaka.json",
    "culinary-course-bangladesh.json",
    "culinary-diploma-bangladesh.json",
    "fast-food-course-dhaka.json",
    "indian-cuisine-course-dhaka.json",
    "japanese-cooking-course-dhaka.json",
    "korean-cooking-course-dhaka.json",
    "mediterranean-cuisine-course-dhaka.json",
    "pastry-bakery-course-dhaka.json",
    "pizza-pasta-course-dhaka.json",
    "sushi-course-dhaka.json",
    "thai-cooking-course-dhaka.json"
  ];

  for (const locale of locales) {
    const localeDir = path.join(web1BaseDir, locale);
    if (!fs.existsSync(localeDir)) {
      console.warn(`Directory not found: ${localeDir}`);
      continue;
    }

    for (const file of validCourseFiles) {
      const filePath = path.join(localeDir, file);
      if (!fs.existsSync(filePath)) {
        continue;
      }

      const slug = path.basename(file, ".json");

      try {
        const rawContent = fs.readFileSync(filePath, "utf8");
        const json = JSON.parse(rawContent);

        // Determine / get or create course
        const meta = getCourseMetaBySlug(slug);
        const courseId = await getOrCreateCourse(meta, slug);

        // Check if page already exists
        const existingPage = await prisma.$queryRaw`
          SELECT id FROM "course_public_pages" WHERE slug = ${slug} AND locale = ${locale} LIMIT 1
        `;

        if (existingPage && existingPage.length > 0) {
          skippedCount++;
          continue;
        }

        const title = json.hero?.heading || json.meta?.title || meta.name;
        const excerpt = json.meta?.description || json.hero?.subheading || "";
        const seoTitle = json.meta?.title || null;
        const seoDesc = json.meta?.description || null;
        const coverImageUrl = json.hero?.image || null;

        const curriculum = json.curriculum ? (Array.isArray(json.curriculum) ? json.curriculum : [json.curriculum]) : [];
        const faqs = json.faqs || [];
        const outcomes = json.learningOutcomes ? (Array.isArray(json.learningOutcomes) ? json.learningOutcomes : [json.learningOutcomes]) : [];

        // Save everything inside content to match the landing page needs
        await prisma.$executeRaw`
          INSERT INTO "course_public_pages" (
            id, course_id, locale, slug, title, excerpt, content, curriculum, faqs, outcomes,
            cover_image_url, seo_title, seo_description, status, published_at, created_at, updated_at
          )
          VALUES (
            gen_random_uuid(),
            CAST(${courseId} AS uuid),
            ${locale},
            ${slug},
            ${title},
            ${excerpt},
            CAST(${JSON.stringify(json)} AS jsonb),
            CAST(${JSON.stringify(curriculum)} AS jsonb),
            CAST(${JSON.stringify(faqs)} AS jsonb),
            CAST(${JSON.stringify(outcomes)} AS jsonb),
            ${coverImageUrl},
            ${seoTitle},
            ${seoDesc},
            'published',
            now(),
            now(),
            now()
          )
        `;

        console.log(`Imported public page for ${slug} (${locale})`);
        importedCount++;
      } catch (err) {
        console.error(`Failed to import course public page ${file} (${locale}):`, err);
      }
    }
  }

  console.log(`Course page import finished. Imported: ${importedCount}, Skipped/Duplicates: ${skippedCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

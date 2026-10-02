import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Maps web1 home.json hero slide 1 into CMS home_hero data shape.
 */
function mapHomeHero(homeJson) {
  const slide = homeJson?.hero?.slides?.[0] || {};
  const stats = homeJson?.valueProposition?.stats || [];
  return {
    eyebrow: "",
    title: slide.headline || "",
    subtitle: slide.subheadline || "",
    primaryButtonText: slide.ctaText || "",
    primaryButtonHref: slide.ctaLink || "",
    secondaryButtonText: "",
    secondaryButtonHref: "",
    heroImageUrl: slide.image || "",
    heroVideoUrl: "",
    stats: stats.map((s) => ({
      label: s.label || "",
      value: String(s.value || "") + (s.suffix || ""),
    })),
  };
}

/**
 * Maps web1 home.json courseShowcase into CMS professional_chef_course data shape.
 */
function mapChefCourse(homeJson) {
  const cs = homeJson?.courseShowcase || {};
  return {
    title: cs.heading || "",
    subtitle: cs.courseName || "",
    overview: (cs.features || []).join("\n") || "",
    highlights: cs.features || [],
    curriculum: [],
    feeText: cs.price || "",
    durationText: "",
    ctaText: cs.cta || "",
    ctaHref: cs.ctaLink || "",
    imageUrl: cs.image || "",
  };
}

async function ensureSection(sectionKey, pageKey, title) {
  const existing = await prisma.$queryRaw`
    SELECT id FROM "cms_sections" WHERE section_key = ${sectionKey} LIMIT 1
  `;
  if (existing && existing.length > 0) {
    return existing[0].id;
  }
  const inserted = await prisma.$queryRaw`
    INSERT INTO "cms_sections" (id, section_key, page_key, title, created_at, updated_at)
    VALUES (gen_random_uuid(), ${sectionKey}, ${pageKey}, ${title}, NOW(), NOW())
    ON CONFLICT (section_key) DO NOTHING
    RETURNING id
  `;
  if (inserted && inserted.length > 0) {
    return inserted[0].id;
  }
  // Fallback: re-query
  const retry = await prisma.$queryRaw`
    SELECT id FROM "cms_sections" WHERE section_key = ${sectionKey} LIMIT 1
  `;
  return retry?.[0]?.id || null;
}

async function upsertTranslation(sectionKey, locale, data) {
  const jsonData = JSON.stringify(data);
  const existing = await prisma.$queryRaw`
    SELECT st.id, st.published_at
    FROM "cms_section_translations" st
    JOIN "cms_sections" s ON s.id = st.section_id
    WHERE s.section_key = ${sectionKey} AND st.locale = ${locale}
    LIMIT 1
  `;

  if (existing && existing.length > 0) {
    // Update existing — keep original published_at
    await prisma.$executeRaw`
      UPDATE "cms_section_translations"
      SET data = CAST(${jsonData} AS jsonb),
          updated_at = NOW()
      WHERE id = CAST(${existing[0].id} AS uuid)
    `;
    return "updated";
  } else {
    // Insert new
    const result = await prisma.$executeRaw`
      INSERT INTO "cms_section_translations" (id, section_id, locale, data, status, published_at, created_at, updated_at)
      SELECT gen_random_uuid(), s.id, ${locale}, CAST(${jsonData} AS jsonb), 'published', NOW(), NOW(), NOW()
      FROM "cms_sections" s
      WHERE s.section_key = ${sectionKey}
    `;
    if (result === 0) {
      throw new Error(`Section "${sectionKey}" not found — seed may have failed`);
    }
    return "created";
  }
}

async function main() {
  console.log("Starting import of CMS sections from web1 JSON...");

  const web1BaseDir = path.resolve(process.cwd(), "../frontend/content");
  const locales = ["en", "bn"];

  // ─── Section configs ───
  const sections = [
    {
      sectionKey: "home_hero",
      pageKey: "home",
      title: "Home Hero",
      mapper: mapHomeHero,
    },
    {
      sectionKey: "professional_chef_course",
      pageKey: "home",
      title: "Professional Chef Course",
      mapper: mapChefCourse,
    },
  ];

  let totalCreated = 0;
  let totalUpdated = 0;

  for (const { sectionKey, pageKey, title, mapper } of sections) {
    await ensureSection(sectionKey, pageKey, title);
    console.log(`\n--- Section: ${sectionKey} ---`);

    for (const locale of locales) {
      const filePath = path.join(web1BaseDir, locale, "home.json");
      if (!fs.existsSync(filePath)) {
        console.warn(`  ${locale}: file not found`);
        continue;
      }

      try {
        const raw = fs.readFileSync(filePath, "utf8");
        const homeJson = JSON.parse(raw);
        const data = mapper(homeJson);
        const result = await upsertTranslation(sectionKey, locale, data);
        if (result === "created") totalCreated++;
        else totalUpdated++;
        console.log(`  ${locale}: ${result}`);
      } catch (err) {
        console.error(`  ${locale} ERROR:`, err.message);
      }
    }
  }

  console.log(`\n--- CMS Sections Import Complete ---`);
  console.log(`Created: ${totalCreated}, Updated: ${totalUpdated}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

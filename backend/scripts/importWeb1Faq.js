import fs from "fs";
import path from "path";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function importFaq() {
  const locales = ["en", "bn"];
  const web1Root = path.join(process.cwd(), "../frontend");

  for (const locale of locales) {
    const faqPath = path.join(web1Root, `content/${locale}/faq.json`);
    if (!fs.existsSync(faqPath)) {
      console.warn(`FAQ file not found for locale: ${locale} at ${faqPath}`);
      continue;
    }

    try {
      const fileContent = fs.readFileSync(faqPath, "utf8");
      const parsed = JSON.parse(fileContent);

      const heading = parsed.hero?.heading || "Frequently Asked Questions";
      const subheading = parsed.hero?.subheading || "";

      const existing = await prisma.$queryRaw`
        SELECT id FROM "marketing_pages" WHERE slug = 'faq' AND locale = ${locale} LIMIT 1
      `;

      if (existing && existing.length > 0) {
        // Update
        await prisma.$executeRaw`
          UPDATE "marketing_pages"
          SET title = ${heading},
              content = CAST(${fileContent} AS jsonb),
              seo_title = ${heading},
              seo_description = ${subheading},
              updated_at = NOW()
          WHERE slug = 'faq' AND locale = ${locale}
        `;
        console.log(`Successfully UPDATED FAQ page for locale: ${locale}`);
      } else {
        // Insert
        const id = crypto.randomUUID();
        await prisma.$executeRaw`
          INSERT INTO "marketing_pages" (id, locale, slug, title, content, seo_title, seo_description, created_at, updated_at)
          VALUES (
            CAST(${id} AS uuid), 
            ${locale}, 
            'faq', 
            ${heading}, 
            CAST(${fileContent} AS jsonb), 
            ${heading}, 
            ${subheading}, 
            NOW(), 
            NOW()
          )
        `;
        console.log(`Successfully INSERTED FAQ page for locale: ${locale}`);
      }
    } catch (err) {
      console.error(`Error importing FAQ for locale ${locale}:`, err);
    }
  }

  await prisma.$disconnect();
}

importFaq();

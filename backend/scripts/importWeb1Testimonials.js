import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting import of testimonials from web1 home.json...");

  const web1BaseDir = path.resolve(process.cwd(), "../frontend/content");
  const locales = [
    { code: "en", dir: "en" },
    { code: "bn", dir: "bn" },
  ];

  let totalCreated = 0;
  let totalSkipped = 0;

  for (const { code: locale } of locales) {
    const filePath = path.join(web1BaseDir, locale, "home.json");
    if (!fs.existsSync(filePath)) {
      console.warn(`  ${locale}: home.json not found`);
      continue;
    }

    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const homeJson = JSON.parse(raw);
      const testimonials = homeJson?.socialProof?.testimonials || [];

      console.log(`\n--- ${locale}: ${testimonials.length} testimonials found ---`);

      for (let i = 0; i < testimonials.length; i++) {
        const t = testimonials[i];

        // Check for existing by name in same locale (allow re-run to update content)
        const existing = await prisma.$queryRaw`
          SELECT id FROM "testimonials"
          WHERE locale = ${locale}
            AND student_name = ${t.name || ""}
          LIMIT 1
        `;

        if (existing && existing.length > 0) {
          // Update existing with fresh data
          await prisma.$executeRaw`
            UPDATE "testimonials"
            SET designation = ${t.batch || null},
                message = ${t.quote || ""},
                image_url = ${t.photo || null},
                sort_order = ${i},
                updated_at = NOW()
            WHERE id = CAST(${existing[0].id} AS uuid)
          `;
          totalSkipped++;
          console.log(`  [UPD] ${t.name}`);
          continue;
        }

        await prisma.$executeRaw`
          INSERT INTO "testimonials" (
            id, locale, student_name, designation, message,
            image_url, rating, sort_order, is_active, created_at, updated_at
          )
          VALUES (
            gen_random_uuid(),
            ${locale},
            ${t.name || "Anonymous"},
            ${t.batch || null},
            ${t.quote || ""},
            ${t.photo || null},
            5,
            ${i},
            true,
            NOW(),
            NOW()
          )
        `;

        totalCreated++;
        console.log(`  [OK] ${t.name}`);
      }
    } catch (err) {
      console.error(`  ${locale} ERROR:`, err.message);
    }
  }

  console.log(`\n--- Testimonials Import Complete ---`);
  console.log(`Created: ${totalCreated}, Skipped (duplicates): ${totalSkipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

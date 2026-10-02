import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting import of team members from web1 mentors.json...");

  const web1BaseDir = path.resolve(process.cwd(), "../frontend/content");
  const locales = [
    { code: "en", dir: "en" },
    { code: "bn", dir: "bn" },
  ];

  let totalCreated = 0;
  let totalSkipped = 0;

  for (const { code: locale } of locales) {
    const filePath = path.join(web1BaseDir, locale, "mentors.json");
    if (!fs.existsSync(filePath)) {
      console.warn(`  ${locale}: mentors.json not found`);
      continue;
    }

    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const mentorsJson = JSON.parse(raw);
      const mentors = mentorsJson?.mentors || [];

      console.log(`\n--- ${locale}: ${mentors.length} mentors found ---`);

      for (let i = 0; i < mentors.length; i++) {
        const m = mentors[i];

        // Build a richer bio from bio + credentials
        let bio = m.bio || "";
        if (m.credentials && m.credentials.length > 0) {
          bio += "\n\nCredentials:\n" + m.credentials.map((c) => `• ${c}`).join("\n");
        }

        // Check for duplicate by name in same locale
        const existing = await prisma.$queryRaw`
          SELECT id FROM "strategic_team_members"
          WHERE locale = ${locale}
            AND name = ${m.name || ""}
          LIMIT 1
        `;

        if (existing && existing.length > 0) {
          // Update existing with fresh data
          await prisma.$executeRaw`
            UPDATE "strategic_team_members"
            SET designation = ${m.title || ""},
                bio = ${bio},
                image_url = ${m.photo || null},
                sort_order = ${i},
                updated_at = NOW()
            WHERE id = CAST(${existing[0].id} AS uuid)
          `;
          console.log(`  [UPD] ${m.name}`);
          totalSkipped++;
          continue;
        }

        // Insert new
        await prisma.$executeRaw`
          INSERT INTO "strategic_team_members" (
            id, locale, name, designation, bio,
            image_url, sort_order, is_active, created_at, updated_at
          )
          VALUES (
            gen_random_uuid(),
            ${locale},
            ${m.name || "Unknown"},
            ${m.title || ""},
            ${bio},
            ${m.photo || null},
            ${i},
            true,
            NOW(),
            NOW()
          )
        `;

        totalCreated++;
        console.log(`  [OK] ${m.name}`);
      }
    } catch (err) {
      console.error(`  ${locale} ERROR:`, err.message);
    }
  }

  console.log(`\n--- Team Members Import Complete ---`);
  console.log(`Created: ${totalCreated}, Updated/Skipped: ${totalSkipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

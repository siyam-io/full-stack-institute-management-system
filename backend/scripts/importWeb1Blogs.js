import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAuthorId(authorName) {
  if (!authorName) return null;
  // Try to find a user matching the authorName
  try {
    const user = await prisma.$queryRaw`
      SELECT id FROM "users" 
      WHERE LOWER(full_name) = LOWER(${authorName.trim()}) 
         OR LOWER(username) = LOWER(${authorName.trim()})
      LIMIT 1
    `;
    if (user && user.length > 0) {
      return user[0].id;
    }
  } catch (err) {
    console.error("Error looking up author:", err);
  }
  return null;
}

async function main() {
  console.log("Starting import of web1 JSON blogs...");
  
  const web1BaseDir = path.resolve(process.cwd(), "../frontend/content");
  const locales = ["en", "bn"];
  let importedCount = 0;
  let skippedCount = 0;

  for (const locale of locales) {
    const blogDir = path.join(web1BaseDir, locale, "blog");
    if (!fs.existsSync(blogDir)) {
      console.warn(`Directory not found: ${blogDir}`);
      continue;
    }

    const files = fs.readdirSync(blogDir).filter(f => f.endsWith(".json"));
    console.log(`Found ${files.length} blogs in ${locale}/blog`);

    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const slug = path.basename(file, ".json");
      
      try {
        const rawContent = fs.readFileSync(filePath, "utf8");
        const blogJson = JSON.parse(rawContent);

        // Check if already exists in DB
        const existing = await prisma.$queryRaw`
          SELECT id FROM "blog_posts" WHERE slug = ${slug} AND locale = ${locale} LIMIT 1
        `;

        if (existing && existing.length > 0) {
          skippedCount++;
          continue;
        }

        const authorId = await getAuthorId(blogJson.author);
        const contentVal = blogJson.content || "";
        const tags = blogJson.category ? [blogJson.category] : [];
        if (blogJson.primaryKeyword) {
          tags.push(blogJson.primaryKeyword);
        }

        const publishedAt = blogJson.date ? new Date(blogJson.date) : new Date();

        // Safe insertion with raw SQL execution
        await prisma.$executeRaw`
          INSERT INTO "blog_posts" (
            id, locale, slug, title, excerpt, content, author_id,
            cover_image_url, tags, seo_title, seo_description, status, published_at, created_at, updated_at
          )
          VALUES (
            gen_random_uuid(),
            ${locale},
            ${slug},
            ${blogJson.title || "Untitled"},
            ${blogJson.excerpt || ""},
            CAST(${JSON.stringify(contentVal)} AS jsonb),
            CAST(${authorId} AS uuid),
            ${blogJson.featuredImage || null},
            CAST(${JSON.stringify(tags)} AS jsonb),
            ${blogJson.title || ""},
            ${blogJson.metaDescription || ""},
            'published',
            CAST(${publishedAt} AS TIMESTAMPTZ),
            CAST(${publishedAt} AS TIMESTAMPTZ),
            CAST(${publishedAt} AS TIMESTAMPTZ)
          )
        `;

        importedCount++;
      } catch (err) {
        console.error(`Failed to import ${file}:`, err);
      }
    }
  }

  console.log(`Import finished. Imported: ${importedCount}, Skipped/Duplicates: ${skippedCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

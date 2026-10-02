import crypto from "crypto";
import { query, executeOne } from "../../core/db/sqlHelpers.js";
import prisma from "../../core/db/prisma.js";

export const findBySlugAndLocale = (slug, locale) =>
  query`
    SELECT * FROM "marketing_pages"
    WHERE slug = ${slug}
    LIMIT 1
  `.then((rows) => {
    const row = rows[0];
    if (!row) return null;
    const isBn = locale === "bn";
    return {
      id: row.id,
      slug: row.slug,
      locale,
      title: isBn ? (row.title_bn || row.title_en) : row.title_en,
      content: isBn ? (row.content_bn || row.content_en) : row.content_en,
      seo_title: isBn ? (row.seo_title_bn || row.seo_title_en) : row.seo_title_en,
      seo_description: isBn ? (row.seo_description_bn || row.seo_description_en) : row.seo_description_en,
      created_at: row.created_at,
      updated_at: row.updated_at
    };
  });

export const upsertPage = (slug, locale, data) => {
  const isBn = locale === "bn";
  const id = crypto.randomUUID();
  const contentStr = JSON.stringify(data.content || {});
  
  if (isBn) {
    return executeOne`
      INSERT INTO "marketing_pages" (
        id, slug, title_en, title_bn, content_en, content_bn, seo_title_en, seo_title_bn, seo_description_en, seo_description_bn, created_at, updated_at
      )
      VALUES (
        CAST(${id} AS uuid), ${slug}, '', ${data.title || ""}, CAST('{}' AS jsonb), CAST(${contentStr} AS jsonb), null, ${data.seo_title || null}, null, ${data.seo_description || null}, NOW(), NOW()
      )
      ON CONFLICT (slug) DO UPDATE
      SET title_bn = EXCLUDED.title_bn,
          content_bn = EXCLUDED.content_bn,
          seo_title_bn = EXCLUDED.seo_title_bn,
          seo_description_bn = EXCLUDED.seo_description_bn,
          updated_at = NOW()
      RETURNING *
    `.then(row => ({
      ...row,
      locale,
      title: row.title_bn,
      content: row.content_bn,
      seo_title: row.seo_title_bn,
      seo_description: row.seo_description_bn
    }));
  } else {
    return executeOne`
      INSERT INTO "marketing_pages" (
        id, slug, title_en, title_bn, content_en, content_bn, seo_title_en, seo_title_bn, seo_description_en, seo_description_bn, created_at, updated_at
      )
      VALUES (
        CAST(${id} AS uuid), ${slug}, ${data.title || ""}, null, CAST(${contentStr} AS jsonb), CAST('{}' AS jsonb), ${data.seo_title || null}, null, ${data.seo_description || null}, null, NOW(), NOW()
      )
      ON CONFLICT (slug) DO UPDATE
      SET title_en = EXCLUDED.title_en,
          content_en = EXCLUDED.content_en,
          seo_title_en = EXCLUDED.seo_title_en,
          seo_description_en = EXCLUDED.seo_description_en,
          updated_at = NOW()
      RETURNING *
    `.then(row => ({
      ...row,
      locale,
      title: row.title_en,
      content: row.content_en,
      seo_title: row.seo_title_en,
      seo_description: row.seo_description_en
    }));
  }
};

export const findActiveMentors = async () => {
  const users = await query`
    SELECT id, username, full_name, photo_url, designation, department, bio, bio_bn, social_links, is_mentor
    FROM "users"
    WHERE is_mentor = true AND status = 'Active' AND deleted_at IS NULL
    ORDER BY created_at ASC
  `;
  for (const u of users) {
    u.achievements = await prisma.achievement.findMany({
      where: { user_id: u.id },
      orderBy: { created_at: "asc" }
    });
  }
  return users;
};

export const findBySlugUnified = (slug) =>
  query`
    SELECT * FROM "marketing_pages"
    WHERE slug = ${slug}
    LIMIT 1
  `.then((rows) => rows[0] || null);

export const upsertPageUnified = (slug, data) => {
  const id = crypto.randomUUID();
  const contentEnStr = JSON.stringify(data.content_en || data.contentEn || {});
  const contentBnStr = JSON.stringify(data.content_bn || data.contentBn || {});

  return executeOne`
    INSERT INTO "marketing_pages" (
      id, slug, title_en, title_bn, content_en, content_bn, seo_title_en, seo_title_bn, seo_description_en, seo_description_bn, created_at, updated_at
    )
    VALUES (
      CAST(${id} AS uuid),
      ${slug},
      ${data.title_en || data.titleEn || ""},
      ${data.title_bn || data.titleBn || ""},
      CAST(${contentEnStr} AS jsonb),
      CAST(${contentBnStr} AS jsonb),
      ${data.seo_title_en || data.seoTitleEn || null},
      ${data.seo_title_bn || data.seoTitleBn || null},
      ${data.seo_description_en || data.seoDescriptionEn || null},
      ${data.seo_description_bn || data.seoDescriptionBn || null},
      NOW(),
      NOW()
    )
    ON CONFLICT (slug) DO UPDATE
    SET title_en = EXCLUDED.title_en,
        title_bn = EXCLUDED.title_bn,
        content_en = EXCLUDED.content_en,
        content_bn = EXCLUDED.content_bn,
        seo_title_en = EXCLUDED.seo_title_en,
        seo_title_bn = EXCLUDED.seo_title_bn,
        seo_description_en = EXCLUDED.seo_description_en,
        seo_description_bn = EXCLUDED.seo_description_bn,
        updated_at = NOW()
    RETURNING *
  `;
};


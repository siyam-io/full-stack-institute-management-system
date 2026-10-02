import crypto from "crypto";
import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";

export const findById = (id) =>
  query`
    SELECT b.*, u.full_name as author_name
    FROM "blog_posts" b
    LEFT JOIN "users" u ON b.author_id = u.id
    WHERE b.id = CAST(${id} AS uuid) AND b.deleted_at IS NULL
    LIMIT 1
  `.then((rows) => rows[0] || null);

export const findBySlug = (slug) =>
  query`
    SELECT b.*, u.full_name as author_name
    FROM "blog_posts" b
    LEFT JOIN "users" u ON b.author_id = u.id
    WHERE b.slug = ${slug} AND b.deleted_at IS NULL
    LIMIT 1
  `.then((rows) => rows[0] || null);

export const findBlogs = (filters = {}) => {
  const { search, status, limit, skip } = filters;
  return query`
    SELECT b.*, u.full_name as author_name
    FROM "blog_posts" b
    LEFT JOIN "users" u ON b.author_id = u.id
    WHERE b.deleted_at IS NULL
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR b.status = ${status})
      AND (CAST(${search || null} AS VARCHAR) IS NULL OR
        LOWER(b.title_en) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(COALESCE(b.title_bn, '')) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(b.slug) LIKE LOWER('%' || ${search || ""} || '%'))
    ORDER BY b.created_at DESC
    LIMIT ${limit ?? 1000000} OFFSET ${skip ?? 0}
  `;
};

export const countBlogs = (filters = {}) => {
  const { search, status } = filters;
  return query`
    SELECT COUNT(*) as count FROM "blog_posts"
    WHERE deleted_at IS NULL
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR status = ${status})
      AND (CAST(${search || null} AS VARCHAR) IS NULL OR
        LOWER(title_en) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(COALESCE(title_bn, '')) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(slug) LIKE LOWER('%' || ${search || ""} || '%'))
  `.then((rows) => Number(rows[0]?.count ?? 0));
};

export const findPublicBlogs = () =>
  query`
    SELECT b.*, u.full_name as author_name
    FROM "blog_posts" b
    LEFT JOIN "users" u ON b.author_id = u.id
    WHERE b.deleted_at IS NULL
      AND b.status = 'published'
      AND (b.published_at IS NULL OR b.published_at <= NOW())
    ORDER BY b.is_featured DESC, b.published_at DESC NULLS LAST, b.created_at DESC
  `;

export const findPublicBlogBySlug = (slug) =>
  query`
    SELECT b.*, u.full_name as author_name
    FROM "blog_posts" b
    LEFT JOIN "users" u ON b.author_id = u.id
    WHERE b.slug = ${slug}
      AND b.status = 'published'
      AND (b.published_at IS NULL OR b.published_at <= NOW())
      AND b.deleted_at IS NULL
    LIMIT 1
  `.then((rows) => rows[0] || null);

const jsonString = (value, fallback) => JSON.stringify(value ?? fallback);
const valueFrom = (data, camelKey, snakeKey, legacyKey) =>
  data[camelKey] ?? data[snakeKey] ?? (legacyKey ? data[legacyKey] : undefined);

export const create = (data) => {
  const id = crypto.randomUUID();
  const publishedAt = data.status === "published" ? new Date() : null;

  return executeOne`
    INSERT INTO "blog_posts" (
      id, slug, title_en, title_bn, excerpt_en, excerpt_bn, content_en, content_bn, author_id,
      cover_image_url, tags, seo_title_en, seo_title_bn, seo_description_en, seo_description_bn,
      status, is_featured, published_at, created_at, updated_at
    )
    VALUES (
      CAST(${id} AS uuid),
      ${data.slug},
      ${valueFrom(data, "titleEn", "title_en", "title")},
      ${valueFrom(data, "titleBn", "title_bn")},
      ${valueFrom(data, "excerptEn", "excerpt_en", "excerpt") || null},
      ${valueFrom(data, "excerptBn", "excerpt_bn") || null},
      CAST(${jsonString(valueFrom(data, "contentEn", "content_en", "content"), {})} AS jsonb),
      CAST(${jsonString(valueFrom(data, "contentBn", "content_bn"), {})} AS jsonb),
      CAST(${data.author_id || null} AS uuid),
      ${data.cover_image_url || null},
      CAST(${jsonString(data.tags, [])} AS jsonb),
      ${valueFrom(data, "seoTitleEn", "seo_title_en", "seo_title") || null},
      ${valueFrom(data, "seoTitleBn", "seo_title_bn") || null},
      ${valueFrom(data, "seoDescriptionEn", "seo_description_en", "seo_description") || null},
      ${valueFrom(data, "seoDescriptionBn", "seo_description_bn") || null},
      ${data.status || "draft"},
      ${data.isFeatured ?? data.is_featured ?? false},
      CAST(${publishedAt} AS TIMESTAMPTZ),
      NOW(),
      NOW()
    )
    RETURNING *
  `;
};

export const update = (id, data) => {
  const contentEn = valueFrom(data, "contentEn", "content_en", "content");
  const contentBn = valueFrom(data, "contentBn", "content_bn");
  const tags = data.tags !== undefined ? JSON.stringify(data.tags) : null;

  return executeOne`
    UPDATE "blog_posts"
    SET slug = COALESCE(${data.slug ?? null}, slug),
        title_en = COALESCE(${valueFrom(data, "titleEn", "title_en", "title") ?? null}, title_en),
        title_bn = COALESCE(${valueFrom(data, "titleBn", "title_bn") ?? null}, title_bn),
        excerpt_en = COALESCE(${valueFrom(data, "excerptEn", "excerpt_en", "excerpt") ?? null}, excerpt_en),
        excerpt_bn = COALESCE(${valueFrom(data, "excerptBn", "excerpt_bn") ?? null}, excerpt_bn),
        content_en = COALESCE(CAST(${contentEn !== undefined ? JSON.stringify(contentEn) : null} AS jsonb), content_en),
        content_bn = COALESCE(CAST(${contentBn !== undefined ? JSON.stringify(contentBn) : null} AS jsonb), content_bn),
        cover_image_url = COALESCE(${data.cover_image_url ?? null}, cover_image_url),
        tags = COALESCE(CAST(${tags} AS jsonb), tags),
        seo_title_en = COALESCE(${valueFrom(data, "seoTitleEn", "seo_title_en", "seo_title") ?? null}, seo_title_en),
        seo_title_bn = COALESCE(${valueFrom(data, "seoTitleBn", "seo_title_bn") ?? null}, seo_title_bn),
        seo_description_en = COALESCE(${valueFrom(data, "seoDescriptionEn", "seo_description_en", "seo_description") ?? null}, seo_description_en),
        seo_description_bn = COALESCE(${valueFrom(data, "seoDescriptionBn", "seo_description_bn") ?? null}, seo_description_bn),
        status = COALESCE(${data.status ?? null}, status),
        is_featured = COALESCE(${data.isFeatured ?? data.is_featured ?? null}, is_featured),
        published_at = COALESCE(CAST(${data.published_at ?? null} AS TIMESTAMPTZ), published_at),
        updated_at = NOW()
    WHERE id = CAST(${id} AS uuid) AND deleted_at IS NULL
    RETURNING *
  `;
};

export const remove = (id) =>
  execute`
    UPDATE "blog_posts"
    SET deleted_at = NOW()
    WHERE id = CAST(${id} AS uuid) AND deleted_at IS NULL
  `;

import crypto from "crypto";
import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";

const slugify = (text) => {
  if (!text) return "";
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const json = (value, fallback) => JSON.stringify(value ?? fallback);
const pick = (data, ...keys) => {
  for (const key of keys) {
    if (data && key in data) return data[key];
  }
  return undefined;
};
const langSuffix = (lang) => (lang === "bn" ? "bn" : "en");
const langValue = (data, lang, camelBase, snakeBase, legacyKey) => {
  const suffix = lang === "bn" ? "Bn" : "En";
  const snakeSuffix = lang === "bn" ? "_bn" : "_en";
  return pick(data, `${camelBase}${suffix}`, `${snakeBase}${snakeSuffix}`) ??
    (legacyKey && langSuffix(data.locale) === lang ? data[legacyKey] : undefined);
};

export const findById = (id) =>
  query`SELECT * FROM "courses" WHERE id = CAST(${id} AS uuid) AND deleted_at IS NULL LIMIT 1`.then((rows) => rows[0] || null);

export const findActive = () =>
  query`SELECT * FROM "courses" WHERE is_active = true AND deleted_at IS NULL ORDER BY course_name_en ASC`;

export const findCourses = (filters = {}) => {
  const { search, is_active, limit, skip } = filters;
  return query`
    SELECT *
    FROM "courses"
    WHERE deleted_at IS NULL
      AND (CAST(${search || null} AS VARCHAR) IS NULL OR
        LOWER(course_name_en) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(COALESCE(course_name_bn, '')) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(course_code) LIKE LOWER('%' || ${search || ""} || '%'))
      AND (CAST(${is_active ?? null} AS VARCHAR) IS NULL OR is_active = ${is_active})
    ORDER BY created_at DESC
    LIMIT ${limit ?? 1000000} OFFSET ${skip ?? 0}
  `;
};

export const countCourses = (filters = {}) => {
  const { search, is_active } = filters;
  return query`
    SELECT COUNT(DISTINCT id) as count FROM "courses"
    WHERE deleted_at IS NULL
      AND (CAST(${search || null} AS VARCHAR) IS NULL OR
        LOWER(course_name_en) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(COALESCE(course_name_bn, '')) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(course_code) LIKE LOWER('%' || ${search || ""} || '%'))
      AND (CAST(${is_active ?? null} AS VARCHAR) IS NULL OR is_active = ${is_active})
  `.then((rows) => Number(rows[0]?.count ?? 0));
};

export const create = (data) => {
  const id = crypto.randomUUID();
  const durVal = Number(data.duration_value || data.durationValue || data.duration?.value || 0);
  const durUnit = data.duration_unit || data.durationUnit || data.duration?.unit || "months";
  const nameEn = data.courseNameEn || data.courseName || data.course_name_en || data.course_name;
  const slug = data.slug || slugify(nameEn);
  const additionalInfo = typeof data.additional_info === "string" ? data.additional_info : JSON.stringify(data.additional_info || []);
  return executeOne`
    INSERT INTO "courses" (
      id, course_name_en, course_name_bn, course_code, slug,
      short_description_en, short_description_bn, description_en, description_bn,
      duration_value, duration_unit, base_fee, admission_fee, first_installment, second_installment,
      cover_image_url, additional_info, is_active, updated_at
    )
    VALUES (
      CAST(${id} AS uuid),
      ${nameEn},
      ${data.courseNameBn || data.course_name_bn || null},
      ${data.course_code || data.courseCode},
      ${slug},
      ${data.shortDescriptionEn || data.short_description_en || null},
      ${data.shortDescriptionBn || data.short_description_bn || null},
      ${data.descriptionEn || data.description_en || data.description || ""},
      ${data.descriptionBn || data.description_bn || null},
      ${durVal},
      ${durUnit},
      ${data.base_fee ?? data.baseFee ?? 0},
      ${data.admission_fee ?? data.admissionFee ?? 0},
      ${data.first_installment ?? data.firstInstallment ?? 0},
      ${data.second_installment ?? data.secondInstallment ?? 0},
      ${data.cover_image_url || data.coverImageUrl || null},
      CAST(${additionalInfo} AS jsonb),
      ${data.is_active ?? true},
      NOW()
    )
    RETURNING *
  `;
};

export const update = (id, data) => {
  const durVal = data.duration_value !== undefined ? data.duration_value : (data.durationValue !== undefined ? data.durationValue : data.duration?.value);
  const durUnit = data.duration_unit !== undefined ? data.duration_unit : (data.durationUnit !== undefined ? data.durationUnit : data.duration?.unit);
  const nameEn = data.courseNameEn || data.courseName || data.course_name_en || data.course_name;
  const slug = data.slug || (nameEn ? slugify(nameEn) : null);
  const additionalInfo = data.additional_info !== undefined ? (typeof data.additional_info === "string" ? data.additional_info : JSON.stringify(data.additional_info || [])) : null;
  return executeOne`
    UPDATE "courses"
    SET course_name_en = COALESCE(${nameEn ?? null}, course_name_en),
        course_name_bn = COALESCE(${data.courseNameBn ?? data.course_name_bn ?? null}, course_name_bn),
        course_code = COALESCE(${data.course_code ?? data.courseCode ?? null}, course_code),
        slug = COALESCE(${slug}, slug),
        short_description_en = COALESCE(${data.shortDescriptionEn ?? data.short_description_en ?? null}, short_description_en),
        short_description_bn = COALESCE(${data.shortDescriptionBn ?? data.short_description_bn ?? null}, short_description_bn),
        description_en = COALESCE(${data.descriptionEn ?? data.description_en ?? data.description ?? null}, description_en),
        description_bn = COALESCE(${data.descriptionBn ?? data.description_bn ?? null}, description_bn),
        duration_value = COALESCE(${durVal ?? null}, duration_value),
        duration_unit = COALESCE(${durUnit ?? null}, duration_unit),
        base_fee = COALESCE(${data.base_fee ?? data.baseFee ?? null}, base_fee),
        admission_fee = COALESCE(${data.admission_fee ?? data.admissionFee ?? null}, admission_fee),
        first_installment = COALESCE(${data.first_installment ?? data.firstInstallment ?? null}, first_installment),
        second_installment = COALESCE(${data.second_installment ?? data.secondInstallment ?? null}, second_installment),
        cover_image_url = COALESCE(${data.cover_image_url ?? data.coverImageUrl ?? null}, cover_image_url),
        additional_info = COALESCE(CAST(${additionalInfo} AS jsonb), additional_info),
        is_active = COALESCE(${data.is_active ?? null}, is_active),
        updated_at = NOW()
    WHERE id = CAST(${id} AS uuid) AND deleted_at IS NULL
    RETURNING *
  `;
};

export const remove = (id) =>
  execute`UPDATE "courses" SET deleted_at = NOW() WHERE id = CAST(${id} AS uuid) AND deleted_at IS NULL`;

// --- Merged Public Page Repository Methods ---

export const findPublicPageByCourseId = (courseId) =>
  query`SELECT * FROM "courses" WHERE id = CAST(${courseId} AS uuid) AND deleted_at IS NULL LIMIT 1`.then(rows => rows[0] || null);

export const findPublicPageBySlug = (slug) =>
  query`SELECT * FROM "courses" WHERE slug = ${slug} AND deleted_at IS NULL LIMIT 1`.then(rows => rows[0] || null);

export const findActivePublicPages = () =>
  query`
    SELECT * FROM "courses"
    WHERE deleted_at IS NULL
      AND is_active = true
      AND public_page_status = 'published'
      AND (published_at IS NULL OR published_at <= NOW())
    ORDER BY published_at DESC NULLS LAST, created_at DESC
  `;

export const upsertPublicPage = (courseId, locale, data) => {
  const publishedAt = data.status === "published" ? new Date() : null;

  return executeOne`
    UPDATE "courses"
    SET slug = ${data.slug},
        hero_title_en = ${langValue(data, "en", "heroTitle", "hero_title", "title") || null},
        hero_title_bn = ${langValue(data, "bn", "heroTitle", "hero_title", "title") || null},
        hero_subtitle_en = ${langValue(data, "en", "heroSubtitle", "hero_subtitle", "excerpt") || null},
        hero_subtitle_bn = ${langValue(data, "bn", "heroSubtitle", "hero_subtitle", "excerpt") || null},
        overview_en = ${langValue(data, "en", "overview", "overview") || null},
        overview_bn = ${langValue(data, "bn", "overview", "overview") || null},
        content_en = CAST(${json(langValue(data, "en", "content", "content", "content"), {})} AS jsonb),
        content_bn = CAST(${json(langValue(data, "bn", "content", "content"), {})} AS jsonb),
        curriculum_en = CAST(${json(langValue(data, "en", "curriculum", "curriculum", "curriculum"), [])} AS jsonb),
        curriculum_bn = CAST(${json(langValue(data, "bn", "curriculum", "curriculum"), [])} AS jsonb),
        faqs_en = CAST(${json(langValue(data, "en", "faqs", "faqs", "faqs"), [])} AS jsonb),
        faqs_bn = CAST(${json(langValue(data, "bn", "faqs", "faqs"), [])} AS jsonb),
        outcomes_en = CAST(${json(langValue(data, "en", "outcomes", "outcomes", "outcomes"), [])} AS jsonb),
        outcomes_bn = CAST(${json(langValue(data, "bn", "outcomes", "outcomes"), [])} AS jsonb),
        cover_image_url = ${data.cover_image_url || data.coverImageUrl || null},
        seo_title_en = ${langValue(data, "en", "seoTitle", "seo_title", "seo_title") || null},
        seo_title_bn = ${langValue(data, "bn", "seoTitle", "seo_title") || null},
        seo_description_en = ${langValue(data, "en", "seoDescription", "seo_description", "seo_description") || null},
        seo_description_bn = ${langValue(data, "bn", "seoDescription", "seo_description") || null},
        public_page_status = ${data.status || "draft"},
        published_at = COALESCE(CAST(${publishedAt} AS TIMESTAMPTZ), published_at),
        updated_at = NOW()
    WHERE id = CAST(${courseId} AS uuid) AND deleted_at IS NULL
    RETURNING *
  `;
};

export const updateStatus = (courseId, status, publishedAt) =>
  executeOne`
    UPDATE "courses"
    SET public_page_status = ${status},
        published_at = COALESCE(CAST(${publishedAt ?? null} AS TIMESTAMPTZ), published_at),
        updated_at = NOW()
    WHERE id = CAST(${courseId} AS uuid) AND deleted_at IS NULL
    RETURNING *
  `;

// Backwards compat aliases
export const findMany = findCourses;
export const count = countCourses;

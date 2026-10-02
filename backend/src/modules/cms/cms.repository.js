import crypto from "crypto";
import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";

const hasKey = (obj, key) => obj && key in obj;
const langSuffix = (lang) => (lang === "bn" ? "bn" : "en");
const json = (value, fallback) => JSON.stringify(value ?? fallback);
const pick = (data, ...keys) => {
  for (const key of keys) {
    if (hasKey(data, key)) return data[key];
  }
  return undefined;
};

export const findAllSections = () =>
  query`SELECT * FROM "cms_sections" ORDER BY title ASC`;

export const findSectionByKey = (sectionKey) =>
  query`SELECT * FROM "cms_sections" WHERE section_key = ${sectionKey} LIMIT 1`
    .then((rows) => rows[0] || null);

export const findSectionTranslation = (sectionKey) =>
  findSectionByKey(sectionKey);

export const findSectionTranslationFallback = (sectionKey) =>
  query`
    SELECT *
    FROM "cms_sections"
    WHERE section_key = ${sectionKey}
      AND status = 'published'
      AND is_active = true
    LIMIT 1
  `.then((rows) => rows[0] || null);

export const upsertSectionTranslation = (sectionKey, locale, data) => {
  const id = crypto.randomUUID();
  const lang = langSuffix(locale);
  const dataEn = pick(data, "dataEn", "data_en") ?? (lang === "en" ? pick(data, "data") : undefined);
  const dataBn = pick(data, "dataBn", "data_bn") ?? (lang === "bn" ? pick(data, "data") : undefined);
  const seoTitleEn = pick(data, "seoTitleEn", "seo_title_en") ?? (lang === "en" ? pick(data, "seoTitle", "seo_title") : undefined);
  const seoTitleBn = pick(data, "seoTitleBn", "seo_title_bn") ?? (lang === "bn" ? pick(data, "seoTitle", "seo_title") : undefined);
  const seoDescEn = pick(data, "seoDescriptionEn", "seo_description_en") ?? (lang === "en" ? pick(data, "seoDescription", "seo_description") : undefined);
  const seoDescBn = pick(data, "seoDescriptionBn", "seo_description_bn") ?? (lang === "bn" ? pick(data, "seoDescription", "seo_description") : undefined);

  return executeOne`
    INSERT INTO "cms_sections" (
      id, section_key, page_key, title, data_en, data_bn,
      seo_title_en, seo_title_bn, seo_description_en, seo_description_bn,
      status, is_active, published_at, created_at, updated_at
    )
    VALUES (
      CAST(${id} AS uuid),
      ${sectionKey},
      ${data.pageKey || data.page_key || "general"},
      ${data.title || sectionKey},
      CAST(${json(dataEn, {})} AS jsonb),
      CAST(${json(dataBn, {})} AS jsonb),
      ${seoTitleEn || null},
      ${seoTitleBn || null},
      ${seoDescEn || null},
      ${seoDescBn || null},
      ${data.status || "published"},
      ${data.isActive ?? data.is_active ?? true},
      CAST(${data.publishedAt || data.published_at || null} AS TIMESTAMPTZ),
      NOW(),
      NOW()
    )
    ON CONFLICT (section_key)
    DO UPDATE SET
      page_key = COALESCE(${data.pageKey || data.page_key || null}, "cms_sections".page_key),
      title = COALESCE(${data.title || null}, "cms_sections".title),
      data_en = COALESCE(CAST(${dataEn !== undefined ? JSON.stringify(dataEn) : null} AS jsonb), "cms_sections".data_en),
      data_bn = COALESCE(CAST(${dataBn !== undefined ? JSON.stringify(dataBn) : null} AS jsonb), "cms_sections".data_bn),
      seo_title_en = COALESCE(${seoTitleEn ?? null}, "cms_sections".seo_title_en),
      seo_title_bn = COALESCE(${seoTitleBn ?? null}, "cms_sections".seo_title_bn),
      seo_description_en = COALESCE(${seoDescEn ?? null}, "cms_sections".seo_description_en),
      seo_description_bn = COALESCE(${seoDescBn ?? null}, "cms_sections".seo_description_bn),
      status = COALESCE(${data.status || null}, "cms_sections".status),
      is_active = COALESCE(${data.isActive ?? data.is_active ?? null}, "cms_sections".is_active),
      published_at = COALESCE(CAST(${data.publishedAt || data.published_at || null} AS TIMESTAMPTZ), "cms_sections".published_at),
      updated_at = NOW()
    RETURNING *
  `;
};

export const seedSection = async (sectionKey, pageKey, title) => {
  const id = crypto.randomUUID();
  return executeOne`
    INSERT INTO "cms_sections" (id, section_key, page_key, title, created_at, updated_at)
    VALUES (CAST(${id} AS uuid), ${sectionKey}, ${pageKey}, ${title}, NOW(), NOW())
    ON CONFLICT (section_key) DO NOTHING
    RETURNING *
  `;
};

export const findAllTestimonials = () =>
  query`SELECT * FROM "testimonials" ORDER BY sort_order ASC, created_at DESC`;

export const findPublicTestimonials = () =>
  query`
    SELECT * FROM "testimonials"
    WHERE is_active = true
    ORDER BY sort_order ASC, created_at DESC
  `;

export const findTestimonialById = (id) =>
  query`SELECT * FROM "testimonials" WHERE id = CAST(${id} AS uuid) LIMIT 1`
    .then((rows) => rows[0] || null);

export const createTestimonial = (data) => {
  const id = crypto.randomUUID();
  const lang = langSuffix(data.locale);
  const studentNameEn = pick(data, "studentNameEn", "student_name_en") ?? (lang === "en" ? pick(data, "studentName", "student_name") : undefined);
  const studentNameBn = pick(data, "studentNameBn", "student_name_bn") ?? (lang === "bn" ? pick(data, "studentName", "student_name") : undefined);
  const designationEn = pick(data, "designationEn", "designation_en") ?? (lang === "en" ? data.designation : undefined);
  const designationBn = pick(data, "designationBn", "designation_bn") ?? (lang === "bn" ? data.designation : undefined);
  const messageEn = pick(data, "messageEn", "message_en") ?? (lang === "en" ? data.message : undefined);
  const messageBn = pick(data, "messageBn", "message_bn") ?? (lang === "bn" ? data.message : undefined);

  return executeOne`
    INSERT INTO "testimonials" (
      id, student_name_en, student_name_bn, designation_en, designation_bn, message_en, message_bn,
      image_url, video_url, rating, sort_order, is_active, created_at, updated_at
    )
    VALUES (
      CAST(${id} AS uuid),
      ${studentNameEn || studentNameBn},
      ${studentNameBn || null},
      ${designationEn || null},
      ${designationBn || null},
      ${messageEn || messageBn},
      ${messageBn || null},
      ${data.image_url || data.imageUrl || null},
      ${data.video_url || data.videoUrl || null},
      ${data.rating || null},
      ${data.sort_order ?? data.sortOrder ?? 0},
      ${data.is_active ?? data.isActive ?? true},
      NOW(),
      NOW()
    )
    RETURNING *
  `;
};

export const updateTestimonial = (id, data) =>
  executeOne`
    UPDATE "testimonials"
    SET
      student_name_en = COALESCE(${pick(data, "studentNameEn", "student_name_en", "studentName", "student_name") ?? null}, student_name_en),
      student_name_bn = COALESCE(${pick(data, "studentNameBn", "student_name_bn") ?? null}, student_name_bn),
      designation_en = COALESCE(${pick(data, "designationEn", "designation_en", "designation") ?? null}, designation_en),
      designation_bn = COALESCE(${pick(data, "designationBn", "designation_bn") ?? null}, designation_bn),
      message_en = COALESCE(${pick(data, "messageEn", "message_en", "message") ?? null}, message_en),
      message_bn = COALESCE(${pick(data, "messageBn", "message_bn") ?? null}, message_bn),
      image_url = COALESCE(${data.image_url ?? data.imageUrl ?? null}, image_url),
      video_url = COALESCE(${data.video_url ?? data.videoUrl ?? null}, video_url),
      rating = COALESCE(${data.rating ?? null}, rating),
      sort_order = COALESCE(${data.sort_order ?? data.sortOrder ?? null}, sort_order),
      is_active = COALESCE(${data.is_active ?? data.isActive ?? null}, is_active),
      updated_at = NOW()
    WHERE id = CAST(${id} AS uuid)
    RETURNING *
  `;

export const deleteTestimonial = (id) =>
  execute`DELETE FROM "testimonials" WHERE id = CAST(${id} AS uuid)`;

export const findAllTeamMembers = () =>
  query`SELECT * FROM "strategic_team_members" ORDER BY sort_order ASC, created_at DESC`;

export const findPublicTeamMembers = () =>
  query`
    SELECT * FROM "strategic_team_members"
    WHERE is_active = true
    ORDER BY sort_order ASC, created_at DESC
  `;

export const findTeamMemberById = (id) =>
  query`SELECT * FROM "strategic_team_members" WHERE id = CAST(${id} AS uuid) LIMIT 1`
    .then((rows) => rows[0] || null);

export const createTeamMember = (data) => {
  const id = crypto.randomUUID();
  const lang = langSuffix(data.locale);
  const nameEn = pick(data, "nameEn", "name_en") ?? (lang === "en" ? data.name : undefined);
  const nameBn = pick(data, "nameBn", "name_bn") ?? (lang === "bn" ? data.name : undefined);
  const designationEn = pick(data, "designationEn", "designation_en") ?? (lang === "en" ? data.designation : undefined);
  const designationBn = pick(data, "designationBn", "designation_bn") ?? (lang === "bn" ? data.designation : undefined);
  const bioEn = pick(data, "bioEn", "bio_en") ?? (lang === "en" ? data.bio : undefined);
  const bioBn = pick(data, "bioBn", "bio_bn") ?? (lang === "bn" ? data.bio : undefined);
  const userId = data.userId || data.user_id || null;

  return executeOne`
    INSERT INTO "strategic_team_members" (
      id, user_id, name_en, name_bn, designation_en, designation_bn, bio_en, bio_bn,
      image_url, facebook, linkedin, sort_order, is_active, created_at, updated_at
    )
    VALUES (
      CAST(${id} AS uuid),
      CAST(${userId || null} AS uuid),
      ${nameEn || nameBn},
      ${nameBn || null},
      ${designationEn || designationBn},
      ${designationBn || null},
      ${bioEn || null},
      ${bioBn || null},
      ${data.image_url || data.imageUrl || null},
      ${data.facebook || null},
      ${data.linkedin || null},
      ${data.sort_order ?? data.sortOrder ?? 0},
      ${data.is_active ?? data.isActive ?? true},
      NOW(),
      NOW()
    )
    RETURNING *
  `;
};

export const updateTeamMember = (id, data) => {
  const userId = data.userId !== undefined ? data.userId : data.user_id;
  const hasUserUpdate = data.userId !== undefined || data.user_id !== undefined;
  
  return executeOne`
    UPDATE "strategic_team_members"
    SET
      user_id = CASE WHEN ${hasUserUpdate} THEN CAST(${userId || null} AS uuid) ELSE user_id END,
      name_en = COALESCE(${pick(data, "nameEn", "name_en", "name") ?? null}, name_en),
      name_bn = COALESCE(${pick(data, "nameBn", "name_bn") ?? null}, name_bn),
      designation_en = COALESCE(${pick(data, "designationEn", "designation_en", "designation") ?? null}, designation_en),
      designation_bn = COALESCE(${pick(data, "designationBn", "designation_bn") ?? null}, designation_bn),
      bio_en = COALESCE(${pick(data, "bioEn", "bio_en", "bio") ?? null}, bio_en),
      bio_bn = COALESCE(${pick(data, "bioBn", "bio_bn") ?? null}, bio_bn),
      image_url = COALESCE(${data.image_url ?? data.imageUrl ?? null}, image_url),
      facebook = COALESCE(${data.facebook ?? null}, facebook),
      linkedin = COALESCE(${data.linkedin ?? null}, linkedin),
      sort_order = COALESCE(${data.sort_order ?? data.sortOrder ?? null}, sort_order),
      is_active = COALESCE(${data.is_active ?? data.isActive ?? null}, is_active),
      updated_at = NOW()
    WHERE id = CAST(${id} AS uuid)
    RETURNING *
  `;
};

export const deleteTeamMember = (id) =>
  execute`DELETE FROM "strategic_team_members" WHERE id = CAST(${id} AS uuid)`;

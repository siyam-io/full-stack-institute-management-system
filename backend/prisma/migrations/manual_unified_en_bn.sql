BEGIN;

ALTER TABLE courses RENAME COLUMN course_name TO course_name_en;
ALTER TABLE courses RENAME COLUMN description TO description_en;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS course_name_bn TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS short_description_en TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS short_description_bn TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS description_bn TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS admission_fee NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS first_installment NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS second_installment NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title_bn TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt_bn TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_en JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_bn JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_title_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_title_bn TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_description_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_description_bn TEXT;

UPDATE blog_posts
SET title_en = title,
    excerpt_en = excerpt,
    content_en = content,
    seo_title_en = seo_title,
    seo_description_en = seo_description
WHERE locale = 'en' OR title_en IS NULL;

UPDATE blog_posts en
SET title_bn = bn.title,
    excerpt_bn = bn.excerpt,
    content_bn = bn.content,
    seo_title_bn = bn.seo_title,
    seo_description_bn = bn.seo_description
FROM blog_posts bn
WHERE en.slug = bn.slug
  AND en.locale = 'en'
  AND bn.locale = 'bn';

UPDATE blog_posts
SET title_bn = COALESCE(title_bn, title),
    excerpt_bn = COALESCE(excerpt_bn, excerpt),
    content_bn = COALESCE(NULLIF(content_bn, '{}'::jsonb), content),
    seo_title_bn = COALESCE(seo_title_bn, seo_title),
    seo_description_bn = COALESCE(seo_description_bn, seo_description)
WHERE locale = 'bn';

DELETE FROM blog_posts bn
USING blog_posts en
WHERE bn.slug = en.slug
  AND bn.locale = 'bn'
  AND en.locale = 'en';

ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_locale_slug_key;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS locale;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS title;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS excerpt;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS content;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS seo_title;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS seo_description;
ALTER TABLE blog_posts ALTER COLUMN title_en SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_key ON blog_posts(slug);

ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS hero_title_en TEXT;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS hero_title_bn TEXT;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS hero_subtitle_en TEXT;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS hero_subtitle_bn TEXT;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS overview_en TEXT;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS overview_bn TEXT;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS content_en JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS content_bn JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS curriculum_en JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS curriculum_bn JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS faqs_en JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS faqs_bn JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS outcomes_en JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS outcomes_bn JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS seo_title_en TEXT;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS seo_title_bn TEXT;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS seo_description_en TEXT;
ALTER TABLE course_public_pages ADD COLUMN IF NOT EXISTS seo_description_bn TEXT;

UPDATE course_public_pages
SET hero_title_en = title,
    hero_subtitle_en = excerpt,
    content_en = content,
    curriculum_en = curriculum,
    faqs_en = faqs,
    outcomes_en = outcomes,
    seo_title_en = seo_title,
    seo_description_en = seo_description
WHERE locale = 'en' OR hero_title_en IS NULL;

UPDATE course_public_pages en
SET hero_title_bn = bn.title,
    hero_subtitle_bn = bn.excerpt,
    content_bn = bn.content,
    curriculum_bn = bn.curriculum,
    faqs_bn = bn.faqs,
    outcomes_bn = bn.outcomes,
    seo_title_bn = bn.seo_title,
    seo_description_bn = bn.seo_description
FROM course_public_pages bn
WHERE en.course_id = bn.course_id
  AND en.locale = 'en'
  AND bn.locale = 'bn';

DELETE FROM course_public_pages bn
USING course_public_pages en
WHERE bn.course_id = en.course_id
  AND bn.locale = 'bn'
  AND en.locale = 'en';

ALTER TABLE course_public_pages DROP CONSTRAINT IF EXISTS course_public_pages_course_id_locale_key;
ALTER TABLE course_public_pages DROP CONSTRAINT IF EXISTS course_public_pages_locale_slug_key;
DROP INDEX IF EXISTS course_public_pages_locale_status_idx;
ALTER TABLE course_public_pages DROP COLUMN IF EXISTS locale;
ALTER TABLE course_public_pages DROP COLUMN IF EXISTS title;
ALTER TABLE course_public_pages DROP COLUMN IF EXISTS excerpt;
ALTER TABLE course_public_pages DROP COLUMN IF EXISTS content;
ALTER TABLE course_public_pages DROP COLUMN IF EXISTS curriculum;
ALTER TABLE course_public_pages DROP COLUMN IF EXISTS faqs;
ALTER TABLE course_public_pages DROP COLUMN IF EXISTS outcomes;
ALTER TABLE course_public_pages DROP COLUMN IF EXISTS seo_title;
ALTER TABLE course_public_pages DROP COLUMN IF EXISTS seo_description;
ALTER TABLE course_public_pages ALTER COLUMN hero_title_en SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS course_public_pages_course_id_key ON course_public_pages(course_id);
CREATE UNIQUE INDEX IF NOT EXISTS course_public_pages_slug_key ON course_public_pages(slug);

ALTER TABLE cms_sections ADD COLUMN IF NOT EXISTS data_en JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE cms_sections ADD COLUMN IF NOT EXISTS data_bn JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE cms_sections ADD COLUMN IF NOT EXISTS seo_title_en TEXT;
ALTER TABLE cms_sections ADD COLUMN IF NOT EXISTS seo_title_bn TEXT;
ALTER TABLE cms_sections ADD COLUMN IF NOT EXISTS seo_description_en TEXT;
ALTER TABLE cms_sections ADD COLUMN IF NOT EXISTS seo_description_bn TEXT;
ALTER TABLE cms_sections ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
ALTER TABLE cms_sections ADD COLUMN IF NOT EXISTS published_at TIMESTAMP(3);

UPDATE cms_sections s
SET data_en = t.data,
    seo_title_en = t.seo_title,
    seo_description_en = t.seo_description,
    status = t.status,
    published_at = t.published_at
FROM cms_section_translations t
WHERE t.section_id = s.id AND t.locale = 'en';

UPDATE cms_sections s
SET data_bn = t.data,
    seo_title_bn = t.seo_title,
    seo_description_bn = t.seo_description
FROM cms_section_translations t
WHERE t.section_id = s.id AND t.locale = 'bn';

DROP TABLE IF EXISTS cms_section_translations;

ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS student_name_en TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS student_name_bn TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS designation_en TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS designation_bn TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS message_en TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS message_bn TEXT;
UPDATE testimonials
SET student_name_en = student_name,
    student_name_bn = CASE WHEN locale = 'bn' THEN student_name ELSE student_name_bn END,
    designation_en = designation,
    designation_bn = CASE WHEN locale = 'bn' THEN designation ELSE designation_bn END,
    message_en = message,
    message_bn = CASE WHEN locale = 'bn' THEN message ELSE message_bn END;
ALTER TABLE testimonials DROP COLUMN IF EXISTS locale;
ALTER TABLE testimonials DROP COLUMN IF EXISTS student_name;
ALTER TABLE testimonials DROP COLUMN IF EXISTS designation;
ALTER TABLE testimonials DROP COLUMN IF EXISTS message;
ALTER TABLE testimonials ALTER COLUMN student_name_en SET NOT NULL;
ALTER TABLE testimonials ALTER COLUMN message_en SET NOT NULL;

ALTER TABLE strategic_team_members ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE strategic_team_members ADD COLUMN IF NOT EXISTS name_bn TEXT;
ALTER TABLE strategic_team_members ADD COLUMN IF NOT EXISTS designation_en TEXT;
ALTER TABLE strategic_team_members ADD COLUMN IF NOT EXISTS designation_bn TEXT;
ALTER TABLE strategic_team_members ADD COLUMN IF NOT EXISTS bio_en TEXT;
ALTER TABLE strategic_team_members ADD COLUMN IF NOT EXISTS bio_bn TEXT;
UPDATE strategic_team_members
SET name_en = name,
    name_bn = CASE WHEN locale = 'bn' THEN name ELSE name_bn END,
    designation_en = designation,
    designation_bn = CASE WHEN locale = 'bn' THEN designation ELSE designation_bn END,
    bio_en = bio,
    bio_bn = CASE WHEN locale = 'bn' THEN bio ELSE bio_bn END;
ALTER TABLE strategic_team_members DROP COLUMN IF EXISTS locale;
ALTER TABLE strategic_team_members DROP COLUMN IF EXISTS name;
ALTER TABLE strategic_team_members DROP COLUMN IF EXISTS designation;
ALTER TABLE strategic_team_members DROP COLUMN IF EXISTS bio;
ALTER TABLE strategic_team_members ALTER COLUMN name_en SET NOT NULL;
ALTER TABLE strategic_team_members ALTER COLUMN designation_en SET NOT NULL;

COMMIT;

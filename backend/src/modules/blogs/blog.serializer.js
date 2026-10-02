import { serializeRecord } from "../../core/utils/serialize.js";
import { pickLocalizedField, pickLocalizedJson } from "../../core/utils/localizedFields.js";

export const serializeBlog = (blog) => {
  if (!blog) return null;
  const result = serializeRecord(blog);

  return {
    id: result.id,
    slug: result.slug,
    titleEn: result.titleEn,
    titleBn: result.titleBn,
    excerptEn: result.excerptEn,
    excerptBn: result.excerptBn,
    contentEn: result.contentEn,
    contentBn: result.contentBn,
    authorId: result.authorId,
    authorName: result.authorName || "Dewan Ismail",
    author: result.authorName || "Dewan Ismail",
    coverImageUrl: result.coverImageUrl,
    tags: result.tags,
    seoTitleEn: result.seoTitleEn,
    seoTitleBn: result.seoTitleBn,
    seoDescriptionEn: result.seoDescriptionEn,
    seoDescriptionBn: result.seoDescriptionBn,
    status: result.status,
    isFeatured: Boolean(result.isFeatured || result.is_featured || false),
    publishedAt: result.publishedAt,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt
  };
};

export const serializePublicBlog = (blog, lang = "en") => {
  if (!blog) return null;
  const result = serializeRecord(blog);

  const rawContent = pickLocalizedJson(result, "content", lang);
  const hasUnpackedContent = rawContent && typeof rawContent === "object" && "content" in rawContent;
  
  const content = hasUnpackedContent ? rawContent.content : (typeof rawContent === "string" ? rawContent : "");
  const faq = hasUnpackedContent ? rawContent.faq : [];
  const coverImageUrl = result.coverImageUrl || (hasUnpackedContent ? rawContent.featuredImage || rawContent.coverImageUrl : null);
  const tags = result.tags && result.tags.length > 0 ? result.tags : (hasUnpackedContent && rawContent.category ? [rawContent.category] : []);

  return {
    id: result.id,
    slug: result.slug,
    title: pickLocalizedField(result, "title", lang),
    excerpt: pickLocalizedField(result, "excerpt", lang),
    content: content,
    authorId: result.authorId,
    authorName: result.authorName || "Dewan Ismail",
    author: result.authorName || "Dewan Ismail",
    coverImageUrl: coverImageUrl,
    tags: tags || [],
    faq: faq || [],
    seoTitle: pickLocalizedField(result, "seoTitle", lang),
    seoDescription: pickLocalizedField(result, "seoDescription", lang),
    status: result.status,
    isFeatured: Boolean(result.isFeatured || result.is_featured || false),
    publishedAt: result.publishedAt,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt
  };
};

export const serializeBlogs = (blogs) => {
  return (blogs || []).map(serializeBlog);
};

export const serializePublicBlogs = (blogs, lang = "en") => {
  return (blogs || []).map((blog) => serializePublicBlog(blog, lang));
};

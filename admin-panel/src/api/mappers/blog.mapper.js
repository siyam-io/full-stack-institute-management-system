export const mapBlog = (blog) => {
  if (!blog) return null;
  return {
    id: blog.id,
    title: blog.titleEn || "",
    titleEn: blog.titleEn || "",
    titleBn: blog.titleBn || "",
    slug: blog.slug || "",
    locale: blog.locale || "en",
    excerpt: blog.excerptEn || "",
    excerptEn: blog.excerptEn || "",
    excerptBn: blog.excerptBn || "",
    content: blog.contentEn || "",
    contentEn: blog.contentEn || "",
    contentBn: blog.contentBn || "",
    authorId: blog.authorId || null,
    coverImageUrl: blog.coverImageUrl || "",
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    seoTitle: blog.seoTitleEn || "",
    seoTitleEn: blog.seoTitleEn || "",
    seoTitleBn: blog.seoTitleBn || "",
    seoDescription: blog.seoDescriptionEn || "",
    seoDescriptionEn: blog.seoDescriptionEn || "",
    seoDescriptionBn: blog.seoDescriptionBn || "",
    status: blog.status || "draft",
    isFeatured: Boolean(blog.isFeatured || false),
    publishedAt: blog.publishedAt || null,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt
  };
};

export const mapBlogs = (blogs) => (blogs || []).map(mapBlog);

export const mapBlogListResponse = (response) => {
  const data = response?.data || [];
  const pagination = response?.pagination || {};
  const mappedBlogs = mapBlogs(data);
  return {
    data: mappedBlogs,
    blogs: mappedBlogs,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 30,
      total: pagination.total || 0,
      totalPages: pagination.totalPages || 0,
    },
  };
};

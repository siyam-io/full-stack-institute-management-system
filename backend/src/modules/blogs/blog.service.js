import * as blogRepository from "./blog.repository.js";

const formatSlug = (slug, title) => {
  const target = slug || title || "";
  return target
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
};

export const getBlogs = async (filters) => {
  const [blogs, count] = await Promise.all([
    blogRepository.findBlogs(filters),
    blogRepository.countBlogs(filters)
  ]);
  return { blogs, count };
};

export const getBlogById = async (id) => {
  const blog = await blogRepository.findById(id);
  if (!blog) throw new Error("Blog post not found");
  return blog;
};

export const getBlogBySlug = async (slug, locale) => {
  const blog = await blogRepository.findBySlug(slug);
  if (!blog) throw new Error("Blog post not found");
  return blog;
};

export const createBlog = async (data, authorId, file) => {
  const slug = formatSlug(data.slug, data.titleEn || data.title_en || data.title);
  
  const existing = await blogRepository.findBySlug(slug);
  if (existing) {
    throw new Error(`A blog post with slug '${slug}' already exists`);
  }

  const cover_image_url = file ? `/uploads/blogs/${file.filename}` : data.cover_image_url;
  const isFeatured = data.isFeatured === "true" || data.isFeatured === true || data.is_featured === "true" || data.is_featured === true || false;

  const blogData = {
    ...data,
    slug,
    author_id: authorId,
    cover_image_url,
    isFeatured
  };

  return await blogRepository.create(blogData);
};

export const updateBlog = async (id, data, file) => {
  const existingBlog = await blogRepository.findById(id);
  if (!existingBlog) {
    throw new Error("Blog post not found");
  }

  const updatedData = { ...data };

  if (file) {
    updatedData.cover_image_url = `/uploads/blogs/${file.filename}`;
  }

  if (data.isFeatured !== undefined) {
    updatedData.isFeatured = data.isFeatured === "true" || data.isFeatured === true;
  }

  if (data.slug || data.title || data.titleEn || data.title_en) {
    const title = data.titleEn || data.title_en || data.title || existingBlog.title_en;
    const slug = formatSlug(data.slug || existingBlog.slug, title);
    if (slug !== existingBlog.slug) {
      const duplicate = await blogRepository.findBySlug(slug);
      if (duplicate && duplicate.id !== id) {
        throw new Error(`A blog post with slug '${slug}' already exists`);
      }
      updatedData.slug = slug;
    }
  }

  // Publishing rule: when status becomes published, set published_at = now() if empty
  if (data.status === "published") {
    if (!existingBlog.published_at) {
      updatedData.published_at = new Date();
    }
  }

  return await blogRepository.update(id, updatedData);
};

export const deleteBlog = async (id) => {
  const existingBlog = await blogRepository.findById(id);
  if (!existingBlog) {
    throw new Error("Blog post not found");
  }
  return await blogRepository.remove(id);
};

export const getPublicBlogs = async (locale) => {
  return await blogRepository.findPublicBlogs();
};

export const getPublicBlogBySlug = async (slug, locale) => {
  const blog = await blogRepository.findPublicBlogBySlug(slug);
  if (!blog) throw new Error("Blog post not found or not published");
  return blog;
};

import { fetchFromBackend } from "./backendApi";

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  featuredImage: string; // mapped for UI compatibility
  tags: string[];
  category: string; // mapped for UI compatibility
  author: string;
  date: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoThumbnailUrl?: string;
  videoUploadDate?: string;
  faq?: Array<{ question: string; answer: string; seoAnswer?: string; fullAnswer?: string }>;
  lastReviewed?: string;
}

export async function getBlogsFromLocal(locale: string): Promise<BlogPost[]> {
  try {
    const fs = require("fs");
    const path = require("path");
    const blogDir = path.join(process.cwd(), `content/${locale}/blog`);
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir).filter((f: string) => f.endsWith(".json"));
      return files.map((file: string) => {
        const content = fs.readFileSync(path.join(blogDir, file), "utf8");
        const parsed = JSON.parse(content);
        return {
          ...parsed,
          coverImageUrl: parsed.featuredImage || "",
          featuredImage: parsed.featuredImage || "",
          tags: parsed.category ? [parsed.category] : [],
          category: parsed.category || "Culinary",
        };
      });
    }
  } catch (error) {
    console.error("Failed to read local blogs:", error);
  }
  return [];
}

export async function getBlogFromLocal(slug: string, locale: string): Promise<BlogPost | null> {
  try {
    const fs = require("fs");
    const path = require("path");
    const postPath = path.join(process.cwd(), `content/${locale}/blog/${slug}.json`);
    if (fs.existsSync(postPath)) {
      const content = fs.readFileSync(postPath, "utf8");
      const parsed = JSON.parse(content);
      return {
        ...parsed,
        coverImageUrl: parsed.featuredImage || "",
        featuredImage: parsed.featuredImage || "",
        tags: parsed.category ? [parsed.category] : [],
        category: parsed.category || "Culinary",
      };
    }
  } catch (error) {
    console.error(`Failed to read local blog ${slug}:`, error);
  }
  return null;
}

export async function fetchBlogs(locale: string): Promise<BlogPost[]> {
  try {
    const response = await fetchFromBackend(`/public/blogs?locale=${locale}`);
    if (response && response.success && Array.isArray(response.data)) {
      return response.data.map((blog: any) => {
        const dateStr = blog.publishedAt
          ? blog.publishedAt.split("T")[0]
          : (blog.createdAt ? blog.createdAt.split("T")[0] : new Date().toISOString().split("T")[0]);
        
        let imgUrl = blog.coverImageUrl || "/images/logo.svg";
        if (blog.coverImageUrl && blog.coverImageUrl.startsWith("/uploads")) {
          imgUrl = `http://localhost:3043${blog.coverImageUrl}`;
        }
        
        return {
          ...blog,
          date: dateStr,
          featuredImage: imgUrl,
          coverImageUrl: imgUrl,
          category: blog.tags?.[0] || "Culinary",
          author: blog.author || "Culinary Academy",
        };
      });
    }
  } catch (err) {
    console.warn("Backend blog API failed, falling back to local files:", err);
  }

  // Fallback to local files
  const localPosts = await getBlogsFromLocal(locale);
  return localPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchBlogBySlug(slug: string, locale: string): Promise<BlogPost | null> {
  try {
    const response = await fetchFromBackend(`/public/blogs/${slug}?locale=${locale}`);
    if (response && response.success && response.data) {
      const blog = response.data;
      const dateStr = blog.publishedAt
        ? blog.publishedAt.split("T")[0]
        : (blog.createdAt ? blog.createdAt.split("T")[0] : new Date().toISOString().split("T")[0]);
      
      let imgUrl = blog.coverImageUrl || "/images/logo.svg";
      if (blog.coverImageUrl && blog.coverImageUrl.startsWith("/uploads")) {
        imgUrl = `http://localhost:3043${blog.coverImageUrl}`;
      }
      
      return {
        ...blog,
        date: dateStr,
        featuredImage: imgUrl,
        coverImageUrl: imgUrl,
        category: blog.tags?.[0] || "Culinary",
        author: blog.author || "Culinary Academy",
      };
    }
  } catch (err) {
    console.warn(`Backend blog detail API for ${slug} failed, falling back to local file:`, err);
  }

  // Fallback to local files
  return getBlogFromLocal(slug, locale);
}

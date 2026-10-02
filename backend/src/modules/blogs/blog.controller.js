import * as blogService from "./blog.service.js";
import { serializeBlog, serializeBlogs, serializePublicBlog, serializePublicBlogs } from "./blog.serializer.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

// Admin: Get all blogs
export const getBlogs = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  const filters = {
    search: req.query.search,
    status: req.query.status,
    limit,
    skip
  };

  const { blogs, count } = await blogService.getBlogs(filters);

  const serializedBlogs = serializeBlogs(blogs);

  const pagination = {
    page,
    limit,
    total: count,
    totalPages: Math.ceil(count / limit)
  };

  res.json(ApiResponse.paginated("Blogs fetched successfully", serializedBlogs, pagination));
});

// Admin: Get blog by ID
export const getBlogById = catchAsync(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);
  res.json(new ApiResponse(200, "Blog fetched successfully", serializeBlog(blog)));
});

// Admin: Create blog
export const createBlog = catchAsync(async (req, res) => {
  const authorId = req.user?.id; // from auth middleware
  const blog = await blogService.createBlog(req.body, authorId, req.file);
  res.status(201).json(new ApiResponse(201, "Blog created successfully", serializeBlog(blog)));
});

// Admin: Update blog
export const updateBlog = catchAsync(async (req, res) => {
  const blog = await blogService.updateBlog(req.params.id, req.body, req.file);
  res.json(new ApiResponse(200, "Blog updated successfully", serializeBlog(blog)));
});

// Admin: Update blog status
export const updateBlogStatus = catchAsync(async (req, res) => {
  const blog = await blogService.updateBlog(req.params.id, { status: req.body.status });
  res.json(new ApiResponse(200, `Blog status updated to ${req.body.status}`, serializeBlog(blog)));
});

// Admin: Delete blog
export const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlog(req.params.id);
  res.json(new ApiResponse(200, "Blog deleted successfully"));
});

// Public: Get all published blogs
export const getPublicBlogs = catchAsync(async (req, res) => {
  const lang = req.query.lang || req.query.locale || "en";
  const blogs = await blogService.getPublicBlogs(lang);
  res.json(new ApiResponse(200, "Public blogs fetched successfully", serializePublicBlogs(blogs, lang)));
});

// Public: Get published blog by slug
export const getPublicBlogBySlug = catchAsync(async (req, res) => {
  const lang = req.query.lang || req.query.locale || "en";
  const blog = await blogService.getPublicBlogBySlug(req.params.slug, lang);
  res.json(new ApiResponse(200, "Public blog details fetched successfully", serializePublicBlog(blog, lang)));
});

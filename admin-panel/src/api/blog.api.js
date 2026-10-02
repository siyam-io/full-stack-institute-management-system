import { API } from "./axios.js";

export const fetchBlogs = async (page = 1, limit = 30, filters = {}) => {
  const params = new URLSearchParams({ page, limit, ...filters });
  const { data } = await API.get(`/blogs?${params}`);
  return data;
};

export const fetchBlogById = async (id) => {
  const { data } = await API.get(`/blogs/${id}`);
  return data.data;
};

export const createBlog = async (blogData) => {
  const { data } = await API.post("/blogs", blogData);
  return data.data;
};

export const updateBlog = async ({ id, blogData }) => {
  const { data } = await API.put(`/blogs/${id}`, blogData);
  return data.data;
};

export const updateBlogStatus = async ({ id, status }) => {
  const { data } = await API.patch(`/blogs/${id}/status`, { status });
  return data.data;
};

export const deleteBlog = async (id) => {
  const { data } = await API.delete(`/blogs/${id}`);
  return data.data;
};

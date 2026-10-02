import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as BlogAPI from "../api/blog.api.js";
import { handleError } from "../api/error";
import { mapBlog, mapBlogListResponse } from "../api/mappers";

export const useBlogs = (page = 1, limit = 30, filters = {}) => {
  return useQuery({
    queryKey: ["blogs", page, filters],
    queryFn: async () => {
      const data = await BlogAPI.fetchBlogs(page, limit, filters);
      return mapBlogListResponse(data);
    },
    keepPreviousData: true,
    onError: (error) => handleError(error, "Failed to load blogs"),
  });
};

export const useBlog = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const data = await BlogAPI.fetchBlogById(id);
      return mapBlog(data);
    },
    enabled: !!id,
    onError: (error) => handleError(error, "Failed to load blog details"),
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BlogAPI.createBlog,
    onSuccess: () => {
      toast.success("Blog created successfully!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => handleError(error, "Failed to create blog"),
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BlogAPI.updateBlog,
    onSuccess: (_, variables) => {
      toast.success("Blog updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.id] });
    },
    onError: (error) => handleError(error, "Failed to update blog"),
  });
};

export const useUpdateBlogStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BlogAPI.updateBlogStatus,
    onSuccess: (_, variables) => {
      toast.success(`Blog status updated to ${variables.status}!`);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.id] });
    },
    onError: (error) => handleError(error, "Failed to update blog status"),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BlogAPI.deleteBlog,
    onSuccess: () => {
      toast.success("Blog deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => handleError(error, "Failed to delete blog"),
  });
};

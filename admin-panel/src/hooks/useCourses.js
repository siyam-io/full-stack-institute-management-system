import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as CourseAPI from "../api/courses.api.js";
import { handleError } from "../api/error";
import { mapCourse, mapCourses, mapCourseListResponse } from "../api/mappers";

export const useCourses = (page = 1, limit = 30, filters = {}) => {
  return useQuery({
    queryKey: ["courses", page, filters],
    queryFn: async () => {
      const data = await CourseAPI.fetchCourses(page, limit, filters);
      return mapCourseListResponse(data);
    },
    keepPreviousData: true,
    onError: (error) => handleError(error, "Failed to load courses"),
  });
};

export const useActiveCourses = (filters = {}) => {
  return useQuery({
    queryKey: ["courses", "active", filters],
    queryFn: async () => {
      const data = await CourseAPI.fetchActiveCourses(filters);
      return mapCourses(data);
    },
    onError: (error) => handleError(error, "Failed to load active courses"),
  });
};

export const useCourse = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const data = await CourseAPI.fetchCourseById(id);
      return mapCourse(data);
    },
    enabled: !!id,
    onError: (error) => handleError(error, "Failed to load course details"),
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CourseAPI.createCourse,
    onSuccess: () => {
      toast.success("Course created successfully!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => handleError(error, "Failed to create course"),
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CourseAPI.updateCourse,
    onSuccess: (_, variables) => {
      toast.success("Course updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", variables.id] });
    },
    onError: (error) => handleError(error, "Failed to update course"),
  });
};

export const useToggleCourseStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CourseAPI.toggleCourseStatus,
    onSuccess: () => {
      toast.success("Course status toggled successfully!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => handleError(error, "Failed to toggle status"),
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CourseAPI.deleteCourse,
    onSuccess: () => {
      toast.success("Course deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => handleError(error, "Failed to delete course"),
  });
};

export const useCoursePublicPage = (courseId, locale) => {
  return useQuery({
    queryKey: ["course-public-page", courseId, locale],
    queryFn: () => CourseAPI.fetchCoursePublicPage(courseId, locale),
    enabled: !!courseId && !!locale,
    onError: (error) => handleError(error, "Failed to load public page details"),
  });
};

export const useUpdateCoursePublicPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CourseAPI.updateCoursePublicPage,
    onSuccess: (_, variables) => {
      toast.success("Course public page updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["course-public-page", variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => handleError(error, "Failed to update public page"),
  });
};

export const useUpdateCoursePublicPageStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CourseAPI.updateCoursePublicPageStatus,
    onSuccess: (_, variables) => {
      toast.success("Public page status updated!");
      queryClient.invalidateQueries({ queryKey: ["course-public-page", variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => handleError(error, "Failed to update public page status"),
  });
};
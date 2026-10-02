import { API } from "./axios.js";

export const fetchCourses = async (page = 1, limit = 30, filters = {}) => {
  const params = new URLSearchParams({ page, limit, ...filters });
  const { data } = await API.get(`/courses/all?${params}`);
  return data;
};

export const fetchActiveCourses = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const { data } = await API.get(`/courses/active?${params}`);
  return data.data;
};

export const fetchCourseById = async (id) => {
  const { data } = await API.get(`/courses/${id}`);
  return data.data; 
};

export const createCourse = async (courseData) => {
  const { data } = await API.post('/courses/create', courseData);
  return data.data;
};

export const updateCourse = async ({ id, formData }) => {
  const { data } = await API.put(`/courses/update/${id}`, formData);
  return data.data;
};

export const toggleCourseStatus = async (id) => {
  const { data } = await API.patch(`/courses/toggle-status/${id}`);
  return data.data;
};

export const deleteCourse = async (id) => {
  const { data } = await API.delete(`/courses/delete/${id}`);
  return data.data;
};

export const fetchCoursePublicPage = async (courseId, locale = "en") => {
  const { data } = await API.get(`/courses/${courseId}/public-page?lang=${locale}`);
  return data.data;
};

export const updateCoursePublicPage = async ({ courseId, formData }) => {
  // Use multipart/form-data for image upload
  const { data } = await API.post(`/courses/${courseId}/public-page`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

export const updateCoursePublicPageStatus = async ({ courseId, locale, status }) => {
  const { data } = await API.patch(`/courses/${courseId}/public-page/status`, { lang: locale, status });
  return data.data;
};

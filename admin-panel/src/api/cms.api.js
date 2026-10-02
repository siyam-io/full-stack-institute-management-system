import { API } from "./axios";

// ─── Section APIs ───

export const getSections = () => API.get("/cms/sections");

export const getSection = (sectionKey) =>
  API.get(`/cms/sections/${sectionKey}`);

export const updateSection = (sectionKey, data) =>
  API.put(`/cms/sections/${sectionKey}`, data);

// ─── Testimonial APIs ───

export const getTestimonials = () =>
  API.get("/cms/testimonials");

export const createTestimonial = (data) =>
  API.post("/cms/testimonials", data);

export const updateTestimonial = (id, data) =>
  API.put(`/cms/testimonials/${id}`, data);

export const deleteTestimonial = (id) =>
  API.delete(`/cms/testimonials/${id}`);

// ─── Team Member APIs ───

export const getTeamMembers = () =>
  API.get("/cms/strategic-team");

export const createTeamMember = (data) =>
  API.post("/cms/strategic-team", data);

export const updateTeamMember = (id, data) =>
  API.put(`/cms/strategic-team/${id}`, data);

export const deleteTeamMember = (id) =>
  API.delete(`/cms/strategic-team/${id}`);

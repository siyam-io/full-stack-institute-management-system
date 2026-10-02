import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as cmsApi from "../api/cms.api";

// ─── Section Hooks ───

export const useSections = () => {
  return useQuery({
    queryKey: ["cms", "sections"],
    queryFn: async () => {
      const res = await cmsApi.getSections();
      return res.data.data;
    },
  });
};

export const useSection = (sectionKey) => {
  return useQuery({
    queryKey: ["cms", "section", sectionKey],
    queryFn: async () => {
      const res = await cmsApi.getSection(sectionKey);
      return res.data.data;
    },
    enabled: !!sectionKey,
  });
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sectionKey, data }) => cmsApi.updateSection(sectionKey, data),
    onSuccess: (_, vars) => {
      toast.success("Section updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cms", "section", vars.sectionKey] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update section");
    },
  });
};

// ─── Testimonial Hooks ───

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["cms", "testimonials"],
    queryFn: async () => {
      const res = await cmsApi.getTestimonials();
      return res.data.data;
    },
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cmsApi.createTestimonial,
    onSuccess: () => {
      toast.success("Testimonial created");
      queryClient.invalidateQueries({ queryKey: ["cms", "testimonials"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create testimonial");
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => cmsApi.updateTestimonial(id, data),
    onSuccess: () => {
      toast.success("Testimonial updated");
      queryClient.invalidateQueries({ queryKey: ["cms", "testimonials"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update testimonial");
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cmsApi.deleteTestimonial,
    onSuccess: () => {
      toast.success("Testimonial deleted");
      queryClient.invalidateQueries({ queryKey: ["cms", "testimonials"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete testimonial");
    },
  });
};

// ─── Team Member Hooks ───

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["cms", "team"],
    queryFn: async () => {
      const res = await cmsApi.getTeamMembers();
      return res.data.data;
    },
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cmsApi.createTeamMember,
    onSuccess: () => {
      toast.success("Team member created");
      queryClient.invalidateQueries({ queryKey: ["cms", "team"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create team member");
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => cmsApi.updateTeamMember(id, data),
    onSuccess: () => {
      toast.success("Team member updated");
      queryClient.invalidateQueries({ queryKey: ["cms", "team"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update team member");
    },
  });
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cmsApi.deleteTeamMember,
    onSuccess: () => {
      toast.success("Team member deleted");
      queryClient.invalidateQueries({ queryKey: ["cms", "team"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete team member");
    },
  });
};

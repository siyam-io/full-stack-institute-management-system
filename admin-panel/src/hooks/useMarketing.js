import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as MarketingAPI from "../api/marketing.api.js";
import { handleError } from "../api/error";

export const useMarketingPage = (slug) => {
  return useQuery({
    queryKey: ["marketingPage", slug],
    queryFn: async () => {
      return await MarketingAPI.fetchMarketingPage(slug);
    },
    enabled: !!slug,
    onError: (error) => handleError(error, "Failed to load page content"),
  });
};

export const useSaveMarketingPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, data }) => MarketingAPI.saveMarketingPage(slug, data),
    onSuccess: (_, variables) => {
      toast.success("Page content updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["marketingPage", variables.slug] });
    },
    onError: (error) => handleError(error, "Failed to update page content"),
  });
};

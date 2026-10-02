import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as BatchAPI from "../api/batch.api";
import { handleError } from "../api/error";
import { mapBatch, mapBatches } from "../api/mappers";

export const useBatches = (filters = {}) => {
  return useQuery({
    queryKey: ["batches", filters],
    queryFn: async () => {
      const data = await BatchAPI.fetchBatches(filters);
      return mapBatches(data);
    },
  });
};

export const useBatchById = (id) => {
  return useQuery({
    queryKey: ["batch", id],
    queryFn: async () => {
      const data = await BatchAPI.fetchBatchById(id);
      return mapBatch(data);
    },
    enabled: !!id,
  });
};

export const useCreateBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BatchAPI.createBatch,
    onSuccess: () => {
      toast.success("Batch created successfully!");
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
    onError: (error) => handleError(error, "Failed to create batch"),
  });
};

export const useUpdateBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BatchAPI.updateBatch,
    onSuccess: (_, variables) => {
      toast.success("Batch updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["batches"] });
      queryClient.invalidateQueries({ queryKey: ["batch", variables.id] });
    },
    onError: (error) => handleError(error, "Update failed"),
  });
};

export const useDeleteBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BatchAPI.deleteBatch,
    onSuccess: () => {
      toast.success("Batch and curriculum deleted permanently");
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
    onError: () => handleError(null, "Failed to delete batch"),
  });
};
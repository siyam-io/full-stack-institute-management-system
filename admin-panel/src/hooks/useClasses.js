import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as ClassAPI from "../api/class.api";
import { handleError } from "../api/error";

export const useBatchClasses = (batchId) => {
  return useQuery({
    queryKey: ["batchClasses", batchId],
    queryFn: () => ClassAPI.fetchBatchClasses(batchId),
    enabled: !!batchId,
  });
};

export const useAddSyllabusItems = (batchId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (syllabusData) => ClassAPI.addSyllabusItems(batchId, syllabusData),
    onSuccess: () => {
      toast.success("Items added to Syllabus!");
      queryClient.invalidateQueries({ queryKey: ["batchClasses", batchId] });
    },
    onError: (error) => handleError(error, "Failed to add items"),
  });
};

export const useAutoSchedule = (batchId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => ClassAPI.autoScheduleBatch(batchId),
    onSuccess: () => {
      toast.success("Calendar populated!");
      queryClient.invalidateQueries({ queryKey: ["batchClasses", batchId] });
      queryClient.invalidateQueries({ queryKey: ["daily-schedule"] }); 
    },
    onError: (error) => handleError(error, "Scheduling failed"),
  });
};

export const useUpdateClassContent = (batchId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ClassAPI.updateClassContent,
    onSuccess: () => {
      toast.success("Class updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["batchClasses", batchId] });
    },
  });
};

export const useDeleteClass = (batchId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ClassAPI.deleteClassContent,
    onSuccess: () => {
      toast.success("Class removed successfully");
      queryClient.invalidateQueries({ queryKey: ["batchClasses", batchId] });
    },
    onError: (error) => handleError(error, "Failed to delete class"),
  });
};

export const useScheduleClass = (batchId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ClassAPI.scheduleClass,
    onSuccess: () => {
      toast.success("Class Schedule Updated!");
      queryClient.invalidateQueries({ queryKey: ["batchClasses", batchId] });
      queryClient.invalidateQueries({ queryKey: ["daily-schedule"] }); 
    },
    onError: (error) => handleError(error, "Failed to schedule class"),
  });
};
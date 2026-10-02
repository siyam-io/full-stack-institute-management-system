import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as FinanceAPI from "../api/finance.api";
import toast from "react-hot-toast";
import { handleError } from "../api/error";
import { mapFees, mapStudentFinance } from "../api/mappers";

export const useCampusFees = (filters = {}) => {
  return useQuery({
    queryKey: ["campus-fees", filters],
    queryFn: async () => {
      const data = await FinanceAPI.getCampusFees(filters);
      return mapFees(data);
    },
  });
};

export const useStudentFinance = (studentId) => {
  return useQuery({
    queryKey: ["student-finance", studentId],
    queryFn: async () => {
      const data = await FinanceAPI.getStudentFinance(studentId);
      return mapStudentFinance(data);
    },
    enabled: !!studentId,
  });
};

export const useCollectPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: FinanceAPI.collectPayment,
    onSuccess: async () => {
      toast.success("Payment collected successfully!");
      await queryClient.invalidateQueries({ queryKey: ["student-finance"] });
      await queryClient.invalidateQueries({ queryKey: ["campus-fees"] });
      await queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (err) => handleError(err, "Failed to process payment."),
  });
};

export const useUpdateFeeDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: FinanceAPI.updateFeeDiscount,
    onSuccess: async () => {
      toast.success("Scholarship/Discount applied!");
      await queryClient.invalidateQueries({ queryKey: ["student-finance"] });
      await queryClient.invalidateQueries({ queryKey: ["campus-fees"] });
      await queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (err) => handleError(err, "Failed to update discount."),
  });
};

export const useDownloadReceipt = () => {
  return useMutation({
    mutationFn: FinanceAPI.downloadReceiptAPI,
    onSuccess: (blob, txnId) => {
      const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Receipt_${txnId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); 
    },
    onError: () => handleError(null, "Failed to download receipt"),
  });
};

export const useSendSmsReminder = () => {
  return useMutation({
    mutationFn: FinanceAPI.sendSMSReminderAPI,
    onSuccess: () => toast.success("SMS reminder sent successfully!"),
    onError: (err) => handleError(err, "Failed to send SMS"),
  });
};
import { API } from "./axios";

export const initBkashPaymentAPI = async (payload) => {
  const { data } = await API.post("/payments/bkash/create", payload);
  return data.data || data;
};

export const executeBkashPaymentAPI = async (payload) => {
  const { data } = await API.post("/payments/bkash/execute", payload);
  return data.data || data;
};

export const manualVerifyPaymentAPI = async (payload) => {
  const { data } = await API.post("/payments/manual-verify", payload);
  return data.data || data;
};
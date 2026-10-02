import { API } from "./axios.js";

export const fetchMarketingPage = async (slug) => {
  const { data } = await API.get(`/marketing-pages/${slug}`);
  return data.data;
};

export const saveMarketingPage = async (slug, data) => {
  const { data: res } = await API.put(`/marketing-pages/${slug}`, data);
  return res.data;
};

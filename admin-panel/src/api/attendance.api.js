import { API } from "./axios";

export const getBatchAttendanceAPI = async (batchId, date) => {
  const params = date ? { date } : {};
  const { data } = await API.get(`/attendance/batch/${batchId}`, { params });
  return data.data || data;
};

export const saveBatchAttendanceAPI = async (payload) => {
  const { data } = await API.post("/attendance/save", payload);
  return data.data || data;
};

export const scanQRAttendanceAPI = async (payload) => {
  const { data } = await API.post("/attendance/scan-qr", payload);
  return data.data || data;
};

export const getStudentAttendanceAPI = async (studentId) => {
  const { data } = await API.get(`/attendance/student/${studentId}`);
  return data.data || data;
};

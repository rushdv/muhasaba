import api from "./client";

export const getLogs = async () => {
  const res = await api.get("/api/muhasaba");
  return res.data;
};

export const createLog = async (payload) => {
  const res = await api.post("/api/muhasaba", payload);
  return res.data;
};

export const toggleLog = async (id) => {
  const res = await api.patch(`/api/muhasaba/${id}`);
  return res.data;
};

export const deleteLog = async (id) => {
  await api.delete(`/api/muhasaba/${id}`);
};

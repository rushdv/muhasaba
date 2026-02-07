import api from "./client";

export const getLogs = async () => {
  const res = await api.get("/muhasaba");
  return res.data;
};

export const createLog = async (payload) => {
  const res = await api.post("/muhasaba", payload);
  return res.data;
};

export const toggleLog = async (id) => {
  const res = await api.patch(`/muhasaba/${id}`);
  return res.data;
};

export const deleteLog = async (id) => {
  await api.delete(`/muhasaba/${id}`);
};

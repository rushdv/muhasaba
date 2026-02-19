import api from "./client";

export const getRamadanContent = async (day) => {
  const res = await api.get(`/day-content/${day}`);
  return res.data;
};

export const getRandomAyat = async () => {
  const res = await api.get("/day-content/random-ayat/get");
  return res.data;
};

export const upsertRamadanReport = async (payload) => {
  const res = await api.post("/ramadan/report", payload);
  return res.data;
};

export const getRamadanHistory = async () => {
  const res = await api.get("/ramadan/history");
  return res.data;
};

export const getRamadanAnalytics = async () => {
  const res = await api.get("/ramadan/analytics");
  return res.data;
};

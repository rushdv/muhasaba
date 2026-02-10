import api from "./client";

export const getRamadanContent = async (day) => {
    const res = await api.get(`/api/ramadan/content/${day}`);
    return res.data;
};

export const upsertRamadanReport = async (payload) => {
    const res = await api.post("/api/ramadan/report", payload);
    return res.data;
};

export const getRamadanHistory = async () => {
    const res = await api.get("/api/ramadan/history");
    return res.data;
};

export const getRamadanAnalytics = async () => {
    const res = await api.get("/api/ramadan/analytics");
    return res.data;
};

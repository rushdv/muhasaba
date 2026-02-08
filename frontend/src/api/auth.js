import api from "./client";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
};

export const signup = async (username, email, password) => {
  const res = await api.post("/auth/signup", { username, email, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
};

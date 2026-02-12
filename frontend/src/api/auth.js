import api from "./client";

export const login = async (email, password, rememberMe = false) => {
  const res = await api.post("/auth/login", { email, password, rememberMe });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
};

export const signup = async (username, email, password, rememberMe = false) => {
  const res = await api.post("/auth/signup", { username, email, password, rememberMe });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
};

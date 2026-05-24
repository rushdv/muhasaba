import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // send cookies with every request (Better Auth sessions)
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Do NOT auto-redirect on 401 — guest users will naturally get 401
    // on protected endpoints. The UI handles this by showing AuthModal.
    // Only redirect if user was previously logged in (has a stale session).
    if (error.response?.status === 401) {
      // Let the calling code handle it — just reject the promise
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;

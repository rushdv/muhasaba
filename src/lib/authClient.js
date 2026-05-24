import { createAuthClient } from "better-auth/react";

// Better Auth requires a full URL, not a relative path.
// In dev: Vite proxy forwards /api/auth/* to localhost:3000/api/auth/*
// We point directly to the backend URL here.
const backendURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: backendURL,
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./context/ThemeContext";

const root = createRoot(document.getElementById("root"));
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

root.render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        {googleClientId ? (
          <GoogleOAuthProvider clientId={googleClientId}>
            <App />
          </GoogleOAuthProvider>
        ) : (
          <App />
        )}
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);

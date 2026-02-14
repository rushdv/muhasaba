# Deploying Muhasabah Monorepo to Vercel

Since this is a monorepo containing both a frontend (Vite) and a backend (Express), the best practice is to deploy them as **two separate Vercel projects**.

## 1. Deploying the Backend (`backend-node`)

1. Go to your Vercel Dashboard and click **"Add New..."** -> **"Project"**.
2. Import the `muhasabah` repository.
3. **Configure Project:**
   - **Project Name:** `muhasabah-backend` (or similar).
   - **Framework Preset:** Select **"Other"**.
   - **Root Directory:** Click "Edit" and select `backend-node`.
4. **Build & Development Settings:**
   - **Output Directory:** Leave this **BLANK** (default). **Do NOT set it to `frontend/dist`**.
   - _Note: If specific commands are needed, you can leave them as default since we configured `vercel.json`._
5. **Environment Variables:**
   - Add your `DATABASE_URL`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, etc. here.
6. Click **Deploy**.

**Fixing "No entrypoint found" Error**:
If you see an error expecting `frontend/dist`, it means Vercel's "Output Directory" setting is incorrectly set to `frontend/dist`. Go to **Settings > Build & Development** and clear the **Output Directory** field.

## 2. Deploying the Frontend (`frontend`)

1. Go to your Vercel Dashboard and click **"Add New..."** -> **"Project"**.
2. Import the `muhasabah` repository.
3. **Configure Project:**
   - **Project Name:** `muhasabah-frontend`.
   - **Framework Preset:** Select **"Vite"**.
   - **Root Directory:** Click "Edit" and select `frontend`.
4. **Environment Variables:**
   - Add `VITE_API_URL` (or similar) pointing to your **Backend URL** (e.g., `https://muhasabah-backend.vercel.app`).
   - _Note: You may need to update your frontend code to use this variable if it was using a hardcoded proxy._
5. Click **Deploy**.

## Summary

- **Project 1 (Backend)**: Root = `backend-node`. Deploys the API.
- **Project 2 (Frontend)**: Root = `frontend`. Deploys the UI.

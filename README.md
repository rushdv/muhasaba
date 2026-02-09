# Muhasabah

A self-reflection & productivity web app.

## Tech Stack
- Frontend: React
- Backend: FastAPI
- Database: PostgreSQL

## Google Sign-in setup

1. Create a Google OAuth 2.0 Client ID in Google Cloud Console. Use type "Web application" and add `http://localhost:5176` to the authorized origins.
2. In the frontend folder create a `.env` file (copy `.env.example`) and set `VITE_GOOGLE_CLIENT_ID` to your client id.

	Example (`frontend/.env`):

	VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

3. (Optional) Add the same client id to the backend `.env` as `GOOGLE_CLIENT_ID` if you plan to verify tokens on backend.
4. Restart the frontend dev server:

```bash
cd frontend
npm run dev
```

5. Open http://localhost:5176 and click the Google Sign-in button.

If you still see "Google OAuth components must be used within GoogleOAuthProvider", ensure `.env` is present in `frontend/` and the server was restarted after adding it.

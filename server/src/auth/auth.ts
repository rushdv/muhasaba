import { betterAuth } from "better-auth";
import { kyselyAdapter } from "@better-auth/kysely-adapter";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { config } from "../config";

// pg pool for Better Auth
const pool = new Pool({
  connectionString: config.database.url,
  ssl: { rejectUnauthorized: false },
});

// Kysely instance wrapping our pg pool
const db = new Kysely<any>({
  dialect: new PostgresDialect({ pool }),
});

export const auth = betterAuth({
  // Base URL of the backend — required for OAuth redirects
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  // Secret for signing sessions
  secret: process.env.BETTER_AUTH_SECRET,

  // Kysely adapter
  database: kyselyAdapter(db, {
    type: "postgres",
  }),

  // Email & password auth
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  // Google OAuth
  socialProviders: {
    google: {
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
    },
  },

  // Session config
  session: {
    expiresIn: 60 * 60 * 24 * 7,   // 7 days
    updateAge: 60 * 60 * 24,        // refresh daily
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  // Trusted origins — allows cookies cross-origin
  trustedOrigins: config.cors.origins,
});

export type Auth = typeof auth;

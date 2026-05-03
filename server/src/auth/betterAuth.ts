import { betterAuth } from "better-auth";
import { Kysely, PostgresDialect } from "kysely";
import pool from "../db/database";

const authDb = new Kysely({
  dialect: new PostgresDialect({ pool }),
});

export const betterAuthInstance = betterAuth({
  database: authDb,
});

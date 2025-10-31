import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "./types";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DB || "postgres",
    host: process.env.DB_HOST || "localhost",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    port: Number(process.env.DB_PORT || 5432),
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});

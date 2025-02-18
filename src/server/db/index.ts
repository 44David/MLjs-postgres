import postgres  from 'postgres';
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import { env } from "../../env"

import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
    conn: postgres.Sql | undefined
}

const conn = globalForDb.conn ?? postgres(env.POSTGRES_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn

export const db = drizzle(conn, { schema })


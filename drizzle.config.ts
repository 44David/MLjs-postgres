import { defineConfig } from "drizzle-kit";
import { type Config } from "drizzle-kit";
import { z } from "zod";
import { env } from "./src/env";


export default defineConfig({
    schema: "./src/server/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
            url: env.POSTGRES_URL,
        },
        tablesFilter: ["MLjs_*"],

}) satisfies Config;
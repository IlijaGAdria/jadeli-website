import { resolve } from "node:path";

import { config } from "dotenv";

import { z } from "zod";

config({ path: resolve(process.cwd(), "../../.env") });

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  FRONTEND_ORIGIN: z.string().default("http://localhost:3000"),
  DIRECTUS_URL: z.string().url("DIRECTUS_URL must be a valid URL"),
  DIRECTUS_EMAIL: z.string().email("DIRECTUS_EMAIL must be a valid email"),
  DIRECTUS_PASSWORD: z.string().min(1, "DIRECTUS_PASSWORD is required"),
});

export const env = envSchema.parse(process.env);

import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3001),
  FRONTEND_ORIGIN: z.string().default("http://localhost:3000"),
  DATABASE_URL: z.string(),
  DIRECTUS_URL: z.string().default("http://localhost:8055"),
  DIRECTUS_EMAIL: z.string(),
  DIRECTUS_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);

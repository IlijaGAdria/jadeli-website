import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "../../../../.env") });

import { z } from "zod";

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().optional(),
  DIRECTUS_URL: z.string().optional(),
  DIRECTUS_EMAIL: z.string().optional(),
  DIRECTUS_PASSWORD: z.string().optional(),
});

export const env = envSchema.parse(process.env);

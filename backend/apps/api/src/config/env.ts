import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3001),
});

export const env = envSchema.parse(process.env);

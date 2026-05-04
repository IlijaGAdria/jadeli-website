import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().min(1, 'API_URL must be a non-empty string').url('API_URL must be a valid URL'),
  API_KEY: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url('NEXT_PUBLIC_SITE_URL must be a valid URL').optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

function parseEnv() {
  // Only validate on the server — server-side env vars are not exposed to the browser.
  if (typeof window !== 'undefined') {
    return { API_URL: '', API_KEY: undefined, NEXT_PUBLIC_SITE_URL: undefined, NODE_ENV: 'development' as const };
  }

  const result = envSchema.safeParse({
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid frontend environment variables:\n${issues}`);
  }

  return result.data;
}

export const env = parseEnv();

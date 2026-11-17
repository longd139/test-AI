/**
 * apps/api/src/config.ts
 *
 * Fail-Fast Configuration Management & Validation (Slot 5 Production Readiness)
 * Validates process.env variables at server startup using Zod.
 * Halts the process immediately if required configuration is missing or malformed.
 */

import { z } from 'zod';
import dotenv from 'dotenv';

// Ensure dotenv is loaded before validation
dotenv.config();

export const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z
    .string()
    .min(1, { message: 'DATABASE_URL is required and cannot be empty' }),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  INCIDENT_DRILL_ENABLED: z
    .preprocess(
      (val) => val === 'true' || val === true || val === '1',
      z.boolean()
    )
    .default(false),
});

export type AppConfig = z.infer<typeof EnvSchema>;

let cachedConfig: AppConfig | null = null;

/**
 * Validates environment variables with fail-fast semantics.
 * If validation fails in production/runtime, logs the diagnostics and exits.
 * If throwsOnFailure=true (used in unit tests), throws an error instead of calling process.exit.
 */
export function loadConfig(
  customEnv?: Record<string, string | undefined>,
  throwsOnFailure = false
): AppConfig {
  const envToValidate = customEnv || process.env;
  const result = EnvSchema.safeParse(envToValidate);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');

    const failureMessage = `[FATAL CONFIGURATION ERROR] Application failed to start due to invalid environment variables:\n${errorDetails}`;

    if (throwsOnFailure) {
      throw new Error(failureMessage);
    }

    console.error(failureMessage);
    process.exit(1);
  }

  // Safety Assertion: If in production, ensure CORS_ORIGIN is not open wildcard '*'
  if (result.data.NODE_ENV === 'production' && result.data.CORS_ORIGIN.trim() === '*') {
    const corsError =
      '[FATAL SECURITY CONFIGURATION] CORS_ORIGIN cannot be "*" in production environment.';
    if (throwsOnFailure) {
      throw new Error(corsError);
    }
    console.error(corsError);
    process.exit(1);
  }

  return result.data;
}

/**
 * Returns the singleton validated config, loading it if not yet cached.
 */
export function getConfig(): AppConfig {
  if (!cachedConfig) {
    cachedConfig = loadConfig();
  }
  return cachedConfig;
}

/**
 * Parses comma-separated CORS_ORIGIN into an array of allowed origins.
 */
export function parseAllowedOrigins(corsOrigin: string): string[] {
  return corsOrigin
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

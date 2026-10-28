/**
 * Safe environment variable access with type fallbacks and validation
 */

export const isServer = typeof window === "undefined";
export const isClient = typeof window !== "undefined";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";

/**
 * Read an environment variable with a safe fallback
 */
export function getEnv(key: string, fallback: string = ""): string {
  return process.env[key] ?? fallback;
}

/**
 * Validate that critical environment variables exist
 */
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    if (isDevelopment) {
      console.warn(`[WARN]: Missing required environment variable: ${key}`);
      return "";
    }
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

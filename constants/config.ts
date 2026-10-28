/**
 * Global application configuration and environment defaults
 */
export const APP_CONFIG = {
  name: "රටම එකට - A Nation United",
  shortName: "රටම එකට",
  description: "Official National Operation for Drug Prevention, Enforcement & Rehabilitation - Presidential Secretariat of Sri Lanka",
  domain: "ratamaekata.gov.lk",
  version: "1.0.0",
  
  // API defaults
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
    timeoutMs: 15000,
    maxRetries: 2,
  },
  
  // Pagination defaults
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
  },
  
  // Localization defaults
  locales: ["en", "si", "ta"] as const,
  defaultLocale: "en" as const,
  
  // Storage keys
  storageKeys: {
    authToken: "rme_auth_token",
    refreshToken: "rme_refresh_token",
    theme: "rme_theme_mode",
    locale: "rme_locale",
  },
} as const;

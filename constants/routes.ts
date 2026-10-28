/**
 * Centralized application route definitions.
 * Use these constants instead of hardcoded strings across the project.
 */
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  OUR_RESPONSE: "/#pillars",
  NEWS: "/news",
  RESOURCES: "/#faq",
  STORIES: "/#stories",
  CONTACT: "/contact",
  SERVICES: "/#pillars",
  REPORT: "/report",
  REHABILITATION: "/rehabilitation",
  HOTLINES: "/#hotlines",

  // Authentication & Dashboard
  LOGIN: "/login",
  REPORTS: "/reports",

  // Internal API routes
  API: {
    HEALTH: "/api/health",
  },
} as const;

export type AppRoute = typeof ROUTES;

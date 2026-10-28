import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Target Python backend URL:
// Reads API_BASE_URL or PYTHON_API_URL (no NEXT_PUBLIC_ needed).
// Defaults to local server during dev, or deployed Vercel API in production.
const pythonApiUrl = (
  process.env.API_BASE_URL ||
  process.env.PYTHON_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://api-delta-one-54.vercel.app")
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  /* config options here */
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    agentFeedback: true,
  },
  // Redirects active across environments
  async redirects() {
    return [
      { source: "/", destination: "/en/", permanent: false },
      { source: "/login", destination: "/en/login/", permanent: false },
      { source: "/reports", destination: "/en/reports/", permanent: false },
    ];
  },
  // Reverse proxy /api/* to the Python backend automatically.
  // This avoids all CORS problems and eliminates the need for NEXT_PUBLIC_ variables.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${pythonApiUrl}/:path*`,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const pythonApiUrl = (process.env.PYTHON_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  /* config options here */
  // Only enable static export if explicitly requested (e.g. S3 static hosting).
  // For Vercel deployment, keep undefined to enable rewrites, dynamic routing, and serverless functions.
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    agentFeedback: true,
  },
  // Redirects active in both local development and Vercel production
  async redirects() {
    return [
      { source: "/", destination: "/en/", permanent: false },
      { source: "/login", destination: "/en/login/", permanent: false },
      { source: "/reports", destination: "/en/reports/", permanent: false },
    ];
  },
  // Rewrites handle API calls in local development by forwarding to the Python backend server,
  // while on Vercel production vercel.json edge routing handles /api/* directly.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? `${pythonApiUrl}/:path*`
            : "/api/:path*",
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

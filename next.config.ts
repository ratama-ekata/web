import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    agentFeedback: true,
  },
  // cacheComponents / partialPrefetching disabled: PPR is unsupported with `output: "export"`
  // Dev only: in the static export, `/` is handled by public/index.html instead.
  ...(process.env.NODE_ENV === "development"
    ? {
        async redirects() {
          return [
            { source: "/", destination: "/en/", permanent: false },
            { source: "/login", destination: "/en/login/", permanent: false },
            { source: "/reports", destination: "/en/reports/", permanent: false },
          ];
        },
      }
    : {}),
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

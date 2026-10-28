"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@/components/shared/error-fallback";
import "@/app/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root-level error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-zinc-50 p-4 font-sans text-zinc-900">
        <ErrorFallback
          error={error}
          reset={reset}
          title="Critical System Error"
          message="A critical failure occurred at the root layout level."
        />
      </body>
    </html>
  );
}

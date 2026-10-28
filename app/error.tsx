"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@/components/shared/error-fallback";
import { logger } from "@/lib/logger";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Application error captured by root error boundary:", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <ErrorFallback
        error={error}
        reset={reset}
        title="Application Error"
        message="An unexpected error occurred while rendering this page."
      />
    </div>
  );
}

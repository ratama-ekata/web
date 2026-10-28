import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function Loading() {
  return (
    <div className="flex-1 min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="lg" label="Loading content..." />
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="flex-1 min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-12 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 max-w-md w-full">
        <span className="text-6xl font-extrabold text-zinc-300 dark:text-zinc-700">
          404
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Page Not Found
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          The requested page could not be located or may have been moved.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={ROUTES.HOME} className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
          <Link href={ROUTES.SERVICES} className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: React.ReactNode;
  size?: "default" | "lg";
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  eyebrow,
  size = "default",
  children,
  className,
}: PageHeaderProps) {
  const isLarge = size === "lg";

  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800", className)}>
      <div className={cn("space-y-1", isLarge && "space-y-4")}>
        {eyebrow && <div className="flex items-center gap-2">{eyebrow}</div>}
        <h1
          className={cn(
            "font-bold tracking-tight text-zinc-900 dark:text-zinc-50",
            isLarge
              ? "text-4xl sm:text-5xl lg:text-[56px] font-black leading-[1.08] max-w-xl"
              : "text-2xl sm:text-3xl"
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "text-zinc-500 dark:text-zinc-400 max-w-2xl",
              isLarge ? "text-sm sm:text-base leading-relaxed" : "text-sm"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

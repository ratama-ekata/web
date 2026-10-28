import React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  optionalLabel?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required,
  optional,
  optionalLabel = "Optional",
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[15px] font-semibold text-[#171717] dark:text-zinc-100"
      >
        {label}
        {required && <span className="text-[#E5484D] text-xs ml-1 align-top">*</span>}
        {optional && (
          <span className="ml-1.5 text-[11px] font-normal text-zinc-500">({optionalLabel})</span>
        )}
      </label>
      {hint && <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-1">{hint}</p>}
      {children}
    </div>
  );
}

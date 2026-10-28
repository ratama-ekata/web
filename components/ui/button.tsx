import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "underline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

    const variantStyles: Record<string, string> = {
      primary:
        "bg-[#882637] text-white hover:bg-[#A83243] active:bg-[#C94A5A] dark:bg-[#882637] dark:hover:bg-[#A83243] focus-visible:ring-[#882637] shadow-xs",
      secondary:
        "bg-[#D9A441] text-white hover:bg-[#B8892F] active:bg-[#946C24] dark:bg-[#D9A441] dark:hover:bg-[#B8892F] focus-visible:ring-[#D9A441] shadow-xs",
      outline:
        "border border-[#882637] text-[#882637] bg-transparent hover:bg-[#882637] hover:border-[#882637] hover:text-white dark:border-[#F29EAA] dark:text-[#F29EAA] dark:hover:bg-[#882637] dark:hover:text-white dark:hover:border-[#882637] focus-visible:ring-[#882637]",
      ghost:
        "bg-transparent text-[#882637] hover:bg-[#FDF2F4] hover:text-[#A83243] dark:text-[#F29EAA] dark:hover:bg-[#320F16] focus-visible:ring-[#882637]",
      underline:
        "bg-transparent text-[#882637] dark:text-[#F29EAA] border-b-2 border-[#882637] dark:border-[#F29EAA] rounded-none hover:text-[#A83243] hover:border-[#A83243] px-1 py-0.5 shadow-none",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 shadow-xs",
    };

    const sizeStyles: Record<string, string> = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-11 px-6 text-base gap-2.5",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

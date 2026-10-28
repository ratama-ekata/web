import React from "react";
import Image from "next/image";

export interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "stacked" | "horizontal" | "full" | "icon";
  priority?: boolean;
}

/**
 * Official BrandLogo component utilizing:
 * 1. public/Logo-stacked.png - The stacked trilingual logo matching the exact navbar specification
 * 2. public/Logo.png - The wide horizontal trilingual logo
 * 3. public/Tagline vector.png - The standalone single maroon emblem motif
 */
export function BrandLogo({
  className = "",
  size = "md",
  variant = "stacked",
  priority = true,
}: BrandLogoProps) {
  // Dimensions for stacked logo (150x80 aspect ratio: ~1.875:1)
  const stackedDimensions = {
    sm: { width: 75, height: 40, hClass: "h-10" },
    md: { width: 105, height: 56, hClass: "h-14" },
    lg: { width: 135, height: 72, hClass: "h-18" },
  };

  // Dimensions for horizontal logo (375x56 aspect ratio: ~6.7:1)
  const horizontalDimensions = {
    sm: { width: 188, height: 28, hClass: "h-7" },
    md: { width: 254, height: 38, hClass: "h-9" },
    lg: { width: 321, height: 48, hClass: "h-11" },
  };

  const iconDimensions = {
    sm: { size: 28, class: "h-7 w-7" },
    md: { size: 36, class: "h-9 w-9" },
    lg: { size: 48, class: "h-12 w-12" },
  };

  // Standalone emblem icon variant
  if (variant === "icon") {
    const dim = iconDimensions[size];
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 transition-transform ${className}`}
      >
        <Image
          src="/Tagline vector.png"
          alt="රටම එකට - National Operation Emblem"
          width={dim.size}
          height={dim.size}
          priority={priority}
          className={`${dim.class} object-contain`}
        />
      </div>
    );
  }

  // Horizontal wide logo variant
  if (variant === "horizontal" || variant === "full") {
    const dim = horizontalDimensions[size];
    return (
      <div
        className={`group relative inline-flex items-center rounded-lg transition-all bg-transparent dark:bg-white dark:px-2.5 dark:py-1 dark:rounded-lg dark:shadow-xs ${className}`}
      >
        <Image
          src="/Logo.png"
          alt="රටම එකට - A Nation United National Operation"
          width={dim.width}
          height={dim.height}
          priority={priority}
          className={`${dim.hClass} w-auto object-contain transition-transform group-hover:scale-[1.01]`}
        />
      </div>
    );
  }

  // Default: Stacked logo (using public/logo image.png for light, /logo-image-dark.png for dark)
  const dim = stackedDimensions[size];

  return (
    <div
      className={`group relative inline-flex items-center transition-all bg-transparent ${className}`}
    >
      {/* Light Mode Logo (Dark Text on Transparent Background) */}
      <Image
        src="/logo image.png"
        alt="රටම එකට - A Nation United National Operation"
        width={dim.width}
        height={dim.height}
        priority={priority}
        className={`${dim.hClass} w-auto object-contain transition-transform group-hover:scale-[1.02] dark:hidden`}
      />
      {/* Dark Mode Logo (White Text on Transparent Background - No White Box) */}
      <Image
        src="/logo-image-dark.png"
        alt="රටම එකට - A Nation United National Operation"
        width={dim.width}
        height={dim.height}
        priority={priority}
        className={`${dim.hClass} w-auto object-contain transition-transform group-hover:scale-[1.02] hidden dark:block`}
      />
    </div>
  );
}

/**
 * Dedicated Emblem component rendering the standalone maroon figure motif (Tagline vector.png)
 */
export function BrandEmblem({
  className = "",
  size = "md",
  priority = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}) {
  return <BrandLogo className={className} size={size} variant="icon" priority={priority} />;
}

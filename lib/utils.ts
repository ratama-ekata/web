type ClassValue = ClassValue[] | Record<string, boolean | null | undefined> | string | number | null | boolean | undefined;

/**
 * Utility function to conditionally combine CSS classes.
 * Works seamlessly with Tailwind CSS and custom class names.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}

/**
 * Format a Date object or ISO string into localized human-readable date.
 */
export function formatDate(
  dateInput: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateInput) return "";
  const date = typeof dateInput === "object" ? dateInput : new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat("en-US", defaultOptions).format(date);
}

/**
 * Format numeric value to currency string (LKR, USD, etc.)
 */
export function formatCurrency(
  amount: number,
  currency: string = "LKR",
  locale: string = "en-LK"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Truncate long strings with trailing ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

/**
 * Pause execution for specified duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a unique random string identifier
 */
export function generateId(prefix: string = "id"): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
}

/**
 * Debounce a function call by specified milliseconds
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}

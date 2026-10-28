"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Globe, Search } from "lucide-react";
import RPNInput, {
  getCountryCallingCode,
  isValidPhoneNumber,
  formatPhoneNumber,
  formatPhoneNumberIntl,
  type Country as RPNCountry,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

export { isValidPhoneNumber, formatPhoneNumber, formatPhoneNumberIntl };

export interface Country {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  dial: string;
}

export const COUNTRIES: Country[] = [
  { code: "LK", name: "Sri Lanka", dial: "+94" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "MV", name: "Maldives", dial: "+960" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "JP", name: "Japan", dial: "+81" },
];

export interface PhoneInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  country?: Country | string;
  onCountryChange?: (country: Country) => void;
  defaultCountry?: RPNCountry;
  countryLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

function CountryFlag({
  code,
  name,
  className,
}: {
  code?: string;
  name?: string;
  className?: string;
}) {
  if (!code || code === "ZZ") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-3.5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
          className
        )}
      >
        <Globe className="h-3 w-3" />
      </span>
    );
  }

  const FlagComponent = flags[code as keyof typeof flags];
  if (FlagComponent) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] shadow-2xs border border-black/10 dark:border-white/10",
          className
        )}
      >
        <FlagComponent title={name || code} />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-3.5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-zinc-200 text-[9px] font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-200",
        className
      )}
    >
      {code}
    </span>
  );
}

interface CountrySelectProps {
  value?: string;
  onChange: (value?: string) => void;
  options: { value?: string; label: string; divider?: boolean }[];
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  "aria-label"?: string;
}

function CustomCountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  "aria-label": ariaLabel = "Select country",
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Focus search input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [open]);

  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === value);
  }, [options, value]);

  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => {
      if (opt.divider) return false;
      if (!opt.value) return opt.label.toLowerCase().includes(q);
      const nameMatch = opt.label.toLowerCase().includes(q);
      const codeMatch = opt.value.toLowerCase().includes(q);
      let dial = "";
      try {
        dial = getCountryCallingCode(opt.value as RPNCountry);
      } catch {}
      const dialMatch = dial.includes(q.replace(/^\+/, ""));
      return nameMatch || codeMatch || dialMatch;
    });
  }, [options, search]);

  return (
    <div ref={containerRef} className="relative flex items-center shrink-0">
      <button
        type="button"
        disabled={disabled || readOnly}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 cursor-pointer items-center gap-1 rounded-md px-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#882637]"
      >
        <CountryFlag code={value} name={selectedOption?.label} />
        <ChevronDown
          className={cn(
            "h-3 w-3 text-zinc-500 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <div
        className="h-5 w-px bg-zinc-200 dark:bg-zinc-700 mx-1.5 shrink-0"
        aria-hidden="true"
      />

      {open && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 top-full mt-2 z-50 flex w-72 sm:w-80 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 animate-in fade-in-50 zoom-in-95 duration-150"
        >
          {/* Search box */}
          <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/60 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-800/40">
            <Search className="h-3.5 w-3.5 text-zinc-400 shrink-0" aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code..."
              className="w-full bg-transparent text-xs text-zinc-900 placeholder:text-zinc-400 outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
          </div>

          {/* Scrollable country list with authentic SVG flags */}
          <div className="max-h-64 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-zinc-500">
                No country found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                if (opt.divider) {
                  return (
                    <div
                      key="divider"
                      className="my-1 border-t border-zinc-100 dark:border-zinc-800"
                    />
                  );
                }
                const isSelected = opt.value === value;
                let dial = "";
                if (opt.value && opt.value !== "ZZ") {
                  try {
                    dial = `+${getCountryCallingCode(opt.value as RPNCountry)}`;
                  } catch {}
                }
                return (
                  <button
                    key={opt.value || "ZZ"}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(opt.value === "ZZ" ? undefined : opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
                      isSelected &&
                        "bg-[#FDF2F4] text-[#882637] dark:bg-zinc-800 dark:text-zinc-100 font-semibold"
                    )}
                  >
                    <CountryFlag code={opt.value} name={opt.label} />
                    <span className="flex-1 truncate text-zinc-800 dark:text-zinc-200">
                      {opt.label}
                    </span>
                    {dial && (
                      <span className="text-zinc-400 text-[11px] font-mono shrink-0">
                        {dial}
                      </span>
                    )}
                    {isSelected && (
                      <Check
                        className="h-3.5 w-3.5 text-[#882637] dark:text-[#F29EAA] shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={cn(
      "h-full w-full bg-transparent px-2 text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-50 dark:placeholder:text-zinc-500",
      className
    )}
  />
));
CustomInput.displayName = "PhoneInputCustomInput";

export function PhoneInput({
  id = "phone-input",
  name,
  value,
  onChange,
  country,
  onCountryChange,
  defaultCountry = "LK",
  countryLabel = "Country code",
  placeholder,
  disabled,
  className,
  error,
}: PhoneInputProps) {
  // Normalize incoming country to ISO code
  const currentCountryCode = useMemo<RPNCountry | undefined>(() => {
    if (!country) return defaultCountry;
    if (typeof country === "string") return country as RPNCountry;
    return (country.code || defaultCountry) as RPNCountry;
  }, [country, defaultCountry]);

  const handleCountryChange = (c?: RPNCountry) => {
    if (!c || !onCountryChange) return;
    const existing = COUNTRIES.find((item) => item.code === c);
    if (existing) {
      onCountryChange(existing);
    } else {
      let dial = "";
      try {
        dial = `+${getCountryCallingCode(c)}`;
      } catch {
        dial = "";
      }
      onCountryChange({
        code: c,
        name: c,
        dial,
      });
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-1.5">
      <div
        className={cn(
          "phone-input-wrapper flex h-11 w-full items-center rounded-lg border bg-white px-3 text-sm transition-all focus-within:ring-2 focus-within:ring-[#882637] dark:bg-zinc-900 dark:focus-within:ring-zinc-100",
          error
            ? "border-red-500"
            : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600",
          disabled && "opacity-50 pointer-events-none bg-zinc-50 dark:bg-zinc-800",
          className
        )}
      >
        <RPNInput
          id={id}
          name={name}
          value={value}
          onChange={(val) => onChange(val || "")}
          defaultCountry={defaultCountry}
          country={currentCountryCode}
          onCountryChange={handleCountryChange}
          flags={flags}
          countrySelectComponent={CustomCountrySelect}
          international
          countryCallingCodeEditable={false}
          inputComponent={CustomInput}
          placeholder={placeholder || "077 123 4567"}
          disabled={disabled}
          aria-label={countryLabel}
          aria-invalid={!!error}
          className="w-full flex items-center"
        />
      </div>

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

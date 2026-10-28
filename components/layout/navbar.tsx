"use client";

import React, { useState, useEffect } from "react";
import { Link, usePathname, Locale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/context/theme-context";
import { useMounted } from "@/hooks/use-mounted";
import { ROUTES } from "@/constants/routes";
import { BrandLogo } from "@/components/shared/brand-logo";
import {
  Phone,
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useLocaleTransition } from "@/components/shared/locale-transition";

export function Navbar() {
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const t = useTranslations("header");
  const tFooter = useTranslations("footer");
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isPending, targetLocale, changeLocale } = useLocaleTransition();

  // Navigation items: "Home", "About", "Rehabilitation", "News", "Contact"
  const navLinks = [
    { label: t("navHome"), href: ROUTES.HOME },
    { label: t("navAbout"), href: ROUTES.ABOUT },
    { label: t("navRehabilitation"), href: ROUTES.REHABILITATION },
    { label: t("navNews"), href: ROUTES.NEWS },
    { label: t("navContact"), href: ROUTES.CONTACT },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDarkMode = mounted && resolvedTheme === "dark";

  return (
    <header className="w-full sticky top-0 z-40 transition-colors shadow-2xs">
      {/* 1. TOP ANNOUNCEMENT / HOTLINES BAR (Solid Black Background with Gold Hotline Text, Exact 32px Height) */}
      <div className="bg-[#000000] text-[#FBBF24] h-8 px-4 sm:px-6 lg:px-8 text-xs font-medium border-b border-[#171717]/80 flex items-center">
        <div className="mx-auto max-w-7xl w-full flex items-center justify-end gap-6 sm:gap-8">
          {/* Hotline 1818 */}
          <a
            href="tel:1818"
            className="inline-flex items-center gap-1.5 text-[#FBBF24] hover:text-[#FDE68A] transition-colors cursor-pointer group"
            title="Call 1818"
          >
            <Phone className="h-3.5 w-3.5 text-[#FBBF24] fill-[#FBBF24]" />
            <span className="text-[#FBBF24]">
              {currentLocale === "si" ? "ක්ෂණික ඇමතුම්: " : currentLocale === "ta" ? "துரித அழைப்பு: " : "Hotline: "}
              <strong className="font-bold tracking-wide">1818</strong>{" "}
              <span className="font-normal opacity-95 hidden sm:inline">
                ({t("hotline1818Sub")})
              </span>
            </span>
          </a>

          {/* Hotline 1927 */}
          <a
            href="tel:1927"
            className="inline-flex items-center gap-1.5 text-[#FBBF24] hover:text-[#FDE68A] transition-colors cursor-pointer group"
            title="Call 1927"
          >
            <Phone className="h-3.5 w-3.5 text-[#FBBF24] fill-[#FBBF24]" />
            <span className="text-[#FBBF24]">
              {currentLocale === "si" ? "ක්ෂණික ඇමතුම්: " : currentLocale === "ta" ? "துரித அழைப்பு: " : "Hotline: "}
              <strong className="font-bold tracking-wide">1927</strong>{" "}
              <span className="font-normal opacity-95 hidden sm:inline">
                ({t("hotline1927Sub")})
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* 2. MAIN HEADER SECTION (White Background / Dark Mode Support) */}
      <div className="bg-[#FFFFFF] dark:bg-[#000000] border-b border-[#E5E5E5] dark:border-[#262626] transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between gap-3 lg:gap-4">
          {/* Left: Brand Logo (Stacked 4 figures + trilingual text matching screenshot) */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center group select-none shrink-0"
            aria-label="Rata Ma Ekata - Home"
          >
            <BrandLogo size="md" variant="stacked" />
          </Link>

          {/* Center Navigation Links (Desktop only) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 shrink-0">
            {navLinks.map((item) => {
              const isActive =
                item.href === ROUTES.HOME
                  ? pathname === ROUTES.HOME
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[13px] 2xl:text-sm font-semibold whitespace-nowrap transition-colors py-1 shrink-0 ${
                    isActive
                      ? "text-[#882637] dark:text-[#F29EAA] font-bold"
                      : "text-[#171717] dark:text-[#E5E5E5] hover:text-[#882637] dark:hover:text-[#F29EAA]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Theme Toggle, Language Switcher, Report Now Button */}
          <div className="hidden md:flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 xl:gap-4 shrink-0">
            {/* Theme Toggle Icon Button (Circular container with maroon moon) */}
            <button
              onClick={toggleTheme}
              className="h-10 w-10 shrink-0 rounded-full bg-[#FFFBEB] dark:bg-[#16161A] hover:bg-white dark:hover:bg-[#241014] border-2 border-[#882637] shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] hover:shadow-[4px_4px_0px_0px_#882637] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#882637] flex items-center justify-center transition-all cursor-pointer text-[#882637] dark:text-[#FBBF24]"
              aria-label={t("themeToggle")}
              title={t("themeToggle")}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 fill-[#FBBF24] text-[#FBBF24]" />
              ) : (
                <Moon className="h-5 w-5 fill-[#882637] text-[#882637]" />
              )}
            </button>

            {/* Language Switcher (Order: Sinhala, English, Tamil) */}
            <div
              role="group"
              aria-label="Language Selector"
              className="inline-flex items-center rounded-xl border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-1 shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] shrink-0 gap-1"
            >
              {([
                { code: "si", label: "සිංහල" },
                { code: "en", label: "ENGLISH" },
                { code: "ta", label: "தமிழ்" },
              ] as const).map((lang) => {
                const isActive = currentLocale === lang.code;
                const isTarget = isPending && targetLocale === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => changeLocale(lang.code)}
                    disabled={isPending}
                    aria-pressed={isActive}
                    className={`px-2.5 sm:px-3 py-1 text-xs transition-all cursor-pointer rounded-lg whitespace-nowrap ${
                      isTarget
                        ? "border-2 border-[#882637] dark:border-[#F29EAA] font-black text-[#882637] dark:text-[#F29EAA] bg-[#FDF2F4] dark:bg-[#320F16] animate-pulse"
                        : isActive
                        ? "border-2 border-[#882637] font-black text-[#882637] dark:text-[#F29EAA] bg-white dark:bg-[#2A1116] shadow-[2px_2px_0px_0px_#882637] dark:shadow-[2px_2px_0px_0px_#511B25]"
                        : "border-2 border-transparent text-[#525252] dark:text-[#A3A3A3] hover:text-[#882637] dark:hover:text-[#F29EAA] hover:bg-[#882637]/10 font-bold"
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>

            {/* Desktop Report Now CTA Button */}
            <Link href={ROUTES.REPORT} className="hidden xl:inline-flex shrink-0">
              <button
                type="button"
                className="h-10 px-4 xl:px-5 rounded-xl bg-[#882637] hover:bg-[#701622] active:bg-[#511B25] text-white text-sm font-black border-2 border-[#882637] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] hover:shadow-[5px_5px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#171717] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>{t("reportNow")}</span>
                <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </Link>

            {/* Tablet Hamburger Button (md:flex lg:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden h-10 w-10 shrink-0 rounded-xl border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] text-[#882637] dark:text-[#FAFAFA] shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] hover:shadow-[4px_4px_0px_0px_#882637] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#882637] flex items-center justify-center cursor-pointer transition-all"
              aria-label={t("menu")}
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Only: Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="h-10 w-10 rounded-xl border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] text-[#882637] dark:text-[#FAFAFA] shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] hover:shadow-[4px_4px_0px_0px_#882637] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#882637] flex items-center justify-center cursor-pointer transition-all"
              aria-label={t("menu")}
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE & TABLET DRAWER OVERLAY (Smooth iOS-style Slide & Fade Animation) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop Blur */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-out Drawer Panel */}
        <div
          className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-[#FFFFFF] dark:bg-[#0A0A0A] shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E5E5E5] dark:border-[#262626] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top Announcement / Hotlines Bar (Visible in Mockup) */}
          <div className="bg-[#000000] text-[#FBBF24] h-8 px-4 sm:px-6 text-xs font-medium border-b border-[#171717]/80 flex items-center justify-between shrink-0">
            <a
              href="tel:1818"
              className="inline-flex items-center gap-1.5 text-[#FBBF24] hover:text-[#FDE68A] transition-colors"
              title="Call 1818"
            >
              <Phone className="h-3 w-3 text-[#FBBF24] fill-[#FBBF24]" />
              <span>
                Hotline: <strong className="font-bold">1818</strong>{" "}
                <span className="font-normal opacity-90 text-[11px]">(Report Drug Activity)</span>
              </span>
            </a>
            <a
              href="tel:1927"
              className="inline-flex items-center gap-1.5 text-[#FBBF24] hover:text-[#FDE68A] transition-colors"
              title="Call 1927"
            >
              <Phone className="h-3 w-3 text-[#FBBF24] fill-[#FBBF24]" />
              <span>
                Hotline: <strong className="font-bold">1927</strong>
              </span>
            </a>
          </div>

          <div className="p-5 sm:p-6 space-y-6 flex-1 flex flex-col justify-between">
            <div>
              {/* Row 1: Logo on Left, Close Button in Rounded Box on Right */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F5F5F5] dark:border-[#262626]">
                <Link
                  href={ROUTES.HOME}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center select-none"
                  aria-label="Rata Ma Ekata"
                >
                  <BrandLogo size="md" variant="stacked" />
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-10 w-10 rounded-xl border-2 border-[#882637] text-[#882637] dark:text-[#FAFAFA] bg-[#FFFBEB] dark:bg-[#16161A] shadow-[2px_2px_0px_0px_#882637] dark:shadow-[2px_2px_0px_0px_#511B25] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center cursor-pointer transition-all"
                  aria-label={t("closeMenu")}
                >
                  <X className="h-5 w-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Row 2: Theme Toggle on Left, Language Switcher on Right */}
              <div
                className={`flex items-center justify-between pt-4 transition-all duration-300 delay-100 ${
                  mobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="h-10 w-10 rounded-full bg-[#FFFBEB] dark:bg-[#16161A] hover:bg-white dark:hover:bg-[#241014] border-2 border-[#882637] shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] flex items-center justify-center transition-all cursor-pointer text-[#882637] dark:text-[#FBBF24] active:scale-95"
                  aria-label={t("themeToggle")}
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 fill-[#FBBF24] text-[#FBBF24]" />
                  ) : (
                    <Moon className="h-5 w-5 fill-[#882637] text-[#882637]" />
                  )}
                </button>

                {/* Mobile Language Switcher (Order: Sinhala, English, Tamil) */}
                <div
                  role="group"
                  aria-label="Language Selector"
                  className="inline-flex items-center rounded-xl border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-1 shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] gap-1"
                >
                  {([
                    { code: "si", label: "සිං" },
                    { code: "en", label: "EN" },
                    { code: "ta", label: "தமிழ்" },
                  ] as const).map((lang) => {
                    const isActive = currentLocale === lang.code;
                    const isTarget = isPending && targetLocale === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLocale(lang.code);
                          setMobileMenuOpen(false);
                        }}
                        disabled={isPending}
                        className={`px-3 py-1 text-xs font-black transition-all cursor-pointer rounded-lg ${
                          isTarget
                            ? "border-2 border-[#882637] dark:border-[#F29EAA] text-[#882637] dark:text-[#F29EAA] bg-[#FDF2F4] dark:bg-[#320F16] animate-pulse"
                            : isActive
                            ? "border-2 border-[#882637] text-[#882637] dark:text-[#F29EAA] bg-white dark:bg-[#2A1116] shadow-[2px_2px_0px_0px_#882637] dark:shadow-[2px_2px_0px_0px_#511B25]"
                            : "border-2 border-transparent text-[#737373] dark:text-[#A3A3A3] hover:text-[#882637] dark:hover:text-[#FAFAFA]"
                        }`}
                      >
                        {lang.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vertical Navigation Links with Staggered Entrance */}
              <nav className="flex flex-col space-y-3.5 pt-5">
                {navLinks.map((item, idx) => {
                  const isActive =
                    item.href === ROUTES.HOME
                      ? pathname === ROUTES.HOME
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        transitionDelay: mobileMenuOpen ? `${120 + idx * 40}ms` : "0ms",
                      }}
                      className={`text-base font-semibold py-1 transition-all duration-300 ${
                        mobileMenuOpen
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      } ${
                        isActive
                          ? "text-[#882637] dark:text-[#F29EAA] font-bold"
                          : "text-[#171717] dark:text-[#FAFAFA] hover:text-[#882637] dark:hover:text-[#F29EAA]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Full Width Report Now CTA Button */}
              <div
                style={{
                  transitionDelay: mobileMenuOpen ? "280ms" : "0ms",
                }}
                className={`pt-5 transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <Link
                  href={ROUTES.REPORT}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block"
                >
                  <button
                    type="button"
                    className="w-full h-12 rounded-xl bg-[#882637] hover:bg-[#701622] active:bg-[#511B25] text-white text-base font-black border-2 border-[#882637] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] hover:shadow-[5px_5px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#171717] flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>{t("reportNow")}</span>
                    <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Dedicated "Hotlines" Cards at the Bottom */}
            <div
              style={{
                transitionDelay: mobileMenuOpen ? "320ms" : "0ms",
              }}
              className={`pt-5 border-t border-[#E5E5E5] dark:border-[#262626] space-y-3 mt-6 transition-all duration-300 ${
                mobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-xs font-bold text-[#737373] dark:text-[#A3A3A3] block">
                {tFooter("hotlinesTitle")}
              </span>

              {/* Card 1: 1818 */}
              <a
                href="tel:1818"
                className="block p-3.5 rounded-2xl border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#525252] dark:text-neutral-400 font-semibold">
                  <Phone className="h-3.5 w-3.5 text-[#882637] dark:text-[#F29EAA]" />
                  <span>{tFooter("reportActivity")}</span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-0.5">
                  <span className="text-xl font-black text-[#171717] dark:text-white tracking-tight">
                    1818
                  </span>
                  <span className="text-[10px] font-black text-white uppercase tracking-wider bg-[#882637] border border-[#882637] px-2.5 py-1 rounded-full shadow-[1.5px_1.5px_0px_0px_#171717]">
                    {tFooter("tollFree")}
                  </span>
                </div>
              </a>

              {/* Card 2: 1927 */}
              <a
                href="tel:1927"
                className="block p-3.5 rounded-2xl border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#525252] dark:text-neutral-400 font-semibold">
                  <Phone className="h-3.5 w-3.5 text-[#882637] dark:text-[#F29EAA]" />
                  <span>{tFooter("rehabSupport")}</span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-0.5">
                  <span className="text-xl font-black text-[#171717] dark:text-white tracking-tight">
                    1927
                  </span>
                  <span className="text-[10px] font-black text-white uppercase tracking-wider bg-[#171717] dark:bg-neutral-800 border border-[#171717] dark:border-neutral-700 px-2.5 py-1 rounded-full shadow-[1.5px_1.5px_0px_0px_#882637]">
                    {tFooter("confidential")}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Export both Navbar and MainHeader
export const MainHeader = Navbar;

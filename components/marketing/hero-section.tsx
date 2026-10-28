"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { BrandEmblem } from "@/components/shared/brand-logo";
import { HeroMap } from "@/components/marketing/hero-map";
import { Phone, ArrowUpRight, ShieldCheck, Headphones, Heart } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("marketing.hero");

  return (
    <section
      id="about"
      className="relative w-full bg-[#FFFDF0] dark:bg-[#000000] transition-colors overflow-hidden min-h-[calc(100vh-112px)] min-h-[calc(100dvh-112px)] lg:h-[calc(100vh-112px)] lg:h-[calc(100dvh-112px)] flex flex-col justify-center scroll-mt-16"
      style={{
        minHeight: "calc(100dvh - 112px)",
      }}
    >
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-0 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center w-full">
          {/* Left Column: Messaging & Actions */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4 lg:space-y-3.5 xl:space-y-4.5">
            {/* 1. Initiative Eyebrow */}
            <div className="inline-flex items-center gap-2 select-none">
              <BrandEmblem size="sm" priority />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#171717] dark:text-[#FAFAFA]">
                {t("eyebrow")}
              </span>
            </div>

            {/* 2. Main Headline with Double Wavy Decorative Underline on highlighted text */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[48px] 2xl:text-[52px] font-black text-[#171717] dark:text-white tracking-tight leading-[1.12] max-w-2xl">
              {t("titlePart1")}{" "}
              <br className="hidden sm:inline" />
              {t("titlePart2")}{" "}
              <span className="relative inline-block text-[#882637] dark:text-[#F29EAA] pb-1">
                {t("titleHighlight")}
                {/* Double Wavy Sketch Underline Pixel-Matched to Screenshot */}
                <svg
                  className="absolute left-0 -bottom-1 w-full h-3.5 text-[#882637] dark:text-[#F29EAA] overflow-visible pointer-events-none"
                  viewBox="0 0 140 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 2 5 Q 12 0, 22 5 T 42 5 T 62 5 T 82 5 T 102 5 T 122 5 T 138 5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 2 9.5 Q 12 4.5, 22 9.5 T 42 9.5 T 62 9.5 T 82 9.5 T 102 9.5 T 122 9.5 T 138 9.5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.9"
                  />
                </svg>
              </span>
            </h1>

            {/* 3. Subheadline / Description */}
            <p className="text-sm sm:text-base lg:text-[15px] xl:text-[16.5px] text-[#525252] dark:text-[#A3A3A3] max-w-xl leading-relaxed">
              {t("description")}
            </p>

            {/* 4. Primary CTA Buttons Row (Responsive Side-by-Side) */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 pt-1">
              {/* Call 1818 */}
              <a
                href="tel:1818"
                style={{ transform: "rotate(-1.5deg)" }}
                className="h-11 sm:h-12 px-4 sm:px-6 rounded-2xl border-[2.5px] border-[#882637] bg-white dark:bg-neutral-900 text-[#882637] dark:text-[#F29EAA] font-black text-xs sm:text-sm lg:text-[15px] shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] hover:shadow-[6px_6px_0px_0px_#882637] dark:hover:shadow-[6px_6px_0px_0px_#511B25] hover:-translate-y-1 hover:rotate-0 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#882637] transition-all inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 group"
                title={t("call1818")}
              >
                <Phone className="h-4 w-4 fill-current text-[#882637] dark:text-[#F29EAA] shrink-0" />
                <span>
                  {t("call1818")}{" "}
                  <span className="font-semibold text-[11px] sm:text-xs text-[#525252] dark:text-neutral-400">
                    {t("tollFree")}
                  </span>
                </span>
              </a>

              {/* Report Drug Activity Button */}
              <Link
                href={ROUTES.REPORT}
                style={{ transform: "rotate(1.5deg)" }}
                className="h-11 sm:h-12 px-5 sm:px-6 rounded-2xl border-[2.5px] border-[#882637] bg-[#882637] hover:bg-[#6B202E] text-white font-black text-xs sm:text-sm lg:text-[15px] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-1 hover:rotate-0 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#171717] transition-all inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{t("reportCta")}</span>
                <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
              </Link>
            </div>

            {/* 5. Subtle Divider Line */}
            <div className="border-t border-[#882637]/20 dark:border-neutral-800 max-w-xl sm:max-w-[620px] xl:max-w-[640px] pt-1" />

            {/* 6. Feature Badges (Report Anonymously vs Report with Name - Tilted Neo-Brutalist Sticker Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-xl sm:max-w-[620px] xl:max-w-[640px] pt-1">
              {/* Card 1: Report Anonymously (Tilted Left & Swaying on Hover) */}
              <div
                style={{ transform: "rotate(-2.4deg)" }}
                className="hero-feature-card-left rounded-[20px] p-3.5 sm:p-4 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] flex items-start gap-2.5 sm:gap-3 transition-all duration-300 min-w-0 cursor-pointer"
              >
                <div className="h-9 w-9 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 mt-0.5 shadow-[2px_2px_0px_0px_#882637]">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-xs sm:text-[13px] font-black text-[#171717] dark:text-neutral-100 leading-tight">
                      {t("anonTitle")}
                    </span>
                    <span className="text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider bg-[#FDF2F4] dark:bg-[#320F16] text-[#882637] dark:text-[#F29EAA] border border-[#882637]/40 px-2 py-0.5 rounded-full shrink-0 shadow-[1px_1px_0px_0px_#882637]">
                      {t("anonBadge")}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#525252] dark:text-neutral-400 leading-snug font-medium">
                    {t("anonDesc")}
                  </p>
                </div>
              </div>

              {/* Card 2: Report with Your Name (Tilted Right & Swaying on Hover) */}
              <div
                style={{ transform: "rotate(2.2deg)" }}
                className="hero-feature-card-right rounded-[20px] p-3.5 sm:p-4 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] flex items-start gap-2.5 sm:gap-3 transition-all duration-300 min-w-0 cursor-pointer"
              >
                <div className="h-9 w-9 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 mt-0.5 shadow-[2px_2px_0px_0px_#882637]">
                  <Headphones className="h-4.5 w-4.5 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-xs sm:text-[13px] font-black text-[#171717] dark:text-neutral-100 leading-tight">
                      {t("namedTitle")}
                    </span>
                    <span className="text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider bg-[#FDF2F4] dark:bg-[#320F16] text-[#882637] dark:text-[#F29EAA] border border-[#882637]/40 px-2 py-0.5 rounded-full shrink-0 shadow-[1px_1px_0px_0px_#882637]">
                      {t("namedBadge")}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#525252] dark:text-neutral-400 leading-snug font-medium">
                    {t("namedDesc")}
                  </p>
                </div>
              </div>
            </div>

            {/* 7. Bottom Helpline Support Line (Neo-Brutalist Pill Capsule) */}
            <div className="pt-1">
              <div
                style={{ transform: "rotate(-0.8deg)" }}
                className="inline-flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#525252] dark:text-neutral-300 bg-[#FFFBEB] dark:bg-neutral-900 border-[1.5px] border-[#882637]/40 px-3.5 py-1.5 rounded-full shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] hover:rotate-0 hover:shadow-[4px_4px_0px_0px_#882637] transition-all cursor-default"
              >
                <Heart className="h-3.5 w-3.5 text-[#882637] dark:text-[#F29EAA] stroke-[2] shrink-0" />
                <span>{t("helpQuestion")}</span>
                <a
                  href="tel:1927"
                  className="font-black text-[#882637] dark:text-[#F29EAA] hover:underline transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{t("getHelp")}</span>
                  <Phone className="h-3.5 w-3.5 fill-current inline" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Sri Lanka Interactive District Map & Stats Card */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center items-center">
            <HeroMap />
          </div>
        </div>
      </div>
    </section>
  );
}

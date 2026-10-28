"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BrandEmblem } from "@/components/shared/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ArrowDownRight, Phone } from "lucide-react";

interface PillarItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  actionText: string;
  actionHref: string;
  isExternalOrTel?: boolean;
  isHighlighted?: boolean;
  renderIcon: () => React.ReactNode;
  renderActionIcon: () => React.ReactNode;
}

export function PillarsSection() {
  const t = useTranslations("marketing.pillars");

  const pillars: PillarItem[] = [
    {
      id: "01",
      badge: t("p1Badge"),
      title: t("p1Title"),
      subtitle: t("p1Subtitle"),
      description: t("p1Desc"),
      actionText: t("p1Action"),
      actionHref: ROUTES.ABOUT,
      isHighlighted: false,
      renderIcon: () => (
        /* Exact Prohibition Circle with Diagonal Slash (Top-Right to Bottom-Left) */
        <svg
          className="h-5 w-5 text-[#171717] dark:text-white group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <line x1="18.36" y1="5.64" x2="5.64" y2="18.36" />
        </svg>
      ),
      renderActionIcon: () => (
        <ArrowDownRight className="h-4 w-4 stroke-[2.5] text-[#171717] dark:text-white group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all" />
      ),
    },
    {
      id: "02",
      badge: t("p2Badge"),
      title: t("p2Title"),
      subtitle: t("p2Subtitle"),
      description: t("p2Desc"),
      actionText: t("p2Action"),
      actionHref: ROUTES.REPORT,
      isHighlighted: true,
      renderIcon: () => (
        /* Exact Shield Outline with 5-Pointed Star in Maroon */
        <svg
          className="h-5 w-5 text-[#882637] dark:text-[#F29EAA] transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polygon
            points="12 8 13.2 11 16.5 11.3 14 13.5 14.6 16.8 12 15.2 9.4 16.8 10 13.5 7.5 11.3 10.8 11"
            className="fill-current stroke-current"
            strokeWidth="0.5"
          />
        </svg>
      ),
      renderActionIcon: () => (
        <ArrowDownRight className="h-4 w-4 stroke-[2.5] text-[#882637] dark:text-[#F29EAA] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all" />
      ),
    },
    {
      id: "03",
      badge: t("p3Badge"),
      title: t("p3Title"),
      subtitle: t("p3Subtitle"),
      description: t("p3Desc"),
      actionText: t("p3Action"),
      actionHref: "tel:1927",
      isExternalOrTel: true,
      isHighlighted: false,
      renderIcon: () => (
        /* Exact Crossed Adhesive Bandages (One outline, one solid with perforation dots) */
        <svg
          className="h-5 w-5 text-[#171717] dark:text-white group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Outlined Bandage rotated -45° */}
          <rect
            x="3.5"
            y="8.5"
            width="17"
            height="7"
            rx="3.5"
            transform="rotate(-45 12 12)"
            strokeWidth="1.8"
            fill="none"
          />
          {/* Filled Bandage rotated +45° */}
          <rect
            x="3.5"
            y="8.5"
            width="17"
            height="7"
            rx="3.5"
            transform="rotate(45 12 12)"
            className="fill-current stroke-current"
            strokeWidth="0.5"
          />
          {/* Perforation dots on the center pad of the filled bandage */}
          <circle cx="9.8" cy="12" r="0.8" className="fill-white dark:fill-neutral-900 stroke-none" />
          <circle cx="12" cy="12" r="0.8" className="fill-white dark:fill-neutral-900 stroke-none" />
          <circle cx="14.2" cy="12" r="0.8" className="fill-white dark:fill-neutral-900 stroke-none" />
        </svg>
      ),
      renderActionIcon: () => (
        <Phone className="h-3.5 w-3.5 fill-current text-[#171717] dark:text-white group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] shrink-0 transition-colors" />
      ),
    },
  ];

  return (
    <section id="pillars" className="relative w-full bg-white dark:bg-[#000000] transition-colors py-16 sm:py-20 lg:py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Row: Eyebrow + Split Heading & Description */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            {/* Eyebrow with Brand Emblem */}
            <div className="inline-flex items-center gap-2 select-none mb-3">
              <BrandEmblem size="sm" priority />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#171717] dark:text-[#FAFAFA]">
                {t("eyebrow")}
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#171717] dark:text-white tracking-tight leading-[1.12]">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h2>
          </div>

          {/* Lead Summary Paragraph */}
          <p className="text-sm sm:text-base text-[#525252] dark:text-[#A3A3A3] max-w-lg leading-relaxed lg:pb-1">
            {t("lead")}
          </p>
        </div>

        {/* 3 Pillars Grid with playful tilted angles ("eka eka hadeta") and hover swaying ("helawena widihata") */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9 items-stretch py-8 px-2 sm:px-4">
          {pillars.map((pillar, index) => {
            const rotAngles = ["-2.4deg", "2.2deg", "-2.2deg"];
            const currentRot = rotAngles[index % 3];

            return (
              <div
                key={pillar.id}
                style={{ transform: `rotate(${currentRot})` }}
                className={`pillar-tilted-card pillar-card-pos-${index} group p-6 sm:p-7 flex flex-col justify-between cursor-default`}
              >
              <div>
                {/* Card Top: White Icon Box & Pillar Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`h-10 w-10 rounded-xl bg-white dark:bg-neutral-800 border flex items-center justify-center shrink-0 shadow-2xs transition-colors duration-300 ${
                      pillar.isHighlighted
                        ? "border-[#F29EAA]/60 bg-white dark:bg-[#320F16]"
                        : "border-[#E5E0D5] dark:border-neutral-700 group-hover:border-[#F29EAA]/60 group-hover:bg-[#FDF2F4] dark:group-hover:bg-[#320F16]"
                    }`}
                  >
                    {pillar.renderIcon()}
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md transition-colors duration-300 ${
                      pillar.isHighlighted
                        ? "border-[#F29EAA]/60 dark:border-[#511B25] bg-white/90 dark:bg-[#320F16] text-[#882637] dark:text-[#F29EAA]"
                        : "border-[#882637]/30 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800 text-[#882637] dark:text-neutral-300 group-hover:border-[#882637] group-hover:bg-[#FDF2F4] group-hover:text-[#882637] dark:group-hover:bg-[#320F16] dark:group-hover:text-[#F29EAA]"
                    }`}
                  >
                    {pillar.badge}
                  </Badge>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-black text-[#171717] dark:text-white tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold mt-1 text-[#882637] dark:text-[#F29EAA] transition-colors duration-300">
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-[#525252] dark:text-neutral-300 leading-relaxed mt-4">
                  {pillar.description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="border-t border-[#882637]/20 dark:border-neutral-800 pt-5 mt-6 sm:mt-8 transition-colors duration-300 group-hover:border-[#882637]/50">
                {pillar.isExternalOrTel ? (
                  <a
                    href={pillar.actionHref}
                    className="text-sm font-bold text-[#882637] dark:text-[#F29EAA] hover:underline transition-colors duration-300 inline-flex items-center gap-2 cursor-pointer"
                    title={pillar.actionText}
                  >
                    <span>{pillar.actionText}</span>
                    {pillar.renderActionIcon()}
                  </a>
                ) : (
                  <Link
                    href={pillar.actionHref}
                    className="text-sm font-bold text-[#882637] dark:text-[#F29EAA] hover:underline transition-colors duration-300 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{pillar.actionText}</span>
                    {pillar.renderActionIcon()}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

        {/* Centered Outline CTA Button: Learn More */}
        <div className="flex justify-center mt-12 sm:mt-14">
          <Link href={ROUTES.OUR_RESPONSE}>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#882637] text-[#882637] hover:bg-[#882637] hover:text-white dark:border-[#F29EAA] dark:text-[#F29EAA] dark:hover:bg-[#882637] dark:hover:text-white text-sm sm:text-base font-bold h-11 px-8 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {t("learnMore")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

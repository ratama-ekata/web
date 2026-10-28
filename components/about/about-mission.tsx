"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Target, CheckCircle2, ArrowRight } from "lucide-react";

export function AboutMission() {
  const t = useTranslations("about.mission");

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#0A0A0A] border-b border-[#E8E6DD] dark:border-neutral-800 transition-colors">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section 2: Mission Card */}
          <div className="about-showcase-card relative rounded-3xl bg-[#FAFAFA] dark:bg-neutral-900 border-2 border-[#882637] shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25] p-8 sm:p-12 md:p-14 overflow-hidden group cursor-default">
            {/* Ambient decorative watermark */}
            <Target
              className="absolute -right-10 -bottom-10 h-64 w-64 text-[#882637]/[0.03] dark:text-white/[0.03] pointer-events-none transition-transform duration-700 group-hover:scale-105"
              aria-hidden="true"
            />

            <div className="relative space-y-6">
              {/* Badge */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#882637]/10 dark:bg-[#882637]/25 border border-[#882637]/20 dark:border-[#882637]/40 text-[#882637] dark:text-[#F8C9D0] text-xs font-bold tracking-wide">
                  <Target className="h-3.5 w-3.5 text-[#882637] dark:text-[#F8C9D0]" />
                  <span>{t("eyebrow")}</span>
                </div>
                <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">
                  02 / 03
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171717] dark:text-neutral-50 tracking-tight">
                {t("title")}
              </h2>

              {/* Mission Statement */}
              <blockquote className="text-lg sm:text-2xl md:text-2xl font-medium leading-relaxed sm:leading-relaxed text-[#171717] dark:text-neutral-100 border-l-2 border-[#882637] dark:border-[#F29EAA] pl-5 sm:pl-6 my-4 italic">
                “{t("text")}”
              </blockquote>

              <div className="pt-4 flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                <CheckCircle2 className="h-4 w-4 text-[#882637] dark:text-[#F8C9D0] shrink-0" />
                <span>Multi-Agency Operational Framework</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

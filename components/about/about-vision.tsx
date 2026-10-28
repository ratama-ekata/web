"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Compass, Sparkles, Shield } from "lucide-react";

export function AboutVision() {
  const t = useTranslations("about.vision");

  return (
    <section className="relative overflow-hidden pt-2 sm:pt-4 pb-12 sm:pb-16 lg:pb-20 bg-[#FFFDF0] dark:bg-[#000000] border-b border-[#E8E6DD] dark:border-neutral-800 transition-colors">
      {/* Subtle institutional ambient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#882637_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section 1: Vision Card */}
          <div className="about-showcase-card relative rounded-3xl bg-gradient-to-br from-[#2D0F16] via-[#240A10] to-[#17050A] text-white p-8 sm:p-12 md:p-14 border-2 border-[#882637] shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25] overflow-hidden group cursor-default">
            {/* Ambient decorative watermark */}
            <Compass
              className="absolute -right-10 -bottom-10 h-64 w-64 text-white/[0.03] pointer-events-none transition-transform duration-700 group-hover:scale-105"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#FBBF24]/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative space-y-6">
              {/* Badge */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBBF24]/15 border border-[#FBBF24]/30 text-[#FDE68A] text-xs font-bold tracking-wide">
                  <Sparkles className="h-3.5 w-3.5 text-[#FBBF24]" />
                  <span>{t("eyebrow")}</span>
                </div>
                <span className="text-xs font-bold text-white/50 tracking-widest uppercase">
                  01 / 03
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {t("title")}
              </h2>

              {/* Vision Statement */}
              <blockquote className="text-lg sm:text-2xl md:text-2xl font-medium leading-relaxed sm:leading-relaxed text-white/95 border-l-2 border-[#FBBF24]/40 pl-5 sm:pl-6 my-4 italic">
                “{t("text")}”
              </blockquote>

              <div className="pt-4 flex items-center gap-2 text-xs sm:text-sm text-white/70 font-medium">
                <Shield className="h-4 w-4 text-[#FBBF24] shrink-0" />
                <span>රටම එකට • A Nation United</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

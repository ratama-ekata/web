"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Target, Eye } from "lucide-react";

export function AboutVisionMission() {
  const tAbout = useTranslations("about");
  const tVision = useTranslations("about.vision");
  const tMission = useTranslations("about.mission");

  return (
    <section
      aria-label="Mission and Vision"
      className="relative bg-[#FFFCEE] dark:bg-black py-8 sm:py-10 lg:py-12 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch py-2">
          {/* Mission Card */}
          <div className="about-card-item about-card-left h-full flex flex-col items-start text-left rounded-[26px] bg-[#FFFBEB] dark:bg-[#16161A] p-6 sm:p-8 lg:p-9 border-2 border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] cursor-default">
            <div className="inline-flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-[#882637] text-white shadow-md">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" aria-hidden="true" />
            </div>
            <h2 className="mt-4 sm:mt-5 text-lg sm:text-xl lg:text-[22px] font-black uppercase tracking-wide">
              <span className="text-[#171717] dark:text-white">{tAbout("our")} </span>
              <span className="text-[#882637] dark:text-[#F29EAA]">{tMission("title")}</span>
            </h2>
            <p className="mt-2.5 max-w-2xl text-xs sm:text-sm lg:text-[14.5px] leading-relaxed text-[#52525B] dark:text-neutral-300">
              {tMission("text")}
            </p>
          </div>

          {/* Vision Card */}
          <div className="about-card-item about-card-right h-full flex flex-col items-start text-left rounded-[26px] bg-[#FFFBEB] dark:bg-[#16161A] p-6 sm:p-8 lg:p-9 border-2 border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] cursor-default">
            <div className="inline-flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-[#882637] text-white shadow-md">
              <Eye className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" aria-hidden="true" />
            </div>
            <h2 className="mt-4 sm:mt-5 text-lg sm:text-xl lg:text-[22px] font-black uppercase tracking-wide">
              <span className="text-[#171717] dark:text-white">{tAbout("our")} </span>
              <span className="text-[#882637] dark:text-[#F29EAA]">{tVision("title")}</span>
            </h2>
            <p className="mt-2.5 max-w-2xl text-xs sm:text-sm lg:text-[14.5px] leading-relaxed text-[#52525B] dark:text-neutral-300">
              {tVision("text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
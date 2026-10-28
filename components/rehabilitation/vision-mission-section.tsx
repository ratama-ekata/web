"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { Eye, Target, Sparkles, HeartHandshake, Compass, Users } from "lucide-react";
import { VISION_MISSION_DATA, getTrilingual } from "./data/rehabilitation-data";

export function VisionMissionSection() {
  const locale = useLocale() as Locale;

  const labels = {
    sectionTitle: {
      si: "1. දැක්ම, මෙහෙවර, අරමුණු හා පරමාර්ථ",
      en: "1. Vision, Mission, Goals & Strategic Objectives",
      ta: "1. தொலைநோக்கு, பணிப்பொறுப்பு, நோக்கங்கள் மற்றும் இலக்குகள்",
    },
    visionTitle: {
      si: "දැක්ම",
      en: "Vision",
      ta: "தொலைநோக்கு",
    },
    missionTitle: {
      si: "මෙහෙවර",
      en: "Mission",
      ta: "பணிப்பொறுப்பு",
    },
    objectivesTitle: {
      si: "මූලික අරමුණු හා පරමාර්ථ",
      en: "Core Objectives & Strategic Mandate",
      ta: "முக்கிய நோக்கங்கள் மற்றும் மூலோபாய இலக்குகள்",
    },
  };

  const icons = [Sparkles, Compass, Users, HeartHandshake];

  return (
    <section className="py-8 sm:py-12 border-b border-[#E8E6DD] dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#882637]/10 dark:bg-[#882637]/30 text-[#882637] dark:text-[#F29EAA] text-xs font-bold mb-2">
            <span>{labels.sectionTitle[locale]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            {labels.objectivesTitle[locale]}
          </h2>
        </div>

        {/* Vision & Mission Cards (Tilted Neo-Brutalist Sticker Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-10 pt-2 pb-2">
          {/* Vision Card */}
          <div
            style={{ transform: "rotate(-1.2deg)" }}
            className="relative flex flex-col items-start rounded-[24px] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-8 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 cursor-pointer group"
          >
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#882637] bg-[#882637] text-white shadow-[2px_2px_0px_0px_#171717] group-hover:scale-105 transition-transform">
              <Eye className="h-6 w-6 stroke-[2.2]" />
            </div>
            <h3 className="mt-4 text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
              {labels.visionTitle[locale]}
            </h3>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-[#171717] dark:text-white leading-snug tracking-tight">
              &ldquo;{getTrilingual(VISION_MISSION_DATA.vision, locale)}&rdquo;
            </p>
          </div>

          {/* Mission Card */}
          <div
            style={{ transform: "rotate(1.2deg)" }}
            className="relative flex flex-col items-start rounded-[24px] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-8 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 cursor-pointer group"
          >
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#882637] bg-[#882637] text-white shadow-[2px_2px_0px_0px_#171717] group-hover:scale-105 transition-transform">
              <Target className="h-6 w-6 stroke-[2.2]" />
            </div>
            <h3 className="mt-4 text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
              {labels.missionTitle[locale]}
            </h3>
            <p className="mt-2 text-base sm:text-lg font-bold text-[#27272A] dark:text-neutral-200 leading-relaxed">
              &ldquo;{getTrilingual(VISION_MISSION_DATA.mission, locale)}&rdquo;
            </p>
          </div>
        </div>

        {/* 4 Objectives Grid (Tilted Neo-Brutalist Sticker Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-1 pb-2">
          {VISION_MISSION_DATA.objectives.map((obj, idx) => {
            const Icon = icons[idx % icons.length];
            const rotations = ["rotate(-1.5deg)", "rotate(1.4deg)", "rotate(-1.3deg)", "rotate(1.6deg)"];
            const currentRotation = rotations[idx % rotations.length];

            return (
              <div
                key={obj.id}
                style={{ transform: currentRotation }}
                className="relative rounded-[22px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-5 sm:p-6 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl sm:text-3xl font-black text-[#882637] dark:text-[#F29EAA] tracking-tight">
                      {obj.number}
                    </span>
                    <div className="h-10 w-10 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 text-[#882637] dark:text-[#F29EAA] flex items-center justify-center shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5 stroke-[2.2]" />
                    </div>
                  </div>
                  <h4 className="text-base font-black text-[#171717] dark:text-white mb-2 leading-snug">
                    {getTrilingual(obj.title, locale)}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#525252] dark:text-neutral-400 leading-relaxed font-medium">
                    {getTrilingual(obj.desc, locale)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

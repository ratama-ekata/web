"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import {
  ShieldAlert,
  Briefcase,
  Scale,
  Users2,
  DollarSign,
  Landmark,
  Building2,
} from "lucide-react";
import { POWERS_DATA, getTrilingual } from "./data/rehabilitation-data";

export function PowersFunctionsSection() {
  const locale = useLocale() as Locale;

  const labels = {
    sectionTitle: {
      si: "2. පුනරුත්ථාපන කාර්යාංශය සතු බලතල හා කාර්ය භාරය",
      en: "2. Statutory Powers, Authority & Core Mandate",
      ta: "2. புனர்வாழ்வு பணியகத்தின் அதிகாரங்கள் மற்றும் சட்டரீதியான கடமைகள்",
    },
    intro: {
      si: "2023 අංක 2 දරන පුනරුත්ථාපන කාර්යාංශ පනත හා 2007 අංක 54 දරන ඖෂධ වලට අබ්බැහි තැනැත්තන්, ප්‍රතිකාර සහ පුනරුත්ථාපනය පිළිබඳ පනත ප්‍රකාරව කාර්යාංශයේ ව්‍යවස්ථාපිත කාර්යභාරයන් පහත පරිදි වේ:",
      en: "In accordance with the Bureau of Rehabilitation Act No. 02 of 2023 and the Drug Dependent Persons (Treatment and Rehabilitation) Act No. 54 of 2007, the statutory powers and mandates of the Bureau encompass:",
      ta: "2023 ஆம் ஆண்டின் 02 ஆம் இலக்க புனர்வாழ்வு பணியக சட்டம் மற்றும் 2007 ஆம் ஆண்டின் 54 ஆம் இலக்க ஔடதங்களுக்கு அடிமையான நபர்கள், சிகிச்சை மற்றும் புனர்வாழ்வு சட்டத்தின் பிரகாரம் பணியகத்தின் சட்டபூர்வமான பணிகள் வருமாறு:",
    },
  };

  const icons = [
    ShieldAlert,
    Briefcase,
    Scale,
    Users2,
    DollarSign,
    Landmark,
    Building2,
  ];

  return (
    <section className="py-8 sm:py-12 border-b border-[#E8E6DD] dark:border-zinc-800 bg-[#FFFDF0]/50 dark:bg-black/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#882637]/10 dark:bg-[#882637]/30 text-[#882637] dark:text-[#F29EAA] text-xs font-bold mb-2">
            <span>{labels.sectionTitle[locale]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            {locale === "si"
              ? "ව්‍යවස්ථාපිත බලතල හා නීතිමය කාර්යභාරය"
              : locale === "ta"
              ? "சட்டரீதியான அதிகாரங்கள் மற்றும் பொறுப்புகள்"
              : "Statutory Functions & Legislative Framework"}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {labels.intro[locale]}
          </p>
        </div>

        {/* 7 Powers Cards Grid (Tilted Neo-Brutalist Sticker Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-1 pb-2">
          {POWERS_DATA.map((power, idx) => {
            const Icon = icons[idx % icons.length];
            const rotations = [
              "rotate(-1.5deg)",
              "rotate(1.3deg)",
              "rotate(-1.2deg)",
              "rotate(1.5deg)",
              "rotate(-1.4deg)",
              "rotate(1.2deg)",
              "rotate(-1.1deg)",
            ];
            const currentRotation = rotations[idx % rotations.length];

            return (
              <div
                key={power.id}
                style={{ transform: currentRotation }}
                className="rounded-[22px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-5 sm:p-6 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-11 w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 text-[#882637] dark:text-[#F29EAA] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FDF2F4] dark:bg-[#320F16] text-[#882637] dark:text-[#F29EAA] border border-[#882637]/40 shadow-[1px_1px_0px_0px_#882637]">
                      {power.act}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-[#171717] dark:text-white mb-2 leading-snug">
                    {getTrilingual(power.title, locale)}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#525252] dark:text-neutral-400 leading-relaxed font-medium">
                    {getTrilingual(power.desc, locale)}
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

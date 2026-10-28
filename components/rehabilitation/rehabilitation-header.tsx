"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { BrandEmblem } from "@/components/shared/brand-logo";
import { Phone, Users, ShieldCheck, CheckCircle2, Home } from "lucide-react";
import {
  PHYSICAL_PROGRESS_OVERVIEW,
  REINTEGRATION_TOTALS,
  AFTERCARE_TOTALS,
} from "./data/rehabilitation-data";
import { CountUpNumber } from "./charts/count-up-number";

export function RehabilitationHeader() {
  const locale = useLocale() as Locale;

  const content = {
    eyebrow: {
      si: "ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය • මහජන ආරක්ෂක අමාත්‍යාංශය",
      en: "Democratic Socialist Republic of Sri Lanka • Ministry of Public Security",
      ta: "இலங்கை சனநாயக சோசலிசக் குடியரசு • பொதுமக்கள் பாதுகாப்பு அமைச்சு",
    },
    title: {
      si: "පුනරුත්ථාපන කාර්යාංශය",
      en: "Bureau of Rehabilitation",
      ta: "புனர்வாழ்வு பணியகம்",
    },
    subtitle: {
      si: "2023 අංක 02 දරන පුනරුත්ථාපන කාර්යාංශ පනත හා 2007 අංක 54 දරන පනත ප්‍රකාරව ක්‍රියාත්මක ජාතික ප්‍රතිකාර, පුනරුත්ථාපන හා පශ්චාත් අධීක්ෂණ ආයතනය.",
      en: "Statutory national authority established under Bureau of Rehabilitation Act No. 02 of 2023 and Act No. 54 of 2007, dedicated to medical treatment, vocational rehabilitation, and island-wide social reintegration.",
      ta: "2023 ஆம் ஆண்டின் 02 ஆம் இலக்க புனர்வாழ்வு பணியக சட்டம் மற்றும் 2007 ஆம் ஆண்டின் 54 ஆம் இலக்க சட்டத்தின் கீழ் நிறுவப்பட்ட தேசிய சிகிச்சை, புனர்வாழ்வு மற்றும் சமூக மீள் ஒருங்கிணைப்பு நிறுவனம்.",
    },
    stat1Label: {
      si: "මුළු ඇතුළත් කිරීම් (2013 - 2026)",
      en: "Total Admissions (2013-2026)",
      ta: "மொத்த சேர்க்கைகள் (2013-2026)",
    },
    stat2Label: {
      si: "සමාජගත කළ සංඛ්‍යාව",
      en: "Successfully Reintegrated",
      ta: "சமூகமயப்படுத்தப்பட்டோர்",
    },
    stat3Label: {
      si: "දිස්ත්‍රික් සම්බන්ධීකරණ කාර්යාල",
      en: "District Coordination Offices",
      ta: "மாவட்ட ஒருங்கிணைப்பு அலுவலகங்கள்",
    },
    stat4Label: {
      si: "ජාතික පසු විපරම් සාර්ථකත්වය",
      en: "National Aftercare Retention",
      ta: "தேசிய பின்தொடர் வெற்றி வீதம்",
    },
    callTitle: {
      si: "පුනරුත්ථාපන සහාය සඳහා",
      en: "Rehabilitation Assistance",
      ta: "புனர்வாழ்வு உதவி சேவை",
    },
    callPrompt: {
      si: "ක්ෂණික රහස්‍ය ඇමතුම් සේවාව (24/7)",
      en: "Confidential Hotline (24/7)",
      ta: "இரகசிய துரித அழைப்பு (24/7)",
    },
    callSub: {
      si: "නීතිමය බියකින් තොරව වෛද්‍ය හා උපදේශන මඟපෙන්වීම ලබාගන්න.",
      en: "Direct, non-punitive medical counseling and certified inpatient admissions.",
      ta: "சட்ட ரீதியான பயமின்றி மருத்துவ ஆலோசனை மற்றும் புனர்வாழ்வு வழிகாட்டல்.",
    },
  };

  return (
    <header className="pt-8 sm:pt-12 bg-linear-to-b from-[#FFFBEB]/60 to-transparent dark:from-[#16161A]/40 dark:to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Section aligned to 12-column grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <BrandEmblem size="sm" className="[&_img]:h-4 [&_img]:w-4 shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-[#18181B] dark:text-zinc-200">
                {content.eyebrow[locale]}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-[#171717] dark:text-zinc-50">
              {content.title[locale]}
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm lg:text-base leading-relaxed text-[#52525B] dark:text-zinc-400">
              {content.subtitle[locale]}
            </p>
          </div>

          {/* Hotline 1927 Quick Card (Tilted Neo-Brutalist Sticker Card) */}
          <div className="lg:col-span-4">
            <div
              style={{ transform: "rotate(1.2deg)" }}
              className="w-full rounded-[22px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-5 sm:p-6 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                    {content.callPrompt[locale]}
                  </p>
                  <a
                    href="tel:1927"
                    className="mt-1 text-2xl sm:text-[30px] font-black tracking-tight text-[#171717] dark:text-white hover:text-[#882637] dark:hover:text-[#F29EAA] transition-colors flex items-center gap-2"
                  >
                    1927
                  </a>
                </div>
                <a
                  href="tel:1927"
                  aria-label="Call 1927"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-[#882637] bg-[#882637] text-white shadow-[2px_2px_0px_0px_#171717] transition-transform hover:scale-105 active:scale-95"
                >
                  <Phone className="h-5 w-5 fill-white text-white" />
                </a>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#525252] dark:text-zinc-400 font-medium">
                {content.callSub[locale]}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Impact Stat Cards (Tilted Neo-Brutalist Cards with Animated Numbers) */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-2 pb-2">
          {/* Card 1: Total Admissions (Tilted -1.8deg) */}
          <div
            style={{ transform: "rotate(-1.8deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <Users className="h-5 w-5 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] line-clamp-1">
                  {content.stat1Label[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none">
                <CountUpNumber end={PHYSICAL_PROGRESS_OVERVIEW.totalAdmittedSince2013} />
              </p>
              <span className="text-xs font-semibold text-[#525252] dark:text-neutral-400 mt-1.5 block">
                +{PHYSICAL_PROGRESS_OVERVIEW.year2026Admitted.toLocaleString("en-US")} in 2026
              </span>
            </div>
          </div>

          {/* Card 2: Reintegrated (Tilted +1.6deg) */}
          <div
            style={{ transform: "rotate(1.6deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] line-clamp-1">
                  {content.stat2Label[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none">
                <CountUpNumber end={REINTEGRATION_TOTALS.cumulativeSince2013} />
              </p>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1.5 block">
                +{REINTEGRATION_TOTALS.year2026Total.toLocaleString("en-US")} in 2026
              </span>
            </div>
          </div>

          {/* Card 3: District Coordination Offices (Tilted -1.4deg) */}
          <div
            style={{ transform: "rotate(-1.4deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <Home className="h-5 w-5 text-amber-600 dark:text-amber-400 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] line-clamp-1">
                  {content.stat3Label[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none">
                <CountUpNumber end={AFTERCARE_TOTALS.totalCoordinatingOffices} />
              </p>
              <span className="text-xs font-semibold text-[#525252] dark:text-neutral-400 mt-1.5 block">
                All 25 Districts Covered
              </span>
            </div>
          </div>

          {/* Card 4: National Aftercare Retention (Tilted +1.8deg) */}
          <div
            style={{ transform: "rotate(1.8deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-5 w-5 text-sky-600 dark:text-sky-400 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] line-clamp-1">
                  {content.stat4Label[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none">
                <CountUpNumber end={AFTERCARE_TOTALS.nationalRetentionRate} decimals={1} suffix="%" />
              </p>
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-1.5 block">
                10,279 Home Follow-ups
              </span>
            </div>
          </div>
        </div>

        {/* Divider beneath top section */}
        <hr className="my-8 sm:my-10 border-t border-[#E8E6DD] dark:border-zinc-800" />
      </div>
    </header>
  );
}

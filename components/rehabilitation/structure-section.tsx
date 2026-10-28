"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { Building, MapPin, Calendar, ArrowRight, Gavel, HeartHandshake, Shield } from "lucide-react";
import { STRUCTURE_DATA, getTrilingual } from "./data/rehabilitation-data";
import { CountUpNumber } from "./charts/count-up-number";

export function StructureSection() {
  const locale = useLocale() as Locale;

  const labels = {
    sectionTitle: {
      si: "3. හැඳින්වීම සහ ආයතනික ව්‍යුහය",
      en: "3. Introduction & Organizational Structure",
      ta: "3. அறிமுகம் மற்றும் நிறுவன கட்டமைப்பு",
    },
    subTitle: {
      si: "රාජ්‍ය පරිපාලන හා මෙහෙයුම් ව්‍යුහය",
      en: "Governance Architecture & Operational Network",
      ta: "ஆளுகை கட்டமைப்பு மற்றும் செயல்பாட்டு வலையமைப்பு",
    },
    courtCentresTitle: {
      si: "අධිකරණ නියෝග යටතේ ක්‍රියාත්මක මධ්‍යස්ථාන 03",
      en: "3 Centres Operating Under Judicial Orders",
      ta: "நீதிமன்ற உத்தரவுகளின் கீழ் இயங்கும் 03 நிலையங்கள்",
    },
    voluntaryCentresTitle: {
      si: "ස්වේච්ඡා පුනරුත්ථාපන මධ්‍යස්ථානය",
      en: "Voluntary Residential Rehabilitation Centre",
      ta: "சுயவிருப்ப புனர்வாழ்வு நிலையம்",
    },
    districtOfficesTitle: {
      si: "දිස්ත්‍රික් පුනරුත්ථාපන සම්බන්ධීකරණ කාර්යාල 15",
      en: "15 District Coordination Offices (Island-wide)",
      ta: "15 மாவட்ட புனர்வாழ்வு ஒருங்கிணைப்பு அலுவலகங்கள்",
    },
    capacityLabel: {
      si: "ධාරිතාව:",
      en: "Capacity:",
      ta: "கொள்ளளவு:",
    },
  };

  return (
    <section className="py-8 sm:py-12 border-b border-[#E8E6DD] dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#882637]/10 dark:bg-[#882637]/30 text-[#882637] dark:text-[#F29EAA] text-xs font-bold mb-2">
            <span>{labels.sectionTitle[locale]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            {labels.subTitle[locale]}
          </h2>
        </div>

        {/* Ministry Transition Banner (Tilted Neo-Brutalist Sticker Card) */}
        <div
          style={{ transform: "rotate(-1.2deg)" }}
          className="rounded-[22px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-5 sm:p-6 mb-10 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 cursor-pointer group"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="h-11 w-11 rounded-xl border-2 border-[#882637] bg-[#882637] text-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#171717] group-hover:scale-105 transition-transform mt-0.5">
                <Shield className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  {getTrilingual(STRUCTURE_DATA.establishedUnder, locale)}
                </span>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  <span>{getTrilingual(STRUCTURE_DATA.ministries.previous, locale)}</span>
                  <ArrowRight className="h-4 w-4 text-[#882637] dark:text-[#F29EAA] shrink-0 stroke-[2.5]" />
                  <span className="text-[#882637] dark:text-[#F29EAA] font-black">
                    {getTrilingual(STRUCTURE_DATA.ministries.current, locale)}
                  </span>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border-2 border-[#882637] text-xs font-black text-[#882637] dark:text-[#F29EAA] shadow-[2px_2px_0px_0px_#882637] shrink-0 self-start md:self-auto">
              <Calendar className="h-4 w-4 stroke-[2.5]" />
              <span>Effective: {STRUCTURE_DATA.ministryTransferDate}</span>
            </div>
          </div>
        </div>

        {/* Centres Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* 3 Judicial Centres (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <Gavel className="h-5 w-5 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
              <h3 className="text-base sm:text-lg font-black text-[#171717] dark:text-white">
                {labels.courtCentresTitle[locale]}
              </h3>
            </div>

            <div className="space-y-4 pt-1">
              {STRUCTURE_DATA.courtOrderedCentres.map((centre, idx) => {
                const rotations = ["rotate(-1.4deg)", "rotate(1.3deg)", "rotate(-1.1deg)"];
                const currentRotation = rotations[idx % rotations.length];

                return (
                  <div
                    key={idx}
                    style={{ transform: currentRotation }}
                    className="rounded-[20px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-4 sm:p-5 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:rotate-0 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#882637] transition-all duration-300 cursor-pointer group"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-black text-[#171717] dark:text-white">
                        {getTrilingual(centre.name, locale)}
                      </h4>
                      <p className="text-xs text-[#525252] dark:text-neutral-400 font-medium">
                        {getTrilingual(centre.focus, locale)}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 border-2 border-[#882637] text-xs font-bold text-neutral-800 dark:text-neutral-200 shadow-[1.5px_1.5px_0px_0px_#882637] shrink-0 self-start sm:self-auto">
                      <span className="text-[11px] font-semibold text-neutral-500">{labels.capacityLabel[locale]}</span>
                      <strong className="text-[#882637] dark:text-[#F29EAA] font-black text-sm">
                        <CountUpNumber end={centre.capacity} />
                      </strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Voluntary Centre + District Network (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Voluntary Centre Card */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
                <h3 className="text-base sm:text-lg font-black text-[#171717] dark:text-white">
                  {labels.voluntaryCentresTitle[locale]}
                </h3>
              </div>

              {STRUCTURE_DATA.voluntaryCentres.map((centre, idx) => (
                <div
                  key={idx}
                  style={{ transform: "rotate(1.5deg)" }}
                  className="rounded-[20px] border-[2.5px] border-[#047857] bg-[#F0FDF4] dark:bg-neutral-900 p-4 sm:p-5 shadow-[5px_5px_0px_0px_#047857] hover:rotate-0 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#047857] transition-all duration-300 space-y-2 cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-black text-[#171717] dark:text-white">
                      {getTrilingual(centre.name, locale)}
                    </h4>
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#047857] text-white shrink-0 shadow-xs">
                      Cap: <CountUpNumber end={centre.capacity} />
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900/80 dark:text-emerald-300 font-medium">
                    {getTrilingual(centre.focus, locale)}
                  </p>
                  <div className="pt-2 text-[11px] text-emerald-800 dark:text-emerald-400 font-bold">
                    Inaugurated: {centre.startedDate}
                  </div>
                </div>
              ))}
            </div>

            {/* 15 District Offices Network */}
            <div
              style={{ transform: "rotate(-1.3deg)" }}
              className="rounded-[20px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-5 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#882637] transition-all duration-300 space-y-3 cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <MapPin className="h-5 w-5 stroke-[2.2]" />
                <h4 className="text-sm font-black text-[#171717] dark:text-white">
                  {labels.districtOfficesTitle[locale]}
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-[#525252] dark:text-neutral-400 font-medium">
                {getTrilingual(STRUCTURE_DATA.islandCoverage, locale)}
              </p>
              <div className="flex items-center justify-between text-xs font-bold text-neutral-500 pt-1 border-t border-[#882637]/15">
                <span>Coverage: 100% Nationwide</span>
                <span className="text-[#882637] dark:text-[#F29EAA] font-black">
                  <CountUpNumber end={15} /> Regional Desks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

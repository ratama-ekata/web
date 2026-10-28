"use client";

import React, { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { DonutChart } from "./charts/donut-chart";
import { VerticalBarChart, VerticalBarItem } from "./charts/bar-chart";
import { CountUpNumber } from "./charts/count-up-number";
import {
  RATAMA_EKATA_DISTRICTS,
  RATAMA_EKATA_TOTALS,
  COUNSELOR_WORKSHOPS,
  KEY_EVENTS,
  getTrilingual,
} from "./data/rehabilitation-data";
import {
  Briefcase,
  Flag,
  GraduationCap,
  Calendar,
  PieChart,
  BarChart3,
  Award,
  Users,
  MapPin,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export function WelfareRatamaEkataSection() {
  const locale = useLocale() as Locale;
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("re-4"); // Default Colombo (South) or Kandy
  const [chartMode, setChartMode] = useState<"donut" | "district" | "top5" | "all">("donut");

  const labels = {
    sectionTitle: {
      si: "10 & 11. සුභසාධනය සහ \"රටම එකට\" ජාතික මෙහෙයුම",
      en: "10 & 11. Livelihood Welfare & \"Ratama Ekata\" National Operations",
      ta: "10 & 11. நலன்புரி மற்றும் \"ரட்டம எகட\" தேசிய நடவடிக்கை",
    },
    welfareSub: {
      si: "සමාජගත පුනරුත්ථාපන ලාභීන්ගේ ජීවනෝපාය ඉහළ නැංවීම හා ජාතික සභාවේ කාර්යභාරය",
      en: "Uplifting Reintegrated Livelihoods & Bureau's Active Role in the National Council",
      ta: "சமூகமயப்படுத்தப்பட்டோரின் வாழ்வாதார மேம்பாடு மற்றும் தேசிய சபையின் செயற்பாடுகள்",
    },
    welfare1Title: {
      si: "ස්වයං රැකියා උපකරණ කට්ටල ප්‍රදානය",
      en: "Self-Employment Starter Toolkits",
      ta: "சுயதொழில் உபகரணத் தொகுதிகள் வழங்கல்",
    },
    welfare1Desc: {
      si: "සමාජගත පුනරුත්ථාපන ලාභීන්ගේ ජීවනෝපාය ස්ථාවර කිරීමේ අරමුණින් වෘත්තීය නිපුණතාවන්ට සරිලන ස්වයං රැකියා මෙවලම් කට්ටල (වඩු කාර්මික, විදුලි කාර්මික, කෘෂිකාර්මික, මැහුම්) ප්‍රදානය කර ඇත.",
      en: "Provision of certified professional equipment kits (carpentry, electrical wiring, agriculture, tailoring) to ensure sustainable financial autonomy.",
      ta: "சமூகமயப்படுத்தப்பட்ட புனர்வாழ்வு பெற்றவர்களின் வாழ்வாதாரத்தை மேம்படுத்தும் நோக்கில் தொழில்சார் சுயதொழில் உபகரணத் தொகுதிகள் வழங்கப்பட்டுள்ளன.",
    },
    welfare2Title: {
      si: "\"රටම එකට\" ජාතික සභාවේ සාමාජිකත්වය",
      en: "\"Ratama Ekata\" National Council Leadership",
      ta: "\"ரட்டம எகட\" தேசிய சபை அங்கத்துவம்",
    },
    welfare2Desc: {
      si: "\"මතින් තොර රටක් සතුටින් පිරි හෙටක්\" දැක්ම කරගත් ජාතික මෙහෙයුමේ මෙහෙයුම් කමිටු සාමාජිකයෙකු ලෙස කාර්යාංශය ප්‍රතිපත්තිමය හා ක්‍රියාකාරී නායකත්වයෙන් සක්‍රීයව දායක වේ.",
      en: "Active policymaking and executive member of the Presidential Operation under national vision: 'A Nation Free of Drugs, A Tomorrow Filled with Joy'.",
      ta: "\"போதையற்ற நாடு - மகிழ்ச்சியான நாளை\" என்ற தொலைநோக்கின் கீழ் செயற்படும் தேசிய சபையின் செயலில் உள்ள உறுப்பினராக பணியகம் செயல்படுகிறது.",
    },
    workshopsTitle: {
      si: "රාජ්‍ය හා රාජ්‍ය නොවන උපදේශන නිලධාරීන් ජාලගත කිරීමේ එක්දින පුහුණු වැඩමුළු",
      en: "Inter-Agency Counselor Networking & Multi-Sectoral Training Workshops",
      ta: "அரசு மற்றும் அரசு சாரா ஆலோசனை அதிகாரிகளை ஒருங்கிணைக்கும் ஒருநாள் பயிற்சி பட்டறைகள்",
    },
    workshopsSub: {
      si: "දිස්ත්‍රික්ක 7ක පවත්වන ලද දැවැන්ත එක්දින පුහුණු වැඩමුළු මාලාව:",
      en: "7 District-level multi-agency professional workshops conducted across Sri Lanka:",
      ta: "இலங்கை முழுவதும் நடாத்தப்பட்ட 7 மாவட்ட மட்ட பல்துறை தொழில்முறை பயிற்சிப் பட்டறைகள்:",
    },
    otherOpsTitle: {
      si: "\"රටම එකට\" යටතේ සිදු කළ වෙනත් විශේෂ මෙහෙයුම්",
      en: "Special Operations Executed Under \"Ratama Ekata\"",
      ta: "\"ரட்டம எகட\" திட்டத்தின் கீழான விசேட நடவடிக்கைகள்",
    },
    otherOpsSub: {
      si: "මුළු මෙහෙයුම් 1,484 ක් තුළින් දිවයින පුරා පුරවැසියන් 259,323 ක් සක්‍රීයව ආවරණය කරන ලදී:",
      en: "1,484 Operations mobilizing 259,323 participants nationwide across Sri Lanka:",
      ta: "நாடு முழுவதும் 1,484 நடவடிக்கைகள் ஊடாக 259,323 பயனாளிகள் ஒருங்கிணைக்கப்பட்டனர்:",
    },
    eventsTitle: {
      si: "ප්‍රධාන ජාතික සන්ධිස්ථාන",
      en: "Key National Campaign Milestones",
      ta: "முக்கிய தேசிய மைல்கற்கள்",
    },
    selectDistrict: {
      si: "දිස්ත්‍රික්කය තෝරන්න (දිස්ත්‍රික්ක 17):",
      en: "Select District (17 Districts):",
      ta: "மாவட்டத்தைத் தெரிவுசெய்க (17 மாவட்டங்கள்):",
    },
    schoolLabel: {
      si: "පාසල් සිසුන් දැනුවත් කිරීම්",
      en: "School Awareness",
      ta: "பள்ளி மாணவர்கள் விழிப்புணர்வு",
    },
    schoolSessions: {
      si: "පාසල් සැසි 193 ක් ඔස්සේ",
      en: "Across 193 School Sessions",
      ta: "193 பள்ளி அமர்வுகள் ஊடாக",
    },
    communityLabel: {
      si: "ප්‍රජාව දැනුවත් කිරීම්",
      en: "Community Awareness",
      ta: "சமூக விழிப்புணர்வு",
    },
    communitySeminars: {
      si: "ප්‍රජා සම්මන්ත්‍රණ 63 ක් ඔස්සේ",
      en: "Across 63 Community Seminars",
      ta: "63 சமூகக் கருத்தரங்குகள் ஊடாக",
    },
    posterLabel: {
      si: "පෝස්ටර් සහ කෙටි දැනුවත් කිරීම්",
      en: "Poster & Short Drives",
      ta: "சுவரொட்டி & குறு விழிப்புணர்வு",
    },
    posterCampaigns: {
      si: "වීථි හා දුම්රිය මෙහෙයුම් 78 ක් ඔස්සේ",
      en: "Across 78 Street & Rail Campaigns",
      ta: "78 வீதி & ரயில் பிரச்சாரங்கள் ஊடாக",
    },
    totalMobilizedLabel: {
      si: "සම්පූර්ණ සහභාගීත්වය",
      en: "Total Mobilized",
      ta: "மொத்த ஒருங்கிணைப்பு",
    },
    programsUnit: {
      si: "වැඩසටහන්",
      en: "Programs",
      ta: "நிகழ்ச்சிகள்",
    },
    reachUnit: {
      si: "සහභාගීත්වය",
      en: "Reached",
      ta: "பயனாளிகள்",
    },
  };

  // Donut chart of Ratama Ekata campaign program share
  const donutData = useMemo(() => [
    {
      id: "school",
      label: locale === "si" ? "පාසල් සිසුන් දැනුවත් කිරීම්" : locale === "ta" ? "பள்ளி மாணவர்கள் விழிப்புணர்வு" : "School Student Outreach",
      value: RATAMA_EKATA_TOTALS.studentsReached,
      color: "#2563EB",
      formattedValue: RATAMA_EKATA_TOTALS.studentsReached.toLocaleString("en-US"),
    },
    {
      id: "community",
      label: locale === "si" ? "ප්‍රජාව දැනුවත් කිරීම්" : locale === "ta" ? "சமூக விழிப்புணர்வு" : "Community Awareness",
      value: RATAMA_EKATA_TOTALS.communityReached,
      color: "#882637",
      formattedValue: RATAMA_EKATA_TOTALS.communityReached.toLocaleString("en-US"),
    },
    {
      id: "posters",
      label: locale === "si" ? "පෝස්ටර්/කෙටි දැනුවත් කිරීම්" : locale === "ta" ? "சுவரொட்டி & குறு பிரச்சாரம்" : "Poster & Short Campaigns",
      value: RATAMA_EKATA_TOTALS.posterShortReached,
      color: "#D97706",
      formattedValue: RATAMA_EKATA_TOTALS.posterShortReached.toLocaleString("en-US"),
    },
  ], [locale]);

  // Current selected district for district-focus view
  const currentDistrict = useMemo(() => {
    return (
      RATAMA_EKATA_DISTRICTS.find((d) => d.id === selectedDistrictId) ||
      RATAMA_EKATA_DISTRICTS[0]
    );
  }, [selectedDistrictId]);

  // Vertical bar data for single district focus
  const districtVerticalBars = useMemo((): VerticalBarItem[] => {
    return [
      {
        id: "school",
        label: locale === "si" ? "පාසල් සිසුන්" : locale === "ta" ? "மாணவர்கள்" : "School Students",
        value: currentDistrict.studentsReached,
        color: "#2563EB",
        secondaryLabel: `${currentDistrict.schoolPrograms} ${labels.programsUnit[locale]}`,
      },
      {
        id: "community",
        label: locale === "si" ? "ප්‍රජාව" : locale === "ta" ? "சமூகம்" : "Community",
        value: currentDistrict.communityReached,
        color: "#882637",
        secondaryLabel: `${currentDistrict.communityPrograms} ${labels.programsUnit[locale]}`,
      },
      {
        id: "posters",
        label: locale === "si" ? "පෝස්ටර්/කෙටි" : locale === "ta" ? "சுவரொட்டி" : "Poster/Short",
        value: currentDistrict.posterShortReached,
        color: "#D97706",
        secondaryLabel: `${currentDistrict.posterShortPrograms} ${labels.programsUnit[locale]}`,
      },
      {
        id: "total",
        label: locale === "si" ? "මුළු එකතුව" : locale === "ta" ? "மொத்தம்" : "Total Reached",
        value: currentDistrict.totalReached,
        color: "#059669",
        highlight: true,
        secondaryLabel: `${currentDistrict.totalPrograms} ${labels.programsUnit[locale]}`,
      },
    ];
  }, [currentDistrict, locale, labels.programsUnit]);

  // Top 5 Districts by Total Reach
  const top5DistrictsBars = useMemo((): VerticalBarItem[] => {
    return [...RATAMA_EKATA_DISTRICTS]
      .sort((a, b) => b.totalReached - a.totalReached)
      .slice(0, 5)
      .map((d) => ({
        id: d.id,
        label: getTrilingual(d.district, locale),
        value: d.totalReached,
        color: "#882637",
        secondaryLabel: `${d.totalPrograms} ${labels.programsUnit[locale]}`,
      }));
  }, [locale, labels.programsUnit]);

  // All 17 Districts by Total Reach
  const allDistrictsBars = useMemo((): VerticalBarItem[] => {
    return RATAMA_EKATA_DISTRICTS.map((d) => ({
      id: d.id,
      label: getTrilingual(d.district, locale),
      value: d.totalReached,
      color: "#882637",
      secondaryLabel: `${d.totalPrograms} ${labels.programsUnit[locale]}`,
    }));
  }, [locale, labels.programsUnit]);

  return (
    <section className="py-8 sm:py-12 border-b border-[#E8E6DD] dark:border-zinc-800 bg-[#FFFDF0]/50 dark:bg-black/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* SECTION 10: WELFARE CORE PILLARS & COUNSELOR WORKSHOPS */}
        {/* ========================================================= */}

        {/* Section Heading */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#882637]/10 dark:bg-[#882637]/30 text-[#882637] dark:text-[#F29EAA] text-xs font-black tracking-wide mb-2.5 border border-[#882637]/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{labels.sectionTitle[locale]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            {labels.welfareSub[locale]}
          </h2>
        </div>

        {/* Welfare 2 Core Pillars (Sticker Style with Subtle Tilt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1: Toolkits */}
          <div className="rounded-[24px] sm:rounded-[26px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-7 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] rotate-[-1.2deg] transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-[#882637] text-white flex items-center justify-center mb-4 shadow-[2px_2px_0px_0px_#511B25]">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white mb-2.5">
                {labels.welfare1Title[locale]}
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                {labels.welfare1Desc[locale]}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#882637]/15 flex items-center gap-2 text-xs font-bold text-[#882637] dark:text-[#F29EAA]">
              <Award className="h-4 w-4 shrink-0" />
              <span>
                {locale === "si"
                  ? "ස්වයංපෝෂිත ජීවනෝපාය සහතික කිරීම"
                  : locale === "ta"
                  ? "நிலையான வாழ்வாதார உறுதிப்படுத்தல்"
                  : "Certified Professional Financial Autonomy"}
              </span>
            </div>
          </div>

          {/* Card 2: National Council Leadership */}
          <div className="rounded-[24px] sm:rounded-[26px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-7 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] rotate-[1.2deg] transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-[#882637] text-white flex items-center justify-center mb-4 shadow-[2px_2px_0px_0px_#511B25]">
                <Flag className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white mb-2.5">
                {labels.welfare2Title[locale]}
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                {labels.welfare2Desc[locale]}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#882637]/15 flex items-center gap-2 text-xs font-bold text-[#882637] dark:text-[#F29EAA]">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>
                {locale === "si"
                  ? "ජනාධිපති මෙහෙයුම් කමිටු සක්‍රීය නායකත්වය"
                  : locale === "ta"
                  ? "ஜனாதிபதி நடவடிக்கை குழு தலைமைத்துவம்"
                  : "Executive Presidential Operation Leadership"}
              </span>
            </div>
          </div>
        </div>

        {/* 7 Counselor Workshops (Neo-Brutalist Sticker Container) */}
        <div className="rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-8 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] mb-10">
          <div className="flex items-center gap-2.5 mb-2 text-[#882637] dark:text-[#F29EAA]">
            <div className="h-9 w-9 rounded-xl bg-[#882637] text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#511B25]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
              {labels.workshopsTitle[locale]}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6 font-medium">
            {labels.workshopsSub[locale]}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {COUNSELOR_WORKSHOPS.map((ws, idx) => (
              <div
                key={idx}
                className="rounded-2xl border-2 border-[#882637] bg-white dark:bg-neutral-800 p-3.5 text-center shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] transition-all duration-200 hover:-translate-y-1 hover:border-[#882637] cursor-default"
              >
                <span className="block text-xs sm:text-sm font-black text-neutral-900 dark:text-white mb-1.5">
                  {getTrilingual(ws.district, locale)}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#882637] dark:text-[#F29EAA] bg-[#882637]/10 dark:bg-[#882637]/25 px-2 py-0.5 rounded-md">
                  <Calendar className="h-3 w-3" />
                  {ws.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 11: RATAMA EKATA SPECIAL OPERATIONS & REACH */}
        {/* ========================================================= */}

        <div className="mb-6">
          <div className="max-w-3xl mb-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {labels.otherOpsTitle[locale]}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 font-medium">
              {labels.otherOpsSub[locale]}
            </p>
          </div>

          {/* 3 Reach Metric Cards (Neo-Brutalist Sticker Cards with Tilt & CountUp) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {/* Card 1: School Awareness */}
            <div className="rounded-[22px] border-[2.5px] border-[#882637] bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] rotate-[-1.4deg] transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {labels.schoolLabel[locale]}
              </span>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-600 dark:text-blue-400 mt-1 mb-1 leading-tight">
                <CountUpNumber
                  end={RATAMA_EKATA_TOTALS.studentsReached}
                  duration={1200}
                />
              </p>
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                {labels.schoolSessions[locale]}
              </span>
            </div>

            {/* Card 2: Community Awareness */}
            <div className="rounded-[22px] border-[2.5px] border-[#882637] bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] rotate-[1.3deg] transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                {labels.communityLabel[locale]}
              </span>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#882637] dark:text-[#F29EAA] mt-1 mb-1 leading-tight">
                <CountUpNumber
                  end={RATAMA_EKATA_TOTALS.communityReached}
                  duration={1200}
                />
              </p>
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                {labels.communitySeminars[locale]}
              </span>
            </div>

            {/* Card 3: Poster & Short Drives */}
            <div className="rounded-[22px] border-[2.5px] border-[#882637] bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] rotate-[-1.1deg] transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {labels.posterLabel[locale]}
              </span>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-600 dark:text-amber-400 mt-1 mb-1 leading-tight">
                <CountUpNumber
                  end={RATAMA_EKATA_TOTALS.posterShortReached}
                  duration={1200}
                />
              </p>
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                {labels.posterCampaigns[locale]}
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* INTERACTIVE OPERATIONS ANALYTICS & CHART PANEL */}
          {/* Replaces the raw table with interactive district selection & vertical bars */}
          {/* ========================================================= */}
          <div className="rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-8 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] mb-10">
            {/* Header with Mode Switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-[#882637]/20 mb-6">
              <div>
                <h4 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">
                  {locale === "si"
                    ? "\"රටම එකට\" මෙහෙයුම් දත්ත විශ්ලේෂණය"
                    : locale === "ta"
                    ? "\"ரட்டம எகட\" நடவடிக்கை தரவு பகுப்பாய்வு"
                    : "\"Ratama Ekata\" Operations Analytics"}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 font-medium">
                  {locale === "si"
                    ? "ප්‍රස්ථාර මාදිලිය සහ දිස්ත්‍රික්ක තෝරා සවිස්තර දත්ත නිරීක්ෂණය කරන්න:"
                    : locale === "ta"
                    ? "வரைபட வடிவம் மற்றும் மாவட்டத்தைத் தெரிவுசெய்து விபரங்களைப் பார்வையிடுக:"
                    : "Switch chart mode or select any district to explore nationwide mobilization:"}
                </p>
              </div>

              {/* View Mode Switcher Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setChartMode("donut")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    chartMode === "donut"
                      ? "bg-[#882637] text-white shadow-[2px_2px_0px_0px_#511B25] scale-105"
                      : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-2 border-neutral-300 hover:border-[#882637]"
                  }`}
                >
                  <PieChart className="h-3.5 w-3.5" />
                  <span>
                    {locale === "si"
                      ? "සහභාගීත්ව අනුපාතය"
                      : locale === "ta"
                      ? "பங்களிப்பு விகிதம்"
                      : "Audience Share"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setChartMode("district")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    chartMode === "district"
                      ? "bg-[#882637] text-white shadow-[2px_2px_0px_0px_#511B25] scale-105"
                      : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-2 border-neutral-300 hover:border-[#882637]"
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>
                    {locale === "si"
                      ? "දිස්ත්‍රික්ක තෝරන්න"
                      : locale === "ta"
                      ? "மாவட்ட விபரம்"
                      : "District Focus"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setChartMode("top5")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    chartMode === "top5"
                      ? "bg-[#882637] text-white shadow-[2px_2px_0px_0px_#511B25] scale-105"
                      : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-2 border-neutral-300 hover:border-[#882637]"
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>
                    {locale === "si"
                      ? "ඉහළම දිස්ත්‍රික්ක 5"
                      : locale === "ta"
                      ? "முக்கிய 5 மாவட்டங்கள்"
                      : "Top 5 Districts"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setChartMode("all")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    chartMode === "all"
                      ? "bg-[#882637] text-white shadow-[2px_2px_0px_0px_#511B25] scale-105"
                      : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-2 border-neutral-300 hover:border-[#882637]"
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>
                    {locale === "si"
                      ? "සියලු දිස්ත්‍රික්ක"
                      : locale === "ta"
                      ? "அனைத்து மாவட்டங்கள்"
                      : "All Districts"}
                  </span>
                </button>
              </div>
            </div>

            {/* TAB 1: DONUT AUDIENCE SHARE */}
            {chartMode === "donut" && (
              <div className="flex flex-col items-center py-4">
                <div className="text-center mb-6">
                  <span className="text-xs font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                    {locale === "si"
                      ? "\"රටම එකට\" ජාතික මෙහෙයුම් සහභාගීත්ව බෙදීයාම"
                      : "\"Ratama Ekata\" Outreach Audience Share"}
                  </span>
                  <p className="text-xs text-neutral-500 mt-1">
                    School Students (131.5k) • Community (22.5k) • Poster & Campaigns (17.6k)
                  </p>
                </div>
                <DonutChart
                  data={donutData}
                  size={290}
                  thickness={50}
                  centerTitle={locale === "si" ? "සම්පූර්ණ සහභාගීත්වය" : "Total Mobilized"}
                  centerTotalOverride="259,323"
                  showLegend={true}
                />
              </div>
            )}

            {/* TAB 2: DISTRICT FOCUS VIEW */}
            {chartMode === "district" && (
              <div className="space-y-6">
                {/* District Selector Header & Dropdown */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label
                    htmlFor="ratama-district-select"
                    className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white flex items-center gap-1.5"
                  >
                    <MapPin className="h-4 w-4 text-[#882637]" />
                    <span>{labels.selectDistrict[locale]}</span>
                  </label>

                  <div className="relative inline-block w-full sm:w-72">
                    <select
                      id="ratama-district-select"
                      value={selectedDistrictId}
                      onChange={(e) => setSelectedDistrictId(e.target.value)}
                      className="w-full appearance-none rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 py-2 pl-3.5 pr-10 text-xs sm:text-sm font-black text-neutral-900 dark:text-white shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] focus:outline-hidden cursor-pointer"
                    >
                      {RATAMA_EKATA_DISTRICTS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {getTrilingual(d.district, locale)} ({d.totalReached.toLocaleString("en-US")} {labels.reachUnit[locale]})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#882637]" />
                  </div>
                </div>

                {/* Quick District Chips */}
                <div className="flex flex-wrap gap-2 pt-1 pb-2">
                  {RATAMA_EKATA_DISTRICTS.map((d) => {
                    const isSelected = d.id === selectedDistrictId;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDistrictId(d.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#882637] text-white shadow-[2px_2px_0px_0px_#511B25] scale-105"
                            : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 hover:border-[#882637]"
                        }`}
                      >
                        {getTrilingual(d.district, locale)}
                      </button>
                    );
                  })}
                </div>

                {/* 4 Mini Stat Cards for the Selected District */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Students */}
                  <div className="rounded-2xl border-2 border-[#882637] bg-white dark:bg-neutral-800 p-4 shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25]">
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block">
                      {locale === "si" ? "පාසල් සිසුන්" : "School Students"}
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                      <CountUpNumber
                        end={currentDistrict.studentsReached}
                        duration={900}
                      />
                    </p>
                    <span className="text-[11px] font-semibold text-neutral-500">
                      {currentDistrict.schoolPrograms} {labels.programsUnit[locale]}
                    </span>
                  </div>

                  {/* Community */}
                  <div className="rounded-2xl border-2 border-[#882637] bg-white dark:bg-neutral-800 p-4 shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25]">
                    <span className="text-[11px] font-bold text-[#882637] dark:text-[#F29EAA] block">
                      {locale === "si" ? "ප්‍රජාව" : "Community"}
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-[#882637] dark:text-[#F29EAA] mt-0.5">
                      <CountUpNumber
                        end={currentDistrict.communityReached}
                        duration={900}
                      />
                    </p>
                    <span className="text-[11px] font-semibold text-neutral-500">
                      {currentDistrict.communityPrograms} {labels.programsUnit[locale]}
                    </span>
                  </div>

                  {/* Posters */}
                  <div className="rounded-2xl border-2 border-[#882637] bg-white dark:bg-neutral-800 p-4 shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25]">
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block">
                      {locale === "si" ? "පෝස්ටර්/කෙටි" : "Posters & Short"}
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                      <CountUpNumber
                        end={currentDistrict.posterShortReached}
                        duration={900}
                      />
                    </p>
                    <span className="text-[11px] font-semibold text-neutral-500">
                      {currentDistrict.posterShortPrograms} {labels.programsUnit[locale]}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="rounded-2xl border-2 border-[#882637] bg-white dark:bg-neutral-800 p-4 shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25]">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                      {locale === "si" ? "මුළු සහභාගීත්වය" : "Total Reached"}
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                      <CountUpNumber
                        end={currentDistrict.totalReached}
                        duration={900}
                      />
                    </p>
                    <span className="text-[11px] font-semibold text-neutral-500">
                      {currentDistrict.totalPrograms} {labels.programsUnit[locale]}
                    </span>
                  </div>
                </div>

                {/* Vertical Bar Chart for Selected District */}
                <div className="pt-4">
                  <div className="mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                      {getTrilingual(currentDistrict.district, locale)} - {locale === "si" ? "වැඩසටහන් ප්‍රවාහ සන්සන්දනය" : "Mobilization by Stream"}
                    </span>
                  </div>
                  <VerticalBarChart
                    data={districtVerticalBars}
                    height={280}
                    barWidthClass="max-w-[70px] sm:max-w-[100px] md:max-w-[130px]"
                    valueSuffix=""
                  />
                </div>
              </div>
            )}

            {/* TAB 3: TOP 5 DISTRICTS */}
            {chartMode === "top5" && (
              <div className="space-y-4">
                <div className="mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                    {locale === "si"
                      ? "වැඩිම සහභාගීත්වයක් වාර්තා කළ දිස්ත්‍රික්ක 5"
                      : "Top 5 Districts by Total Mobilized Participants"}
                  </span>
                </div>
                <VerticalBarChart
                  data={top5DistrictsBars}
                  height={300}
                  barWidthClass="max-w-[60px] sm:max-w-[85px] md:max-w-[110px]"
                  valueSuffix=""
                />
              </div>
            )}

            {/* TAB 4: ALL 17 DISTRICTS (SCROLLABLE) */}
            {chartMode === "all" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                    {locale === "si"
                      ? "සියලු දිස්ත්‍රික්ක 17 ක සම්පූර්ණ සහභාගීත්වය"
                      : "All 17 Districts Total Mobilized Participants"}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-bold hidden sm:inline-block">
                    ← Scroll horizontally →
                  </span>
                </div>
                <div className="overflow-x-auto pb-4">
                  <div className="min-w-[760px]">
                    <VerticalBarChart
                      data={allDistrictsBars}
                      height={320}
                      barWidthClass="max-w-[34px] sm:max-w-[42px]"
                      valueSuffix=""
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* KEY NATIONAL CAMPAIGN MILESTONES (4 Tilted Sticker Cards) */}
          {/* ========================================================= */}
          <div className="space-y-4">
            <h4 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">
              {labels.eventsTitle[locale]}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {KEY_EVENTS.map((event, idx) => {
                // Alternating tilt for neo-brutalist sticker look
                const tilts = [
                  "rotate-[-1.2deg] hover:rotate-0",
                  "rotate-[1.2deg] hover:rotate-0",
                  "rotate-[1deg] hover:rotate-0",
                  "rotate-[-1deg] hover:rotate-0",
                ];
                const tiltClass = tilts[idx % tilts.length];

                return (
                  <div
                    key={idx}
                    className={`rounded-[22px] border-[2.5px] border-[#882637] bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] flex items-start gap-4 transition-all duration-300 hover:-translate-y-1.5 ${tiltClass}`}
                  >
                    <div className="h-11 w-11 rounded-2xl bg-[#882637] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[2px_2px_0px_0px_#511B25]">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#882637]/10 dark:bg-[#882637]/30 text-[#882637] dark:text-[#F29EAA] text-[11px] font-black border border-[#882637]/25 mb-1.5">
                        {event.date}
                      </span>
                      <h5 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white mb-1.5">
                        {getTrilingual(event.title, locale)}
                      </h5>
                      <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                        {getTrilingual(event.desc, locale)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

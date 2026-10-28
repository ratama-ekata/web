import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { APP_CONFIG } from "@/constants/config";
import {
  RehabilitationHeader,
  VisionMissionSection,
  PowersFunctionsSection,
  StructureSection,
  CapacityProgressSection,
  TreatmentProgramsSection,
  ReintegrationTimelineSection,
  VoluntaryTreatmentSection,
  AftercareFollowupSection,
  PreventionAwarenessSection,
  WelfareRatamaEkataSection,
  CapitalDevelopmentSection,
} from "@/components/rehabilitation";
import { CtaBannerSection } from "@/components/marketing/cta-banner-section";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rehabilitation" });

  const title = t("metaTitle");
  const description = t("metaDescription");
  const canonicalUrl = `https://${APP_CONFIG.domain}/${locale}/rehabilitation`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://${APP_CONFIG.domain}/en/rehabilitation`,
        si: `https://${APP_CONFIG.domain}/si/rehabilitation`,
        ta: `https://${APP_CONFIG.domain}/ta/rehabilitation`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "රටම එකට - Ratama Ekata",
      images: [
        {
          url: "/icon.png",
          width: 512,
          height: 512,
          alt: "පුනරුත්ථාපන කාර්යාංශය - Bureau of Rehabilitation",
        },
      ],
      locale: locale === "si" ? "si_LK" : locale === "ta" ? "ta_LK" : "en_LK",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/icon.png"],
    },
  };
}

export default async function RehabilitationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="relative min-h-screen bg-[#FFFDF0] dark:bg-[#000000] text-[#171717] dark:text-[#FAFAFA]">
      {/* 1. Page Header with Authority, Hotline 1927, and Key KPI Cards */}
      <RehabilitationHeader />

      {/* 2. Section 1: Vision, Mission & Strategic Objectives */}
      <VisionMissionSection />

      {/* 3. Section 2: Statutory Powers & Mandate (Act No. 2 of 2023 & Act No. 54 of 2007) */}
      <PowersFunctionsSection />

      {/* 4. Section 3: Institutional Structure, 3 Judicial Centres & Senapura Centre */}
      <StructureSection />

      {/* 5. Section 4: Physical Progress & Centre Capacity (Donut Chart & Grouped Bar Chart) */}
      <CapacityProgressSection />

      {/* 6. Section 5: Treatment Programs & Vocational Courses (Donut Chart & Program Volume Bar Chart) */}
      <TreatmentProgramsSection />

      {/* 7. Section 6: Social Reintegration 2026 Timeline (Monthly Bar Chart) */}
      <ReintegrationTimelineSection />

      {/* 8. Section 7: Voluntary Inpatient Care (Senapura Centre Donut & Clinical Outcome) */}
      <VoluntaryTreatmentSection />

      {/* 9. Section 8: Post-Rehabilitation Field Tracking & Aftercare (Horizontal Comparison Bar Chart) */}
      <AftercareFollowupSection />

      {/* 10. Section 9: Drug Prevention & Public Awareness Campaigns (Donut & Dual Bar Comparison) */}
      <PreventionAwarenessSection />

      {/* 11. Section 10 & 11: Livelihood Welfare & "Ratama Ekata" Operations (Donut Chart & Event Milestones) */}
      <WelfareRatamaEkataSection />

      {/* 12. Section 12: Capital Budget Allocations for Infrastructure Development (Donut Chart & Project Cards) */}
      <CapitalDevelopmentSection />

      {/* 13. CTA Banner Section (Existing Component) */}
      <CtaBannerSection />
    </article>
  );
}

import { setRequestLocale } from "next-intl/server";

import { HeroSection } from "@/components/marketing/hero-section";
import { StatSection } from "@/components/marketing/stat-section";
import { PillarsSection } from "@/components/marketing/pillars-section";
import { RecoveryStoriesSection } from "@/components/marketing/recovery-stories-section";
import { NationProgressCarousel } from "@/components/marketing/nation-progress-carousel";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBannerSection } from "@/components/marketing/cta-banner-section";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative overflow-hidden bg-[#FFFDF0] dark:bg-[#000000]">
      <HeroSection />
      <StatSection />
      <PillarsSection />
      <RecoveryStoriesSection />
      <NationProgressCarousel />
      <FaqSection />
      <CtaBannerSection />
    </div>
  );
}

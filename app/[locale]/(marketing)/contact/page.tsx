import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { APP_CONFIG } from "@/constants/config";
import { ContactHeader, ContactContent } from "@/components/contact";
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
  const t = await getTranslations({ locale, namespace: "contact" });

  const title = t("metaTitle");
  const description = t("metaDescription");
  const canonicalUrl = `https://${APP_CONFIG.domain}/${locale}/contact`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://${APP_CONFIG.domain}/en/contact`,
        si: `https://${APP_CONFIG.domain}/si/contact`,
        ta: `https://${APP_CONFIG.domain}/ta/contact`,
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
          alt: "රටම එකට - Ratama Ekata National Operation",
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="relative min-h-screen bg-[#FFFDF0] dark:bg-[#000000] text-[#171717] dark:text-[#FAFAFA]">
      {/* Contact Page Header */}
      <ContactHeader />

      {/* Main Contact Form & Hotlines Content */}
      <ContactContent />

      {/* CTA Banner Section */}
      <CtaBannerSection />
    </article>
  );
}

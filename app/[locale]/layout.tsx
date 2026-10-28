import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, Locale } from "@/i18n/routing";
import { APP_CONFIG } from "@/constants/config";
import { Providers } from "@/app/providers";
import { LocaleTransitionProvider } from "@/components/shared/locale-transition";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    si: "රටම එකට - ජාතික මෙහෙයුම | මත්ද්‍රව්‍ය නිවාරණ ජාතික වැඩසටහන",
    ta: "முழு நாடுமே ஒன்றாக - தேசிய இயக்கம் | போதைப்பொருள் ஒழிப்பு தேசிய திட்டம்",
    en: "රටම එකට - A Nation United | National Operation Against Drug Abuse",
  };

  const descriptions: Record<string, string> = {
    si: "මත්ද්‍රව්‍ය උවදුරින් තොර සුරක්ෂිත දේශයක් උදෙසා ජනාධිපති ලේකම් කාර්යාලය මෙහෙයවන ජාතික මත්ද්‍රව්‍ය නිවාරණ සහ පුනරුත්ථාපන මෙහෙයුමේ නිල ද්වාරය.",
    ta: "போதைப்பொருள் அற்ற பாதுகாப்பான இலங்கையை கட்டியெழுப்புவதற்கான ஜனாதிபதி செயலகத்தின் தேசிய போதைப்பொருள் ஒழிப்பு மற்றும் புனர்வாழ்வு இயக்கத்தின் உத்தியோகபூர்வ தளம்.",
    en: "Official Portal of the National Operation Against Drug Abuse - Prevention, Enforcement, and Rehabilitation under the Presidential Secretariat of Sri Lanka.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    metadataBase: new URL(`https://${APP_CONFIG.domain}`),
    keywords: [
      "රටම එකට",
      "Ratama Ekata",
      "A Nation United",
      "National Operation Against Drug Abuse",
      "Sri Lanka",
      "Presidential Secretariat",
      "Hotline 1818",
      "Rehabilitation 1927",
    ],
    icons: {
      icon: [
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
    },
    openGraph: {
      title,
      description,
      url: `https://${APP_CONFIG.domain}/${locale}`,
      siteName: "රටම එකට - A Nation United",
      images: [
        {
          url: "/icon.png",
          width: 512,
          height: 512,
          alt: "රටම එකට - A Nation United Logo",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className="h-full antialiased font-sans"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700;800;900&family=Noto+Sans+Sinhala:wght@300;400;500;600;700;800;900&family=Noto+Sans+Tamil:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        data-locale={locale}
        className="font-sans min-h-full flex flex-col bg-background text-foreground"
      >
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="${APP_CONFIG.storageKeys.theme}";var t=localStorage.getItem(k);var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-theme","dark");}else{document.documentElement.classList.remove("dark");document.documentElement.setAttribute("data-theme","light");}}catch(e){}})();`,
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <Providers>
              <ScrollToTop />
              <LocaleTransitionProvider>{children}</LocaleTransitionProvider>
            </Providers>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

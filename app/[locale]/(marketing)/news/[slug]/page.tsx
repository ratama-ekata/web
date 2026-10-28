import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { APP_CONFIG } from "@/constants/config";
import { CtaBannerSection } from "@/components/marketing/cta-banner-section";
import { ArrowLeft } from "lucide-react";
import type { NewsArticleItem } from "@/components/news/news-list";

export async function generateStaticParams() {
  const locales = routing.locales;
  const paths: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const t = await getTranslations({ locale, namespace: "news" });
    const items = (t.raw("items") as NewsArticleItem[]) || [];
    for (const item of items) {
      if (item.slug) {
        paths.push({ locale, slug: item.slug });
      }
    }
  }

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  const items = (t.raw("items") as NewsArticleItem[]) || [];
  const article = items.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "News Not Found | Ratama Ekata",
    };
  }

  const canonicalUrl = `https://${APP_CONFIG.domain}/${locale}/news/${slug}`;

  return {
    title: `${article.title} | Ratama Ekata`,
    description: article.description.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://${APP_CONFIG.domain}/en/news/${slug}`,
        si: `https://${APP_CONFIG.domain}/si/news/${slug}`,
        ta: `https://${APP_CONFIG.domain}/ta/news/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description.slice(0, 160),
      url: canonicalUrl,
      siteName: "රටම එකට - Ratama Ekata",
      images: [
        {
          url: article.image || "/icon.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: locale === "si" ? "si_LK" : locale === "ta" ? "ta_LK" : "en_LK",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description.slice(0, 160),
      images: [article.image || "/icon.png"],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "news" });
  const items = (t.raw("items") as NewsArticleItem[]) || [];
  const article = items.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="relative min-h-screen bg-[#FFFDF0] dark:bg-[#000000] text-[#171717] dark:text-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-16 sm:pb-24">
        {/* Top Back Link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8A1C2B] dark:text-[#F29EAA] hover:text-[#701622] hover:underline mb-6 group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>{t("backToNews")}</span>
        </Link>

        {/* News Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-black leading-[1.18] tracking-tight text-[#171717] dark:text-zinc-50 mb-3.5">
          {article.title}
        </h1>

        {/* News Meta: Date and Author only */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] text-[#64748B] dark:text-zinc-400 mb-6 sm:mb-8">
          <span>{article.date}</span>
          <span className="text-[#CBD5E1] dark:text-zinc-700">|</span>
          <span>{article.author}</span>
        </div>

        {/* News Featured Image */}
        <div className="py-2 px-1 sm:px-2 mb-8 sm:mb-10">
          <div className="news-image-frame news-image-detail relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.4/1] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-2 border-[#882637] shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              priority
            />
          </div>
        </div>

        {/* News Description */}
        <div className="text-[#27272A] dark:text-zinc-200 text-base sm:text-lg leading-relaxed font-normal space-y-6">
          <p className="leading-relaxed whitespace-pre-line">
            {article.description}
          </p>
        </div>
      </div>

      <CtaBannerSection />
    </article>
  );
}

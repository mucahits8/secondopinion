import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InfoPage } from "@/components/info-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common.infoPages.kvkk" });
  return { title: t("metadata") };
}

export default async function KvkkPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common.infoPages.kvkk");
  return <InfoPage eyebrow={t("eyebrow")} title={t("title")} paragraphs={t.raw("paragraphs") as string[]} />;
}

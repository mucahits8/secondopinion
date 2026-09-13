import { NewCaseWizard } from "@/components/new-case-wizard";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.metadata" });
  return { title: t("new") };
}

export default async function NewCasePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NewCaseWizard />;
}

"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Bell, Camera, Menu, PlaySquare, Share2, UserRound, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { localizePath } from "@/lib/i18n-format";
import { Logo } from "./logo";

const navItems = [
  ["howItWorks", "/how-it-works"],
  ["doctors", "/doctors"],
  ["specialties", "/specialties"],
  ["blog", "/blog"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("navigation");
  const common = useTranslations("common.actions");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/70 bg-white/88 backdrop-blur-xl">
      <div className="container-shell flex h-[74px] items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-9 text-sm font-semibold text-[var(--navy)] lg:flex">
          {navItems.map(([key, href]) => (
            <Link key={key} href={href} className="transition-colors hover:text-[var(--blue)]">
              {t(`public.${key}`)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Link href="/login" className="text-sm font-semibold text-[var(--navy)] transition-colors hover:text-[var(--blue)]">
            {t("public.login")}
          </Link>
          <Link href="/app/cases/new" className="btn-primary arrow-nudge">
            {common("getSecondOpinion")} <ArrowRight size={17} />
          </Link>
        </div>
        <button
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-[9px] border border-[var(--border)] bg-white text-[var(--navy)] lg:hidden"
          aria-label={open ? t("mobile.close") : t("mobile.open")}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[var(--border)] bg-white lg:hidden">
          <nav className="container-shell grid gap-2 py-4">
            <LanguageSwitcher compact />
            {navItems.map(([key, href]) => (
              <Link key={key} href={href} className="rounded-[9px] px-3 py-3 text-sm font-bold text-[var(--navy)] hover:bg-[var(--pale-blue)]" onClick={() => setOpen(false)}>
                {t(`public.${key}`)}
              </Link>
            ))}
            <Link href="/login" className="rounded-[9px] px-3 py-3 text-sm font-bold text-[var(--navy)] hover:bg-[var(--pale-blue)]" onClick={() => setOpen(false)}>
              {t("public.login")}
            </Link>
            <Link href="/app/cases/new" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              {common("getSecondOpinion")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const t = useTranslations("navigation.footer");
  const columns = [
    {
      title: t("columns.corporate.title"),
      links: [[t("columns.corporate.links.about"), "/about"], [t("columns.corporate.links.team"), "/about"], [t("columns.corporate.links.career"), "/about"], [t("columns.corporate.links.contact"), "/contact"]],
    },
    {
      title: t("columns.services.title"),
      links: [[t("columns.services.links.secondOpinion"), "/app/cases/new"], [t("columns.services.links.specialties"), "/specialties"], [t("columns.services.links.doctors"), "/doctors"], [t("columns.services.links.pricing"), "/pricing"]],
    },
    {
      title: t("columns.support.title"),
      links: [[t("columns.support.links.help"), "/help"], [t("columns.support.links.faq"), "/#faq"], [t("columns.support.links.technical"), "/help"], [t("columns.support.links.contact"), "/contact"]],
    },
    {
      title: t("columns.legal.title"),
      links: [[t("columns.legal.links.kvkk"), "/kvkk"], [t("columns.legal.links.privacy"), "/privacy"], [t("columns.legal.links.terms"), "/terms"], [t("columns.legal.links.cookies"), "/cookies"]],
    },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="container-shell py-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr_1fr]">
          <div>
            <Logo />
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-bold text-[var(--navy)]">{column.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="hover:text-[var(--blue)]">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-l border-[var(--border)] pl-6 text-sm text-[var(--text-secondary)] lg:text-right">
            <div className="mb-5 flex gap-3 lg:justify-end">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] text-[var(--navy)]" aria-label={t("social.linkedin")}><Share2 size={15} /></span>
              <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] text-[var(--navy)]" aria-label={t("social.instagram")}><Camera size={15} /></span>
              <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] text-[var(--navy)]" aria-label={t("social.youtube")}><PlaySquare size={15} /></span>
            </div>
            <p>{t("copyright")}</p>
            <p>{t("rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function AppHeader() {
  const t = useTranslations("navigation.app");
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/92 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-5 lg:px-8">
        <Logo compact />
        <div className="flex items-center gap-3">
          <LanguageSwitcher compact />
          <button className="focus-ring grid h-10 w-10 place-items-center rounded-[9px] border border-[var(--border)] text-[var(--navy)]" aria-label={t("notifications")}>
            <Bell size={18} />
          </button>
          <Link href="/app" className="focus-ring inline-flex h-10 items-center gap-2 rounded-[9px] border border-[var(--border)] px-3 text-sm font-semibold text-[var(--navy)]">
            <UserRound size={18} /> {t("profileName")}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function AppSidebar() {
  const t = useTranslations("navigation.app.sidebar");
  const items = [
    [t("dashboard"), "/app"],
    [t("cases"), "/app/cases"],
    [t("documents"), "/app/cases/SO-2026-00184/images"],
    [t("messages"), "/app/cases/SO-2026-00184"],
    [t("profile"), "/app"],
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[var(--border)] bg-white px-4 py-6 lg:block">
      <nav className="space-y-1">
        {items.map(([label, href], index) => (
          <Link
            key={label}
            href={href}
            className={`block rounded-[9px] px-4 py-3 text-sm font-semibold transition-colors ${
              index === 0 ? "bg-[var(--pale-blue)] text-[var(--blue)]" : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--navy)]"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("common.languages");

  return (
    <div className={`flex items-center ${compact ? "gap-1" : "gap-2"}`} aria-label={t("label")}>
      {locales.map((targetLocale) => (
        <NextLink
          key={targetLocale}
          href={localizePath(pathname, targetLocale)}
          locale={false}
          onClick={() => {
            document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; samesite=lax`;
          }}
          className={`focus-ring rounded-[9px] border px-2.5 py-1.5 text-xs font-bold transition-colors ${
            locale === targetLocale ? "border-[var(--blue)] bg-[var(--pale-blue)] text-[var(--blue)]" : "border-[var(--border)] bg-white text-[var(--text-secondary)] hover:text-[var(--blue)]"
          }`}
        >
          {targetLocale.toUpperCase()}
        </NextLink>
      ))}
    </div>
  );
}

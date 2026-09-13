"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bell, Menu, UserRound, X } from "lucide-react";
import { Logo } from "./logo";

const navItems = [
  ["Nasıl Çalışır", "/how-it-works"],
  ["Uzmanlarımız", "/doctors"],
  ["Uzmanlık Alanları", "/specialties"],
  ["Blog", "/blog"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/70 bg-white/88 backdrop-blur-xl">
      <div className="container-shell flex h-[74px] items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-9 text-sm font-semibold text-[var(--navy)] lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={label} href={href} className="transition-colors hover:text-[var(--blue)]">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/login" className="text-sm font-semibold text-[var(--navy)] transition-colors hover:text-[var(--blue)]">
            Giriş Yap
          </Link>
          <Link href="/app/cases/new" className="btn-primary arrow-nudge">
            İkinci Görüş Al <ArrowRight size={17} />
          </Link>
        </div>
        <button
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-[9px] border border-[var(--border)] bg-white text-[var(--navy)] lg:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[var(--border)] bg-white lg:hidden">
          <nav className="container-shell grid gap-2 py-4">
            {navItems.map(([label, href]) => (
              <Link key={label} href={href} className="rounded-[9px] px-3 py-3 text-sm font-bold text-[var(--navy)] hover:bg-[var(--pale-blue)]" onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/login" className="rounded-[9px] px-3 py-3 text-sm font-bold text-[var(--navy)] hover:bg-[var(--pale-blue)]" onClick={() => setOpen(false)}>
              Giriş Yap
            </Link>
            <Link href="/app/cases/new" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              İkinci Görüş Al
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const columns = [
    {
      title: "Kurumsal",
      links: [["Hakkımızda", "/about"], ["Ekibimiz", "/about"], ["Kariyer", "/about"], ["İletişim", "/contact"]],
    },
    {
      title: "Hizmetler",
      links: [["İkinci Görüş Al", "/app/cases/new"], ["Uzmanlık Alanları", "/specialties"], ["Uzmanlarımız", "/doctors"], ["Fiyatlandırma", "/pricing"]],
    },
    {
      title: "Destek",
      links: [["Yardım Merkezi", "/help"], ["SSS", "/#faq"], ["Teknik Destek", "/help"], ["Bize Ulaşın", "/contact"]],
    },
    {
      title: "Yasal",
      links: [["KVKK Aydınlatma Metni", "/kvkk"], ["Gizlilik Politikası", "/privacy"], ["Kullanım Şartları", "/terms"], ["Çerez Politikası", "/cookies"]],
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
              <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] text-[var(--navy)]">in</span>
              <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] text-[var(--navy)]">ig</span>
              <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] text-[var(--navy)]">yt</span>
            </div>
            <p>© 2026 Second Opinion.</p>
            <p>Tüm haklari saklidir.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/92 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-5 lg:px-8">
        <Logo compact />
        <div className="flex items-center gap-3">
          <button className="focus-ring grid h-10 w-10 place-items-center rounded-[9px] border border-[var(--border)] text-[var(--navy)]" aria-label="Bildirimler">
            <Bell size={18} />
          </button>
          <Link href="/app" className="focus-ring inline-flex h-10 items-center gap-2 rounded-[9px] border border-[var(--border)] px-3 text-sm font-semibold text-[var(--navy)]">
            <UserRound size={18} /> Ahmet
          </Link>
        </div>
      </div>
    </header>
  );
}

export function AppSidebar() {
  const items = [
    ["Genel Bakış", "/app"],
    ["Vakalarım", "/app/cases"],
    ["Belgelerim", "/app/cases/SO-2026-00184/images"],
    ["Mesajlar", "/app/cases/SO-2026-00184"],
    ["Profil", "/app"],
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

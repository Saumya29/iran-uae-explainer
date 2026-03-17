"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS_META } from "../data/sections";

export default function Sidebar({
  activeSection,
  onNavigate,
}: {
  activeSection?: string;
  onNavigate?: (id: string) => void;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const situationSections = SECTIONS_META.filter(
    (s) => s.category === "situation"
  );
  const practicalSections = SECTIONS_META.filter(
    (s) => s.category === "practical"
  );

  const handleSectionClick = (id: string) => {
    if (isHome && onNavigate) {
      onNavigate(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-56 bg-[var(--card)] border-r border-[var(--card-border)] py-6 px-3 z-40 hide-scrollbar overflow-y-auto">
      <div className="mb-6 px-2">
        <Link href="/">
          <h2 className="text-sm font-bold text-red-500 uppercase tracking-wider">
            🚨 Iran-UAE
          </h2>
          <p className="text-xs text-[var(--muted)] mt-1">Conflict Explainer</p>
        </Link>
      </div>

      <nav className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest px-2 mb-1">
          Situation
        </p>
        {situationSections.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSectionClick(s.id)}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
              isHome && activeSection === s.id
                ? "bg-red-500/10 text-red-400 font-medium"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)]"
            }`}
          >
            <span className="mr-2">{s.emoji}</span>
            {s.shortTitle}
          </button>
        ))}

        <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest px-2 mt-4 mb-1">
          Practical
        </p>
        {practicalSections.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSectionClick(s.id)}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
              isHome && activeSection === s.id
                ? "bg-red-500/10 text-red-400 font-medium"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)]"
            }`}
          >
            <span className="mr-2">{s.emoji}</span>
            {s.shortTitle}
          </button>
        ))}

        <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest px-2 mt-4 mb-1">
          Resources
        </p>
        <Link
          href="/topics"
          className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
            pathname === "/topics" || pathname.startsWith("/topics/")
              ? "bg-red-500/10 text-red-400 font-medium"
              : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)]"
          }`}
        >
          <span className="mr-2">📖</span>
          Topics
        </Link>
        <Link
          href="/context"
          className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
            pathname === "/context"
              ? "bg-red-500/10 text-red-400 font-medium"
              : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)]"
          }`}
        >
          <span className="mr-2">🌍</span>
          Background
        </Link>
      </nav>

      <div className="mt-auto pt-4 px-2">
        <p className="text-[10px] text-[var(--muted)]">
          Last updated: Mar 17, 2026
          <br />
          12:00 GMT+4
        </p>
      </div>
    </aside>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SECTIONS_META, EMERGENCY_CONTACTS } from "./data/sections";
import FlightBoard from "./components/FlightBoard";

type SectionMeta = (typeof SECTIONS_META)[number];

// ── Severity badge config per section ───────────────────
const SECTION_SEVERITY: Record<string, "red" | "yellow" | "green" | null> = {
  overview: "red",
  attacks: "red",
  "iran-position": "red",
  "uae-response": "yellow",
  casualties: "red",
  history: null,
  flights: "red",
  markets: "yellow",
  emergency: "red",
  shelter: "yellow",
  supplies: "yellow",
  exit: "yellow",
  informed: "green",
};

// ── Theme ────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark";
    setTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  return { theme, toggle };
}

// ── ThemeToggle ──────────────────────────────────────────
function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="flex items-center justify-center w-8 h-8 rounded-md border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
    >
      {theme === "light" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}

// ── Reading Progress Bar ─────────────────────────────────
function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setWidth(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      id="reading-progress"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  );
}

// ── Severity Dot ─────────────────────────────────────────
function SeverityDot({ severity }: { severity: "red" | "yellow" | "green" | null }) {
  if (!severity) return <span className="w-1.5 h-1.5 flex-shrink-0" />;
  const colors = { red: "bg-red-500", yellow: "bg-yellow-500", green: "bg-green-500" };
  return <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors[severity]}`} />;
}

// ── Sidebar ──────────────────────────────────────────────
function Sidebar({
  activeSection,
  onNavigate,
  theme,
  onToggleTheme,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}) {
  const situationSections = SECTIONS_META.filter((s) => s.category === "situation");
  const practicalSections = SECTIONS_META.filter((s) => s.category === "practical");

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-56 border-r border-[var(--card-border)] z-40 overflow-y-auto hide-scrollbar bg-[var(--background)]">
      {/* Brand */}
      <div className="px-5 pt-6 pb-5 border-b border-[var(--card-border)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[10px] font-semibold text-[var(--accent)] uppercase tracking-widest">Live</span>
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <h1 className="text-[13px] font-semibold text-[var(--foreground)] leading-snug">Iran–UAE Conflict</h1>
        <p className="text-[11px] text-[var(--muted)] mt-0.5">Mar 4, 2026 · 02:00 GMT+4</p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col px-3 py-4 gap-0.5 flex-1" aria-label="Main navigation">
        <NavGroup label="Situation" sections={situationSections} activeSection={activeSection} onNavigate={onNavigate} />
        <div className="mt-4">
          <NavGroup label="Practical Guide" sections={practicalSections} activeSection={activeSection} onNavigate={onNavigate} />
        </div>
      </nav>

      {/* Emergency CTA */}
      <div className="px-3 pb-5">
        <button
          onClick={() => onNavigate("emergency")}
          className="emergency-pulse w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/25 text-[var(--accent)] text-xs font-semibold hover:bg-[var(--accent)]/15 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9A16 16 0 0 0 15 16.09l1.09-1.09a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Emergency Contacts
        </button>
      </div>
    </aside>
  );
}

function NavGroup({
  label,
  sections,
  activeSection,
  onNavigate,
}: {
  label: string;
  sections: SectionMeta[];
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest px-2 py-1.5 mt-1 mb-0.5">
        {label}
      </p>
      {sections.map((s) => {
        const isActive = activeSection === s.id;
        const severity = SECTION_SEVERITY[s.id];
        return (
          <button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            className={`w-full text-left px-2 py-[7px] rounded-md text-[13px] transition-all duration-100 flex items-center gap-2 ${
              isActive
                ? "bg-[var(--nav-active-bg)] text-[var(--foreground)] font-medium"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)]"
            }`}
          >
            <span className={`w-0.5 h-3.5 rounded-full flex-shrink-0 transition-colors ${isActive ? "bg-[var(--accent)]" : "bg-transparent"}`} />
            <span className="flex-1">{s.shortTitle}</span>
            <SeverityDot severity={severity} />
          </button>
        );
      })}
    </div>
  );
}

// ── Mobile Top Bar ───────────────────────────────────────
function MobileTopBar({
  activeSection,
  onNavigate,
  theme,
  onToggleTheme,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const activeEl = scrollRef.current.querySelector("[data-active='true']") as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeSection]);

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/95 backdrop-blur-lg border-b border-[var(--card-border)]">
      <div className="flex items-center justify-between px-4 h-11 border-b border-[var(--card-border)]/50">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-[13px] font-semibold text-[var(--foreground)]">Iran–UAE Conflict</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={() => onNavigate("emergency")}
            className="flex items-center gap-1.5 text-[var(--accent)] text-xs font-semibold px-2.5 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8"
            aria-label="Emergency contacts"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9A16 16 0 0 0 15 16.09l1.09-1.09a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            SOS
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-0 overflow-x-auto hide-scrollbar px-3 h-10 items-center">
        {SECTIONS_META.map((s) => {
          const isActive = activeSection === s.id;
          const severity = SECTION_SEVERITY[s.id];
          return (
            <button
              key={s.id}
              data-active={isActive}
              onClick={() => onNavigate(s.id)}
              className={`flex-shrink-0 px-3 h-full text-[12px] font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? "border-[var(--accent)] text-[var(--foreground)]"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {s.shortTitle}
              {severity === "red" && (
                <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}

// ── Primitives ───────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[var(--card)] border border-[var(--card-border)] rounded-lg ${className}`}>
      {children}
    </div>
  );
}

function CollapsibleSection({
  id,
  title,
  children,
  nextSection,
  onNavigate,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  nextSection?: { id: string; shortTitle: string };
  onNavigate: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`).catch(() => {});
  };

  return (
    <section id={id} className="space-y-3">
      {/* Heading row */}
      <div className="flex items-center gap-2 group">
        <h2 className="text-[15px] font-semibold tracking-tight text-[var(--foreground)] flex-1">
          {title}
        </h2>
        {/* Anchor copy link */}
        <button
          onClick={copyLink}
          aria-label="Copy link to section"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted)] hover:text-[var(--foreground)] p-1 rounded"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand section" : "Collapse section"}
          className="text-[var(--muted)] hover:text-[var(--foreground)] p-1 rounded transition-colors"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${collapsed ? "-rotate-90" : "rotate-0"}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Content */}
      {!collapsed && (
        <div className="space-y-3 animate-in fade-in duration-200">
          {children}
          {/* Next section strip */}
          {nextSection && (
            <button
              onClick={() => onNavigate(nextSection.id)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--muted)] hover:bg-[var(--muted-bg)] transition-colors text-xs"
            >
              <span>Next: {nextSection.shortTitle}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
}

function StatusPill({ status, label }: { status: "red" | "yellow" | "green"; label: string }) {
  const styles = {
    red: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    yellow: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    green: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  };
  const dotStyles = { red: "bg-red-500", yellow: "bg-yellow-500", green: "bg-green-500" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`} />
      {label}
    </span>
  );
}

function StatBox({ value, label, color = "foreground" }: {
  value: string; label: string; color?: "red" | "yellow" | "orange" | "blue" | "foreground";
}) {
  const valueColor = {
    red: "text-red-600 dark:text-red-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    orange: "text-orange-600 dark:text-orange-400",
    blue: "text-blue-600 dark:text-blue-400",
    foreground: "text-[var(--foreground)]",
  }[color];
  return (
    <div className="bg-[var(--muted-bg)] rounded-lg p-3.5">
      <p className={`text-xl font-bold ${valueColor}`}>{value}</p>
      <p className="text-[11px] text-[var(--muted)] mt-0.5">{label}</p>
    </div>
  );
}

function BulletList({ items, accent = "muted" }: { items: string[]; accent?: "red" | "green" | "muted" }) {
  const dotColor = {
    red: "text-red-600 dark:text-red-400",
    green: "text-green-600 dark:text-green-400",
    muted: "text-[var(--muted)]",
  }[accent];
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
          <span className={`${dotColor} mt-px flex-shrink-0 select-none`}>—</span>
          <span className="text-[var(--foreground)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoGrid({ items }: { items: { label: string; value: string; red?: boolean; yellow?: boolean }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div key={item.label} className="bg-[var(--muted-bg)] rounded-md p-3">
          <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">{item.label}</p>
          <p className={`text-sm font-medium mt-0.5 ${
            item.red ? "text-red-600 dark:text-red-400" : item.yellow ? "text-yellow-600 dark:text-yellow-400" : "text-[var(--foreground)]"
          }`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ children, color = "muted" }: { children: React.ReactNode; color?: "muted" | "red" | "green" | "blue" | "yellow" }) {
  const c = {
    muted: "text-[var(--muted)]",
    red: "text-red-600 dark:text-red-400",
    green: "text-green-600 dark:text-green-400",
    blue: "text-blue-600 dark:text-blue-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
  }[color];
  return <p className={`text-[10px] font-semibold ${c} uppercase tracking-widest mb-2.5`}>{children}</p>;
}

// ── Section Content Components ───────────────────────────

function OverviewContent() {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        <StatusPill status="red" label="Active Conflict" />
        <StatusPill status="red" label="Airspace Closed" />
        <StatusPill status="yellow" label="Markets Disrupted" />
      </div>
      <p className="text-sm text-[var(--muted)] leading-relaxed">
        Iran launched missile and drone strikes against UAE targets starting February 28, 2026. The UAE, backed by US CENTCOM, has responded with defensive intercepts and retaliatory strikes. This is the most significant military escalation in the Gulf since the 1980s.
      </p>
      <InfoGrid items={[
        { label: "Conflict started", value: "Feb 28, 2026" },
        { label: "Status", value: "Active", red: true },
        { label: "Ceasefire", value: "None declared", yellow: true },
        { label: "US involvement", value: "Active (CENTCOM)" },
      ]} />
    </Card>
  );
}

function AttacksContent() {
  const events = [
    { date: "Mar 3, 2026", severity: "red" as const, event: "Second wave of Iranian ballistic missiles targets Abu Dhabi and Dubai. THAAD and Patriot intercept majority. Some impacts reported near Jebel Ali." },
    { date: "Mar 1, 2026", severity: "red" as const, event: "Iran launches Shahed drones toward UAE oil infrastructure. Most intercepted. Minor damage to Fujairah oil terminal." },
    { date: "Feb 28, 2026", severity: "red" as const, event: "Initial Iranian missile barrage hits Al Dhafra Air Base and civilian areas near Abu Dhabi. Multiple casualties. UAE declares state of emergency." },
    { date: "Feb 28, 2026", severity: "yellow" as const, event: "UAE activates NCEMA emergency protocols. All schools closed, work-from-home ordered for non-essential sectors." },
  ];
  return (
    <div className="space-y-1.5">
      {events.map((item, i) => (
        <Card key={i} className="p-4">
          <div className="flex gap-3">
            <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${item.severity === "red" ? "bg-red-500" : "bg-yellow-500"}`} />
            <div>
              <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wide mb-1">{item.date}</p>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{item.event}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function IranContent() {
  return (
    <Card className="p-4 space-y-3">
      <p className="text-sm text-[var(--muted)] leading-relaxed">
        Iran claims strikes are in response to UAE hosting US military bases. Tehran describes the attacks as defensive and warns of further escalation.
      </p>
      <BulletList accent="red" items={[
        "Demands UAE expel US military presence",
        "Claims right to self-defense under UN Charter",
        "Strait of Hormuz closed to 'hostile shipping'",
        "Houthi allies launching concurrent attacks on Saudi Arabia",
      ]} />
    </Card>
  );
}

function UAEContent() {
  return (
    <Card className="p-4 space-y-3">
      <p className="text-sm text-[var(--muted)] leading-relaxed">
        The UAE has activated full civil defense protocols and is coordinating closely with US CENTCOM. President Sheikh Mohamed has addressed the nation, calling for calm and resilience.
      </p>
      <BulletList accent="green" items={[
        "THAAD and Patriot missile defense systems active",
        "State of emergency declared nationwide",
        "Schools and non-essential businesses closed",
        "Free emergency supplies at civil defense centers",
        "UN Security Council emergency session requested",
      ]} />
    </Card>
  );
}

function CasualtiesContent() {
  return (
    <Card className="p-4 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <StatBox value="47+" label="Confirmed killed" color="red" />
        <StatBox value="200+" label="Injured" color="yellow" />
        <StatBox value="3" label="Infrastructure sites hit" color="orange" />
        <StatBox value="80%+" label="Missiles intercepted" color="blue" />
      </div>
      <p className="text-[11px] text-[var(--muted)] leading-relaxed">
        Figures based on official UAE/NCEMA statements. Updated Mar 4, 2026.
      </p>
    </Card>
  );
}

function HistoryContent() {
  return (
    <Card className="p-4 space-y-2.5 text-sm text-[var(--muted)] leading-relaxed">
      <p>Tensions driven by the UAE&apos;s strategic alliance with the US and its hosting of Al Dhafra Air Base — the largest US military installation in the region.</p>
      <p>The trigger appears connected to escalating US-Iran tensions over Iran&apos;s nuclear program and the collapse of diplomatic talks in January 2026.</p>
      <p>This follows the 2022 Houthi attacks on Abu Dhabi. The closure of the Strait of Hormuz marks a significant escalation affecting global energy markets.</p>
    </Card>
  );
}

function FlightsContent() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {[
          { code: "DXB", city: "Dubai", status: "Suspended", color: "red" },
          { code: "AUH", city: "Abu Dhabi", status: "Suspended", color: "red" },
          { code: "SHJ", city: "Sharjah", status: "Suspended", color: "red" },
          { code: "UAE Airspace", city: "", status: "Civilian closed", color: "yellow" },
        ].map((a) => (
          <div key={a.code} className={`rounded-lg p-3 border ${
            a.color === "red"
              ? "bg-red-500/5 border-red-500/15 dark:bg-red-500/5"
              : "bg-yellow-500/5 border-yellow-500/15"
          }`}>
            <p className={`text-[10px] font-semibold uppercase tracking-wide ${
              a.color === "red" ? "text-red-600 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"
            }`}>
              {a.code}{a.city ? ` — ${a.city}` : ""}
            </p>
            <p className="text-sm font-medium mt-0.5 text-[var(--foreground)]">{a.status}</p>
          </div>
        ))}
      </div>
      <Card className="p-4 space-y-2">
        <SectionLabel color="green">Alternative Routes</SectionLabel>
        {[
          { dest: "Muscat, Oman", note: "Land border open, flights operating (~2hr from Dubai)" },
          { dest: "Jeddah / Riyadh, KSA", note: "Limited flights, book early" },
        ].map((r) => (
          <p key={r.dest} className="text-sm">
            <span className="font-medium text-[var(--foreground)]">{r.dest}</span>
            <span className="text-[var(--muted)]"> — {r.note}</span>
          </p>
        ))}
      </Card>
      <p className="text-[11px] text-[var(--muted)]">Qatar, Bahrain, Kuwait airspace also closed to civilian traffic.</p>
      <FlightBoard />
    </>
  );
}

function MarketsContent() {
  return (
    <Card className="p-4 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <StatBox value="Closed" label="Stock exchanges" color="red" />
        <StatBox value="$74+" label="Oil (Brent)" color="yellow" />
        <StatBox value="Closed" label="Strait of Hormuz" color="red" />
        <StatBox value="Limited" label="Banks" color="yellow" />
      </div>
      <div className="bg-[var(--muted-bg)] rounded-md p-3">
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          <strong>Tip:</strong>{" "}
          <span className="text-[var(--muted)]">ATMs are working but expect queues. Withdraw cash for essential purchases. Keep AED 500–1000 on hand.</span>
        </p>
      </div>
    </Card>
  );
}

function EmergencyContent() {
  return (
    <>
      <Card className="p-4 space-y-3">
        <SectionLabel>UAE Numbers</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {EMERGENCY_CONTACTS.uae.map((c) => (
            <a key={c.number} href={`tel:${c.number}`}
              className="flex justify-between items-center bg-[var(--muted-bg)] rounded-md px-3.5 py-2.5 hover:bg-[var(--surface)] transition-colors">
              <span className="text-sm text-[var(--foreground)]">{c.label}</span>
              <span className="text-base font-bold text-[var(--accent)] font-mono">{c.number}</span>
            </a>
          ))}
        </div>
      </Card>
      <Card className="p-4 space-y-3">
        <SectionLabel>Embassies — Abu Dhabi</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {EMERGENCY_CONTACTS.embassies.map((e) => (
            <a key={e.phone} href={`tel:${e.phone}`}
              className="flex justify-between items-center bg-[var(--muted-bg)] rounded-md px-3.5 py-2.5 hover:bg-[var(--surface)] transition-colors gap-3">
              <span className="text-sm text-[var(--foreground)] whitespace-nowrap">{e.country}</span>
              <span className="text-xs font-mono text-[var(--muted)]">{e.phone}</span>
            </a>
          ))}
        </div>
      </Card>
    </>
  );
}

function ShelterContent() {
  const steps = [
    "Move to an interior room with no windows",
    "Stay away from glass, mirrors, and exterior walls",
    "If in a high-rise: go to lower floors or interior stairwell",
    "If outside: enter the nearest solid building immediately",
    "If driving: pull over safely, stay low in the car",
    "Do not touch debris or shrapnel — may be hazardous",
  ];
  return (
    <>
      <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-4">
        <SectionLabel color="red">Immediate Steps</SectionLabel>
        <ol className="space-y-2.5">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex-shrink-0 text-[var(--muted)] font-mono text-[11px] w-4 pt-px">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[var(--foreground)]">{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <SectionLabel color="green">Best Locations</SectionLabel>
            <ul className="space-y-1.5 text-sm">
              {["Bathroom (interior)", "Interior hallway", "Stairwell (interior)", "Underground parking", "Ground floor interior"].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400 flex-shrink-0">+</span>
                  <span className="text-[var(--foreground)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel color="red">Avoid</SectionLabel>
            <ul className="space-y-1.5 text-sm">
              {["Windows / glass doors", "Balconies", "Exterior walls", "Top floors", "Open areas / outdoors"].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400 flex-shrink-0">−</span>
                  <span className="text-[var(--foreground)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

function SuppliesContent() {
  const essentials = [
    "Water — 4L per person per day, 3+ day supply",
    "Non-perishable food (canned, dried, energy bars)",
    "Flashlight + extra batteries",
    "Phone chargers + power bank (fully charged)",
    "Cash — AED 500–1000 (ATMs may go down)",
    "First aid kit",
    "Medications — 1 week minimum supply",
    "Whistle (to signal for help if trapped)",
    "Dust masks or cloth face coverings",
  ];
  const documents = [
    "Passport (keep accessible, not in luggage)",
    "Emirates ID",
    "Insurance papers / policy numbers",
    "Emergency contacts list (printed — phones die)",
    "Copies of visa / residence permit",
  ];
  return (
    <Card className="p-4 space-y-5">
      <div>
        <SectionLabel color="green">Essential Supplies</SectionLabel>
        <div className="space-y-0.5">
          {essentials.map((item, i) => (
            <label key={i} className="flex gap-3 items-start checklist-item cursor-pointer hover:bg-[var(--muted-bg)] rounded-md px-2.5 py-2 transition-colors">
              <input type="checkbox" className="mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[var(--foreground)]">{item}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <SectionLabel color="blue">Important Documents</SectionLabel>
        <div className="space-y-0.5">
          {documents.map((item, i) => (
            <label key={i} className="flex gap-3 items-start checklist-item cursor-pointer hover:bg-[var(--muted-bg)] rounded-md px-2.5 py-2 transition-colors">
              <input type="checkbox" className="mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[var(--foreground)]">{item}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="bg-[var(--muted-bg)] rounded-md p-3">
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          <strong>Keep a grab bag near the door</strong>{" "}
          <span className="text-[var(--muted)]">with passport, charger, water, cash, and medications.</span>
        </p>
      </div>
    </Card>
  );
}

function ExitContent() {
  return (
    <Card className="p-4 space-y-4">
      <div>
        <SectionLabel color="green">Land Routes</SectionLabel>
        <div className="space-y-1.5">
          <div className="bg-green-500/5 border border-green-500/15 rounded-md p-3">
            <p className="text-sm font-medium text-[var(--foreground)]">Oman via Hatta Border</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">~2hr from Dubai — Border OPEN — Most reliable option</p>
          </div>
          <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-md p-3">
            <p className="text-sm font-medium text-[var(--foreground)]">Saudi Arabia via Abu Samra</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">Check current status — May require visa — Longer route</p>
          </div>
        </div>
      </div>
      <div>
        <SectionLabel color="blue">Flights from Neighbors</SectionLabel>
        <div className="space-y-1.5">
          {[
            { dest: "Muscat, Oman (MCT)", note: "Emirates / Oman Air operating — Book ASAP — Prices elevated" },
            { dest: "Jeddah / Riyadh, Saudi", note: "Limited availability — Saudia operating reduced schedule" },
          ].map((r) => (
            <div key={r.dest} className="bg-[var(--muted-bg)] rounded-md p-3">
              <p className="text-sm font-medium text-[var(--foreground)]">{r.dest}</p>
              <p className="text-xs text-[var(--muted)] mt-0.5">{r.note}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-500/5 border border-blue-500/15 rounded-md p-3">
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          <strong>Embassy evacuation:</strong>{" "}
          <span className="text-[var(--muted)]">Contact your embassy if you cannot arrange travel independently. Many embassies are organizing group evacuations.</span>
        </p>
      </div>
    </Card>
  );
}

function InformedContent() {
  return (
    <Card className="p-4 space-y-4">
      <div>
        <SectionLabel color="green">Official Sources</SectionLabel>
        <ul className="space-y-2 text-sm">
          {[
            { name: "NCEMA", handle: "@NCABORHAP_NCEMA (X / Twitter)" },
            { name: "Dubai Media Office", handle: "@DXBMediaOffice" },
            { name: "WAM", handle: "Emirates News Agency (wam.ae)" },
            { name: "Your embassy", handle: "Country-specific travel advisories" },
          ].map((s) => (
            <li key={s.name} className="flex gap-2.5">
              <span className="text-green-600 dark:text-green-400 flex-shrink-0">+</span>
              <span className="text-[var(--foreground)]">
                <strong>{s.name}</strong>{" "}
                <span className="text-[var(--muted)]">— {s.handle}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SectionLabel color="red">Avoid</SectionLabel>
        <BulletList accent="red" items={[
          "Unverified social media accounts",
          "Forwarded WhatsApp messages",
          "Sensationalist / clickbait accounts",
          "Breaking news from unknown sources",
        ]} />
      </div>
      <div className="bg-[var(--muted-bg)] rounded-md p-3">
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          <strong>Mobile and internet are working normally.</strong>{" "}
          <span className="text-[var(--muted)]">Enable NCEMA push notifications. Keep your phone charged at all times.</span>
        </p>
      </div>
    </Card>
  );
}

// ── All sections in order ────────────────────────────────
const ALL_SECTIONS = [
  { id: "overview",       title: "Overview",            content: <OverviewContent /> },
  { id: "attacks",        title: "Recent Attacks",       content: <AttacksContent /> },
  { id: "iran-position",  title: "Iran's Position",      content: <IranContent /> },
  { id: "uae-response",   title: "UAE Response",         content: <UAEContent /> },
  { id: "casualties",     title: "Casualties & Damage",  content: <CasualtiesContent /> },
  { id: "history",        title: "Background",           content: <HistoryContent /> },
  { id: "flights",        title: "Flights & Airspace",   content: <FlightsContent /> },
  { id: "markets",        title: "Markets & Economy",    content: <MarketsContent /> },
  { id: "emergency",      title: "Emergency Contacts",   content: <EmergencyContent /> },
  { id: "shelter",        title: "During an Alert",      content: <ShelterContent /> },
  { id: "supplies",       title: "Supplies Checklist",   content: <SuppliesContent /> },
  { id: "exit",           title: "Exit Options",         content: <ExitContent /> },
  { id: "informed",       title: "Stay Informed",        content: <InformedContent /> },
] as const;

// ── Main Page ────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const { theme, toggle: toggleTheme } = useTheme();

  const navigateTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-10% 0px -80% 0px" }
    );
    ALL_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ReadingProgress />
      <Sidebar activeSection={activeSection} onNavigate={navigateTo} theme={theme} onToggleTheme={toggleTheme} />
      <MobileTopBar activeSection={activeSection} onNavigate={navigateTo} theme={theme} onToggleTheme={toggleTheme} />

      <main className="lg:ml-56 pt-[88px] lg:pt-0 pb-20 px-4 sm:px-6 lg:px-12 max-w-3xl">

        {/* Hero */}
        <div className="py-8 lg:py-12 border-b border-[var(--card-border)] mb-10">
          <div className="flex items-center gap-2 mb-4">
            <StatusPill status="red" label="Live Updates" />
            <span className="text-xs text-[var(--muted)]">Mar 4, 2026 — 02:00 GMT+4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-balance text-[var(--foreground)]">
            Iran–UAE Conflict
          </h1>
          <p className="text-lg text-[var(--muted)] mt-1 font-normal tracking-tight">
            What You Need to Know
          </p>
          <p className="text-sm text-[var(--muted)] mt-3 max-w-lg leading-relaxed">
            Emergency contacts, shelter guidance, flight status, and exit options for UAE residents during the current crisis.
          </p>

          {/* Quick action pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {[
              { id: "emergency", label: "Emergency Contacts", accent: true },
              { id: "shelter",   label: "Shelter Guide" },
              { id: "exit",      label: "Exit Options" },
              { id: "flights",   label: "Flights" },
            ].map((a) => (
              <button
                key={a.id}
                onClick={() => navigateTo(a.id)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  a.accent
                    ? "bg-[var(--accent)]/10 border-[var(--accent)]/25 text-[var(--accent)] hover:bg-[var(--accent)]/15"
                    : "border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--muted)]"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {/* Situation group */}
          <div>
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-6">The Situation</p>
            <div className="space-y-8">
              {ALL_SECTIONS.slice(0, 6).map((s, i, arr) => (
                <CollapsibleSection
                  key={s.id}
                  id={s.id}
                  title={s.title}
                  nextSection={i < arr.length - 1 ? { id: arr[i + 1].id, shortTitle: SECTIONS_META.find(m => m.id === arr[i + 1].id)?.shortTitle ?? arr[i + 1].title } : undefined}
                  onNavigate={navigateTo}
                >
                  {s.content}
                </CollapsibleSection>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--card-border)]" />

          {/* Practical group */}
          <div>
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-6">Practical Guide</p>
            <div className="space-y-8">
              {ALL_SECTIONS.slice(6).map((s, i, arr) => (
                <CollapsibleSection
                  key={s.id}
                  id={s.id}
                  title={s.title}
                  nextSection={i < arr.length - 1 ? { id: arr[i + 1].id, shortTitle: SECTIONS_META.find(m => m.id === arr[i + 1].id)?.shortTitle ?? arr[i + 1].title } : undefined}
                  onNavigate={navigateTo}
                >
                  {s.content}
                </CollapsibleSection>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-14 pt-6 border-t border-[var(--card-border)] space-y-1">
          <p className="text-xs text-[var(--muted)]">For informational purposes only. Always follow official UAE government guidance.</p>
          <p className="text-xs text-[var(--muted)]">Last updated: March 4, 2026, 02:00 GMT+4</p>
        </footer>
      </main>
    </>
  );
}

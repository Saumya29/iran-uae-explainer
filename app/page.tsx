"use client";

import { useState, useEffect, useRef } from "react";
import { SECTIONS_META, EMERGENCY_CONTACTS } from "./data/sections";
import FlightBoard from "./components/FlightBoard";

// ─── Types ──────────────────────────────────────────────
type SectionMeta = (typeof SECTIONS_META)[number];

// ─── Sidebar ────────────────────────────────────────────
function Sidebar({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  const situationSections = SECTIONS_META.filter((s) => s.category === "situation");
  const practicalSections = SECTIONS_META.filter((s) => s.category === "practical");

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-56 border-r border-[var(--card-border)] z-40 overflow-y-auto hide-scrollbar bg-[var(--background)]">
      {/* Logo / Brand */}
      <div className="px-5 pt-7 pb-6 border-b border-[var(--card-border)]">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse flex-shrink-0" />
          <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest">
            Live
          </span>
        </div>
        <h1 className="text-sm font-semibold text-[var(--foreground)] mt-1.5 leading-snug">
          Iran–UAE Conflict
        </h1>
        <p className="text-[11px] text-[var(--muted)] mt-0.5">
          Mar 4, 2026 · 02:00 GMT+4
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col px-3 py-4 gap-0.5 flex-1">
        <NavGroup
          label="Situation"
          sections={situationSections}
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
        <div className="mt-3">
          <NavGroup
            label="Practical Guide"
            sections={practicalSections}
            activeSection={activeSection}
            onNavigate={onNavigate}
          />
        </div>
      </nav>

      {/* Emergency CTA */}
      <div className="px-3 pb-5">
        <button
          onClick={() => {
            const el = document.getElementById("emergency");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-semibold hover:bg-[var(--accent)]/15 transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9A16 16 0 0 0 15 16.09l1.09-1.09a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
        return (
          <button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            className={`w-full text-left px-2 py-[7px] rounded-md text-[13px] transition-all duration-150 flex items-center gap-2 group ${
              isActive
                ? "bg-[var(--nav-active-bg)] text-[var(--foreground)] font-medium"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)]"
            }`}
          >
            {isActive && (
              <span className="w-0.5 h-3.5 rounded-full bg-[var(--accent)] flex-shrink-0 -ml-px" />
            )}
            <span className={isActive ? "" : "ml-1.5"}>{s.shortTitle}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Mobile Top Bar ──────────────────────────────────────
function MobileTopBar({
  activeSection,
  onNavigate,
  onEmergency,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
  onEmergency: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeEl = scrollRef.current.querySelector("[data-active='true']") as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeSection]);

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/95 backdrop-blur-lg border-b border-[var(--card-border)]">
      {/* Title row */}
      <div className="flex items-center justify-between px-4 h-11 border-b border-[var(--card-border)]/50">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-[13px] font-semibold">Iran–UAE Conflict</span>
        </div>
        <button
          onClick={onEmergency}
          className="flex items-center gap-1.5 text-[var(--accent)] text-xs font-semibold px-2.5 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8"
          aria-label="Emergency contacts"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9A16 16 0 0 0 15 16.09l1.09-1.09a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          SOS
        </button>
      </div>

      {/* Scrollable section tabs */}
      <div
        ref={scrollRef}
        className="flex gap-0 overflow-x-auto hide-scrollbar px-3 h-10 items-center"
      >
        {SECTIONS_META.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              data-active={isActive}
              onClick={() => onNavigate(s.id)}
              className={`flex-shrink-0 px-3 h-full text-[12px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-[var(--accent)] text-[var(--foreground)]"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {s.shortTitle}
            </button>
          );
        })}
      </div>
    </header>
  );
}

// ─── Emergency Modal ─────────────────────────────────────
function EmergencyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[var(--accent)] rounded-t-xl px-5 py-3.5 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wide">
            Emergency Contacts
          </h2>
          <button onClick={onClose} className="text-white/70 hover:text-white text-xl leading-none" aria-label="Close">
            ×
          </button>
        </div>
        <div className="p-4 space-y-5">
          <div>
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2.5">
              UAE Emergency Numbers
            </p>
            <div className="grid grid-cols-1 gap-1">
              {EMERGENCY_CONTACTS.uae.map((c) => (
                <a
                  key={c.number}
                  href={`tel:${c.number}`}
                  className="flex justify-between items-center bg-[var(--muted-bg)] rounded-lg px-4 py-2.5 hover:bg-[var(--surface)] transition-colors"
                >
                  <span className="text-sm text-[var(--foreground)]">{c.label}</span>
                  <span className="text-base font-bold text-[var(--accent)] font-mono">{c.number}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-2.5">
              Embassies — Abu Dhabi
            </p>
            <div className="grid grid-cols-1 gap-1">
              {EMERGENCY_CONTACTS.embassies.map((e) => (
                <a
                  key={e.phone}
                  href={`tel:${e.phone}`}
                  className="flex justify-between items-center bg-[var(--muted-bg)] rounded-lg px-4 py-2.5 hover:bg-[var(--surface)] transition-colors gap-4"
                >
                  <span className="text-sm">{e.country}</span>
                  <span className="text-xs font-mono text-[var(--muted)]">{e.phone}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared primitives ───────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[var(--card)] border border-[var(--card-border)] rounded-lg ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 className="text-base font-semibold tracking-tight text-[var(--foreground)] mb-3" id={id}>
      {children}
    </h2>
  );
}

function StatusPill({ status, label }: { status: "red" | "yellow" | "green"; label: string }) {
  const styles = {
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
  };
  const dotStyles = { red: "bg-red-400", yellow: "bg-yellow-400", green: "bg-green-400" };
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
    red: "text-red-400", yellow: "text-yellow-400", orange: "text-orange-400",
    blue: "text-blue-400", foreground: "text-[var(--foreground)]",
  }[color];
  return (
    <div className="bg-[var(--muted-bg)] rounded-lg p-3.5">
      <p className={`text-xl font-bold ${valueColor}`}>{value}</p>
      <p className="text-[11px] text-[var(--muted)] mt-0.5">{label}</p>
    </div>
  );
}

function BulletList({ items, accent = "muted" }: { items: string[]; accent?: "red" | "green" | "muted" }) {
  const dotColor = { red: "text-red-400", green: "text-green-400", muted: "text-[var(--muted)]" }[accent];
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
          <span className={`${dotColor} mt-px flex-shrink-0 select-none`}>—</span>
          <span className="text-[var(--foreground)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Section Components ──────────────────────────────────

function OverviewSection() {
  return (
    <section id="overview" className="space-y-3">
      <SectionHeading>Overview</SectionHeading>
      <Card className="p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          <StatusPill status="red" label="Active Conflict" />
          <StatusPill status="red" label="Airspace Closed" />
          <StatusPill status="yellow" label="Markets Disrupted" />
        </div>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          Iran launched missile and drone strikes against UAE targets starting February 28, 2026.
          The UAE, backed by US CENTCOM, has responded with defensive intercepts and retaliatory strikes.
          This is the most significant military escalation in the Gulf since the 1980s Iran-Iraq War.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Conflict started", value: "Feb 28, 2026" },
            { label: "Status", value: "Active", red: true },
            { label: "Ceasefire", value: "None declared", yellow: true },
            { label: "US involvement", value: "Active (CENTCOM)" },
          ].map((item) => (
            <div key={item.label} className="bg-[var(--muted-bg)] rounded-md p-3">
              <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">{item.label}</p>
              <p className={`text-sm font-medium mt-0.5 ${"red" in item && item.red ? "text-red-400" : "yellow" in item && item.yellow ? "text-yellow-400" : ""}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function AttacksSection() {
  const events = [
    { date: "Mar 3, 2026", severity: "red" as const, event: "Second wave of Iranian ballistic missiles targets Abu Dhabi and Dubai. THAAD and Patriot intercept majority. Some impacts reported near Jebel Ali." },
    { date: "Mar 1, 2026", severity: "red" as const, event: "Iran launches Shahed drones toward UAE oil infrastructure. Most intercepted. Minor damage to Fujairah oil terminal." },
    { date: "Feb 28, 2026", severity: "red" as const, event: "Initial Iranian missile barrage hits Al Dhafra Air Base and civilian areas near Abu Dhabi. Multiple casualties. UAE declares state of emergency." },
    { date: "Feb 28, 2026", severity: "yellow" as const, event: "UAE activates NCEMA emergency protocols. All schools closed, work-from-home ordered for non-essential sectors." },
  ];
  return (
    <section id="attacks" className="space-y-3">
      <SectionHeading>Recent Attacks</SectionHeading>
      <div className="space-y-1.5">
        {events.map((item, i) => (
          <Card key={i} className="p-4">
            <div className="flex gap-3">
              <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${item.severity === "red" ? "bg-red-500" : "bg-yellow-500"}`} />
              <div>
                <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wide mb-1">{item.date}</p>
                <p className="text-sm leading-relaxed">{item.event}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function IranSection() {
  return (
    <section id="iran-position" className="space-y-3">
      <SectionHeading>{"Iran's"} Position</SectionHeading>
      <Card className="p-4 space-y-3">
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          Iran claims strikes are in response to UAE hosting US military bases used against Iranian interests.
          Tehran describes the attacks as defensive and warns of further escalation.
        </p>
        <BulletList accent="red" items={[
          "Demands UAE expel US military presence",
          "Claims right to self-defense under UN Charter",
          "Strait of Hormuz closed to 'hostile shipping'",
          "Houthi allies launching concurrent attacks on Saudi Arabia",
        ]} />
      </Card>
    </section>
  );
}

function UAESection() {
  return (
    <section id="uae-response" className="space-y-3">
      <SectionHeading>UAE Response</SectionHeading>
      <Card className="p-4 space-y-3">
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          The UAE has activated full civil defense protocols and is coordinating closely with US CENTCOM.
          President Sheikh Mohamed has addressed the nation, calling for calm and resilience.
        </p>
        <BulletList accent="green" items={[
          "THAAD and Patriot missile defense systems active",
          "State of emergency declared nationwide",
          "Schools and non-essential businesses closed",
          "Free emergency supplies at civil defense centers",
          "UN Security Council emergency session requested",
        ]} />
      </Card>
    </section>
  );
}

function CasualtiesSection() {
  return (
    <section id="casualties" className="space-y-3">
      <SectionHeading>Casualties &amp; Damage</SectionHeading>
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
    </section>
  );
}

function HistorySection() {
  return (
    <section id="history" className="space-y-3">
      <SectionHeading>Background</SectionHeading>
      <Card className="p-4 space-y-2.5 text-sm text-[var(--muted)] leading-relaxed">
        <p>Tensions driven by the UAE&apos;s strategic alliance with the US and its hosting of Al Dhafra Air Base — the largest US military installation in the region.</p>
        <p>The trigger appears connected to escalating US-Iran tensions over Iran&apos;s nuclear program and the collapse of diplomatic talks in January 2026.</p>
        <p>This follows the 2022 Houthi attacks on Abu Dhabi. The closure of the Strait of Hormuz marks a significant escalation affecting global energy markets.</p>
      </Card>
    </section>
  );
}

function FlightsSection() {
  return (
    <section id="flights" className="space-y-3">
      <SectionHeading>Flights &amp; Airspace</SectionHeading>
      <div className="grid grid-cols-2 gap-2">
        {[
          { code: "DXB", city: "Dubai", status: "Suspended", color: "red" },
          { code: "AUH", city: "Abu Dhabi", status: "Suspended", color: "red" },
          { code: "SHJ", city: "Sharjah", status: "Suspended", color: "red" },
          { code: "UAE Airspace", city: "", status: "Civilian closed", color: "yellow" },
        ].map((a) => (
          <div key={a.code} className={`rounded-lg p-3 border ${a.color === "red" ? "bg-red-500/5 border-red-500/15" : "bg-yellow-500/5 border-yellow-500/15"}`}>
            <p className={`text-[10px] font-semibold uppercase tracking-wide ${a.color === "red" ? "text-red-400" : "text-yellow-400"}`}>
              {a.code}{a.city ? ` — ${a.city}` : ""}
            </p>
            <p className="text-sm font-medium mt-0.5">{a.status}</p>
          </div>
        ))}
      </div>
      <Card className="p-4 space-y-2">
        <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest">Alternative Routes</p>
        {[
          { dest: "Muscat, Oman", note: "Land border open, flights operating (~2hr from Dubai)" },
          { dest: "Jeddah / Riyadh, KSA", note: "Limited flights, book early" },
        ].map((r) => (
          <p key={r.dest} className="text-sm">
            <span className="font-medium">{r.dest}</span>
            <span className="text-[var(--muted)]"> — {r.note}</span>
          </p>
        ))}
        <p className="text-[11px] text-[var(--muted)] pt-1">Qatar, Bahrain, Kuwait airspace also closed to civilian traffic.</p>
      </Card>
      <FlightBoard />
    </section>
  );
}

function MarketsSection() {
  return (
    <section id="markets" className="space-y-3">
      <SectionHeading>Markets &amp; Economy</SectionHeading>
      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <StatBox value="Closed" label="Stock exchanges" color="red" />
          <StatBox value="$74+" label="Oil (Brent)" color="yellow" />
          <StatBox value="Closed" label="Strait of Hormuz" color="red" />
          <StatBox value="Limited" label="Banks" color="yellow" />
        </div>
        <div className="bg-[var(--muted-bg)] rounded-md p-3">
          <p className="text-sm leading-relaxed">
            <strong>Tip:</strong>{" "}
            <span className="text-[var(--muted)]">ATMs are working but expect queues. Withdraw cash for essential purchases. Keep AED 500–1000 on hand.</span>
          </p>
        </div>
      </Card>
    </section>
  );
}

function EmergencySection() {
  return (
    <section id="emergency" className="space-y-3">
      <SectionHeading>Emergency Contacts</SectionHeading>
      <Card className="p-4 space-y-3">
        <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest">UAE Numbers</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {EMERGENCY_CONTACTS.uae.map((c) => (
            <a key={c.number} href={`tel:${c.number}`}
              className="flex justify-between items-center bg-[var(--muted-bg)] rounded-md px-3.5 py-2.5 hover:bg-[var(--surface)] transition-colors">
              <span className="text-sm">{c.label}</span>
              <span className="text-base font-bold text-[var(--accent)] font-mono">{c.number}</span>
            </a>
          ))}
        </div>
      </Card>
      <Card className="p-4 space-y-3">
        <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest">Embassies — Abu Dhabi</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {EMERGENCY_CONTACTS.embassies.map((e) => (
            <a key={e.phone} href={`tel:${e.phone}`}
              className="flex justify-between items-center bg-[var(--muted-bg)] rounded-md px-3.5 py-2.5 hover:bg-[var(--surface)] transition-colors gap-3">
              <span className="text-sm whitespace-nowrap">{e.country}</span>
              <span className="text-xs font-mono text-[var(--muted)]">{e.phone}</span>
            </a>
          ))}
        </div>
      </Card>
    </section>
  );
}

function ShelterSection() {
  const steps = [
    "Move to an interior room with no windows",
    "Stay away from glass, mirrors, and exterior walls",
    "If in a high-rise: go to lower floors or interior stairwell",
    "If outside: enter the nearest solid building immediately",
    "If driving: pull over safely, stay low in the car",
    "Do not touch debris or shrapnel — may be hazardous",
  ];
  return (
    <section id="shelter" className="space-y-3">
      <SectionHeading>During an Alert</SectionHeading>
      <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-4">
        <p className="text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-3">Immediate Steps</p>
        <ol className="space-y-2.5">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex-shrink-0 text-[var(--muted)] font-mono text-[11px] w-4 pt-px">{String(i + 1).padStart(2, "0")}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest mb-2">Best Locations</p>
            <ul className="space-y-1.5 text-sm text-[var(--muted)]">
              {["Bathroom (interior)", "Interior hallway", "Stairwell (interior)", "Underground parking", "Ground floor interior"].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-green-400 flex-shrink-0">+</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-2">Avoid</p>
            <ul className="space-y-1.5 text-sm text-[var(--muted)]">
              {["Windows / glass doors", "Balconies", "Exterior walls", "Top floors", "Open areas / outdoors"].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-red-400 flex-shrink-0">−</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}

function SuppliesSection() {
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
    <section id="supplies" className="space-y-3">
      <SectionHeading>Supplies Checklist</SectionHeading>
      <Card className="p-4 space-y-5">
        <div>
          <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest mb-2.5">Essential Supplies</p>
          <div className="space-y-0.5">
            {essentials.map((item, i) => (
              <label key={i} className="flex gap-3 items-start checklist-item cursor-pointer hover:bg-[var(--muted-bg)] rounded-md px-2.5 py-2 transition-colors">
                <input type="checkbox" className="mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-2.5">Important Documents</p>
          <div className="space-y-0.5">
            {documents.map((item, i) => (
              <label key={i} className="flex gap-3 items-start checklist-item cursor-pointer hover:bg-[var(--muted-bg)] rounded-md px-2.5 py-2 transition-colors">
                <input type="checkbox" className="mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="bg-[var(--muted-bg)] rounded-md p-3">
          <p className="text-sm leading-relaxed">
            <strong>Keep a grab bag near the door</strong>{" "}
            <span className="text-[var(--muted)]">with passport, charger, water, cash, and medications.</span>
          </p>
        </div>
      </Card>
    </section>
  );
}

function ExitSection() {
  return (
    <section id="exit" className="space-y-3">
      <SectionHeading>Exit Options</SectionHeading>
      <Card className="p-4 space-y-4">
        <div>
          <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest mb-2.5">Land Routes</p>
          <div className="space-y-1.5">
            <div className="bg-green-500/5 border border-green-500/15 rounded-md p-3">
              <p className="text-sm font-medium">Oman via Hatta Border</p>
              <p className="text-xs text-[var(--muted)] mt-0.5">~2hr from Dubai — Border OPEN — Most reliable option</p>
            </div>
            <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-md p-3">
              <p className="text-sm font-medium">Saudi Arabia via Abu Samra</p>
              <p className="text-xs text-[var(--muted)] mt-0.5">Check current status — May require visa — Longer route</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-2.5">Flights from Neighbors</p>
          <div className="space-y-1.5">
            <div className="bg-[var(--muted-bg)] rounded-md p-3">
              <p className="text-sm font-medium">Muscat, Oman (MCT)</p>
              <p className="text-xs text-[var(--muted)] mt-0.5">Emirates / Oman Air operating — Book ASAP — Prices elevated</p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-md p-3">
              <p className="text-sm font-medium">Jeddah / Riyadh, Saudi</p>
              <p className="text-xs text-[var(--muted)] mt-0.5">Limited availability — Saudia operating reduced schedule</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/15 rounded-md p-3">
          <p className="text-sm leading-relaxed">
            <strong>Embassy evacuation:</strong>{" "}
            <span className="text-[var(--muted)]">Contact your embassy if you cannot arrange travel independently. Many embassies are organizing group evacuations.</span>
          </p>
        </div>
      </Card>
    </section>
  );
}

function InformedSection() {
  return (
    <section id="informed" className="space-y-3">
      <SectionHeading>Stay Informed</SectionHeading>
      <Card className="p-4 space-y-4">
        <div>
          <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest mb-2.5">Official Sources</p>
          <ul className="space-y-2 text-sm">
            {[
              { name: "NCEMA", handle: "@NCABORHAP_NCEMA (X / Twitter)" },
              { name: "Dubai Media Office", handle: "@DXBMediaOffice" },
              { name: "WAM", handle: "Emirates News Agency (wam.ae)" },
              { name: "Your embassy", handle: "Country-specific travel advisories" },
            ].map((s) => (
              <li key={s.name} className="flex gap-2.5">
                <span className="text-green-400 flex-shrink-0">+</span>
                <span><strong>{s.name}</strong> <span className="text-[var(--muted)]">— {s.handle}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-2.5">Avoid</p>
          <BulletList accent="red" items={[
            "Unverified social media accounts",
            "Forwarded WhatsApp messages",
            "Sensationalist / clickbait accounts",
            "Breaking news from unknown sources",
          ]} />
        </div>
        <div className="bg-[var(--muted-bg)] rounded-md p-3">
          <p className="text-sm leading-relaxed">
            <strong>Mobile and internet are working normally.</strong>{" "}
            <span className="text-[var(--muted)]">Enable NCEMA push notifications. Keep your phone charged at all times.</span>
          </p>
        </div>
      </Card>
    </section>
  );
}

// ─── Main Page ───────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [showEmergency, setShowEmergency] = useState(false);

  const navigateTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0px -75% 0px" }
    );
    SECTIONS_META.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Sidebar activeSection={activeSection} onNavigate={navigateTo} />
      <MobileTopBar activeSection={activeSection} onNavigate={navigateTo} onEmergency={() => setShowEmergency(true)} />

      {/* Main Content */}
      <main className="lg:ml-56 pt-[84px] lg:pt-0 pb-16 px-4 sm:px-6 lg:px-12 max-w-3xl">

        {/* Hero */}
        <div className="py-8 lg:py-12 border-b border-[var(--card-border)] mb-10">
          <div className="flex items-center gap-2 mb-4">
            <StatusPill status="red" label="Live Updates" />
            <span className="text-xs text-[var(--muted)]">Mar 4, 2026 — 02:00 GMT+4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-balance">
            Iran–UAE Conflict
          </h1>
          <p className="text-lg text-[var(--muted)] mt-0.5 font-normal tracking-tight">
            What You Need to Know
          </p>
          <p className="text-sm text-[var(--muted)] mt-3 max-w-lg leading-relaxed">
            Emergency contacts, shelter guidance, flight status, and exit options for UAE residents during the current crisis.
          </p>

          {/* Quick action row */}
          <div className="flex flex-wrap gap-2 mt-5">
            {[
              { id: "emergency", label: "Emergency Contacts", accent: true },
              { id: "shelter", label: "Shelter Guide" },
              { id: "exit", label: "Exit Options" },
              { id: "flights", label: "Flights" },
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
          {/* Category divider */}
          <div>
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-6">The Situation</p>
            <div className="space-y-8">
              <OverviewSection />
              <AttacksSection />
              <IranSection />
              <UAESection />
              <CasualtiesSection />
              <HistorySection />
            </div>
          </div>

          <div className="border-t border-[var(--card-border)]" />

          <div>
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-6">Practical Guide</p>
            <div className="space-y-8">
              <FlightsSection />
              <MarketsSection />
              <EmergencySection />
              <ShelterSection />
              <SuppliesSection />
              <ExitSection />
              <InformedSection />
            </div>
          </div>
        </div>

        <footer className="mt-14 pt-6 border-t border-[var(--card-border)] space-y-1">
          <p className="text-xs text-[var(--muted)]">For informational purposes only. Always follow official UAE government guidance.</p>
          <p className="text-xs text-[var(--muted)]">Last updated: March 4, 2026, 02:00 GMT+4</p>
        </footer>
      </main>

      {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} />}
    </>
  );
}

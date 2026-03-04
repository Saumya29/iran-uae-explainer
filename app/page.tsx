"use client";

import { useState, useEffect } from "react";
import { SECTIONS_META, EMERGENCY_CONTACTS } from "./data/sections";
import FlightBoard from "./components/FlightBoard";

// ─── Sidebar (desktop) ─────────────────────────────────
function Sidebar({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  const situationSections = SECTIONS_META.filter(
    (s) => s.category === "situation"
  );
  const practicalSections = SECTIONS_META.filter(
    (s) => s.category === "practical"
  );

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-52 border-r border-[var(--card-border)] py-8 px-5 z-40 hide-scrollbar overflow-y-auto bg-[var(--background)]">
      <div className="mb-8">
        <p className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-widest">
          Iran — UAE
        </p>
        <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
          Conflict Explainer
        </p>
      </div>

      <nav className="flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest px-1 mb-2">
          Situation
        </p>
        {situationSections.map((s) => (
          <button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            className={`text-left px-2 py-1.5 rounded text-[13px] transition-colors ${
              activeSection === s.id
                ? "text-[var(--foreground)] font-medium"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {s.shortTitle}
          </button>
        ))}

        <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest px-1 mt-5 mb-2">
          Practical
        </p>
        {practicalSections.map((s) => (
          <button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            className={`text-left px-2 py-1.5 rounded text-[13px] transition-colors ${
              activeSection === s.id
                ? "text-[var(--foreground)] font-medium"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {s.shortTitle}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4">
        <p className="text-[11px] text-[var(--muted)] leading-relaxed">
          Updated Mar 4, 2026
          <br />
          02:00 GMT+4
        </p>
      </div>
    </aside>
  );
}

// ─── Mobile Bottom Nav ──────────────────────────────────
function BottomNav({
  onNavigate,
  onEmergency,
}: {
  onNavigate: (id: string) => void;
  onEmergency: () => void;
}) {
  const quickLinks = [
    { id: "overview", label: "Info" },
    { id: "flights", label: "Flights" },
    { id: "emergency", label: "SOS", isEmergency: true },
    { id: "shelter", label: "Shelter" },
    { id: "exit", label: "Exit" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--background)]/95 backdrop-blur-lg border-t border-[var(--card-border)] z-50">
      <div className="flex justify-around items-center h-14 px-2">
        {quickLinks.map((link) => (
          <button
            key={link.id}
            onClick={() =>
              link.isEmergency ? onEmergency() : onNavigate(link.id)
            }
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded transition-colors text-[11px] font-medium ${
              link.isEmergency
                ? "text-[var(--accent)]"
                : "text-[var(--muted)] active:text-[var(--foreground)]"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Emergency Modal ────────────────────────────────────
function EmergencyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[var(--accent)] rounded-t-xl px-5 py-4 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
            Emergency Contacts
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div>
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-3">
              UAE Emergency Numbers
            </p>
            <div className="space-y-1">
              {EMERGENCY_CONTACTS.uae.map((c) => (
                <a
                  key={c.number}
                  href={`tel:${c.number}`}
                  className="flex justify-between items-center bg-[var(--muted-bg)] rounded-lg px-4 py-3 hover:bg-[var(--surface)] transition-colors"
                >
                  <span className="text-sm text-[var(--foreground)]">
                    {c.label}
                  </span>
                  <span className="text-base font-bold text-[var(--accent)] font-mono">
                    {c.number}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-3">
              Embassies — Abu Dhabi
            </p>
            <div className="space-y-1">
              {EMERGENCY_CONTACTS.embassies.map((e) => (
                <a
                  key={e.phone}
                  href={`tel:${e.phone}`}
                  className="flex justify-between items-center bg-[var(--muted-bg)] rounded-lg px-4 py-3 hover:bg-[var(--surface)] transition-colors gap-3"
                >
                  <span className="text-sm">{e.country}</span>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    {e.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Floating Emergency Button ──────────────────────────
function EmergencyFAB({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 bg-[var(--accent)] hover:bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg emergency-pulse transition-colors"
      aria-label="Emergency contacts"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9A16 16 0 0 0 15 16.09l1.09-1.09a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    </button>
  );
}

// ─── Card ───────────────────────────────────────────────
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-5 ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Section Heading ────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)] mb-4">
      {children}
    </h2>
  );
}

// ─── Status Pill ────────────────────────────────────────
function StatusPill({
  status,
  label,
}: {
  status: "red" | "yellow" | "green";
  label: string;
}) {
  const styles = {
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
  };
  const dotStyles = {
    red: "bg-red-400",
    yellow: "bg-yellow-400",
    green: "bg-green-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`} />
      {label}
    </span>
  );
}

// ─── Stat Box ───────────────────────────────────────────
function StatBox({
  value,
  label,
  color = "foreground",
}: {
  value: string;
  label: string;
  color?: "red" | "yellow" | "orange" | "blue" | "foreground";
}) {
  const valueColor = {
    red: "text-red-400",
    yellow: "text-yellow-400",
    orange: "text-orange-400",
    blue: "text-blue-400",
    foreground: "text-[var(--foreground)]",
  }[color];
  return (
    <div className="bg-[var(--muted-bg)] rounded-lg p-4 text-center">
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      <p className="text-xs text-[var(--muted)] mt-1">{label}</p>
    </div>
  );
}

// ─── Bullet List ────────────────────────────────────────
function BulletList({
  items,
  accent = "muted",
}: {
  items: string[];
  accent?: "red" | "green" | "muted";
}) {
  const dotColor = {
    red: "text-red-400",
    green: "text-green-400",
    muted: "text-[var(--muted)]",
  }[accent];
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
          <span className={`${dotColor} mt-px flex-shrink-0`}>—</span>
          <span className="text-[var(--foreground)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Section Content Components ─────────────────────────

function OverviewSection() {
  return (
    <section id="overview" className="space-y-4">
      <SectionHeading>Overview</SectionHeading>
      <Card>
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <StatusPill status="red" label="Active Conflict" />
            <StatusPill status="red" label="Airspace Closed" />
            <StatusPill status="yellow" label="Markets Disrupted" />
          </div>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Iran launched missile and drone strikes against UAE targets starting
            February 28, 2026. The UAE, backed by US CENTCOM, has responded with
            defensive intercepts and retaliatory strikes. This is the most
            significant military escalation in the Gulf since the 1980s Iran-Iraq
            War.
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-[11px] text-[var(--muted)] uppercase tracking-wide">Conflict started</p>
              <p className="text-sm font-medium mt-1">Feb 28, 2026</p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-[11px] text-[var(--muted)] uppercase tracking-wide">Status</p>
              <p className="text-sm font-medium text-red-400 mt-1">Active</p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-[11px] text-[var(--muted)] uppercase tracking-wide">Ceasefire</p>
              <p className="text-sm font-medium text-yellow-400 mt-1">None declared</p>
            </div>
            <div className="bg-[var(--muted-bg)] rounded-lg p-3">
              <p className="text-[11px] text-[var(--muted)] uppercase tracking-wide">US involvement</p>
              <p className="text-sm font-medium mt-1">Active (CENTCOM)</p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

function AttacksSection() {
  const events = [
    {
      date: "Mar 3, 2026",
      event:
        "Second wave of Iranian ballistic missiles targets Abu Dhabi and Dubai. THAAD and Patriot intercept majority. Some impacts reported near Jebel Ali.",
      severity: "red" as const,
    },
    {
      date: "Mar 1, 2026",
      event:
        "Iran launches Shahed drones toward UAE oil infrastructure. Most intercepted by UAE/US air defense. Minor damage to Fujairah oil terminal.",
      severity: "red" as const,
    },
    {
      date: "Feb 28, 2026",
      event:
        "Initial Iranian missile barrage hits Al Dhafra Air Base and civilian areas near Abu Dhabi. Multiple casualties confirmed. UAE declares state of emergency.",
      severity: "red" as const,
    },
    {
      date: "Feb 28, 2026",
      event:
        "UAE activates NCEMA emergency protocols. All schools closed, work-from-home ordered for non-essential sectors.",
      severity: "yellow" as const,
    },
  ];

  return (
    <section id="attacks" className="space-y-4">
      <SectionHeading>Recent Attacks</SectionHeading>
      <div className="space-y-2">
        {events.map((item, i) => (
          <Card key={i} className="!p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 pt-0.5">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    item.severity === "red" ? "bg-red-500" : "bg-yellow-500"
                  }`}
                />
              </div>
              <div>
                <p className="text-[11px] font-mono text-[var(--muted)] mb-1.5 uppercase tracking-wide">
                  {item.date}
                </p>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">{item.event}</p>
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
    <section id="iran-position" className="space-y-4">
      <SectionHeading>{"Iran's"} Position</SectionHeading>
      <Card>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Iran claims the strikes are in response to UAE hosting US military
            bases used for operations against Iranian interests. Tehran describes
            the attacks as defensive measures and warns of further escalation if
            the UAE continues to allow US forces to operate from its territory.
          </p>
          <BulletList
            accent="red"
            items={[
              "Demands UAE expel US military presence",
              "Claims right to self-defense under UN Charter",
              'Strait of Hormuz closed to "hostile shipping"',
              "Houthi allies launching concurrent attacks on Saudi Arabia",
            ]}
          />
        </div>
      </Card>
    </section>
  );
}

function UAESection() {
  return (
    <section id="uae-response" className="space-y-4">
      <SectionHeading>UAE Response</SectionHeading>
      <Card>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            The UAE has activated full civil defense protocols and is coordinating
            closely with US CENTCOM for air defense. President Sheikh Mohamed has
            addressed the nation, calling for calm and resilience.
          </p>
          <BulletList
            accent="green"
            items={[
              "THAAD and Patriot missile defense systems active",
              "State of emergency declared nationwide",
              "Schools and non-essential businesses closed",
              "Free emergency supplies distributed at civil defense centers",
              "UN Security Council emergency session requested",
            ]}
          />
        </div>
      </Card>
    </section>
  );
}

function CasualtiesSection() {
  return (
    <section id="casualties" className="space-y-4">
      <SectionHeading>Casualties &amp; Damage</SectionHeading>
      <Card>
        <div className="grid grid-cols-2 gap-3">
          <StatBox value="47+" label="Confirmed killed" color="red" />
          <StatBox value="200+" label="Injured" color="yellow" />
          <StatBox value="3" label="Infrastructure sites hit" color="orange" />
          <StatBox value="80%+" label="Missiles intercepted" color="blue" />
        </div>
        <p className="text-[11px] text-[var(--muted)] mt-4 leading-relaxed">
          Figures based on official UAE/NCEMA statements. Actual numbers may differ.
          Updated Mar 4, 2026.
        </p>
      </Card>
    </section>
  );
}

function HistorySection() {
  return (
    <section id="history" className="space-y-4">
      <SectionHeading>Background</SectionHeading>
      <Card>
        <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
          <p>
            Tensions between Iran and the UAE have been building for years, driven
            by the UAE&apos;s strategic alliance with the US and its hosting of Al
            Dhafra Air Base — the largest US military installation in the region.
          </p>
          <p>
            The immediate trigger appears connected to escalating US-Iran tensions
            over Iran&apos;s nuclear program and the collapse of diplomatic talks in
            January 2026. Iran views Gulf states hosting US forces as complicit in
            what it calls &ldquo;American aggression.&rdquo;
          </p>
          <p>
            This follows the 2022 Houthi attacks on Abu Dhabi and the broader
            regional proxy conflicts. The closure of the Strait of Hormuz marks a
            significant escalation affecting global energy markets.
          </p>
        </div>
      </Card>
    </section>
  );
}

function FlightsSection() {
  return (
    <section id="flights" className="space-y-4">
      <SectionHeading>Flights &amp; Airspace</SectionHeading>
      <Card>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { code: "DXB", city: "Dubai", status: "Suspended", color: "red" },
              { code: "AUH", city: "Abu Dhabi", status: "Suspended", color: "red" },
              { code: "SHJ", city: "Sharjah", status: "Suspended", color: "red" },
              { code: "UAE Airspace", city: "", status: "Civilian closed", color: "yellow" },
            ].map((airport) => (
              <div
                key={airport.code}
                className={`rounded-lg p-3.5 border ${
                  airport.color === "red"
                    ? "bg-red-500/5 border-red-500/15"
                    : "bg-yellow-500/5 border-yellow-500/15"
                }`}
              >
                <p className={`text-[11px] font-semibold uppercase tracking-wide ${
                  airport.color === "red" ? "text-red-400" : "text-yellow-400"
                }`}>
                  {airport.code}
                  {airport.city ? ` — ${airport.city}` : ""}
                </p>
                <p className="text-sm font-medium mt-1">{airport.status}</p>
              </div>
            ))}
          </div>

          <div className="bg-[var(--muted-bg)] rounded-lg p-4 space-y-2.5">
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-widest">
              Alternative Routes
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Muscat, Oman</span>
                <span className="text-[var(--muted)]"> — Land border open, flights operating (~2hr from Dubai)</span>
              </p>
              <p>
                <span className="font-medium">Jeddah / Riyadh, Saudi</span>
                <span className="text-[var(--muted)]"> — Limited flights, book early</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-[var(--muted)]">
            Qatar, Bahrain, Kuwait airspace also closed to civilian traffic.
          </p>
        </div>
      </Card>

      <FlightBoard />
    </section>
  );
}

function MarketsSection() {
  return (
    <section id="markets" className="space-y-4">
      <SectionHeading>Markets &amp; Economy</SectionHeading>
      <Card>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            <StatBox value="Closed" label="Stock exchanges" color="red" />
            <StatBox value="$74+" label="Oil (Brent)" color="yellow" />
            <StatBox value="Closed" label="Strait of Hormuz" color="red" />
            <StatBox value="Limited" label="Banks" color="yellow" />
          </div>
          <div className="bg-[var(--muted-bg)] rounded-lg p-4">
            <p className="text-sm leading-relaxed">
              <strong>Tip:</strong>{" "}
              <span className="text-[var(--muted)]">
                ATMs are working but expect queues. Withdraw cash for essential
                purchases. Keep AED 500–1000 on hand.
              </span>
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}

function EmergencySection() {
  return (
    <section id="emergency" className="space-y-4">
      <SectionHeading>Emergency Contacts</SectionHeading>
      <Card>
        <div className="space-y-4">
          <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest">
            UAE Emergency Numbers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {EMERGENCY_CONTACTS.uae.map((c) => (
              <a
                key={c.number}
                href={`tel:${c.number}`}
                className="flex justify-between items-center bg-[var(--muted-bg)] rounded-lg px-4 py-3 hover:bg-[var(--surface)] transition-colors"
              >
                <span className="text-sm">{c.label}</span>
                <span className="text-base font-bold text-[var(--accent)] font-mono">
                  {c.number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest">
            Embassies — Abu Dhabi
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {EMERGENCY_CONTACTS.embassies.map((e) => (
              <a
                key={e.phone}
                href={`tel:${e.phone}`}
                className="flex justify-between items-center bg-[var(--muted-bg)] rounded-lg px-4 py-3 hover:bg-[var(--surface)] transition-colors gap-3"
              >
                <span className="text-sm whitespace-nowrap">{e.country}</span>
                <span className="text-xs font-mono text-[var(--muted)]">
                  {e.phone}
                </span>
              </a>
            ))}
          </div>
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
    <section id="shelter" className="space-y-4">
      <SectionHeading>During an Alert</SectionHeading>

      <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-5">
        <p className="text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-4">
          Immediate Steps
        </p>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex-shrink-0 text-[var(--muted)] font-mono text-[11px] w-4 pt-px">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest mb-3">
              Best Locations
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--muted)]">
              {[
                "Bathroom (interior, small windows)",
                "Interior hallway",
                "Stairwell (interior)",
                "Underground parking",
                "Ground floor interior room",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-green-400 flex-shrink-0">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-3">
              Avoid
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--muted)]">
              {[
                "Windows and glass doors",
                "Balconies",
                "Exterior walls",
                "Top floors of buildings",
                "Open areas / outdoors",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-red-400 flex-shrink-0">−</span>
                  <span>{item}</span>
                </li>
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
    <section id="supplies" className="space-y-4">
      <SectionHeading>Supplies Checklist</SectionHeading>

      <Card>
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest mb-3">
              Essential Supplies
            </p>
            <div className="space-y-1">
              {essentials.map((item, i) => (
                <label
                  key={i}
                  className="flex gap-3 items-start checklist-item cursor-pointer hover:bg-[var(--muted-bg)] rounded-lg px-3 py-2 transition-colors"
                >
                  <input type="checkbox" className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[var(--foreground)]">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-3">
              Important Documents
            </p>
            <div className="space-y-1">
              {documents.map((item, i) => (
                <label
                  key={i}
                  className="flex gap-3 items-start checklist-item cursor-pointer hover:bg-[var(--muted-bg)] rounded-lg px-3 py-2 transition-colors"
                >
                  <input type="checkbox" className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[var(--foreground)]">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-[var(--muted-bg)] rounded-lg p-4">
            <p className="text-sm leading-relaxed">
              <strong>Keep a grab bag near the door</strong>{" "}
              <span className="text-[var(--muted)]">
                with passport, charger, water, cash, and medications. If you need
                to leave fast, grab it and go.
              </span>
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}

function ExitSection() {
  return (
    <section id="exit" className="space-y-4">
      <SectionHeading>Exit Options</SectionHeading>

      <Card>
        <div className="space-y-5">
          <div>
            <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest mb-3">
              Land Routes
            </p>
            <div className="space-y-2">
              <div className="bg-green-500/5 border border-green-500/15 rounded-lg p-4">
                <p className="text-sm font-medium">Oman via Hatta Border</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  ~2hr from Dubai — Border OPEN — Most reliable option
                </p>
              </div>
              <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-lg p-4">
                <p className="text-sm font-medium">Saudi Arabia via Abu Samra</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Check current status — May require visa — Longer route
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-3">
              Flights from Neighboring Countries
            </p>
            <div className="space-y-2">
              <div className="bg-[var(--muted-bg)] rounded-lg p-4">
                <p className="text-sm font-medium">Muscat, Oman (MCT)</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Emirates / Oman Air operating some routes — Book ASAP — Prices elevated
                </p>
              </div>
              <div className="bg-[var(--muted-bg)] rounded-lg p-4">
                <p className="text-sm font-medium">Jeddah / Riyadh, Saudi</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Limited availability — Saudia operating reduced schedule
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/15 rounded-lg p-4">
            <p className="text-sm leading-relaxed">
              <strong>Embassy evacuation:</strong>{" "}
              <span className="text-[var(--muted)]">
                Contact your embassy if you cannot arrange travel independently.
                Many embassies are organizing group evacuations.
              </span>
            </p>
          </div>

          <p className="text-xs text-[var(--muted)]">
            Book early — prices are high and availability is limited. Land routes
            to Oman are the most reliable current option.
          </p>
        </div>
      </Card>
    </section>
  );
}

function InformedSection() {
  return (
    <section id="informed" className="space-y-4">
      <SectionHeading>Stay Informed</SectionHeading>

      <Card>
        <div className="space-y-5">
          <div>
            <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest mb-3">
              Official Sources
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2.5">
                <span className="text-green-400 flex-shrink-0">+</span>
                <span>
                  <strong>NCEMA</strong>
                  <span className="text-[var(--muted)]"> — @NCABORHAP_NCEMA (X / Twitter)</span>
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-green-400 flex-shrink-0">+</span>
                <span>
                  <strong>Dubai Media Office</strong>
                  <span className="text-[var(--muted)]"> — @DXBMediaOffice</span>
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-green-400 flex-shrink-0">+</span>
                <span>
                  <strong>WAM</strong>
                  <span className="text-[var(--muted)]"> — Emirates News Agency (wam.ae)</span>
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-green-400 flex-shrink-0">+</span>
                <span>
                  <strong>Your embassy</strong>
                  <span className="text-[var(--muted)]"> — Country-specific travel advisories</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-3">
              Avoid
            </p>
            <BulletList
              accent="red"
              items={[
                "Unverified social media accounts",
                "Forwarded WhatsApp messages",
                "Sensationalist / clickbait accounts",
                "Breaking news from unknown sources",
              ]}
            />
          </div>

          <div className="bg-[var(--muted-bg)] rounded-lg p-4">
            <p className="text-sm leading-relaxed">
              <strong>Mobile and internet are working normally.</strong>{" "}
              <span className="text-[var(--muted)]">
                Enable NCEMA push notifications. Keep your phone charged at all times.
              </span>
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}

// ─── Main Page ──────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [showEmergency, setShowEmergency] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
      { rootMargin: "-20% 0px -70% 0px" }
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

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-[var(--background)]/95 backdrop-blur-lg border-b border-[var(--card-border)] z-50 px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <h1 className="text-sm font-medium">Iran-UAE Explainer</h1>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[var(--muted)] p-2 hover:text-[var(--foreground)] transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileMenuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
            }
          </svg>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[var(--background)] z-[60] pt-12 overflow-y-auto">
          <div className="p-5 space-y-1">
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest px-2 mb-3">
              Situation
            </p>
            {SECTIONS_META.filter((s) => s.category === "situation").map((s) => (
              <button
                key={s.id}
                onClick={() => navigateTo(s.id)}
                className="w-full text-left px-2 py-2.5 rounded text-sm text-[var(--foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
              >
                {s.title}
              </button>
            ))}
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest px-2 mt-5 mb-3">
              Practical
            </p>
            {SECTIONS_META.filter((s) => s.category === "practical").map((s) => (
              <button
                key={s.id}
                onClick={() => navigateTo(s.id)}
                className="w-full text-left px-2 py-2.5 rounded text-sm text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-52 pt-14 lg:pt-0 pb-24 lg:pb-12 px-5 sm:px-8 lg:px-14 max-w-3xl">

        {/* Hero */}
        <div className="py-10 lg:py-14 border-b border-[var(--card-border)] mb-12">
          <div className="flex items-center gap-2.5 mb-5">
            <StatusPill status="red" label="Live Updates" />
            <span className="text-xs text-[var(--muted)]">
              Mar 4, 2026 — 02:00 GMT+4
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
            Iran-UAE Conflict
          </h1>
          <p className="text-xl text-[var(--muted)] mt-1 font-normal tracking-tight">
            What You Need to Know
          </p>
          <p className="text-sm text-[var(--muted)] mt-4 max-w-lg leading-relaxed">
            Practical information for UAE residents during the current crisis —
            emergency contacts, shelter guidance, flight status, and exit options.
          </p>
        </div>

        {/* All Sections */}
        <div className="space-y-14">
          {/* Situation */}
          <div>
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-7">
              The Situation
            </p>
            <div className="space-y-10">
              <OverviewSection />
              <AttacksSection />
              <IranSection />
              <UAESection />
              <CasualtiesSection />
              <HistorySection />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--card-border)]" />

          {/* Practical */}
          <div>
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-widest mb-7">
              Practical Guide
            </p>
            <div className="space-y-10">
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

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[var(--card-border)] space-y-1">
          <p className="text-xs text-[var(--muted)]">
            For informational purposes only. Always follow official UAE government guidance.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Last updated: March 4, 2026, 02:00 GMT+4
          </p>
        </footer>
      </main>

      {/* Floating Emergency Button */}
      <EmergencyFAB onClick={() => setShowEmergency(true)} />

      {/* Bottom Nav (mobile) */}
      <BottomNav
        onNavigate={navigateTo}
        onEmergency={() => setShowEmergency(true)}
      />

      {/* Emergency Modal */}
      {showEmergency && (
        <EmergencyModal onClose={() => setShowEmergency(false)} />
      )}
    </>
  );
}

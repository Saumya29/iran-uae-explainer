"use client";

// ─── Oil Price Timeline Chart ───────────────────────────
export function OilPriceChart() {
  const data = [
    { date: "Feb 27", price: 70, label: "$70" },
    { date: "Feb 28", price: 80, label: "$80", event: "War begins" },
    { date: "Mar 1", price: 83, label: "$83" },
    { date: "Mar 2", price: 85, label: "$85" },
    { date: "Mar 3", price: 87, label: "$87" },
    { date: "Mar 5", price: 93, label: "$93" },
    { date: "Mar 7", price: 95, label: "$95" },
    { date: "Mar 9", price: 114, label: "$114", event: "Hit $119 intraday" },
    { date: "Mar 11", price: 91, label: "$91", event: "IEA reserves" },
    { date: "Mar 13", price: 100, label: "$100", event: "Kharg bombed" },
    { date: "Mar 14", price: 103, label: "$103" },
    { date: "Mar 16", price: 102, label: "$102" },
    { date: "Mar 17", price: 103, label: "$103" },
  ];

  const maxPrice = 125;
  const minPrice = 60;
  const range = maxPrice - minPrice;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Brent Crude Oil ($/barrel)
        </h3>
        <span className="text-xs text-red-400 font-mono">+47% since war began</span>
      </div>

      {/* Chart area */}
      <div className="relative bg-[var(--muted-bg)] rounded-lg p-4 overflow-x-auto">
        <div className="flex items-end gap-[6px] min-w-[500px] h-40">
          {data.map((d, i) => {
            const height = ((d.price - minPrice) / range) * 100;
            const isSpike = d.price >= 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-8 hidden group-hover:flex flex-col items-center z-10">
                  <div className="bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                    {d.date}: {d.label}/bbl
                    {d.event && <span className="block text-yellow-300">{d.event}</span>}
                  </div>
                  <div className="w-1.5 h-1.5 bg-black/90 rotate-45 -mt-1" />
                </div>
                {/* Price label */}
                <span className="text-[9px] text-[var(--muted)] font-mono">{d.label}</span>
                {/* Bar */}
                <div
                  className={`w-full rounded-t-sm transition-all ${
                    isSpike ? "bg-red-500" : d.price >= 85 ? "bg-orange-400" : "bg-green-500"
                  }`}
                  style={{ height: `${height}%` }}
                />
                {/* Date label */}
                <span className="text-[8px] text-[var(--muted)] font-mono mt-1 whitespace-nowrap">
                  {d.date.replace("Feb ", "2/").replace("Mar ", "3/")}
                </span>
              </div>
            );
          })}
        </div>

        {/* $100 reference line */}
        <div
          className="absolute left-4 right-4 border-t border-dashed border-red-500/40"
          style={{ bottom: `${((100 - minPrice) / range) * 100 * (160 / 100) / 160 * 100 + 16}%` }}
        />
      </div>

      <p className="text-[10px] text-[var(--muted)]">
        Pre-war: ~$70/bbl. Peak: $119.50 intraday (Mar 9). Current: ~$103.
        CNN: &ldquo;biggest oil disruption in history.&rdquo; 20% of global supply disrupted via Hormuz.
      </p>
    </div>
  );
}

// ─── Global Stock Market Impact ─────────────────────────
export function StockMarketImpact() {
  const markets = [
    { name: "Nifty 50", country: "India", flag: "🇮🇳", change: -8, detail: "Rs 23L Cr ($250B) wiped out", color: "red" },
    { name: "DFM", country: "UAE/Dubai", flag: "🇦🇪", change: -21, detail: "Closed 2 days, RE index -30%", color: "red" },
    { name: "ADX", country: "UAE/Abu Dhabi", flag: "🇦🇪", change: -8, detail: "Energy weight limits losses", color: "red" },
    { name: "Nikkei 225", country: "Japan", flag: "🇯🇵", change: -5, detail: "Oil import shock", color: "red" },
    { name: "KOSPI", country: "South Korea", flag: "🇰🇷", change: -6, detail: "Energy & supply chain fears", color: "red" },
    { name: "S&P 500", country: "USA", flag: "🇺🇸", change: -5, detail: "3-week losing streak", color: "orange" },
    { name: "STOXX 600", country: "Europe", flag: "🇪🇺", change: -6, detail: "Energy crisis fears", color: "red" },
    { name: "FTSE 100", country: "UK", flag: "🇬🇧", change: -5.3, detail: "Oil majors offset some", color: "orange" },
    { name: "ASX 200", country: "Australia", flag: "🇦🇺", change: -6, detail: "Commodity volatility", color: "red" },
  ];

  const maxDrop = 21;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Global Stock Market Impact
        </h3>
        <span className="text-xs text-red-400 font-mono">Since Feb 28</span>
      </div>

      <div className="space-y-2">
        {markets.map((m, i) => (
          <div key={i} className="bg-[var(--muted-bg)] rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{m.flag}</span>
              <span className="text-xs font-semibold flex-1">{m.name}</span>
              <span className="text-xs font-bold font-mono text-red-400">
                {m.change}%
              </span>
            </div>
            {/* Bar visualization */}
            <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  Math.abs(m.change) >= 10 ? "bg-red-500" : Math.abs(m.change) >= 6 ? "bg-red-400" : "bg-orange-400"
                }`}
                style={{ width: `${(Math.abs(m.change) / maxDrop) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-[var(--muted)] mt-1">{m.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Countries Affected Map/Grid ────────────────────────
export function CountriesAffected() {
  const countries = [
    {
      name: "Iran",
      flag: "🇮🇷",
      status: "red" as const,
      casualties: "1,444+ killed, 18,500+ injured",
      detail: "7,600+ US-Israeli airstrikes. Nuclear, military, oil sites hit. Kharg Island bombed.",
    },
    {
      name: "UAE",
      flag: "🇦🇪",
      status: "red" as const,
      casualties: "8 killed, 150+ injured",
      detail: "Daily missile/drone attacks. DXB airport hit. Jebel Ali fire. DFM -21%.",
    },
    {
      name: "Israel",
      flag: "🇮🇱",
      status: "red" as const,
      casualties: "13 killed",
      detail: "5-hour Iranian barrage. Missiles near Jerusalem Old City.",
    },
    {
      name: "Lebanon",
      flag: "🇱🇧",
      status: "red" as const,
      casualties: "850+ killed, 2,000+ injured",
      detail: "Israeli strikes on Hezbollah. 1M+ displaced (20% of population).",
    },
    {
      name: "Qatar",
      flag: "🇶🇦",
      status: "red" as const,
      casualties: "Struck by missiles",
      detail: "17 ballistic missiles + drones. Al Udeid Air Base area targeted.",
    },
    {
      name: "Bahrain",
      flag: "🇧🇭",
      status: "red" as const,
      casualties: "Desalination plant hit",
      detail: "114 missiles and 190 drones intercepted. US 5th Fleet base targeted.",
    },
    {
      name: "Kuwait",
      flag: "🇰🇼",
      status: "orange" as const,
      casualties: "Fuel depot struck",
      detail: "Ahmad Al-Jaber Air Base targeted by drones.",
    },
    {
      name: "Saudi Arabia",
      flag: "🇸🇦",
      status: "orange" as const,
      casualties: "Houthi attacks",
      detail: "Intercepted drones over eastern region. US ordered staff to leave.",
    },
    {
      name: "Iraq",
      flag: "🇮🇶",
      status: "orange" as const,
      casualties: "6 US airmen killed (crash)",
      detail: "KC-135 crash in western Iraq. US bases targeted.",
    },
    {
      name: "India",
      flag: "🇮🇳",
      status: "yellow" as const,
      casualties: "Economic impact",
      detail: "Nifty -8%. Rupee at 92.4/$. $250B market cap wiped. 85% oil imports at risk.",
    },
    {
      name: "Japan",
      flag: "🇯🇵",
      status: "yellow" as const,
      casualties: "Economic impact",
      detail: "Nikkei -5%. Ship hit near Hormuz (Japanese-flagged). Refused Hormuz patrol.",
    },
    {
      name: "Global",
      flag: "🌍",
      status: "yellow" as const,
      casualties: "2,300+ killed total",
      detail: "Oil +47%. 1,000+ tankers stranded. 61% Middle East oil exports cut.",
    },
  ];

  const statusColors = {
    red: "border-red-500/30 bg-red-500/5",
    orange: "border-orange-500/30 bg-orange-500/5",
    yellow: "border-yellow-500/30 bg-yellow-500/5",
  };

  const dotColors = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider">
        Countries Affected
      </h3>
      <div className="flex gap-3 text-[10px] text-[var(--muted)]">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Direct combat</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> Under attack</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Economic impact</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {countries.map((c, i) => (
          <div
            key={i}
            className={`border rounded-lg p-3 ${statusColors[c.status]}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${dotColors[c.status]}`} />
              <span className="text-sm">{c.flag}</span>
              <span className="text-xs font-bold">{c.name}</span>
            </div>
            <p className="text-[11px] font-semibold text-[var(--foreground)]">{c.casualties}</p>
            <p className="text-[10px] text-[var(--muted)] mt-0.5">{c.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Key Economic Indicators ────────────────────────────
export function EconomicIndicators() {
  const indicators = [
    {
      label: "Brent Crude",
      before: "$70/bbl",
      now: "~$103/bbl",
      change: "+47%",
      direction: "up" as const,
      icon: "🛢️",
    },
    {
      label: "Gold",
      before: "$5,296/oz",
      now: "~$5,175/oz",
      change: "-2.3%",
      direction: "down" as const,
      icon: "🥇",
    },
    {
      label: "USD/INR",
      before: "₹87.5",
      now: "₹92.4",
      change: "+5.6%",
      direction: "up" as const,
      icon: "💱",
    },
    {
      label: "S&P 500",
      before: "~5,950",
      now: "~5,650",
      change: "-5%",
      direction: "down" as const,
      icon: "📉",
    },
    {
      label: "Nifty 50",
      before: "~23,100",
      now: "~21,250",
      change: "-8%",
      direction: "down" as const,
      icon: "📉",
    },
    {
      label: "DFM (Dubai)",
      before: "~5,200",
      now: "~4,100",
      change: "-21%",
      direction: "down" as const,
      icon: "📉",
    },
    {
      label: "Hormuz Shipping",
      before: "138 ships/day",
      now: "~0 ships/day",
      change: "-99%",
      direction: "down" as const,
      icon: "🚢",
    },
    {
      label: "ME Oil Exports",
      before: "25.1M bbl/day",
      now: "9.7M bbl/day",
      change: "-61%",
      direction: "down" as const,
      icon: "⛽",
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider">
        Economic Indicators: Before vs Now
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {indicators.map((ind, i) => (
          <div key={i} className="bg-[var(--muted-bg)] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{ind.icon}</span>
              <span className="text-xs font-bold">{ind.label}</span>
              <span
                className={`ml-auto text-xs font-bold font-mono ${
                  ind.direction === "up"
                    ? ind.label.includes("Crude") || ind.label.includes("USD")
                      ? "text-red-400"
                      : "text-green-400"
                    : ind.label.includes("Gold")
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {ind.change}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <div className="flex-1">
                <p className="text-[10px] text-[var(--muted)]">Pre-war</p>
                <p className="font-mono">{ind.before}</p>
              </div>
              <span className="text-[var(--muted)]">→</span>
              <div className="flex-1">
                <p className="text-[10px] text-[var(--muted)]">Now</p>
                <p className="font-mono font-semibold">{ind.now}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[var(--muted)]">
        Data approximate as of Mar 17, 2026. Oil peaked at $119.50 (Mar 9) before IEA reserve release.
        1,000+ tankers stranded at Hormuz. Middle East oil exports down 61% from February levels.
      </p>
    </div>
  );
}

// ─── Conflict Intensity Timeline ────────────────────────
export function ConflictIntensityChart() {
  const days = [
    { day: "D1", date: "Feb 28", missiles: 100, drones: 80, label: "War starts" },
    { day: "D2", date: "Mar 1", missiles: 90, drones: 85, label: "" },
    { day: "D3", date: "Mar 2", missiles: 85, drones: 80, label: "" },
    { day: "D4", date: "Mar 3", missiles: 80, drones: 75, label: "" },
    { day: "D5", date: "Mar 4", missiles: 70, drones: 70, label: "" },
    { day: "D7", date: "Mar 6", missiles: 65, drones: 60, label: "" },
    { day: "D9", date: "Mar 8", missiles: 55, drones: 50, label: "New leader" },
    { day: "D10", date: "Mar 9", missiles: 50, drones: 45, label: "Oil $119" },
    { day: "D11", date: "Mar 10", missiles: 30, drones: 35, label: "Lowest fire" },
    { day: "D13", date: "Mar 12", missiles: 25, drones: 20, label: "KC-135 crash" },
    { day: "D14", date: "Mar 13", missiles: 20, drones: 18, label: "Kharg hit" },
    { day: "D16", date: "Mar 15", missiles: 15, drones: 14, label: "-90% / -86%" },
    { day: "D17", date: "Mar 16", missiles: 18, drones: 25, label: "DXB drone" },
    { day: "D18", date: "Mar 17", missiles: 15, drones: 20, label: "Today" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Iranian Attack Intensity
        </h3>
        <div className="flex gap-3 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Missiles
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-400" /> Drones
          </span>
        </div>
      </div>

      <div className="bg-[var(--muted-bg)] rounded-lg p-4 overflow-x-auto">
        <div className="flex items-end gap-1 min-w-[550px] h-32">
          {days.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5 group relative">
              {/* Tooltip */}
              <div className="absolute bottom-full mb-14 hidden group-hover:flex flex-col items-center z-10">
                <div className="bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                  {d.date} ({d.day})
                  {d.label && <span className="block text-yellow-300">{d.label}</span>}
                </div>
              </div>
              {/* Stacked bars */}
              <div className="w-full flex flex-col items-center gap-[1px]">
                <div
                  className="w-full bg-red-500 rounded-t-sm"
                  style={{ height: `${d.missiles * 1.2}px` }}
                />
                <div
                  className="w-full bg-orange-400"
                  style={{ height: `${d.drones * 1}px` }}
                />
              </div>
              <span className="text-[7px] text-[var(--muted)] font-mono mt-0.5">
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-[var(--muted)]">
        Relative intensity (not absolute counts). Missiles down 90%, drones down 86% from Day 1.
        Iran&apos;s capacity degrading under sustained US-Israeli strikes on launch sites, but attacks continue daily.
      </p>
    </div>
  );
}

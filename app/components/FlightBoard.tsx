"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useFlightData } from "../lib/useFlightData";
import type { Flight, AirportCode, Direction } from "../lib/types";

const AIRPORTS: { code: AirportCode; label: string }[] = [
  { code: "DXB", label: "Dubai" },
  { code: "SHJ", label: "Sharjah" },
  { code: "AUH", label: "Abu Dhabi" },
  { code: "MCT", label: "Muscat" },
];

const STATUS_COLORS: Record<string, string> = {
  scheduled: "text-green-600 dark:text-green-400",
  active: "text-green-600 dark:text-green-400",
  landed: "text-green-600 dark:text-green-400",
  delayed: "text-yellow-600 dark:text-yellow-400",
  cancelled: "text-red-600 dark:text-red-400",
  diverted: "text-red-600 dark:text-red-400",
};

function formatTime(iso: string | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Dubai",
    });
  } catch {
    return "—";
  }
}

function formatCachedAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Dubai",
  });
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] || "text-[var(--muted)]";
  return (
    <span className={`text-xs font-semibold uppercase ${color}`}>
      {status}
    </span>
  );
}

function FlightRow({
  flight,
  direction,
}: {
  flight: Flight;
  direction: Direction;
}) {
  const time =
    direction === "departures"
      ? formatTime(flight.dep_time)
      : formatTime(flight.arr_time);
  const terminal =
    direction === "departures" ? flight.dep_terminal : flight.arr_terminal;
  const gate = direction === "departures" ? flight.dep_gate : flight.arr_gate;
  const route =
    direction === "departures" ? flight.arr_iata : flight.dep_iata;

  return (
    <tr className="border-b border-[var(--card-border)] last:border-b-0">
      <td className="py-2 pr-3 text-sm font-mono font-semibold">
        {flight.flight_iata}
      </td>
      <td className="py-2 pr-3 text-sm">{flight.airline_iata}</td>
      <td className="py-2 pr-3 text-sm font-mono">{route || "—"}</td>
      <td className="py-2 pr-3 text-sm font-mono">{time}</td>
      <td className="py-2 pr-3 text-sm">{terminal || "—"}</td>
      <td className="py-2 pr-3 text-sm">{gate || "—"}</td>
      <td className="py-2 text-sm">
        <StatusBadge status={flight.status} />
        {flight.delayed ? (
          <span className="text-xs text-yellow-400 ml-1">
            +{flight.delayed}m
          </span>
        ) : null}
      </td>
    </tr>
  );
}

function FlightCard({
  flight,
  direction,
}: {
  flight: Flight;
  direction: Direction;
}) {
  const time =
    direction === "departures"
      ? formatTime(flight.dep_time)
      : formatTime(flight.arr_time);
  const terminal =
    direction === "departures" ? flight.dep_terminal : flight.arr_terminal;
  const gate = direction === "departures" ? flight.dep_gate : flight.arr_gate;
  const route =
    direction === "departures" ? flight.arr_iata : flight.dep_iata;

  return (
    <div className="bg-[var(--muted-bg)] rounded-lg p-3 space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-mono font-semibold text-sm">
          {flight.flight_iata}
        </span>
        <StatusBadge status={flight.status} />
      </div>
      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
        <span>
          {flight.airline_iata} → {route || "—"}
        </span>
        <span className="font-mono">{time}</span>
      </div>
      <div className="flex gap-3 text-xs text-[var(--muted)]">
        {terminal && <span>Terminal {terminal}</span>}
        {gate && <span>Gate {gate}</span>}
        {flight.delayed ? (
          <span className="text-yellow-400">+{flight.delayed}m delay</span>
        ) : null}
      </div>
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-10 bg-[var(--muted-bg)] rounded animate-pulse"
        />
      ))}
    </div>
  );
}

export default function FlightBoard() {
  const [airport, setAirport] = useState<AirportCode>("DXB");
  const [direction, setDirection] = useState<Direction>("departures");
  const { flights, loading, error, cachedAt, fetchFlights } = useFlightData();
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleRefresh = () => {
    setHasLoaded(true);
    fetchFlights(airport, direction);
  };

  const handleAirportChange = (code: AirportCode) => {
    setAirport(code);
    if (hasLoaded) {
      fetchFlights(code, direction);
    }
  };

  const handleDirectionChange = (dir: Direction) => {
    setDirection(dir);
    if (hasLoaded) {
      fetchFlights(airport, dir);
    }
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Live Flight Board
        </h3>
        <div className="flex items-center gap-2">
          {cachedAt && (
            <span className="text-xs text-[var(--muted)]">
              Cached {formatCachedAt(cachedAt)} GST
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            {hasLoaded ? "Refresh" : "Load Flights"}
          </button>
        </div>
      </div>

      {/* Airport Tabs */}
      <div className="flex gap-2 flex-wrap">
        {AIRPORTS.map((a) => (
          <button
            key={a.code}
            onClick={() => handleAirportChange(a.code)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
              airport === a.code
                ? "bg-[var(--surface)] border-[var(--muted)] text-[var(--foreground)]"
                : "border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--muted)]"
            }`}
          >
            {a.code}
            <span className="hidden sm:inline ml-1 font-normal">
              {a.label}
            </span>
          </button>
        ))}
      </div>

      {/* Direction Toggle */}
      <div className="flex rounded-lg border border-[var(--card-border)] overflow-hidden w-fit">
        {(["departures", "arrivals"] as Direction[]).map((dir) => (
          <button
            key={dir}
            onClick={() => handleDirectionChange(dir)}
            className={`px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
              direction === dir
                ? "bg-[var(--surface)] text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {dir}
          </button>
        ))}
      </div>

      {/* Content */}
      {!hasLoaded && (
        <div className="text-center py-8 text-sm text-[var(--muted)]">
          Select an airport and tap <strong>Load Flights</strong> to view
          schedules.
        </div>
      )}

      {loading && <SkeletonRows />}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
          <p className="font-semibold">Failed to load flights</p>
          <p className="text-xs mt-1">{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-2 text-xs underline hover:text-red-300"
          >
            Try again
          </button>
        </div>
      )}

      {hasLoaded && !loading && !error && flights.length === 0 && (
        <div className="text-center py-8 text-sm text-[var(--muted)]">
          No flights found for {airport} {direction}.
        </div>
      )}

      {!loading && flights.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--card-border)] text-xs text-[var(--muted)] uppercase">
                  <th className="py-2 pr-3 font-semibold">Flight</th>
                  <th className="py-2 pr-3 font-semibold">Airline</th>
                  <th className="py-2 pr-3 font-semibold">
                    {direction === "departures" ? "Dest" : "Origin"}
                  </th>
                  <th className="py-2 pr-3 font-semibold">Time</th>
                  <th className="py-2 pr-3 font-semibold">Terminal</th>
                  <th className="py-2 pr-3 font-semibold">Gate</th>
                  <th className="py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((f, i) => (
                  <FlightRow key={`${f.flight_iata}-${i}`} flight={f} direction={direction} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-2">
            {flights.map((f, i) => (
              <FlightCard key={`${f.flight_iata}-${i}`} flight={f} direction={direction} />
            ))}
          </div>
        </>
      )}

      <p className="text-xs text-[var(--muted)]">
        Times shown in Gulf Standard Time (UTC+4). Data via AirLabs.
      </p>
    </div>
  );
}

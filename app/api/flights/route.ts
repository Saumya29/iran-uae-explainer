import { NextRequest, NextResponse } from "next/server";
import type { AirportCode, Direction, Flight } from "@/app/lib/types";

const VALID_AIRPORTS: AirportCode[] = ["DXB", "SHJ", "AUH", "MCT"];
const VALID_DIRECTIONS: Direction[] = ["arrivals", "departures"];
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
  flights: Flight[];
  cachedAt: string;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const airport = searchParams.get("airport")?.toUpperCase() as AirportCode;
  const direction = searchParams.get("direction") as Direction;

  if (!airport || !VALID_AIRPORTS.includes(airport)) {
    return NextResponse.json(
      { error: "Invalid airport. Use DXB, SHJ, AUH, or MCT." },
      { status: 400 }
    );
  }

  if (!direction || !VALID_DIRECTIONS.includes(direction)) {
    return NextResponse.json(
      { error: "Invalid direction. Use arrivals or departures." },
      { status: 400 }
    );
  }

  const cacheKey = `${airport}-${direction}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({
      flights: cached.flights,
      cachedAt: cached.cachedAt,
      airport,
      direction,
    });
  }

  const apiKey = process.env.AIRLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured." },
      { status: 500 }
    );
  }

  let flights: Flight[];

  try {
    const depArr = direction === "departures" ? "dep_iata" : "arr_iata";
    const url = `https://airlabs.co/api/v9/schedules?${depArr}=${airport}&api_key=${apiKey}`;

    const res = await fetch(url, { cache: "no-store" });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error(
        `AirLabs returned non-JSON response (${res.status}). You may have hit a rate limit — try again in a minute.`
      );
    }

    if (!res.ok) {
      throw new Error(`AirLabs API returned ${res.status}`);
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error.message || "AirLabs API error");
    }

    flights = (data.response || [])
      .slice(0, 50)
      .map((f: Record<string, unknown>) => ({
        flight_iata: f.flight_iata || "N/A",
        airline_iata: f.airline_iata || "",
        dep_iata: f.dep_iata || "",
        arr_iata: f.arr_iata || "",
        status: f.status || "unknown",
        dep_time: f.dep_time || null,
        arr_time: f.arr_time || null,
        dep_terminal: f.dep_terminal || null,
        arr_terminal: f.arr_terminal || null,
        dep_gate: f.dep_gate || null,
        arr_gate: f.arr_gate || null,
        delayed: typeof f.delayed === "number" ? f.delayed : null,
        duration: typeof f.duration === "number" ? f.duration : null,
      }));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const cachedAt = new Date().toISOString();
  cache.set(cacheKey, { flights, cachedAt, timestamp: Date.now() });

  return NextResponse.json({ flights, cachedAt, airport, direction });
}

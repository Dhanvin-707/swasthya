import type { GeoResult } from "@/types";

// Mainland India bounding box — anything outside is rejected before render.
const INDIA = { minLat: 6.5, maxLat: 37.5, minLng: 68.0, maxLng: 98.0 };
// Madhya Pradesh preferred viewbox (lon1,lat1,lon2,lat2).
const MP_VIEWBOX = "73.5,27.0,83.0,20.8";

export type GeocodeHit = GeoResult & { displayName: string };

export function isInIndia(p: GeoResult): boolean {
  return (
    p.lat >= INDIA.minLat &&
    p.lat <= INDIA.maxLat &&
    p.lng >= INDIA.minLng &&
    p.lng <= INDIA.maxLng
  );
}

async function searchNominatim(params: URLSearchParams, signal: AbortSignal): Promise<GeocodeHit[]> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.search = params.toString();
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Geocoding failed (${res.status})`);
  const json = (await res.json()) as { lat: string; lon: string; display_name: string }[];
  return json
    .map((r) => ({
      lat: Number(r.lat),
      lng: Number(r.lon),
      displayName: r.display_name,
    }))
    .filter(isInIndia);
}

// Debounce lives in the caller; stale requests die via AbortSignal.
export async function geocodeCity(query: string, signal: AbortSignal): Promise<GeocodeHit> {
  const base = {
    q: `${query}, Madhya Pradesh, India`,
    format: "jsonv2",
    limit: "3",
    countrycodes: "in",
  };

  const mp = await searchNominatim(
    new URLSearchParams({ ...base, viewbox: MP_VIEWBOX, bounded: "1" }),
    signal,
  );
  if (mp.length > 0) return mp[0];

  const india = await searchNominatim(new URLSearchParams(base), signal);
  if (india.length > 0) return india[0];

  throw new Error("No facilities found for this search.");
}

import type { GeoErrorCode, GeoResult } from "@/types";

export class GeoError extends Error {
  code: GeoErrorCode;
  constructor(code: GeoErrorCode) {
    super(code);
    this.code = code;
  }
}

export function getPosition(timeoutMs = 10000): Promise<GeoResult> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new GeoError("unsupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => {
        // GeolocationPositionError.PERMISSION_DENIED=1, POSITION_UNAVAILABLE=2, TIMEOUT=3
        if (err.code === 1) reject(new GeoError("denied"));
        else if (err.code === 3) reject(new GeoError("timeout"));
        else reject(new GeoError("unavailable"));
      },
      { enableHighAccuracy: false, timeout: timeoutMs, maximumAge: 60000 },
    );
  });
}

export const GEO_MESSAGES: Record<GeoErrorCode, string> = {
  unsupported: "Geolocation is not supported by your browser.",
  denied: "Location access denied or unavailable. Search any city in the search bar.",
  timeout: "Location request timed out. Search any city in the search bar.",
  unavailable: "Location access denied or unavailable. Search any city in the search bar.",
};

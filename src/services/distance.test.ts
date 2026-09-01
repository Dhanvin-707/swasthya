import { describe, expect, it } from "vitest";
import { haversineKm, etaMinutes } from "./distance";

describe("haversineKm", () => {
  it("returns 0 for identical points", () => {
    expect(haversineKm(23.2, 77.1, 23.2, 77.1)).toBe(0);
  });

  it("computes plausible Sehore–Bhopal distance", () => {
    const km = haversineKm(23.2048, 77.0862, 23.26, 77.41);
    expect(km).toBeGreaterThan(30);
    expect(km).toBeLessThan(45);
  });

  it("orders nearer facilities first", () => {
    const user = { lat: 23.21, lng: 77.09 };
    const near = haversineKm(user.lat, user.lng, 23.2048, 77.0862);
    const far = haversineKm(user.lat, user.lng, 23.2741, 77.0523);
    expect(near).toBeLessThan(far);
  });
});

describe("etaMinutes", () => {
  it("grows with distance and never goes below 1", () => {
    expect(etaMinutes(0.1)).toBe(1);
    expect(etaMinutes(10)).toBeGreaterThan(etaMinutes(5));
  });
});

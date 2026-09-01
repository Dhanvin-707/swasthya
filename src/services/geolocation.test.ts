import { afterEach, describe, expect, it } from "vitest";
import { GeoError, getPosition } from "./geolocation";

const original = navigator.geolocation;

afterEach(() => {
  Object.defineProperty(navigator, "geolocation", { value: original, configurable: true });
});

function mockGeo(impl: Partial<Geolocation>) {
  Object.defineProperty(navigator, "geolocation", { value: impl, configurable: true });
}

describe("getPosition", () => {
  it("resolves with coordinates on success", async () => {
    mockGeo({
      getCurrentPosition: (ok) =>
        ok({ coords: { latitude: 23.2, longitude: 77.1 } } as GeolocationPosition),
    });
    await expect(getPosition()).resolves.toEqual({ lat: 23.2, lng: 77.1 });
  });

  it("maps PERMISSION_DENIED to denied", async () => {
    mockGeo({
      getCurrentPosition: (_ok, fail) => fail?.({ code: 1 } as GeolocationPositionError),
    });
    await expect(getPosition()).rejects.toMatchObject({ code: "denied" });
  });

  it("maps TIMEOUT to timeout", async () => {
    mockGeo({
      getCurrentPosition: (_ok, fail) => fail?.({ code: 3 } as GeolocationPositionError),
    });
    await expect(getPosition()).rejects.toMatchObject({ code: "timeout" });
  });

  it("maps POSITION_UNAVAILABLE to unavailable", async () => {
    mockGeo({
      getCurrentPosition: (_ok, fail) => fail?.({ code: 2 } as GeolocationPositionError),
    });
    await expect(getPosition()).rejects.toMatchObject({ code: "unavailable" });
  });

  it("rejects unsupported when geolocation missing", async () => {
    Object.defineProperty(navigator, "geolocation", { value: undefined, configurable: true });
    await expect(getPosition()).rejects.toBeInstanceOf(GeoError);
    await expect(getPosition()).rejects.toMatchObject({ code: "unsupported" });
  });
});

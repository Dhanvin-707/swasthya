import { afterEach, describe, expect, it, vi } from "vitest";
import { geocodeCity, isInIndia } from "./geocoding";

afterEach(() => vi.restoreAllMocks());

function mockNominatim(results: { lat: string; lon: string; display_name: string }[][]) {
  let call = 0;
  return vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
    if (init?.signal?.aborted) throw new DOMException("Aborted", "AbortError");
    const payload = results[call++] ?? [];
    return new Response(JSON.stringify(payload), { status: 200 });
  });
}

describe("isInIndia", () => {
  it("rejects the known off-region Thailand result", () => {
    expect(isInIndia({ lat: 13.7563, lng: 100.5018 })).toBe(false);
  });

  it("accepts Sehore", () => {
    expect(isInIndia({ lat: 23.2048, lng: 77.0862 })).toBe(true);
  });
});

describe("geocodeCity", () => {
  it("returns the first MP-scoped hit", async () => {
    mockNominatim([[{ lat: "23.2048", lon: "77.0862", display_name: "Sehore, MP, India" }]]);
    const hit = await geocodeCity("Sehore", new AbortController().signal);
    expect(hit.lat).toBeCloseTo(23.2048);
  });

  it("filters out off-region results and fails when nothing remains", async () => {
    mockNominatim([
      [{ lat: "13.7563", lon: "100.5018", display_name: "Bangkok, Thailand" }],
      [],
    ]);
    await expect(geocodeCity("weird", new AbortController().signal)).rejects.toThrow(
      /No facilities found/,
    );
  });

  it("aborts via AbortSignal", async () => {
    const controller = new AbortController();
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    );
    const pending = geocodeCity("Sehore", controller.signal);
    controller.abort();
    await expect(pending).rejects.toThrow();
  });
});

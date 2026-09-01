import { describe, expect, it } from "vitest";
import { pathToTab, TAB_PATHS } from "./routes";

describe("routes", () => {
  it("maps every tab path back to its tab", () => {
    for (const [tab, path] of Object.entries(TAB_PATHS)) {
      expect(pathToTab(path)).toBe(tab);
    }
  });

  it("defaults unknown paths to doctor", () => {
    expect(pathToTab("/unknown")).toBe("doctor");
  });
});

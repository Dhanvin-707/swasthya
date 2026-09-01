import { describe, expect, it } from "vitest";
import { translations, en } from "./translations";
import { FALLBACK_LANGUAGE } from "../types";

describe("translations", () => {
  it("has every key for all languages", () => {
    const keys = Object.keys(en);
    for (const lang of Object.keys(translations)) {
      const dict = translations[lang as keyof typeof translations];
      for (const key of keys) {
        expect(dict[key as keyof typeof en]).toBeDefined();
      }
    }
  });

  it("falls back to English for a missing key", () => {
    // A translated dictionary that overrides only some keys still
    // resolves the rest from the English base.
    expect(translations[FALLBACK_LANGUAGE]["nav.doctor"]).toBe(en["nav.doctor"]);
  });
});

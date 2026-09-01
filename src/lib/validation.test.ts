import { describe, expect, it } from "vitest";
import { isFutureOrToday, isValidAadhaar, isValidIndianMobile } from "./validation";
import { todayISO } from "./formatters";

describe("isFutureOrToday", () => {
  it("accepts today and future dates", () => {
    expect(isFutureOrToday(todayISO())).toBe(true);
    expect(isFutureOrToday("2099-01-01")).toBe(true);
  });

  it("rejects past and malformed dates", () => {
    expect(isFutureOrToday("2020-01-01")).toBe(false);
    expect(isFutureOrToday("")).toBe(false);
    expect(isFutureOrToday("01/01/2099")).toBe(false);
  });
});

describe("onboarding validators", () => {
  it("accepts exactly 12-digit Aadhaar", () => {
    expect(isValidAadhaar("982610495831")).toBe(true);
    expect(isValidAadhaar("98261049583")).toBe(false);
    expect(isValidAadhaar("9826104958311")).toBe(false);
    expect(isValidAadhaar("98261O495831")).toBe(false);
  });

  it("accepts valid 10-digit Indian mobile only", () => {
    expect(isValidIndianMobile("9826104958")).toBe(true);
    expect(isValidIndianMobile("5826104958")).toBe(false);
    expect(isValidIndianMobile("982610495")).toBe(false);
  });
});

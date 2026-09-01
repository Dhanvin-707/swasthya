import { describe, expect, it } from "vitest";
import { isValidAadhaar, isValidMobile, validateUpload } from "./validation";

describe("validation", () => {
  it("validates a 12-digit aadhaar", () => {
    expect(isValidAadhaar("982610495831")).toBe(true);
    expect(isValidAadhaar("123")).toBe(false);
  });

  it("validates a 10-digit mobile", () => {
    expect(isValidMobile("9826104958")).toBe(true);
    expect(isValidMobile("12345")).toBe(false);
  });

  it("rejects unsupported file types", () => {
    const file = new File(["x"], "report.txt", { type: "text/plain" });
    expect(validateUpload(file)).toEqual({ valid: false, error: "type" });
  });

  it("rejects oversized files", () => {
    const file = new File([new ArrayBuffer(11 * 1024 * 1024)], "big.pdf", {
      type: "application/pdf",
    });
    expect(validateUpload(file)).toEqual({ valid: false, error: "size" });
  });

  it("accepts pdf and image files", () => {
    const pdf = new File(["x"], "report.pdf", { type: "application/pdf" });
    expect(validateUpload(pdf).valid).toBe(true);
  });
});

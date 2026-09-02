import { describe, expect, it } from "vitest";
import { validateUpload } from "./fileValidation";

function makeFile(name: string, bytes: number): File {
  return new File([new Uint8Array(bytes)], name);
}

describe("validateUpload", () => {
  it("accepts supported image and PDF types under the size limit", () => {
    expect(validateUpload(makeFile("report.pdf", 1024))).toEqual({ valid: true });
    expect(validateUpload(makeFile("scan.jpg", 1024))).toEqual({ valid: true });
    expect(validateUpload(makeFile("scan.jpeg", 1024))).toEqual({ valid: true });
    expect(validateUpload(makeFile("scan.png", 1024))).toEqual({ valid: true });
  });

  it("rejects unsupported file types", () => {
    expect(validateUpload(makeFile("report.docx", 1024))).toEqual({ valid: false, error: "type" });
    expect(validateUpload(makeFile("script.exe", 1024))).toEqual({ valid: false, error: "type" });
  });

  it("rejects files over 10 MB", () => {
    expect(validateUpload(makeFile("big.pdf", 11 * 1024 * 1024))).toEqual({
      valid: false,
      error: "size",
    });
  });
});

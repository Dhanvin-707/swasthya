import { describe, expect, it } from "vitest";
import { getAiReply } from "./chatReplies";

describe("getAiReply", () => {
  it("matches the CBC prompt", () => {
    expect(getAiReply("Analyze my CBC lab report for Anemia risk")).toContain("Hemoglobin: 11.8 g/dL");
  });

  it("matches the fever/dengue prompt", () => {
    expect(getAiReply("I have high fever (102°F) and joint pain for 3 days")).toContain("seasonal viral fever");
  });

  it("matches the fasting blood sugar prompt", () => {
    expect(getAiReply("Explain Fasting Blood Sugar result of 142 mg/dL")).toContain("Fasting Blood Sugar: 142 mg/dL");
  });

  it("matches the dengue precaution prompt", () => {
    expect(getAiReply("Suggest home precautions for seasonal dengue")).toContain("mosquito");
  });

  it("falls back to a generic demo reply", () => {
    expect(getAiReply("hello")).toContain("demo assistant");
  });
});

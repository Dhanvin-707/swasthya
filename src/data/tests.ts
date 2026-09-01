import type { BloodTest } from "@/types";

export const BLOOD_TESTS: BloodTest[] = [
  {
    id: "test-cbc",
    name: "Complete Blood Count (CBC)",
    nameKey: "test.cbc",
    description: "Checks Hemoglobin, RBC, WBC, and Platelet levels for Anemia and infections.",
    fasting: "No fasting required",
    reportTime: "Report in 6 hours",
  },
  {
    id: "test-fbs-hba1c",
    name: "Fasting Blood Sugar & HbA1c",
    nameKey: "test.fbs",
    description: "Monitors Blood Glucose and 3-month Average Sugar control for Diabetes.",
    fasting: "8–10 hours fasting required",
    reportTime: "Report in 12 hours",
  },
  {
    id: "test-thyroid",
    name: "Thyroid Profile (T3, T4, TSH)",
    nameKey: "test.thyroid",
    description: "Evaluates Thyroid Gland function and metabolic health.",
    fasting: "No fasting required (morning sample preferred)",
    reportTime: "Report in 24 hours",
  },
];

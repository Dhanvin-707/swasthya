export interface ChatPrompt {
  id: string;
  label: string;
  reply: string;
  detail?: string;
}

export const chatPrompts: ChatPrompt[] = [
  {
    id: "prompt-cbc",
    label: "Analyze my CBC lab report for Anemia risk",
    reply:
      "Hemoglobin: 11.8 g/dL, WBC: 7,200 /uL, Platelets: 2.1 Lakh /uL (Normal). No anemia risk detected.",
    detail: "Checks Hemoglobin, RBC, WBC, and Platelet levels for Anemia and infections.",
  },
  {
    id: "prompt-fever",
    label: "I have high fever (102°F) and joint pain for 3 days",
    reply:
      "This pattern can occur in seasonal viral fever or dengue. Please see a doctor promptly for a CBC and NS1 antigen test. Do not self-medicate with painkillers without guidance.",
    detail: "Seasonal Dengue & Viral Fever precautions: rest, fluids, paracetamol only as advised, and urgent care if bleeding or severe abdominal pain.",
  },
  {
    id: "prompt-fbs",
    label: "Explain Fasting Blood Sugar result of 142 mg/dL",
    reply:
      "Fasting Blood Sugar: 142 mg/dL, HbA1c: 7.1% (Controlled Diabetes). This is above the normal fasting range and should be reviewed with a doctor.",
    detail: "Monitors Blood Glucose and 3-month Average Sugar control for Diabetes.",
  },
  {
    id: "prompt-dengue",
    label: "Suggest home precautions for seasonal dengue",
    reply:
      "Prevent mosquito breeding, use repellent and full-sleeve clothing, keep windows screened, and eliminate standing water. Seek care immediately for persistent vomiting or bleeding.",
    detail: "Dengue precautions for home and community.",
  },
];

export const emergencyDisclaimer =
  "This is informational demo advice, not a medical diagnosis. For urgent symptoms call 108 or 112.";

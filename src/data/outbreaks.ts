import type { Outbreak } from "../types";

export const conditions = [
  { id: "dengue", label: "Seasonal Dengue & Viral Fever" },
  { id: "gastro", label: "Acute Waterborne Gastroenteritis" },
  { id: "bronchitis", label: "Pediatric Seasonal Bronchitis" },
  { id: "malaria", label: "Routine Malaria Surveillance" },
];

export const outbreaks: Outbreak[] = [
  {
    id: "aiims",
    conditionId: "dengue",
    facility: "AIIMS Bhopal",
    lat: 23.2021,
    lng: 77.085,
    cases: 14,
    alertLevel: "HIGH_ALERT",
    phone: "0755-1234567",
    advisory:
      "Use mosquito nets, remove stagnant water, and report fever within 24 hours.",
  },
  {
    id: "sehore",
    conditionId: "gastro",
    facility: "Sehore District Civil Hospital",
    lat: 23.2105,
    lng: 77.4608,
    cases: 8,
    alertLevel: "HIGH_ALERT",
    phone: "07562-123456",
    advisory:
      "Boil drinking water, use ORS, and maintain hand hygiene.",
  },
  {
    id: "rampur",
    conditionId: "bronchitis",
    facility: "Rampur Community Health Centre (CHC)",
    lat: 23.25,
    lng: 77.38,
    cases: 5,
    alertLevel: "MEDIUM_ALERT",
    phone: "07562-654321",
    advisory:
      "Keep children warm, avoid cold exposure, seek care for breathing difficulty.",
  },
  {
    id: "devgarh",
    conditionId: "malaria",
    facility: "Devgarh Model Health & Wellness Centre",
    lat: 23.28,
    lng: 77.32,
    cases: 2,
    alertLevel: "LOW_ALERT",
    phone: "07562-789012",
    advisory:
      "Use insecticide-treated bed nets and complete anti-malarial course if prescribed.",
  },
];

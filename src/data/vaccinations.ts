import type { Vaccination } from "@/types";

export const VACCINATIONS: Vaccination[] = [
  {
    id: "vac-flu",
    name: "Seasonal Flu Vaccine (Influenza)",
    description: "Protects against seasonal respiratory flu viruses.",
    targetGroup: "All ages 6 months+; priority for elderly, pregnant women and children",
  },
  {
    id: "vac-covid-booster",
    name: "COVID-19 Precautionary Booster",
    description: "Enhances immunity against emerging SARS-CoV-2 strains.",
    targetGroup: "Adults 18+ after 6 months from last dose",
  },
  {
    id: "vac-hep-b",
    name: "Hepatitis B Vaccination",
    description: "Prevents liver infection caused by Hepatitis B virus.",
    targetGroup: "All adults and newborns under National Immunization Program",
  },
];

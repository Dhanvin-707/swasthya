import type { Article } from "../types";

export const articles: Article[] = [
  {
    id: "maternal",
    title: "Third-trimester maternal care in rural settings",
    category: "Maternal Health",
    readingTime: "7 Minutes",
    summary:
      "Key checks, nutrition, and danger signs every expectant mother should know in the final trimester.",
    content:
      "Regular antenatal check-ups, iron and calcium supplementation, and monitoring blood pressure are vital in the third trimester. Watch for severe headache, blurred vision, sudden swelling, reduced fetal movements, or bleeding, and visit the nearest PHC immediately.",
  },
  {
    id: "diabetes",
    title: "Managing Type-2 diabetes and foot ulcers",
    category: "Chronic Disease",
    readingTime: "6 Minutes",
    summary:
      "Daily foot inspection, blood sugar monitoring, and timely wound care can prevent serious complications.",
    content:
      "Keep blood sugar within target range, wear well-fitting footwear, inspect feet daily for cuts or redness, and seek care for any non-healing wound to prevent infection and ulcers.",
  },
  {
    id: "pediatric",
    title: "Pediatric fever and ORS at home",
    category: "Child Health",
    readingTime: "5 Minutes",
    summary:
      "How to recognize dehydration and prepare safe oral rehydration solution for children with fever.",
    content:
      "Give ORS in small, frequent sips, continue breastfeeding, keep the child cool, and bring the child to a health facility if fever persists beyond 24 hours or there are danger signs.",
  },
];

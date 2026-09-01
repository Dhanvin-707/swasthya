import type { Specialist } from "@/types";

export const SPECIALISTS: Specialist[] = [
  {
    id: "dr-rajesh-sharma",
    name: "Dr. Rajesh Sharma",
    specialty: "General Physician & Rural Health Specialist",
    experience: "9 Years Exp",
    available: true,
  },
  {
    id: "dr-ananya-verma",
    name: "Dr. Ananya Verma",
    specialty: "Pediatrician & Child Health Specialist",
    experience: "12 Years Exp",
    available: true,
  },
  {
    id: "dr-vk-gupta",
    name: "Dr. V. K. Gupta",
    specialty: "Senior Cardiologist & Internal Medicine",
    experience: "18 Years Exp",
    available: false,
  },
];

export const TIME_SLOTS = ["09:00 – 11:00", "11:00 – 13:00", "14:00 – 16:00", "16:00 – 18:00"];

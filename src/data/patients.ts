import type { Patient } from "@/types";

export const PATIENTS: Patient[] = [
  {
    id: "patient-kamla",
    name: "Kamla Devi",
    displayAge: "26y",
    dob: "1998-04-12",
    bloodGroup: "B+",
    aadhaar: "982610495831",
    abhaId: "91-9826-1049",
    abhaQrPayload:
      "ABHA:91-9826-1049|NAME:Kamla Devi|DOB:1998-04-12|BLOOD:B+|AADHAAR:982610495831",
    mobile: "9826104958",
    address: "Village Rampur, Block Sehore, Madhya Pradesh",
    phc: "Rampur Model PHC Unit",
    attendingDoctor: "Dr. Rajesh Sharma",
    emergencyContact: "Suresh Kumar — 9826000111",
    immunizationStatus: "Fully Immunized (NIP Schedule)",
  },
  {
    id: "patient-ramcharan",
    name: "Ramcharan Yadav",
    displayAge: "62y",
    dob: "1962-09-05",
    bloodGroup: "O+",
    aadhaar: "940652210982",
    abhaId: "91-9406-5221",
    abhaQrPayload:
      "ABHA:91-9406-5221|NAME:Ramcharan Yadav|DOB:1962-09-05|BLOOD:O+|AADHAAR:940652210982",
    mobile: "9406522109",
    address: "Village Devgarh, Block Sehore, Madhya Pradesh",
    phc: "Devgarh Model Health & Wellness Centre",
    attendingDoctor: "Dr. V. K. Gupta",
    emergencyContact: "Mohan Yadav — 9406500222",
    immunizationStatus: "Seasonal Flu Vaccinated 2025",
  },
];

export function getPatient(id: string): Patient {
  return PATIENTS.find((p) => p.id === id) ?? PATIENTS[0];
}

import type { Patient } from "../types";

export const patients: Patient[] = [
  {
    id: "kamla",
    fullName: "Kamla Devi",
    aadhaar: "982610495831",
    mobile: "9876543210",
    dob: "1998-04-12",
    bloodGroup: "B+",
    emergencyContact: "9876543211",
    address: "Village Rampur, Block Sehore, MP",
    primaryPHC: "Rampur Model PHC",
    attendingDoctor: "Dr. Rajesh Sharma",
    immunizationStatus: "Up to date",
    abhaId: "91-9826-1049",
    abhaQrPayload:
      "ABHA:91-9826-1049|NAME:Kamla Devi|DOB:1998-04-12|BLOOD:B+|AADHAAR:982610495831",
  },
  {
    id: "ramcharan",
    fullName: "Ramcharan Yadav",
    aadhaar: "940652210982",
    mobile: "9876543212",
    dob: "1962-09-05",
    bloodGroup: "O+",
    emergencyContact: "9876543213",
    address: "Civil Lines, Sehore HQ",
    primaryPHC: "Sehore District Civil Hospital",
    attendingDoctor: "Dr. V. K. Gupta",
    immunizationStatus: "Up to date",
    abhaId: "91-9406-5221",
    abhaQrPayload:
      "ABHA:91-9406-5221|NAME:Ramcharan Yadav|DOB:1962-09-05|BLOOD:O+|AADHAAR:940652210982",
  },
];

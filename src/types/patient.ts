export interface Citizen {
  id: string;
  name: string;
  age: number;
  gender: "female" | "male";
  aadhaarNo: string;
  mobile: string;
  abhaId: string;
  dob: string;
  bloodGroup: string;
  emergencyContact: string;
  address: string;
  primaryPhc: string;
  attendingDoctor: string;
  immunizationStatus: string;
}

export interface PatientObservation {
  id: string;
  text: string;
  attachedDoc?: string;
  timestamp: string;
}

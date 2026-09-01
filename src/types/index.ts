export type TabId =
  | "doctor"
  | "doctors"
  | "tests"
  | "disease-map"
  | "feed"
  | "alerts"
  | "profile";

export type LanguageCode =
  | "en"
  | "hi"
  | "mr"
  | "te"
  | "ta"
  | "bn"
  | "gu"
  | "kn"
  | "ml"
  | "pa";

export type Appointment = {
  id: string;
  reference: string;
  patientId: string;
  service: string;
  providerId: string;
  providerName: string;
  facilityName?: string;
  mode: "online" | "in-person" | "home-sample" | "visit-lab";
  date: string;
  timeSlot: string;
  reason?: string;
  address?: string;
  priorityToken?: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
  isDemo: true;
};

export type ChatMessage = {
  id: string;
  text: string;
  attachedDoc?: string;
  timestamp: string;
  sender: "user" | "ai";
};

export type Patient = {
  id: string;
  name: string;
  displayAge: string;
  dob: string;
  bloodGroup: string;
  aadhaar: string;
  abhaId: string;
  mobile: string;
  address: string;
  phc: string;
  attendingDoctor: string;
  emergencyContact: string;
  immunizationStatus: string;
};

export type Facility = {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
};

export type Specialist = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  available: boolean;
};

export type BloodTest = {
  id: string;
  name: string;
  nameKey: string;
  description: string;
  fasting: string;
  reportTime: string;
};

export type Vaccination = {
  id: string;
  name: string;
  description: string;
  targetGroup: string;
};

export type GeoErrorCode = "unsupported" | "denied" | "timeout" | "unavailable";

export type GeoResult = { lat: number; lng: number };

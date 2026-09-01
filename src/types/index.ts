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

export type UserLocation = {
  lat: number;
  lng: number;
  city?: string;
  address?: string;
  isGpsActive: boolean;
  loading: boolean;
  error?: string;
};

export type Patient = {
  id: string;
  fullName: string;
  aadhaar: string;
  mobile: string;
  dob: string;
  bloodGroup: string;
  emergencyContact: string;
  address: string;
  primaryPHC: string;
  attendingDoctor: string;
  immunizationStatus: string;
  abhaId: string;
  abhaQrPayload: string;
};

export type UploadedDocument = {
  id: string;
  title: string;
  date: string;
  type: string;
};

export type Alert = {
  id: string;
  title: string;
  status: "Active Today" | "Upcoming" | "Ongoing";
  description: string;
  lastUpdated: string;
  read: boolean;
};

export type Article = {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  summary: string;
  content: string;
};

export type Outbreak = {
  id: string;
  conditionId: string;
  facility: string;
  lat: number;
  lng: number;
  cases: number;
  alertLevel: "HIGH_ALERT" | "MEDIUM_ALERT" | "LOW_ALERT";
  phone: string;
  advisory: string;
};

export type ImagingReport = {
  id: string;
  type: string;
  region: string;
  finding: string;
  impression: string;
  radiologist: string;
  image: string;
};

export type Prescription = {
  id: string;
  medication: string;
  dosage: string;
  price: string;
};

export type TimelineRecord = {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  imagingReport?: string;
  prescription: string;
};

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
  abhaQrPayload: string;
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

export type UserLocation = {
  lat: number;
  lng: number;
  city?: string;
  address?: string;
  isGpsActive: boolean;
  loading: boolean;
  error?: string;
};

export type UploadedDocument = {
  id: string;
  title: string;
  date: string;
  type: string;
  facility?: string;
  attached?: boolean;
};

export type AlertStatus = "Active Today" | "Upcoming" | "Ongoing";

export type Alert = {
  id: string;
  title: string;
  status: AlertStatus;
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

export type AlertLevel = "HIGH_ALERT" | "MEDIUM_ALERT" | "LOW_ALERT";

export type Outbreak = {
  id: string;
  conditionId: string;
  facility: string;
  lat: number;
  lng: number;
  cases: number;
  alertLevel: AlertLevel;
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

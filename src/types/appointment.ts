export type AppointmentMode =
  | "online"
  | "in-person"
  | "home-sample"
  | "visit-lab";

export type AppointmentStatus = "confirmed" | "cancelled";

export interface Appointment {
  id: string;
  reference: string;
  patientId: string;
  service: string;
  providerId: string;
  providerName: string;
  facilityName?: string;
  mode: AppointmentMode;
  date: string;
  timeSlot: string;
  reason?: string;
  address?: string;
  priorityToken?: string;
  status: AppointmentStatus;
  createdAt: string;
  isDemo: true;
}

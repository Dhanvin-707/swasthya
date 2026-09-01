import type { Appointment, ChatMessage, LanguageCode } from "../types";
import type { MedicalDocument } from "../types/report";

const STORAGE_PREFIX = "swasthya:demo:";
const VERSION = "v1";

export const storageKeys = {
  onboarding: `${STORAGE_PREFIX}${VERSION}:onboarding`,
  language: `${STORAGE_PREFIX}${VERSION}:language`,
  messages: `${STORAGE_PREFIX}${VERSION}:messages`,
  documents: `${STORAGE_PREFIX}${VERSION}:documents`,
  appointments: `${STORAGE_PREFIX}${VERSION}:appointments`,
} as const;

export interface StoredOnboarding {
  patientId: string;
  completedAt: string;
}

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  readOnboarding(): StoredOnboarding | null {
    return read<StoredOnboarding>(storageKeys.onboarding);
  },
  writeOnboarding(value: StoredOnboarding): void {
    write(storageKeys.onboarding, value);
  },
  readLanguage(): LanguageCode | null {
    return read<LanguageCode>(storageKeys.language);
  },
  writeLanguage(value: LanguageCode): void {
    write(storageKeys.language, value);
  },
  readMessages(): ChatMessage[] | null {
    return read<ChatMessage[]>(storageKeys.messages);
  },
  writeMessages(value: ChatMessage[]): void {
    write(storageKeys.messages, value);
  },
  readDocuments(): MedicalDocument[] | null {
    return read<MedicalDocument[]>(storageKeys.documents);
  },
  writeDocuments(value: MedicalDocument[]): void {
    write(storageKeys.documents, value);
  },
  readAppointments(): Appointment[] | null {
    return read<Appointment[]>(storageKeys.appointments);
  },
  writeAppointments(value: Appointment[]): void {
    write(storageKeys.appointments, value);
  },
  clearDemo(): void {
    if (typeof window === "undefined") return;
    Object.values(storageKeys).forEach((key) => window.localStorage.removeItem(key));
  },
};

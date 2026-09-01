import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Appointment,
  ChatMessage,
  Citizen,
  LanguageCode,
  TabId,
} from "../types";
import type { MedicalDocument } from "../types/report";
import { citizens as seedCitizens } from "../data/patients";
import { seededDocuments } from "../data/medicalReports";
import { FALLBACK_LANGUAGE } from "../types";
import { storage, type StoredOnboarding } from "../lib/storage";

interface EmergencySOSAlert {
  id: string;
  unit: string;
  eta: string;
  patientName: string;
  location: string;
  createdAt: string;
  isDemo: true;
}

interface SwasthyaContextValue {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  activePatient: Citizen | null;
  setActivePatient: (patient: Citizen) => void;
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  onboardingComplete: boolean;
  completeOnboarding: (patient: Citizen, language: LanguageCode) => void;
  searchByAadhaarOrAbha: (query: string) => Citizen | null;
  messages: ChatMessage[];
  addChatMessage: (text: string, attachedDoc?: string) => void;
  documents: MedicalDocument[];
  addDocument: (doc: MedicalDocument) => void;
  markDocumentAttached: (id: string) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (id: string) => void;
  emergencySOSAlert: EmergencySOSAlert | null;
  triggerEmergency108: () => void;
  resetDemo: () => void;
}

const SwasthyaContext = createContext<SwasthyaContextValue | null>(null);

function initialDocuments(): MedicalDocument[] {
  return storage.readDocuments() ?? seededDocuments;
}

export function SwasthyaProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("doctor");
  const [activePatient, setActivePatient] = useState<Citizen | null>(null);
  const [language, setLanguage] = useState<LanguageCode>(FALLBACK_LANGUAGE);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [documents, setDocuments] = useState<MedicalDocument[]>(initialDocuments);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [emergencySOSAlert, setEmergencySOSAlert] =
    useState<EmergencySOSAlert | null>(null);

  useEffect(() => {
    const stored = storage.readOnboarding();
    const storedLanguage = storage.readLanguage();
    const storedMessages = storage.readMessages();
    const storedAppointments = storage.readAppointments();

    if (stored) {
      const patient = seedCitizens.find((c) => c.id === stored.patientId) ?? null;
      setActivePatient(patient);
      setOnboardingComplete(true);
    }
    if (storedLanguage) setLanguage(storedLanguage);
    if (storedMessages) setMessages(storedMessages);
    if (storedAppointments) setAppointments(storedAppointments);
  }, []);

  useEffect(() => {
    storage.writeLanguage(language);
  }, [language]);

  useEffect(() => {
    storage.writeMessages(messages);
  }, [messages]);

  useEffect(() => {
    storage.writeDocuments(documents);
  }, [documents]);

  useEffect(() => {
    storage.writeAppointments(appointments);
  }, [appointments]);

  const completeOnboarding = useCallback((patient: Citizen, lang: LanguageCode) => {
    setActivePatient(patient);
    setLanguage(lang);
    setOnboardingComplete(true);
    const record: StoredOnboarding = {
      patientId: patient.id,
      completedAt: new Date().toISOString(),
    };
    storage.writeOnboarding(record);
  }, []);

  const searchByAadhaarOrAbha = useCallback((query: string): Citizen | null => {
    const normalized = query.replace(/\s+/g, "").toLowerCase();
    return (
      seedCitizens.find((c) => c.aadhaarNo === normalized) ??
      seedCitizens.find((c) => c.abhaId.toLowerCase().replace(/\s+/g, "") === normalized) ??
      null
    );
  }, []);

  const addChatMessage = useCallback((text: string, attachedDoc?: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        text,
        attachedDoc,
        timestamp: new Date().toISOString(),
        sender: "user",
      },
    ]);
  }, []);

  const addDocument = useCallback((doc: MedicalDocument) => {
    setDocuments((prev) => [doc, ...prev]);
  }, []);

  const markDocumentAttached = useCallback((id: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, attached: true } : d)),
    );
  }, []);

  const addAppointment = useCallback((appointment: Appointment) => {
    setAppointments((prev) => [appointment, ...prev]);
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a)),
    );
  }, []);

  const triggerEmergency108 = useCallback(() => {
    setEmergencySOSAlert({
      id: `sos-${Date.now().toString(36)}`,
      unit: "National 108 Emergency Ambulance Unit #MP-04-1082",
      eta: "8 minutes",
      patientName: activePatient?.name ?? "Unknown patient",
      location: "Village Chandanpur, Block Sehore, MP",
      createdAt: new Date().toISOString(),
      isDemo: true,
    });
  }, [activePatient]);

  const resetDemo = useCallback(() => {
    storage.clearDemo();
    setActiveTab("doctor");
    setActivePatient(null);
    setLanguage(FALLBACK_LANGUAGE);
    setOnboardingComplete(false);
    setMessages([]);
    setDocuments(seededDocuments);
    setAppointments([]);
    setEmergencySOSAlert(null);
  }, []);

  const value = useMemo<SwasthyaContextValue>(
    () => ({
      activeTab,
      setActiveTab,
      activePatient,
      setActivePatient,
      language,
      setLanguage,
      onboardingComplete,
      completeOnboarding,
      searchByAadhaarOrAbha,
      messages,
      addChatMessage,
      documents,
      addDocument,
      markDocumentAttached,
      appointments,
      addAppointment,
      cancelAppointment,
      emergencySOSAlert,
      triggerEmergency108,
      resetDemo,
    }),
    [
      activeTab,
      activePatient,
      language,
      onboardingComplete,
      completeOnboarding,
      searchByAadhaarOrAbha,
      messages,
      addChatMessage,
      documents,
      addDocument,
      markDocumentAttached,
      appointments,
      addAppointment,
      cancelAppointment,
      emergencySOSAlert,
      triggerEmergency108,
      resetDemo,
    ],
  );

  return <SwasthyaContext.Provider value={value}>{children}</SwasthyaContext.Provider>;
}

export function useSwasthya(): SwasthyaContextValue {
  const ctx = useContext(SwasthyaContext);
  if (!ctx) {
    throw new Error("useSwasthya must be used within a SwasthyaProvider");
  }
  return ctx;
}

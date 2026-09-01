import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type {
  TabId,
  LanguageCode,
  Appointment,
  ChatMessage,
  UploadedDocument,
  UserLocation,
} from "../types";
import { patients } from "../data/patients";
import { loadState, saveState } from "../lib/storage";

type AppState = {
  activeTab: TabId;
  activePatientId: string | null;
  language: LanguageCode;
  userLocation: UserLocation;
  isQrModalOpen: boolean;
  emergencySOSAlert: boolean;
  onboardingComplete: boolean;
  chatMessages: Record<string, ChatMessage[]>;
  uploadedDocs: Record<string, UploadedDocument[]>;
  appointments: Appointment[];
  alertsRead: string[];
};

type AppContextValue = AppState & {
  setActiveTab: (tab: TabId) => void;
  setActivePatientId: (id: string | null) => void;
  setLanguage: (lang: LanguageCode) => void;
  completeOnboarding: () => void;
  addChatMessage: (patientId: string, message: ChatMessage) => void;
  addUploadedDocument: (patientId: string, doc: UploadedDocument) => void;
  addAppointment: (appt: Appointment) => void;
  cancelAppointment: (id: string) => void;
  triggerEmergency108: () => void;
  closeEmergencyAlert: () => void;
  markAlertRead: (id: string) => void;
  openQrModal: () => void;
  closeQrModal: () => void;
  setUserLocation: (loc: Partial<UserLocation>) => void;
  resetDemo: () => void;
};

const defaultLocation: UserLocation = {
  lat: 23.2105,
  lng: 77.4608,
  city: "Sehore",
  address: "Sehore, Madhya Pradesh",
  isGpsActive: false,
  loading: false,
};

const initialState: AppState = {
  activeTab: "doctor",
  activePatientId: null,
  language: "en" as LanguageCode,
  userLocation: defaultLocation,
  isQrModalOpen: false,
  emergencySOSAlert: false,
  onboardingComplete: false,
  chatMessages: {},
  uploadedDocs: {},
  appointments: [],
  alertsRead: [],
};

const SwasthyaContext = createContext<AppContextValue | undefined>(undefined);

export function SwasthyaProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = loadState();
    return {
      ...initialState,
      activePatientId: saved.activePatientId ?? initialState.activePatientId,
      language: (saved.language as LanguageCode) || initialState.language,
      onboardingComplete: saved.onboardingComplete ?? initialState.onboardingComplete,
      chatMessages: (saved.chatMessages as Record<string, ChatMessage[]>) ?? initialState.chatMessages,
      uploadedDocs: (saved.uploadedDocs as Record<string, UploadedDocument[]>) ?? initialState.uploadedDocs,
      appointments: (saved.appointments as Appointment[]) ?? initialState.appointments,
      alertsRead: saved.alertsRead ?? initialState.alertsRead,
    };
  });

  useEffect(() => {
    saveState({
      activePatientId: state.activePatientId,
      language: state.language,
      onboardingComplete: state.onboardingComplete,
      chatMessages: state.chatMessages,
      uploadedDocs: state.uploadedDocs,
      appointments: state.appointments,
      alertsRead: state.alertsRead,
      sosDispatched: state.emergencySOSAlert,
    });
  }, [state]);

  const setActiveTab = useCallback((tab: TabId) => {
    setState((s) => ({ ...s, activeTab: tab }));
  }, []);

  const setActivePatientId = useCallback((id: string | null) => {
    setState((s) => ({ ...s, activePatientId: id }));
  }, []);

  const setLanguage = useCallback((language: LanguageCode) => {
    setState((s) => ({ ...s, language }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setState((s) => ({ ...s, onboardingComplete: true }));
  }, []);

  const addChatMessage = useCallback((patientId: string, message: ChatMessage) => {
    setState((s) => ({
      ...s,
      chatMessages: {
        ...s.chatMessages,
        [patientId]: [...(s.chatMessages[patientId] || []), message],
      },
    }));
  }, []);

  const addUploadedDocument = useCallback(
    (patientId: string, doc: UploadedDocument) => {
      setState((s) => ({
        ...s,
        uploadedDocs: {
          ...s.uploadedDocs,
          [patientId]: [...(s.uploadedDocs[patientId] || []), doc],
        },
      }));
    },
    []
  );

  const addAppointment = useCallback((appt: Appointment) => {
    setState((s) => ({ ...s, appointments: [...s.appointments, appt] }));
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      appointments: s.appointments.map((a) =>
        a.id === id ? { ...a, status: "cancelled" as const } : a
      ),
    }));
  }, []);

  const triggerEmergency108 = useCallback(() => {
    setState((s) => ({ ...s, emergencySOSAlert: true }));
  }, []);

  const closeEmergencyAlert = useCallback(() => {
    setState((s) => ({ ...s, emergencySOSAlert: false }));
  }, []);

  const markAlertRead = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      alertsRead: [...new Set([...s.alertsRead, id])],
    }));
  }, []);

  const openQrModal = useCallback(() => {
    setState((s) => ({ ...s, isQrModalOpen: true }));
  }, []);

  const closeQrModal = useCallback(() => {
    setState((s) => ({ ...s, isQrModalOpen: false }));
  }, []);

  const setUserLocation = useCallback((loc: Partial<UserLocation>) => {
    setState((s) => ({ ...s, userLocation: { ...s.userLocation, ...loc } }));
  }, []);

  const resetDemo = useCallback(() => {
    setState({
      ...initialState,
      activePatientId: patients[0]?.id || null,
      language: "en" as LanguageCode,
    });
  }, []);

  const value: AppContextValue = {
    ...state,
    setActiveTab,
    setActivePatientId,
    setLanguage,
    completeOnboarding,
    addChatMessage,
    addUploadedDocument,
    addAppointment,
    cancelAppointment,
    triggerEmergency108,
    closeEmergencyAlert,
    markAlertRead,
    openQrModal,
    closeQrModal,
    setUserLocation,
    resetDemo,
  };

  return (
    <SwasthyaContext.Provider value={value}>{children}</SwasthyaContext.Provider>
  );
}

export function useSwasthya() {
  const ctx = useContext(SwasthyaContext);
  if (!ctx) throw new Error("useSwasthya must be used within SwasthyaProvider");
  return ctx;
}

export const getActivePatient = (id: string | null) =>
  patients.find((p) => p.id === id) || null;

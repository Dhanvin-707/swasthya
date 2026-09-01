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
  LanguageCode,
  Patient,
  TabId,
  UploadedDocument,
  UserLocation,
} from "@/types";
import { PATIENTS } from "@/data/patients";
import { clearAllState, loadState, saveState } from "@/lib/storage";
import { parseHash, tabToHash } from "@/app/routes";

type Toast = { id: number; text: string; tone: "success" | "error" };

type SwasthyaContextValue = {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  activePatient: Patient;
  setActivePatient: (id: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  onboardingDone: boolean;
  completeOnboarding: (patientId: string, lang: LanguageCode) => void;
  appointments: Appointment[];
  addAppointment: (a: Appointment) => void;
  cancelAppointment: (id: string) => void;
  toast: Toast | null;
  showToast: (text: string, tone?: Toast["tone"]) => void;
  resetDemo: () => void;

  userLocation: UserLocation;
  setUserLocation: (loc: Partial<UserLocation>) => void;
  chatMessages: Record<string, ChatMessage[]>;
  addChatMessage: (patientId: string, message: ChatMessage) => void;
  uploadedDocs: Record<string, UploadedDocument[]>;
  addUploadedDocument: (patientId: string, doc: UploadedDocument) => void;
  markDocumentAttached: (patientId: string, docId: string) => void;
  alertsRead: string[];
  markAlertRead: (id: string) => void;
  emergencySOSAlert: boolean;
  triggerEmergency108: () => void;
  closeEmergencyAlert: () => void;
  isQrModalOpen: boolean;
  openQrModal: () => void;
  closeQrModal: () => void;
};

const SwasthyaContext = createContext<SwasthyaContextValue | null>(null);

const defaultLocation: UserLocation = {
  lat: 23.2105,
  lng: 77.4608,
  city: "Sehore",
  address: "Sehore, Madhya Pradesh",
  isGpsActive: false,
  loading: false,
};

export function SwasthyaProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<TabId>(() =>
    parseHash(window.location.hash),
  );
  const [patientId, setPatientId] = useState<string>(() =>
    loadState("patientId", PATIENTS[0].id),
  );
  const [language, setLanguageState] = useState<LanguageCode>(() =>
    loadState("language", "en"),
  );
  const [onboardingDone, setOnboardingDone] = useState<boolean>(() =>
    loadState("onboardingDone", false),
  );
  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    loadState("appointments", []),
  );
  const [toast, setToast] = useState<Toast | null>(null);

  const [userLocation, setUserLocationState] = useState<UserLocation>(() =>
    loadState("userLocation", defaultLocation),
  );
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(() =>
    loadState("chatMessages", {}),
  );
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedDocument[]>>(
    () => loadState("uploadedDocs", {}),
  );
  const [alertsRead, setAlertsRead] = useState<string[]>(() =>
    loadState("alertsRead", []),
  );
  const [emergencySOSAlert, setEmergencySOSAlert] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setActiveTabState(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setActiveTab = useCallback((tab: TabId) => {
    setActiveTabState(tab);
    window.location.hash = tabToHash(tab);
  }, []);

  const setActivePatient = useCallback((id: string) => {
    setPatientId(id);
    saveState("patientId", id);
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    saveState("language", lang);
  }, []);

  const completeOnboarding = useCallback((id: string, lang: LanguageCode) => {
    setPatientId(id);
    saveState("patientId", id);
    setLanguageState(lang);
    saveState("language", lang);
    setOnboardingDone(true);
    saveState("onboardingDone", true);
  }, []);

  const addAppointment = useCallback((a: Appointment) => {
    setAppointments((prev) => {
      const next = [...prev, a];
      saveState("appointments", next);
      return next;
    });
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) => {
      const next = prev.map((a) =>
        a.id === id ? { ...a, status: "cancelled" as const } : a,
      );
      saveState("appointments", next);
      return next;
    });
  }, []);

  const showToast = useCallback((text: string, tone: Toast["tone"] = "success") => {
    const id = Date.now();
    setToast({ id, text, tone });
    window.setTimeout(() => {
      setToast((cur) => (cur?.id === id ? null : cur));
    }, 4000);
  }, []);

  const resetDemo = useCallback(() => {
    clearAllState();
    window.location.hash = "";
    window.location.reload();
  }, []);

  const setUserLocation = useCallback((loc: Partial<UserLocation>) => {
    setUserLocationState((prev) => {
      const next = { ...prev, ...loc };
      saveState("userLocation", next);
      return next;
    });
  }, []);

  const addChatMessage = useCallback((patientId: string, message: ChatMessage) => {
    setChatMessages((prev) => {
      const next = {
        ...prev,
        [patientId]: [...(prev[patientId] ?? []), message],
      };
      saveState("chatMessages", next);
      return next;
    });
  }, []);

  const addUploadedDocument = useCallback(
    (patientId: string, doc: UploadedDocument) => {
      setUploadedDocs((prev) => {
        const next = {
          ...prev,
          [patientId]: [doc, ...(prev[patientId] ?? [])],
        };
        saveState("uploadedDocs", next);
        return next;
      });
    },
    [],
  );

  const markDocumentAttached = useCallback((patientId: string, docId: string) => {
    setUploadedDocs((prev) => {
      const next = {
        ...prev,
        [patientId]: (prev[patientId] ?? []).map((d) =>
          d.id === docId ? { ...d, attached: true } : d,
        ),
      };
      saveState("uploadedDocs", next);
      return next;
    });
  }, []);

  const markAlertRead = useCallback((id: string) => {
    setAlertsRead((prev) => {
      const next = [...new Set([...prev, id])];
      saveState("alertsRead", next);
      return next;
    });
  }, []);

  const triggerEmergency108 = useCallback(() => {
    setEmergencySOSAlert(true);
  }, []);

  const closeEmergencyAlert = useCallback(() => {
    setEmergencySOSAlert(false);
  }, []);

  const openQrModal = useCallback(() => setIsQrModalOpen(true), []);
  const closeQrModal = useCallback(() => setIsQrModalOpen(false), []);

  const activePatient = useMemo(
    () => PATIENTS.find((p) => p.id === patientId) ?? PATIENTS[0],
    [patientId],
  );

  const value = useMemo<SwasthyaContextValue>(
    () => ({
      activeTab,
      setActiveTab,
      activePatient,
      setActivePatient,
      language,
      setLanguage,
      onboardingDone,
      completeOnboarding,
      appointments,
      addAppointment,
      cancelAppointment,
      toast,
      showToast,
      resetDemo,
      userLocation,
      setUserLocation,
      chatMessages,
      addChatMessage,
      uploadedDocs,
      addUploadedDocument,
      markDocumentAttached,
      alertsRead,
      markAlertRead,
      emergencySOSAlert,
      triggerEmergency108,
      closeEmergencyAlert,
      isQrModalOpen,
      openQrModal,
      closeQrModal,
    }),
    [
      activeTab,
      setActiveTab,
      activePatient,
      setActivePatient,
      language,
      setLanguage,
      onboardingDone,
      completeOnboarding,
      appointments,
      addAppointment,
      cancelAppointment,
      toast,
      showToast,
      resetDemo,
      userLocation,
      setUserLocation,
      chatMessages,
      addChatMessage,
      uploadedDocs,
      addUploadedDocument,
      markDocumentAttached,
      alertsRead,
      markAlertRead,
      emergencySOSAlert,
      triggerEmergency108,
      closeEmergencyAlert,
      isQrModalOpen,
      openQrModal,
      closeQrModal,
    ],
  );

  return <SwasthyaContext.Provider value={value}>{children}</SwasthyaContext.Provider>;
}

export function useSwasthya(): SwasthyaContextValue {
  const ctx = useContext(SwasthyaContext);
  if (!ctx) throw new Error("useSwasthya must be used inside SwasthyaProvider");
  return ctx;
}

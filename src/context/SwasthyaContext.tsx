import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Appointment, LanguageCode, Patient, TabId } from "@/types";
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
};

const SwasthyaContext = createContext<SwasthyaContextValue | null>(null);

export function SwasthyaProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<TabId>(() => parseHash(window.location.hash));
  const [patientId, setPatientId] = useState<string>(() =>
    loadState("patientId", PATIENTS[0].id),
  );
  const [language, setLanguageState] = useState<LanguageCode>(() => loadState("language", "en"));
  const [onboardingDone, setOnboardingDone] = useState<boolean>(() =>
    loadState("onboardingDone", false),
  );
  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    loadState("appointments", []),
  );
  const [toast, setToast] = useState<Toast | null>(null);

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
      const next = prev.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a));
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

  const activePatient = useMemo(
    () => PATIENTS.find((p) => p.id === patientId) ?? PATIENTS[0],
    [patientId],
  );

  const value = useMemo(
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
    ],
  );

  return <SwasthyaContext.Provider value={value}>{children}</SwasthyaContext.Provider>;
}

export function useSwasthya(): SwasthyaContextValue {
  const ctx = useContext(SwasthyaContext);
  if (!ctx) throw new Error("useSwasthya must be used inside SwasthyaProvider");
  return ctx;
}

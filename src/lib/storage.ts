const STORAGE_KEY = "swasthya-demo-state";

export type PersistedState = {
  activePatientId: string | null;
  language: string;
  onboardingComplete: boolean;
  chatMessages: Record<string, unknown[]>;
  uploadedDocs: Record<string, unknown[]>;
  appointments: unknown[];
  alertsRead: string[];
  sosDispatched: boolean;
};

export function loadState(): Partial<PersistedState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<PersistedState>;
  } catch {
    return {};
  }
}

export function saveState(state: Partial<PersistedState>) {
  try {
    const existing = loadState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...state }));
  } catch {
    // ignore
  }
}

export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

import type { TabId } from "../types";

export const tabs: { id: TabId; label: string }[] = [
  { id: "doctor", label: "AI Doctor" },
  { id: "doctors", label: "Find Doctors" },
  { id: "tests", label: "Tests & Vaccines" },
  { id: "disease-map", label: "Disease Map" },
  { id: "feed", label: "Health Feed" },
  { id: "alerts", label: "Live Alerts" },
  { id: "profile", label: "Profile" },
];

export const tabPath = (tab: TabId) => `#${tab}`;

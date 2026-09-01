import type { TabId } from "@/types";

export const TAB_IDS: TabId[] = [
  "doctor",
  "doctors",
  "tests",
  "disease-map",
  "feed",
  "alerts",
  "profile",
];

export function parseHash(hash: string): TabId {
  const raw = hash.replace(/^#\/?/, "");
  return (TAB_IDS as string[]).includes(raw) ? (raw as TabId) : "doctor";
}

export function tabToHash(tab: TabId): string {
  return `/${tab}`;
}

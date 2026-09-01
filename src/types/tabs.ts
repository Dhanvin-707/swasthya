export type TabId =
  | "doctor"
  | "doctors"
  | "tests"
  | "disease-map"
  | "feed"
  | "alerts"
  | "profile";

export const TAB_IDS: readonly TabId[] = [
  "doctor",
  "doctors",
  "tests",
  "disease-map",
  "feed",
  "alerts",
  "profile",
] as const;

export function isTabId(value: string): value is TabId {
  return (TAB_IDS as readonly string[]).includes(value);
}

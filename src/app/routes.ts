import type { TabId } from "../types";

export const TAB_PATHS: Record<TabId, string> = {
  doctor: "/doctor",
  doctors: "/doctors",
  tests: "/tests",
  "disease-map": "/disease-map",
  feed: "/feed",
  alerts: "/alerts",
  profile: "/profile",
};

export function pathToTab(pathname: string): TabId {
  const match = (Object.entries(TAB_PATHS) as [TabId, string][]).find(
    ([, path]) => pathname === path,
  );
  return match ? match[0] : "doctor";
}

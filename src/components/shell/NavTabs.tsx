import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSwasthya } from "@/context/SwasthyaContext";
import { TAB_IDS } from "@/app/routes";
import type { TabId } from "@/types";
import { cn } from "@/lib/utils";

const LABELS: Record<TabId, string> = {
  doctor: "AI Doctor",
  doctors: "Find Doctors",
  tests: "Tests & Vaccines",
  "disease-map": "Disease Map",
  feed: "Health Feed",
  alerts: "Live Alerts",
  profile: "Profile",
};

export function NavTabs() {
  const { activeTab, setActiveTab } = useSwasthya();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (tab: TabId) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <nav aria-label="Main navigation" className="border-b border-line bg-card">
      <div className="mx-auto max-w-6xl px-4">
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-fg lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
          Toggle Navigation Menu
        </button>
        <ul
          id="mobile-nav"
          className={cn("flex-col gap-1 pb-2 lg:flex lg:flex-row lg:gap-0 lg:pb-0", mobileOpen ? "flex" : "hidden")}
        >
          {TAB_IDS.map((tab) => (
            <li key={tab}>
              <button
                type="button"
                aria-current={activeTab === tab ? "page" : undefined}
                onClick={() => go(tab)}
                className={cn(
                  "min-h-11 w-full rounded-lg px-3 text-left text-sm font-semibold lg:w-auto lg:rounded-none lg:border-b-2 lg:border-transparent",
                  activeTab === tab
                    ? "bg-primary-soft text-primary lg:border-primary"
                    : "text-muted hover:bg-primary-soft hover:text-primary",
                )}
              >
                {LABELS[tab]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

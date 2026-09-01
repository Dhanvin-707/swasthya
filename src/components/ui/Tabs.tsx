import { useNavigate } from "react-router-dom";
import type { TabId } from "../../types";
import { useTranslation } from "../../hooks/useTranslation";
import { useSwasthya } from "../../context/SwasthyaContext";
import "./tabs.css";

const TAB_LABEL_KEYS = {
  doctor: "nav.doctor",
  doctors: "nav.doctors",
  tests: "nav.tests",
  "disease-map": "nav.disease",
  feed: "nav.feed",
  alerts: "nav.alerts",
  profile: "nav.profile",
} as const;

export function Tabs({ onNavigate }: { onNavigate?: (tab: TabId) => void }) {
  const { activeTab, setActiveTab } = useSwasthya();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSelect = (tab: TabId) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
    onNavigate?.(tab);
  };

  return (
    <nav className="tabs" aria-label="Primary">
      {(Object.keys(TAB_LABEL_KEYS) as TabId[]).map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={activeTab === tab}
          className={`tabs__tab ${activeTab === tab ? "tabs__tab--active" : ""}`}
          onClick={() => handleSelect(tab)}
        >
          {t(TAB_LABEL_KEYS[tab])}
        </button>
      ))}
    </nav>
  );
}

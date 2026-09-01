import { useTranslation } from "../../hooks/useTranslation";
import { useSwasthya } from "../../context/SwasthyaContext";
import { Button } from "../../components/ui/Button";
import { ChatPanel } from "./ChatPanel";
import { QuickPrompts } from "./QuickPrompts";
import { DrugInteractionPanel } from "./DrugInteractionPanel";
import { HealthVault } from "./HealthVault";
import "./doctor.css";

export function DoctorPage() {
  const { t } = useTranslation();
  const { triggerEmergency108 } = useSwasthya();

  return (
    <div className="doctor-page">
      <div className="doctor-page__hero">
        <div>
          <h1 className="doctor-page__title">{t("doctor.title")}</h1>
          <p className="doctor-page__subtitle">{t("doctor.subtitle")}</p>
          <p className="doctor-page__tagline">{t("doctor.tagline")}</p>
        </div>
        <div className="doctor-page__actions">
          <Button variant="secondary">{t("doctor.bookNearby")}</Button>
          <Button variant="danger" onClick={triggerEmergency108}>
            {t("doctor.call108")}
          </Button>
        </div>
      </div>

      <div className="doctor-page__grid">
        <div className="doctor-page__main">
          <ChatPanel />
          <QuickPrompts />
        </div>
        <div className="doctor-page__side">
          <HealthVault />
          <DrugInteractionPanel />
        </div>
      </div>
    </div>
  );
}

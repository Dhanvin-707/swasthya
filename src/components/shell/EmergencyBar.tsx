import { Ambulance, Phone, Stethoscope, Pill } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import "./shell.css";

const helplines = [
  { href: "tel:108", label: "helpline.ambulance", Icon: Ambulance },
  { href: "tel:112", label: "helpline.national", Icon: Phone },
  { href: "tel:14555", label: "helpline.telehealth", Icon: Stethoscope },
  { href: "tel:1800114477", label: "helpline.janaushadhi", Icon: Pill },
] as const;

export function EmergencyBar() {
  const { t } = useTranslation();

  return (
    <section className="emergency-bar" aria-label={t("helpline.label")}>
      <div className="emergency-bar__heading">
        <span className="emergency-bar__label">{t("helpline.label")}</span>
        <span className="emergency-bar__hint">{t("helpline.hint")}</span>
      </div>
      <div className="emergency-bar__links">
        {helplines.map(({ href, label, Icon }) => (
          <a key={href} href={href} className="emergency-bar__link">
            <Icon aria-hidden="true" size={16} />
            <span>{t(label)}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

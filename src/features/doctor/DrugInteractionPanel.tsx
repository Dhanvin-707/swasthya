import { drugInteractions } from "../../data/drugInteractions";
import { useTranslation } from "../../hooks/useTranslation";
import { Badge } from "../../components/ui/Badge";
import "./doctor.css";

export function DrugInteractionPanel() {
  const { t } = useTranslation();

  return (
    <section className="drug-panel" aria-label={t("doctor.drugInteractions")}>
      <h3 className="drug-panel__title">{t("doctor.drugInteractions")}</h3>
      <ul className="drug-panel__list">
        {drugInteractions.map((item) => (
          <li key={item.drug} className="drug-panel__item">
            <Badge tone="info">{item.drug}</Badge>
            <p>{item.advice}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

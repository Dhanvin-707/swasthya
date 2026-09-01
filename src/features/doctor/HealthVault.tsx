import { FileText } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { useSwasthya } from "../../context/SwasthyaContext";
import { FileUpload } from "./FileUpload";
import "./doctor.css";

export function HealthVault() {
  const { t } = useTranslation();
  const { documents, addChatMessage, markDocumentAttached } = useSwasthya();

  const analyze = (id: string, title: string) => {
    markDocumentAttached(id);
    addChatMessage(t("doctor.analyze"), title);
  };

  return (
    <section className="health-vault" aria-label={t("doctor.vault")}>
      <h3 className="health-vault__title">{t("doctor.reports")}</h3>
      <FileUpload />

      <h4 className="health-vault__list-title">{t("doctor.attached")}</h4>
      {documents.length === 0 ? (
        <p className="health-vault__empty">{t("doctor.dropzone")}</p>
      ) : (
        <ul className="health-vault__list">
          {documents.map((doc) => (
            <li key={doc.id} className="health-vault__item">
              <FileText aria-hidden="true" size={18} />
              <div className="health-vault__item-body">
                <p className="health-vault__item-title">{doc.title}</p>
                <p className="health-vault__item-meta">
                  {doc.facility} · {doc.date} · {doc.type}
                </p>
              </div>
              <button
                type="button"
                className="health-vault__attach"
                onClick={() => analyze(doc.id, doc.title)}
              >
                {t("doctor.analyze")}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

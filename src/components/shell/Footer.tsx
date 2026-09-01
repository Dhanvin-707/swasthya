import { useTranslation } from "../../hooks/useTranslation";
import "./shell.css";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <p className="footer__text">{t("app.footer")}</p>
    </footer>
  );
}

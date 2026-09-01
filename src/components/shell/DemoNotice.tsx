import { useTranslation } from "../../hooks/useTranslation";
import "./shell.css";

export function DemoNotice() {
  const { t } = useTranslation();
  return (
    <div className="demo-notice" role="note">
      {t("demo.notice")}
    </div>
  );
}

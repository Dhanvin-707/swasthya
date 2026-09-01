import type { LanguageCode } from "../../types";
import { t } from "../../i18n/translations";

export function Footer({ language }: { language: LanguageCode }) {
  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm space-y-2">
        <p>
          Swasthya AI • National Digital Health Stack — Unified Healthcare
          Ecosystem for Rural & Underserved Communities
        </p>
        <p className="font-medium text-destructive">
          {t(language, "demoNotice")}
        </p>
        <p>{t(language, "notMedicalAdvice")}</p>
      </div>
    </footer>
  );
}

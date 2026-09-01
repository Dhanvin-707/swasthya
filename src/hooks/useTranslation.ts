import { useCallback } from "react";
import { FALLBACK_LANGUAGE } from "../types";
import { translations, type TranslationKey } from "../i18n/translations";
import { useSwasthya } from "../context/SwasthyaContext";

export function useTranslation() {
  const { language } = useSwasthya();

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const dict = translations[language] ?? translations[FALLBACK_LANGUAGE];
      let text = dict[key] ?? translations[FALLBACK_LANGUAGE][key];
      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          text = text.replace(new RegExp(`\\{${name}\\}`, "g"), String(value));
        }
      }
      return text;
    },
    [language],
  );

  return { t, language };
}

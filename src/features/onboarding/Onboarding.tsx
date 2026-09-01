import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { useSwasthya } from "../../context/SwasthyaContext";
import { citizens } from "../../data/patients";
import { languages } from "../../components/shell/languages";
import { FormField } from "../../components/ui/FormField";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { isValidAadhaar, isValidMobile } from "../../lib/validation";
import type { LanguageCode } from "../../types";
import "./onboarding.css";

export function Onboarding() {
  const { t } = useTranslation();
  const { completeOnboarding } = useSwasthya();

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [errors, setErrors] = useState<{ name?: string; aadhaar?: string; mobile?: string }>({});

  const pickCitizen = (id: string) => {
    const citizen = citizens.find((c) => c.id === id);
    if (!citizen) return;
    setName(citizen.name);
    setAadhaar(citizen.aadhaarNo);
    setMobile(citizen.mobile);
    setErrors({});
  };

  const submitStep1 = () => {
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = t("onboarding.error.empty");
    if (!isValidAadhaar(aadhaar)) nextErrors.aadhaar = t("onboarding.error.aadhaar");
    if (!isValidMobile(mobile)) nextErrors.mobile = t("onboarding.error.mobile");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setStep(2);
  };

  const finish = () => {
    const patient =
      citizens.find((c) => c.aadhaarNo === aadhaar.replace(/\s+/g, "")) ??
      citizens[0];
    completeOnboarding(patient, language);
  };

  return (
    <main className="onboarding">
      <div className="onboarding__brand">
        <h1>{t("app.title")}</h1>
        <p>{t("app.subtitle")}</p>
      </div>

      <Card className="onboarding__card">
        <h2 className="onboarding__title">{t("onboarding.welcome")}</h2>
        <p className="onboarding__subtitle">{t("onboarding.portal")}</p>

        {step === 1 ? (
          <div className="onboarding__step">
            <h3>{t("onboarding.step1")}</h3>
            <p className="onboarding__help">{t("onboarding.enterAadhaar")}</p>

            <div className="onboarding__citizens">
              <span className="onboarding__citizens-label">{t("onboarding.citizens")}</span>
              {citizens.map((citizen) => (
                <button
                  key={citizen.id}
                  type="button"
                  className="onboarding__citizen"
                  onClick={() => pickCitizen(citizen.id)}
                >
                  {citizen.name} ({citizen.age}y)
                </button>
              ))}
            </div>

            <div className="onboarding__fields">
              <FormField
                id="onboard-name"
                label={t("onboarding.name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                autoComplete="name"
              />
              <FormField
                id="onboard-aadhaar"
                label={t("onboarding.aadhaar")}
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                error={errors.aadhaar}
                inputMode="numeric"
                maxLength={12}
              />
              <FormField
                id="onboard-mobile"
                label={t("onboarding.mobile")}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                error={errors.mobile}
                inputMode="tel"
                maxLength={10}
              />
            </div>

            <Button variant="primary" onClick={submitStep1}>
              {t("onboarding.continue")}
            </Button>
          </div>
        ) : (
          <div className="onboarding__step">
            <h3>{t("onboarding.step2")}</h3>
            <p className="onboarding__help">{t("onboarding.languageNote")}</p>

            <label className="onboarding__lang-label" htmlFor="onboard-language">
              {t("onboarding.step2")}
            </label>
            <select
              id="onboard-language"
              className="onboarding__lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>

            <div className="onboarding__actions">
              <Button variant="ghost" onClick={() => setStep(1)}>
                {t("onboarding.back")}
              </Button>
              <Button variant="primary" onClick={finish}>
                {t("onboarding.enterPortal")}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </main>
  );
}

import { useState } from "react";
import { useSwasthya } from "@/context/SwasthyaContext";
import { PATIENTS } from "@/data/patients";
import { LANGUAGES } from "@/i18n/translations";
import { isValidAadhaar, isValidIndianMobile } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { FormField, TextInput } from "@/components/ui/form-field";
import type { LanguageCode } from "@/types";
import { cn } from "@/lib/utils";

export function Onboarding() {
  const { completeOnboarding } = useSwasthya();
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState(PATIENTS[0].id);
  const [aadhaar, setAadhaar] = useState(PATIENTS[0].aadhaar);
  const [mobile, setMobile] = useState(PATIENTS[0].mobile);
  const [errors, setErrors] = useState<{ aadhaar?: string; mobile?: string }>({});
  const [language, setLanguage] = useState<LanguageCode>("en");

  const submitStep1 = () => {
    if (!isValidAadhaar(aadhaar) || !isValidIndianMobile(mobile)) {
      setErrors({
        aadhaar: isValidAadhaar(aadhaar) ? undefined : "Please enter your Aadhaar and Mobile Number.",
        mobile: isValidIndianMobile(mobile) ? undefined : "Enter a valid 10-digit Indian mobile number.",
      });
      return;
    }
    setErrors({});
    setStep(2);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <section aria-label="Onboarding" className="w-full max-w-md rounded-xl border border-line bg-card p-6 shadow-sm">
        {step === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitStep1();
            }}
            className="flex flex-col gap-4"
          >
            <h1 className="text-xl font-extrabold text-primary">Aadhaar &amp; Mobile Demo Sign-up</h1>
            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-semibold text-fg">Choose a demo citizen</legend>
              {PATIENTS.map((p) => (
                <label
                  key={p.id}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-3 py-2",
                    selected === p.id ? "border-primary bg-primary-soft" : "border-line",
                  )}
                >
                  <input
                    type="radio"
                    name="citizen"
                    value={p.id}
                    checked={selected === p.id}
                    onChange={() => {
                      setSelected(p.id);
                      setAadhaar(p.aadhaar);
                      setMobile(p.mobile);
                    }}
                  />
                  <span className="text-sm font-semibold">
                    {p.name} <span className="font-normal text-muted">({p.displayAge})</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <FormField id="aadhaar" label="Aadhaar Number (12 digits)" error={errors.aadhaar}>
              <TextInput
                id="aadhaar"
                inputMode="numeric"
                autoComplete="off"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
              />
            </FormField>
            <FormField id="mobile" label="Mobile Number (+91, 10 digits)" error={errors.mobile}>
              <TextInput
                id="mobile"
                inputMode="numeric"
                autoComplete="off"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </FormField>
            <Button type="submit">Continue</Button>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-extrabold text-primary">Choose Your Preferred Local Language</h1>
            <p className="text-sm text-muted">
              Website interface &amp; AI doctor will transform to your chosen language.
            </p>
            <div role="radiogroup" aria-label="Language" className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((l) => (
                <label
                  key={l.code}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border px-2 text-sm font-semibold",
                    language === l.code ? "border-primary bg-primary-soft text-primary" : "border-line",
                  )}
                >
                  <input
                    type="radio"
                    name="language"
                    value={l.code}
                    checked={language === l.code}
                    onChange={() => setLanguage(l.code)}
                    className="sr-only"
                  />
                  {l.label}
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => completeOnboarding(selected, language)}>
                Continue to Swasthya Portal
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

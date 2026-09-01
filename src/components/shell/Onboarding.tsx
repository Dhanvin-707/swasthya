import { useState } from "react";
import { useSwasthya } from "../../context/SwasthyaContext";
import { patients } from "../../data/patients";
import type { LanguageCode } from "../../types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const languages: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
  { code: "bn", label: "বাংলা" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
];

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { setActivePatientId, setLanguage, language } = useSwasthya();
  const [step, setStep] = useState<1 | 2>(1);
  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(language);

  const pickCitizen = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    if (!patient) return;
    setAadhaar(patient.aadhaar);
    setMobile(patient.mobile);
    setSelectedPatient(id);
  };

  const handleContinue = () => {
    if (!aadhaar || !mobile) {
      setError("Please enter your Aadhaar and Mobile Number.");
      return;
    }
    if (aadhaar.length !== 12 || mobile.length !== 10) {
      setError("Please enter a valid 12-digit Aadhaar and 10-digit mobile number.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleFinish = () => {
    if (selectedPatient) setActivePatientId(selectedPatient);
    setLanguage(selectedLang);
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            {step === 1
              ? "Aadhaar & Mobile Demo Sign-up"
              : "Choose Your Preferred Local Language"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 ? (
            <>
              <p className="text-sm text-muted-foreground">
                Pick a demo citizen to continue.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {patients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => pickCitizen(p.id)}
                    className={`p-3 rounded-lg border text-left transition hover:shadow ${
                      selectedPatient === p.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="font-medium">{p.fullName}</div>
                    <div className="text-xs text-muted-foreground">
                      DOB: {p.dob}
                    </div>
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <label htmlFor="aadhaar" className="block text-sm font-medium">
                  Aadhaar Number
                </label>
                <input
                  id="aadhaar"
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
                  maxLength={12}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="12-digit Aadhaar"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="mobile" className="block text-sm font-medium">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  maxLength={10}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="10-digit mobile"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button onClick={handleContinue} className="w-full">
                Continue
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Website interface & AI doctor will transform to your chosen
                language.
              </p>
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setSelectedLang(l.code)}
                    className={`p-3 rounded-lg border text-left transition hover:shadow ${
                      selectedLang === l.code
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <Button onClick={handleFinish} className="w-full">
                Continue to Swasthya Portal
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

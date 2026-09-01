import { useSwasthya } from "@/context/SwasthyaContext";
import { LANGUAGES } from "@/i18n/translations";
import { PATIENTS } from "@/data/patients";
import type { LanguageCode } from "@/types";

export function Header() {
  const { language, setLanguage, activePatient, setActivePatient, resetDemo } = useSwasthya();
  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <div className="mr-auto">
          <p className="text-lg font-extrabold text-primary">Swasthya AI</p>
          <p className="text-xs text-muted">National Digital Health Stack</p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="sr-only">Choose patient</span>
          <select
            aria-label="Active patient"
            className="min-h-11 rounded-lg border border-line bg-card px-2 text-sm"
            value={activePatient.id}
            onChange={(e) => setActivePatient(e.target.value)}
          >
            {PATIENTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.displayAge})
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="sr-only">Interface language</span>
          <select
            aria-label="Language"
            className="min-h-11 rounded-lg border border-line bg-card px-2 text-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={resetDemo}
          className="min-h-11 rounded-lg border border-line px-3 text-sm font-semibold text-muted hover:bg-primary-soft"
        >
          Sign Out / Switch
        </button>
      </div>
    </header>
  );
}

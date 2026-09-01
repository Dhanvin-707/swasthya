import { ShieldCheck, User } from "lucide-react";
import { useSwasthya } from "../../context/SwasthyaContext";
import { getActivePatient } from "../../context/SwasthyaContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { activePatientId, setActiveTab, resetDemo } = useSwasthya();
  const patient = getActivePatient(activePatientId);

  return (
    <header className="bg-primary text-primary-foreground shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-7 h-7" aria-hidden />
          <div>
            <h1 className="text-lg md:text-xl font-bold leading-tight">
              Swasthya AI
            </h1>
            <p className="text-xs md:text-sm opacity-90">
              National Digital Health Stack
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {patient && (
            <span className="hidden sm:inline text-sm">
              {patient.fullName}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("profile")}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <User className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetDemo}
            className="border-primary-foreground text-primary-foreground hover:bg-primary/20"
          >
            Sign Out / Switch
          </Button>
        </div>
      </div>
    </header>
  );
}

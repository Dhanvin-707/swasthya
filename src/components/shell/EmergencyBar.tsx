import { Phone } from "lucide-react";

const helplines = [
  { label: "108 Ambulance", number: "108", icon: Phone },
  { label: "112 National Emergency", number: "112", icon: Phone },
  { label: "14555 Tele-Health", number: "14555", icon: Phone },
  { label: "Jan Aushadhi", number: "1800114477", icon: Phone },
];

export function EmergencyBar() {
  return (
    <aside
      aria-label="Government health helplines"
      className="bg-red-700 text-white text-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center gap-2">
        <span className="font-semibold hidden sm:inline">
          24x7 Government Health Helplines:
        </span>
        <span className="sr-only">Tap any number to call directly</span>
        {helplines.map((h) => (
          <a
            key={h.number}
            href={`tel:${h.number}`}
            className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white min-h-[44px]"
          >
            <Phone className="w-4 h-4" aria-hidden />
            <span className="font-medium">{h.number}</span>
            <span className="hidden md:inline">— {h.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

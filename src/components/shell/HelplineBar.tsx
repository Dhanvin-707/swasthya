import { Ambulance, Phone, Stethoscope, Pill } from "lucide-react";

const LINES = [
  { icon: Ambulance, label: "108 Ambulance", href: "tel:108" },
  { icon: Phone, label: "112 National Emergency", href: "tel:112" },
  { icon: Stethoscope, label: "14555 Tele-Health", href: "tel:14555" },
  { icon: Pill, label: "1800-11-4477 Jan Aushadhi", href: "tel:1800114477" },
];

export function HelplineBar() {
  return (
    <section aria-label="24x7 Government Health Helplines" className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <p className="text-xs font-semibold">
          24x7 Government Health Helplines <span className="font-normal opacity-80">— tap any number to call directly</span>
        </p>
        <ul className="mt-1 flex flex-wrap gap-x-6 gap-y-1">
          {LINES.map(({ icon: Icon, label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="inline-flex min-h-9 items-center gap-1.5 rounded text-sm font-semibold underline-offset-2 hover:underline"
              >
                <Icon aria-hidden size={16} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

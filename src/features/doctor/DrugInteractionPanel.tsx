import { drugInteractions } from "@/data/drugInteractions";
import { Badge } from "@/components/ui/badge";

export function DrugInteractionPanel() {
  return (
    <section aria-label="Drug interactions" className="rounded-xl border border-line bg-card p-4">
      <h2 className="text-base font-bold text-fg">Drug Interaction Check</h2>
      <ul className="mt-3 flex flex-col gap-3">
        {drugInteractions.map((item) => (
          <li key={item.drug} className="flex flex-col gap-1">
            <Badge tone="info" className="w-fit">
              {item.drug}
            </Badge>
            <p className="text-sm text-muted">{item.advice}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

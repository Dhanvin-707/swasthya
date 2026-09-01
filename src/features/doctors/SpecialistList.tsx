import { Video } from "lucide-react";
import { SPECIALISTS } from "@/data/specialists";
import type { Specialist } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export function SpecialistList({ onBook }: { onBook: (s: Specialist) => void }) {
  return (
    <section aria-label="Tele-consultation specialists" className="flex flex-col gap-3">
      <h2 className="text-base font-bold text-fg">Tele-Consultation Specialists</h2>
      <ul className="grid gap-3 md:grid-cols-3">
        {SPECIALISTS.map((s) => (
          <li key={s.id}>
            <Card className="flex h-full flex-col gap-2">
              <CardTitle>{s.name}</CardTitle>
              <p className="text-sm text-muted">{s.specialty}</p>
              <p className="text-xs text-muted">{s.experience}</p>
              <Badge tone={s.available ? "success" : "warn"}>
                {s.available ? "Available Online" : "In OPD Consultation"}
              </Badge>
              <Button
                variant="secondary"
                className="mt-auto"
                disabled={!s.available}
                onClick={() => onBook(s)}
              >
                <Video aria-hidden size={16} />
                Book Consultation
              </Button>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

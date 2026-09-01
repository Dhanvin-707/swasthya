import { Syringe } from "lucide-react";
import type { Vaccination } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export function VaccinationCard({ vaccination, onBook }: { vaccination: Vaccination; onBook: () => void }) {
  return (
    <Card className="flex h-full flex-col gap-2">
      <CardTitle className="flex items-start gap-2">
        <Syringe aria-hidden size={18} className="mt-0.5 shrink-0 text-accent" />
        {vaccination.name}
      </CardTitle>
      <Badge tone="info">Free — National Immunization Program</Badge>
      <p className="text-sm text-muted">{vaccination.description}</p>
      <p className="text-xs text-muted">Target group: {vaccination.targetGroup}</p>
      <Button variant="secondary" className="mt-auto" onClick={onBook}>
        Book Vaccination
      </Button>
    </Card>
  );
}

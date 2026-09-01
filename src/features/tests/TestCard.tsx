import { Droplets } from "lucide-react";
import type { BloodTest } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export function TestCard({ test, onBook }: { test: BloodTest; onBook: () => void }) {
  return (
    <Card className="flex h-full flex-col gap-2">
      <CardTitle className="flex items-start gap-2">
        <Droplets aria-hidden size={18} className="mt-0.5 shrink-0 text-primary" />
        {test.name}
      </CardTitle>
      <Badge tone="success">Free — Government scheme</Badge>
      <p className="text-sm text-muted">{test.description}</p>
      <ul className="text-xs text-muted">
        <li>{test.fasting}</li>
        <li>{test.reportTime}</li>
      </ul>
      <Button className="mt-auto" onClick={onBook}>
        Book Blood Test
      </Button>
    </Card>
  );
}

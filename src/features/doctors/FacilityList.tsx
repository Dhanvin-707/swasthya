import { MapPin, Navigation, Phone } from "lucide-react";
import type { Facility, GeoResult } from "@/types";
import { haversineKm, etaMinutes } from "@/services/distance";
import { formatKm } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

type FacilityListProps = {
  facilities: Facility[];
  origin: GeoResult | null;
  isFallback: boolean;
  onBook: (facility: Facility) => void;
};

export function FacilityList({ facilities, origin, isFallback, onBook }: FacilityListProps) {
  const sorted = origin
    ? [...facilities].sort(
        (a, b) =>
          haversineKm(origin.lat, origin.lng, a.lat, a.lng) -
          haversineKm(origin.lat, origin.lng, b.lat, b.lng),
      )
    : facilities;

  return (
    <section aria-label="Nearest facilities" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-fg">Nearest Facilities</h2>
        {isFallback && <Badge tone="warn">Offline fallback data</Badge>}
      </div>
      <ul className="flex flex-col gap-3">
        {sorted.map((f) => {
          const km = origin ? haversineKm(origin.lat, origin.lng, f.lat, f.lng) : null;
          return (
            <li key={f.id}>
              <Card className="flex flex-col gap-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <CardTitle>{f.name}</CardTitle>
                  {km !== null && <Badge tone="info">{formatKm(km)} away</Badge>}
                </div>
                <p className="flex items-start gap-1.5 text-sm text-muted">
                  <MapPin aria-hidden size={16} className="mt-0.5 shrink-0" />
                  {f.address}
                </p>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <Phone aria-hidden size={16} />
                  <a href={f.phone.replace(/\s/g, "")} className="text-primary underline-offset-2 hover:underline">
                    {f.phone}
                  </a>
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line px-4 text-sm font-semibold text-fg hover:bg-primary-soft"
                  >
                    <Navigation aria-hidden size={16} />
                    Driving Directions
                    {km !== null && <span className="font-normal text-muted">· ETA ~{etaMinutes(km)} min</span>}
                  </a>
                  <Button onClick={() => onBook(f)}>Book OPD</Button>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

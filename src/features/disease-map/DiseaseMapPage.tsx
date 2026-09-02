import { Component, useState, type ReactNode } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import { AlertTriangle, Info } from "lucide-react";
import { conditions, outbreaks } from "@/data/outbreaks";
import { useSwasthya } from "@/context/SwasthyaContext";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AlertLevel } from "@/types";

const LEVEL_COLOR: Record<AlertLevel, string> = {
  HIGH_ALERT: "#dc2626",
  MEDIUM_ALERT: "#f59e0b",
  LOW_ALERT: "#22c55e",
};

const LEVEL_TONE: Record<AlertLevel, "danger" | "warn" | "success"> = {
  HIGH_ALERT: "danger",
  MEDIUM_ALERT: "warn",
  LOW_ALERT: "success",
};

class MapBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function DiseaseMapPage() {
  const [filter, setFilter] = useState<string>("all");
  const { userLocation } = useSwasthya();

  const filtered = filter === "all" ? outbreaks : outbreaks.filter((o) => o.conditionId === filter);

  const handleReport = () => {
    alert("This is a demo action. In a real system this would open a disease reporting form.");
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
      <header>
        <h1 className="text-xl font-extrabold text-fg">Disease Map (IDSP)</h1>
        <p className="text-sm text-muted">Simulated outbreak surveillance. Last updated: 2026-09-01.</p>
      </header>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Condition filter">
        <Button variant={filter === "all" ? "primary" : "secondary"} size="sm" onClick={() => setFilter("all")}>
          All Tracked Conditions
        </Button>
        {conditions.map((c) => (
          <Button
            key={c.id}
            variant={filter === c.id ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter(c.id)}
          >
            {c.label}
          </Button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[360px] overflow-hidden rounded-xl border border-line"
        role="img"
        aria-label="Outbreak map of hospital case counts"
      >
        <MapBoundary
          fallback={
            <p className="flex h-full items-center justify-center bg-card p-4 text-sm text-muted">
              Map unavailable. The telemetry desk below remains fully usable.
            </p>
          }
        >
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={10}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map((o) => (
              <Circle
                key={o.id}
                center={[o.lat, o.lng]}
                radius={o.cases * 250}
                pathOptions={{ color: LEVEL_COLOR[o.alertLevel], fillOpacity: 0.25 }}
              >
                <Popup>
                  <strong>{o.facility}</strong>
                  <br />
                  Cases: {o.cases}
                  <br />
                  {o.advisory}
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </MapBoundary>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle aria-hidden size={20} className="text-danger" />
            Hospital Case Telemetry Desk
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.map((o) => (
            <div
              key={o.id}
              className="flex flex-col justify-between gap-2 rounded-lg border border-line p-3 md:flex-row md:items-center"
            >
              <div className="min-w-0">
                <p className="font-semibold text-fg">{o.facility}</p>
                <p className="text-sm text-muted">{conditions.find((c) => c.id === o.conditionId)?.label}</p>
                <p className="text-sm text-muted">{o.advisory}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={LEVEL_TONE[o.alertLevel]}>{o.alertLevel}</Badge>
                <span className="text-sm font-semibold text-fg">{o.cases} cases</span>
                <a href={`tel:${o.phone}`} className="text-sm text-primary hover:underline">
                  {o.phone}
                </a>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-2 text-sm text-muted">
            <Info aria-hidden size={16} className="mt-0.5 shrink-0" />
            <span>Data is simulated for demonstration. Not live outbreak telemetry.</span>
          </div>
          <Button variant="secondary" onClick={handleReport} className="w-full">
            Report Case in Hospital Locality
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

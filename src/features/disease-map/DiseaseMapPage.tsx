import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import { AlertTriangle, Info } from "lucide-react";
import { conditions, outbreaks } from "../../data/outbreaks";
import { useSwasthya } from "../../context/SwasthyaContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DiseaseMapPage() {
  const [filter, setFilter] = useState<string>("all");
  const { userLocation } = useSwasthya();

  const filtered =
    filter === "all"
      ? outbreaks
      : outbreaks.filter((o) => o.conditionId === filter);

  const handleReport = () => {
    alert(
      "This is a demo action. In a real system this would open a disease reporting form."
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All Tracked Conditions
        </Button>
        {conditions.map((c) => (
          <Button
            key={c.id}
            variant={filter === c.id ? "default" : "outline"}
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
        className="h-[360px] rounded-xl overflow-hidden border"
      >
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={10}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((o) => (
            <CircleMarker
              key={o.id}
              center={[o.lat, o.lng]}
              radius={Math.max(8, o.cases * 2.5)}
              pathOptions={{
                color:
                  o.alertLevel === "HIGH_ALERT"
                    ? "#dc2626"
                    : o.alertLevel === "MEDIUM_ALERT"
                    ? "#f59e0b"
                    : "#22c55e",
                fillOpacity: 0.6,
              }}
            >
              <Popup>
                <strong>{o.facility}</strong>
                <br />
                Cases: {o.cases}
                <br />
                {o.advisory}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Hospital Case Telemetry Desk
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.map((o) => (
            <div
              key={o.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 rounded-lg border"
            >
              <div>
                <div className="font-medium">{o.facility}</div>
                <div className="text-sm text-muted-foreground">
                  {conditions.find((c) => c.id === o.conditionId)?.label}
                </div>
                <div className="text-sm">{o.advisory}</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    o.alertLevel === "HIGH_ALERT" ? "destructive" : "secondary"
                  }
                >
                  {o.alertLevel}
                </Badge>
                <span className="text-sm font-semibold">{o.cases} cases</span>
                <a
                  href={`tel:${o.phone}`}
                  className="text-sm text-primary hover:underline"
                >
                  {o.phone}
                </a>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              Data is simulated for demonstration. Last updated: 2026-09-01.
            </span>
          </div>
          <Button variant="outline" onClick={handleReport} className="w-full">
            Report Case in Hospital Locality
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

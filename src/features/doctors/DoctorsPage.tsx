import { useState } from "react";
import { FACILITIES } from "@/data/facilities";
import type { Facility, GeoResult, Specialist } from "@/types";
import { getPosition, GEO_MESSAGES, GeoError } from "@/services/geolocation";
import type { GeocodeHit } from "@/services/geocoding";
import { LazyFacilityMap } from "./LazyFacilityMap";
import { LocationSearch, GpsButton } from "./LocationSearch";
import { FacilityList } from "./FacilityList";
import { SpecialistList } from "./SpecialistList";
import { BookingDialog, type BookingTarget } from "./BookingDialog";
import { Card } from "@/components/ui/card";

export default function DoctorsPage() {
  const [location, setLocation] = useState<GeoResult | null>(null);
  const [isFallback, setIsFallback] = useState(true);
  const [gpsStatus, setGpsStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [gpsError, setGpsError] = useState<string>();
  const [target, setTarget] = useState<BookingTarget | null>(null);

  const locate = async () => {
    setGpsStatus("loading");
    setGpsError(undefined);
    try {
      const pos = await getPosition();
      setLocation(pos);
      setIsFallback(false);
      setGpsStatus("success");
    } catch (err) {
      const code = err instanceof GeoError ? err.code : "unavailable";
      setGpsError(GEO_MESSAGES[code]);
      setGpsStatus("error");
      setIsFallback(true);
    }
  };

  const onSearchResult = (hit: GeocodeHit) => {
    setLocation({ lat: hit.lat, lng: hit.lng });
    setIsFallback(false);
  };

  const bookFacility = (f: Facility) =>
    setTarget({
      providerId: f.id,
      providerName: f.name,
      service: "OPD Consultation",
      facilityName: f.name,
    });

  const bookSpecialist = (s: Specialist) =>
    setTarget({
      providerId: s.id,
      providerName: s.name,
      service: "Tele-Consultation",
    });

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <header>
        <h1 className="text-xl font-extrabold text-fg">Find Doctors Nearby</h1>
        <p className="text-sm text-muted">
          Government facilities near you, sorted by distance. Demo data — verify before travelling.
        </p>
      </header>

      <Card className="flex flex-col gap-3">
        <LocationSearch onResult={onSearchResult} />
        <GpsButton status={gpsStatus} errorMessage={gpsError} onLocate={locate} />
      </Card>

      <LazyFacilityMap facilities={FACILITIES} userLocation={location} />

      <FacilityList
        facilities={FACILITIES}
        origin={location}
        isFallback={isFallback}
        onBook={bookFacility}
      />

      <SpecialistList onBook={bookSpecialist} />

      <BookingDialog target={target} onClose={() => setTarget(null)} />
    </div>
  );
}

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Facility, GeoResult } from "@/types";

const facilityIcon = L.divIcon({
  className: "",
  html: '<div style="width:14px;height:14px;border-radius:50%;background:#0e7490;border:2px solid #fff;box-shadow:0 0 0 1px #0e7490"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const userIcon = L.divIcon({
  className: "",
  html: '<div style="width:16px;height:16px;border-radius:50%;background:#15803d;border:2px solid #fff;box-shadow:0 0 0 1px #15803d"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

type FacilityMapProps = {
  facilities: Facility[];
  userLocation: GeoResult | null;
};

export default function FacilityMap({ facilities, userLocation }: FacilityMapProps) {
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [23.24, 77.09];

  return (
    <div className="h-72 w-full overflow-hidden rounded-xl border border-line" role="img" aria-label="Map of nearby health facilities">
      <MapContainer center={center} zoom={11} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} />}
        {facilities.map((f) => (
          <Marker key={f.id} position={[f.lat, f.lng]} icon={facilityIcon}>
            <Popup>{f.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

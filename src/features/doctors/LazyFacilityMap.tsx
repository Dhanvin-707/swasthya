import { Component, Suspense, lazy, type ReactNode } from "react";
import type { Facility, GeoResult } from "@/types";
import { LoadingState } from "@/components/ui/states";

const FacilityMap = lazy(() => import("./FacilityMap"));

class MapBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function LazyFacilityMap({
  facilities,
  userLocation,
}: {
  facilities: Facility[];
  userLocation: GeoResult | null;
}) {
  return (
    <MapBoundary
      fallback={
        <p className="rounded-xl border border-line bg-card p-4 text-sm text-muted">
          Map unavailable. The facility list below remains fully usable.
        </p>
      }
    >
      <Suspense fallback={<LoadingState label="Loading map…" />}>
        <FacilityMap facilities={facilities} userLocation={userLocation} />
      </Suspense>
    </MapBoundary>
  );
}

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { geocodeCity, type GeocodeHit } from "@/services/geocoding";
import { Button } from "@/components/ui/button";

type SearchStatus =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "success"; hit: GeocodeHit };

type LocationSearchProps = {
  onResult: (hit: GeocodeHit, label: string) => void;
};

export function LocationSearch({ onResult }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>({ kind: "idle" });
  const abortRef = useRef<AbortController | null>(null);
  const seqRef = useRef(0);

  useEffect(() => {
    const q = query.trim();
    abortRef.current?.abort();
    if (q.length < 2) {
      setStatus({ kind: "idle" });
      return;
    }
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus({ kind: "loading" });
    const timer = window.setTimeout(async () => {
      const seq = ++seqRef.current;
      try {
        const hit = await geocodeCity(q, controller.signal);
        if (controller.signal.aborted || seq !== seqRef.current) return;
        setStatus({ kind: "success", hit });
        onResult(hit, q);
      } catch (err) {
        if (controller.signal.aborted || seq !== seqRef.current) return;
        const message =
          err instanceof Error && err.name === "AbortError"
            ? ""
            : err instanceof Error
              ? err.message
              : "Geocoding failed. Try another city.";
        if (message) setStatus({ kind: "error", message });
      }
    }, 500);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="city-search" className="text-sm font-semibold text-fg">
        Search any city (India / Madhya Pradesh)
      </label>
      <div className="flex gap-2">
        <input
          id="city-search"
          type="search"
          className="min-h-11 w-full rounded-lg border border-line bg-card px-3 text-sm"
          placeholder="e.g. Sehore, Bhopal, Indore"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {status.kind === "loading" && (
          <span
            aria-hidden
            className="h-5 w-5 self-center animate-spin rounded-full border-2 border-primary border-t-transparent"
          />
        )}
        <Search aria-hidden size={18} className="hidden self-center text-muted sm:block" />
      </div>
      {status.kind === "loading" && (
        <p role="status" className="text-xs text-muted">
          Searching…
        </p>
      )}
      {status.kind === "error" && (
        <p role="alert" className="text-xs font-semibold text-danger">
          {status.message}
        </p>
      )}
      {status.kind === "success" && (
        <p role="status" className="text-xs font-semibold text-accent">
          Showing facilities near {query.trim()}
        </p>
      )}
    </div>
  );
}

export function GpsButton({
  status,
  errorMessage,
  onLocate,
}: {
  status: "idle" | "loading" | "error" | "success";
  errorMessage?: string;
  onLocate: () => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Button
        variant="secondary"
        onClick={onLocate}
        disabled={status === "loading"}
        aria-label="Use My Live GPS Location"
      >
        {status === "loading" ? "Locating…" : "Use My Live GPS Location"}
      </Button>
      {status === "success" && (
        <p role="status" className="text-xs font-semibold text-accent">
          Your GPS Position
        </p>
      )}
      {status === "error" && errorMessage && (
        <p role="alert" className="text-xs font-semibold text-danger">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

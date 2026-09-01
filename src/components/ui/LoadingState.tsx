import { Card } from "./Card";
import "./state.css";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <Card className="state-card" aria-busy="true">
      <span className="state-card__spinner" aria-hidden="true" />
      <p className="state-card__text">{label}</p>
    </Card>
  );
}

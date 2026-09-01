import type { ReactNode } from "react";
import { Card } from "./Card";
import "./state.css";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="state-card">
      <h3 className="state-card__title">{title}</h3>
      {description ? <p className="state-card__text">{description}</p> : null}
      {action}
    </Card>
  );
}

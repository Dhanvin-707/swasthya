import type { ReactNode } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import "./state.css";

interface ErrorStateProps {
  title: string;
  description?: string;
  onRetry?: () => void;
  action?: ReactNode;
}

export function ErrorState({ title, description, onRetry, action }: ErrorStateProps) {
  return (
    <Card className="state-card state-card--error">
      <h3 className="state-card__title">{title}</h3>
      {description ? <p className="state-card__text">{description}</p> : null}
      {onRetry ? <Button onClick={onRetry}>Retry</Button> : action}
    </Card>
  );
}

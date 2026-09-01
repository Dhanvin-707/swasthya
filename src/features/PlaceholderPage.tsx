import { Card } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <EmptyState
      title={title}
      description="This section is owned by another developer and will be implemented in a later branch."
    />
  );
}

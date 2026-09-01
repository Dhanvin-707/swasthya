import type { ReactNode } from "react";

export function EmptyState({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-card p-8 text-center">
      <p className="text-sm text-muted">{title}</p>
      {action}
    </div>
  );
}

export function LoadingState({ label }: { label: string }) {
  return (
    <div role="status" className="flex items-center gap-3 rounded-xl border border-line bg-card p-6">
      <span
        aria-hidden
        className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"
      />
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-col gap-3 rounded-xl border border-danger/30 bg-danger-soft p-6">
      <p className="text-sm font-semibold text-danger">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="min-h-11 self-start rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
        >
          Retry
        </button>
      )}
    </div>
  );
}

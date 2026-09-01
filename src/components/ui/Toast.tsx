import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import "./toast.css";

export interface ToastData {
  id: string;
  message: ReactNode;
  tone?: "success" | "error" | "info";
}

interface ToastProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="toast-region" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: string) => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) {
      const timer = window.setTimeout(() => onDismiss(toast.id), 200);
      return () => window.clearTimeout(timer);
    }
  }, [visible, onDismiss, toast.id]);

  return (
    <div className={`toast toast--${toast.tone ?? "info"}`}>
      <span>{toast.message}</span>
      <button
        type="button"
        className="toast__close"
        onClick={() => setVisible(false)}
        aria-label="Dismiss notification"
      >
        <X aria-hidden="true" size={16} />
      </button>
    </div>
  );
}

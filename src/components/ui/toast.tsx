import { useSwasthya } from "@/context/SwasthyaContext";
import { cn } from "@/lib/utils";

export function ToastViewport() {
  const { toast } = useSwasthya();
  if (!toast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-4 left-1/2 z-[60] w-[min(92vw,24rem)] -translate-x-1/2 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg",
        toast.tone === "success" ? "bg-accent" : "bg-danger",
      )}
    >
      {toast.text}
    </div>
  );
}

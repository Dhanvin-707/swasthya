import type { ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react";
import { X } from "lucide-react";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
};

export function Dialog({ open, onOpenChange, title, children }: DialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-black/50" />
        <BaseDialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-line bg-card p-5 shadow-xl">
          <div className="mb-3 flex items-start justify-between gap-4">
            <BaseDialog.Title className="text-lg font-bold text-fg">{title}</BaseDialog.Title>
            <BaseDialog.Close
              aria-label="Close dialog"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-primary-soft"
            >
              <X aria-hidden size={20} />
            </BaseDialog.Close>
          </div>
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

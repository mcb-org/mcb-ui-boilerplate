import { useEffect } from "react";
import type { FC, MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalShellProps {
  open: boolean;
  title: string;
  kicker?: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}

const ModalShell: FC<ModalShellProps> = ({ open, title, kicker, description, onClose, children }) => {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation();

  return createPortal(
    <div className="fixed inset-0 z-[90] overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex min-h-[calc(100dvh-2rem)] items-start justify-center sm:items-center">
        <div
          role="dialog"
          aria-modal="true"
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[28px] border border-violet-100 bg-white shadow-[0_28px_90px_rgba(76,29,149,0.22)]"
          onClick={stopPropagation}
        >
          <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                {kicker && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-500">{kicker}</p>}
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{title}</h3>
                {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-100 text-slate-400 transition hover:bg-violet-50 hover:text-violet-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ModalShell;

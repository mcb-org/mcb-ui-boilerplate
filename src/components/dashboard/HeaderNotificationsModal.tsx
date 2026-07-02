import type { FC } from "react";
import toast from "react-hot-toast";
import ModalShell from "../ui/ModalShell";

const notifications = [
  { id: "nf-1", category: "System", title: "Starter shell synchronized", detail: "The shared layout, auth screens, and base modules are ready for reuse.", time: "Just now" },
  { id: "nf-2", category: "Design", title: "Custom select pattern enabled", detail: "Dropdowns now follow the same modal-safe and responsive pattern used across other modules.", time: "12 min ago" },
  { id: "nf-3", category: "Planning", title: "Mock data contracts prepared", detail: "Use these example pages as the first step before wiring APIs.", time: "28 min ago" },
];

interface HeaderNotificationsModalProps {
  open: boolean;
  onClose: () => void;
}

const HeaderNotificationsModal: FC<HeaderNotificationsModalProps> = ({ open, onClose }) => {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      kicker="Notification Center"
      title="Starter alerts and updates"
      description="Mock notifications that demonstrate how the shell handles platform-wide alerts."
    >
      <div className="space-y-3">
        {notifications.map((item) => (
          <div key={item.id} className="rounded-[22px] border border-slate-100 bg-slate-50 px-4 py-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.category} · {item.time}</p>
              </div>
              <button
                onClick={() => toast.success(`${item.category} notification marked as reviewed.`)}
                className="rounded-xl border border-violet-200 px-3 py-2 text-xs font-semibold text-violet-700 transition hover:border-violet-300 hover:text-violet-800"
              >
                Mark reviewed
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-600">{item.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300">
          Close
        </button>
        <button onClick={() => toast.success("All notifications marked as read.")} className="rounded-xl bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800">
          Mark all as read
        </button>
      </div>
    </ModalShell>
  );
};

export default HeaderNotificationsModal;

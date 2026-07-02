import { useMemo, useState } from "react";
import type { FC } from "react";
import toast from "react-hot-toast";
import { Bell, ShieldCheck, UserCircle2 } from "lucide-react";
import ModalShell from "../ui/ModalShell";

type HeaderActionMode = "profile" | "security" | "notifications";

interface HeaderActionModalProps {
  mode: HeaderActionMode | null;
  open: boolean;
  userName: string;
  onClose: () => void;
}

const HeaderActionModal: FC<HeaderActionModalProps> = ({ mode, open, userName, onClose }) => {
  const [mfaRequired, setMfaRequired] = useState(true);
  const [releaseAlerts, setReleaseAlerts] = useState(true);
  const [designDigest, setDesignDigest] = useState(true);

  const content = useMemo(() => {
    if (mode === "profile") {
      return {
        kicker: "Profile Center",
        title: "Starter operator profile",
        description: "Mock profile content showing how a reusable shell can expose account, workspace, and access details.",
        body: (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Role", value: "System Designer" },
                { label: "Workspace", value: "Reusable UI Boilerplate" },
                { label: "Scope", value: "Cross-module" },
              ].map((item) => (
                <div key={item.label} className="rounded-[22px] border border-slate-100 bg-slate-50 px-4 py-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-[24px] border border-slate-100 bg-white px-5 py-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <UserCircle2 size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{userName}</h4>
                  <p className="mt-1 text-sm text-slate-500">Primary owner of the starter experience, mock flows, and reusable module shell decisions.</p>
                </div>
              </div>
            </div>
          </div>
        ),
      };
    }

    if (mode === "security") {
      return {
        kicker: "Security Preferences",
        title: "Starter security controls",
        description: "Mock controls for protected actions, session awareness, and reusable privilege settings.",
        body: (
          <div className="space-y-4">
            {[
              {
                label: "Require MFA for critical actions",
                detail: "Protect exports, account changes, and environment-sensitive actions.",
                value: mfaRequired,
                setter: setMfaRequired,
              },
              {
                label: "Show starter release alerts",
                detail: "Notify this operator when reusable shell updates or regressions appear.",
                value: releaseAlerts,
                setter: setReleaseAlerts,
              },
            ].map((item) => (
              <div key={item.label} className="rounded-[24px] border border-slate-100 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => item.setter(!item.value)}
                    className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition ${item.value ? "bg-violet-700" : "bg-slate-200"}`}
                    aria-pressed={item.value}
                  >
                    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${item.value ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ),
      };
    }

    return {
      kicker: "Notification Settings",
      title: "Starter alert preferences",
      description: "Mock notification options for reusable starter updates, design changes, and system prompts.",
      body: (
        <div className="space-y-4">
          <div className="rounded-[24px] border border-slate-100 bg-white px-4 py-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  <Bell size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Design digest</p>
                  <p className="mt-1 text-sm text-slate-500">Receive updates when auth, shell, or component patterns change.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDesignDigest(!designDigest)}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition ${designDigest ? "bg-violet-700" : "bg-slate-200"}`}
                aria-pressed={designDigest}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${designDigest ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
          <div className="rounded-[24px] border border-slate-100 bg-slate-50 px-4 py-4 shadow-sm">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <ShieldCheck size={16} className="text-emerald-600" /> Mock notification channels are wired for UI demonstration and can be replaced with real preferences later.
            </div>
          </div>
        </div>
      ),
    };
  }, [mode, userName, mfaRequired, releaseAlerts, designDigest]);

  if (!mode) return null;

  return (
    <ModalShell open={open} onClose={onClose} kicker={content.kicker} title={content.title} description={content.description}>
      {content.body}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300">Close</button>
        <button onClick={() => { toast.success("Starter preferences saved in mock mode."); onClose(); }} className="rounded-xl bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800">Save changes</button>
      </div>
    </ModalShell>
  );
};

export default HeaderActionModal;

import { useState } from "react";
import type { FC } from "react";
import { ArrowRight, Bell, Layers3, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import toast from "react-hot-toast";
import ModalShell from "../components/ui/ModalShell";
import { useAuth } from "../hooks";

const starterCards = [
  {
    title: "Auth system",
    detail: "Login and registration pages already aligned to your enterprise design language.",
    badge: "Ready",
  },
  {
    title: "Reusable shell",
    detail: "Responsive sidebar, top header, notification modal, and profile action surfaces are already wired.",
    badge: "Shared",
  },
  {
    title: "Starter components",
    detail: "Custom select, modal shell, input blocks, and card rhythm can be reused across future modules.",
    badge: "Scalable",
  },
];

const HomePage: FC = () => {
  const { logout, user } = useAuth();
  const [roadmapOpen, setRoadmapOpen] = useState(false);

  return (
    <div className="space-y-6">
      <section id="overview" className="glass-card rounded-[30px] p-5 shadow-[0_16px_44px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400/80">Starter dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Reusable module command center</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-500">This homepage exists as a reusable blueprint. Use it to start billing, org, HRM, admin, or any future module with the same structure, component rhythm, and responsive shell.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => toast.success("Starter notification flow is active.")} className="inline-flex items-center gap-2 rounded-2xl border border-violet-200 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:text-violet-800">
              <Bell size={16} /> Trigger toast
            </button>
            <button onClick={() => setRoadmapOpen(true)} className="inline-flex items-center gap-2 rounded-2xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-800">
              <Sparkles size={16} /> Open roadmap
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {starterCards.map((card) => (
            <div key={card.title} className="rounded-[24px] border border-slate-100 bg-white px-4 py-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">{card.badge}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workspace" className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="panel-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-400/80">Workspace status</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Reusable structure already prepared</h2>
          <div className="mt-5 space-y-4">
            {[
              "Auth layout and pages aligned to your newer enterprise design pattern.",
              "Main shell includes notifications, profile actions, responsive sidebar, and mock settings.",
              "Custom dropdowns and modal shell are prepared for future module-specific forms.",
              "This boilerplate can now be copied and specialized instead of rebuilt.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[22px] border border-slate-100 bg-slate-50 px-4 py-4">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <ShieldCheck size={16} />
                </div>
                <p className="text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-400/80">Quick launch</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Use this starter for your next module</h2>
          <div className="mt-5 grid gap-3">
            {[
              "Organization module shell",
              "Billing workflow UI",
              "HRM operations center",
              "Admin control surfaces",
            ].map((item) => (
              <button key={item} onClick={() => toast.success(`${item} kickoff started in mock mode.`)} className="flex items-center justify-between rounded-[22px] border border-slate-100 bg-white px-4 py-4 text-left shadow-sm transition hover:border-violet-200 hover:bg-violet-50/30">
                <span className="text-sm font-semibold text-slate-800">{item}</span>
                <ArrowRight size={16} className="text-violet-500" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="settings" className="grid gap-4 lg:grid-cols-3">
        <div className="panel-surface p-5 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-400/80">Starter principles</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">What this boilerplate now gives you</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              { title: "Consistent auth", detail: "Login and registration already match the stronger design pattern." },
              { title: "Shell first", detail: "Sidebar, topbar, notifications, and profile actions are reusable from day one." },
              { title: "Mock-friendly", detail: "You can build UI flows before backend work begins." },
              { title: "Responsive baseline", detail: "The starter is prepared for desktop and smaller screens without collapsing the layout." },
            ].map((item) => (
              <div key={item.title} className="rounded-[22px] border border-slate-100 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-400/80">Session</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Current starter user</h2>
          <div className="mt-5 rounded-[24px] border border-slate-100 bg-slate-50 px-4 py-4">
            <p className="text-lg font-semibold text-slate-900">{user?.name ?? "Starter User"}</p>
            <p className="mt-1 text-sm text-slate-500">{user?.email ?? "starter@medicar.com"}</p>
          </div>
          <div className="mt-4 grid gap-3">
            <button onClick={() => toast.success("Starter pattern notes exported in mock mode.")} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-200 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:text-violet-800">
              <Layers3 size={16} /> Export pattern notes
            </button>
            <button onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700">
              <Wand2 size={16} /> Reset session
            </button>
          </div>
        </div>
      </section>

      <ModalShell
        open={roadmapOpen}
        onClose={() => setRoadmapOpen(false)}
        kicker="Starter Roadmap"
        title="How to use this boilerplate next"
        description="A simple mock planning surface showing how this repo reduces setup time for future modules."
      >
        <div className="space-y-3">
          {[
            "Duplicate the starter and rename the shell to your new module domain.",
            "Replace mock data with domain-specific lists, cards, and actions.",
            "Keep the shared auth, modal, dropdown, and shell structure intact.",
            "Expand the UI kit page with module-specific sections as the project grows.",
          ].map((step, index) => (
            <div key={step} className="rounded-[22px] border border-slate-100 bg-slate-50 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">Step {index + 1}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step}</p>
            </div>
          ))}
        </div>
      </ModalShell>
    </div>
  );
};

export default HomePage;

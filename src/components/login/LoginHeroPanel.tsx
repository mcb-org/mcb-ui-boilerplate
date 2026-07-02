import type { FC } from "react";
import { Activity, BadgeCheck, Building2, Users2 } from "lucide-react";

const highlights = [
  {
    title: "Module-ready foundation",
    description: "Start new products, org, HRM, or admin modules from a consistent, polished auth experience.",
    icon: Activity,
  },
  {
    title: "Pattern-safe scaling",
    description: "Carry the same buttons, cards, forms, modal rhythm, and layout logic into every future project.",
    icon: BadgeCheck,
  },
];

const metrics = [
  { label: "Starter sections", value: "12" },
  { label: "Reusable blocks", value: "20+" },
  { label: "Mock-ready flows", value: "100%" },
];

const LoginHeroPanel: FC = () => (
  <div className="relative flex w-full flex-col overflow-hidden bg-[linear-gradient(145deg,#2e1065_0%,#5b21b6_42%,#7c3aed_100%)] px-5 py-6 sm:px-7 sm:py-7 lg:min-h-[700px] lg:w-[50%] lg:px-8 lg:py-8 xl:px-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(196,181,253,0.22),transparent_26%)]" />
    <div className="absolute -right-14 top-24 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute -bottom-12 left-10 h-40 w-40 rounded-full bg-fuchsia-300/20 blur-3xl" />

    <div className="relative z-10 flex h-full flex-col">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-bold text-white backdrop-blur">
          MC
        </div>
        <div>
          <div className="text-base font-bold tracking-tight text-white">MCB UI Boilerplate</div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-violet-100/80">Reusable Starter</div>
        </div>
      </div>

      <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-50 backdrop-blur">
        <Building2 size={13} /> Enterprise UI Foundation
      </div>

      <div className="mt-5 max-w-lg">
        <h1 className="text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[2.4rem] xl:text-[2.9rem]">
          Every module starts faster when the design system is already solved.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-violet-100/88">
          Use this starter for polished auth flows, responsive shell layouts, mock-ready modals, and reusable component patterns across billing, org, HRM, and admin products.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-[22px] border border-white/15 bg-white/10 px-4 py-3.5 backdrop-blur">
            <div className="text-xl font-extrabold text-white">{metric.value}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-violet-100/80">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 xl:grid-cols-2">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/12 text-white">
                <Icon size={18} />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-violet-100/82">{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-[26px] border border-white/15 bg-slate-950/20 p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
            <Users2 size={20} />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-100/90">Built for repeatable delivery</div>
            <p className="mt-2 text-sm leading-6 text-violet-50/85">
              Copy this structure into new projects and spend your time on module logic instead of rebuilding the same UI foundation every time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginHeroPanel;

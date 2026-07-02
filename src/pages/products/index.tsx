import { useState } from "react";
import type { FC } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import InputField from "../../components/login/InputField";
import CustomSelect from "../../components/ui/CustomSelect";
import ModalShell from "../../components/ui/ModalShell";

const toneOptions = [
  { value: "violet", label: "Violet starter", hint: "Matches the shared enterprise shell" },
  { value: "emerald", label: "Emerald variant", hint: "Alternative tone for finance or ops pages" },
  { value: "amber", label: "Amber variant", hint: "Good for alerts, audits, and status-heavy flows" },
];

const Products: FC = () => {
  const [selectValue, setSelectValue] = useState(toneOptions[0].value);
  const [demoInput, setDemoInput] = useState("");
  const [demoPassword, setDemoPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <section className="glass-card rounded-[30px] p-5 shadow-[0_16px_44px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400/80">UI Foundations</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Boilerplate component reference</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">Use this page as a quick reminder of the reusable patterns already included in the starter before you begin a new module.</p>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="panel-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-400/80">Form toolkit</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Shared input and dropdown patterns</h2>
          <div className="mt-5 space-y-4">
            <CustomSelect label="Tone preset" value={selectValue} options={toneOptions} onChange={setSelectValue} />
            <InputField label="Starter input" value={demoInput} onChange={setDemoInput} placeholder="Reusable text field example" />
            <InputField
              label="Starter password"
              value={demoPassword}
              onChange={setDemoPassword}
              placeholder="Reusable password field example"
              type={showPassword ? "text" : "password"}
              suffix={<button type="button" onClick={() => setShowPassword((value) => !value)} className="text-slate-400 transition hover:text-violet-600" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
            />
          </div>
        </div>

        <div className="panel-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-400/80">Reusable actions</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Buttons, cards, and modal trigger</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Primary page CTA",
              "Secondary shell action",
              "Modal opener",
              "Mock save flow",
            ].map((item) => (
              <button key={item} onClick={() => item === "Modal opener" ? setModalOpen(true) : toast.success(`${item} triggered in mock mode.`)} className="rounded-[22px] border border-slate-100 bg-slate-50 px-4 py-4 text-left transition hover:border-violet-200 hover:bg-white">
                <p className="text-sm font-semibold text-slate-900">{item}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">Reusable interaction surface for new modules.</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <ModalShell open={modalOpen} onClose={() => setModalOpen(false)} kicker="Component Demo" title="Reusable starter modal" description="Use this modal shell for settings, details, approval flows, and mock previews in new modules.">
        <div className="rounded-[24px] border border-slate-100 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
          This is the shared modal presentation layer. Keep this structure, replace the content with module-specific actions, and you get consistent interaction quality across projects.
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button onClick={() => setModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300">Close</button>
          <button onClick={() => { toast.success("Reusable modal action confirmed."); setModalOpen(false); }} className="rounded-xl bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800">Confirm action</button>
        </div>
      </ModalShell>
    </div>
  );
};

export default Products;

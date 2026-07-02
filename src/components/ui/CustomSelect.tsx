import { useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";
import { Check, ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
  hint?: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

const CustomSelect: FC<CustomSelectProps> = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const selected = useMemo(
    () => options.find((option) => option.value === value) ?? options[0],
    [options, value],
  );

  return (
    <div ref={rootRef} className={`relative space-y-2 ${open ? "z-[120]" : "z-0"}`}>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative overflow-visible">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between rounded-2xl border border-violet-100 bg-white px-4 py-3 text-left shadow-sm transition hover:border-violet-200 focus:border-violet-300 focus:outline-none focus:ring-4 focus:ring-violet-100"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900">{selected.label}</div>
            {selected.hint && <div className="mt-0.5 text-xs text-slate-500">{selected.hint}</div>}
          </div>
          <ChevronDown size={18} className={`ml-3 flex-shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[130] overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-[0_20px_60px_rgba(76,29,149,0.16)]">
            <div role="listbox" className="max-h-72 overflow-y-auto p-2">
              {options.map((option) => {
                const active = option.value === selected.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${active ? "bg-violet-50 text-violet-700" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{option.label}</div>
                      {option.hint && <div className="mt-0.5 text-xs text-slate-500">{option.hint}</div>}
                    </div>
                    {active && <Check size={16} className="ml-3 flex-shrink-0 text-violet-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;

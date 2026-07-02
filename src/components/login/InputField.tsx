import type { FC, ReactNode } from "react";

const InputField: FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rightLabel?: ReactNode;
  suffix?: ReactNode;
}> = ({ label, type = "text", value, onChange, placeholder, rightLabel, suffix }) => {
  return (
    <label className="block space-y-2">
      <span className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-700">
        <span>{label}</span>
        {rightLabel}
      </span>
      <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-3 shadow-sm transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
        {suffix}
      </div>
    </label>
  );
};

export default InputField;

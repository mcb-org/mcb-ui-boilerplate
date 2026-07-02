import type { FC } from "react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import LoginFormShell from "../../components/login/LoginFormShell";
import LoginHeroPanel from "../../components/login/LoginHeroPanel";
import InputField from "../../components/login/InputField";
import CustomSelect from "../../components/ui/CustomSelect";
import { useAuth } from "../../hooks";

const roleOptions = [
  { value: "designer", label: "Design Owner", hint: "Own shared UI patterns and reusable shell decisions" },
  { value: "developer", label: "Frontend Developer", hint: "Turn the starter into working product modules" },
  { value: "reviewer", label: "Reviewer", hint: "Validate flow quality, responsiveness, and handoff readiness" },
];

const workspaceOptions = [
  { value: "starter", label: "Starter Workspace", hint: "Primary reusable design system foundation" },
  { value: "sandbox", label: "Sandbox Preview", hint: "Mock mode for validating ideas and flows" },
  { value: "handoff", label: "Handoff Workspace", hint: "Prepared surface for stakeholders and future teams" },
];

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [role, setRole] = useState(roleOptions[0].value);
  const [workspace, setWorkspace] = useState(workspaceOptions[0].value);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [trustedDevice, setTrustedDevice] = useState(true);
  const [error, setError] = useState("");

  const selectedWorkspace = useMemo(() => workspaceOptions.find((option) => option.value === workspace)?.label ?? "Starter Workspace", [workspace]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please complete all registration fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const mockUser = { id: 1, email, name };
      localStorage.setItem("authToken", "mock-token-123");
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("starterWorkspace", workspace);
      localStorage.setItem("starterRole", role);

      await toast.promise(
        login(email, password),
        {
          loading: "Provisioning starter access...",
          success: `Starter account created for ${selectedWorkspace}.`,
          error: "Registration failed. Please try again.",
        },
        { success: { duration: 1800 } },
      );

      if (!trustedDevice) {
        localStorage.removeItem("starterWorkspace");
        localStorage.removeItem("starterRole");
      }

      navigate("/");
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex w-full max-w-[1360px] flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white/50 shadow-[0_30px_100px_rgba(76,29,149,0.12)] backdrop-blur-xl lg:min-h-[700px] lg:flex-row">
      <LoginHeroPanel />

      <LoginFormShell>
        <div className="flex h-full flex-col justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
              <ShieldCheck size={14} /> Boilerplate Provisioning
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Create starter access</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Set up a reusable workspace account for design, development, and future module bootstrapping.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid gap-4 xl:grid-cols-2">
              <CustomSelect label="Access role" value={role} options={roleOptions} onChange={setRole} />
              <CustomSelect label="Workspace" value={workspace} options={workspaceOptions} onChange={setWorkspace} />
            </div>

            <InputField label="Full name" value={name} onChange={setName} placeholder="Starter owner name" suffix={<UserRound size={18} className="text-slate-400" />} />
            <InputField label="Workspace email" value={email} onChange={setEmail} placeholder="starter@medicar.com" type="email" suffix={<Mail size={18} className="text-slate-400" />} />

            <div className="grid gap-4 xl:grid-cols-2">
              <InputField
                label="Password"
                value={password}
                onChange={setPassword}
                placeholder="Create a secure password"
                type={showPassword ? "text" : "password"}
                suffix={<button type="button" onClick={() => setShowPassword((current) => !current)} className="text-slate-400 transition hover:text-violet-600" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
              />
              <InputField
                label="Confirm password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Re-enter your password"
                type={showConfirmPassword ? "text" : "password"}
                rightLabel={<Link to="/login" className="text-xs font-semibold text-violet-600 hover:text-violet-700">Back to login</Link>}
                suffix={<button type="button" onClick={() => setShowConfirmPassword((current) => !current)} className="text-slate-400 transition hover:text-violet-600" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
              />
            </div>

            <div className="flex flex-col gap-3 rounded-[24px] border border-violet-100 bg-violet-50/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" checked={trustedDevice} onChange={(event) => setTrustedDevice(event.target.checked)} className="h-4 w-4 rounded border-violet-200 text-violet-700 focus:ring-violet-500" />
                Trust this starter device for 30 days
              </label>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                <LockKeyhole size={14} /> Mock MFA enforced
              </div>
            </div>

            {error && <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div>}

            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-violet-700 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(124,58,237,0.24)] transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Creating starter account..." : "Create Starter Account"}
            </button>
          </form>

          <div className="flex flex-col gap-4 rounded-[28px] border border-violet-100 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Already have access?</p>
              <p className="text-xs text-slate-500">Use the login screen and jump directly into the reusable module shell.</p>
            </div>
            <Link to="/login" className="inline-flex items-center justify-center rounded-xl border border-violet-200 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:text-violet-800">
              Go to login
            </Link>
          </div>
        </div>
      </LoginFormShell>
    </div>
  );
};

export default RegisterPage;

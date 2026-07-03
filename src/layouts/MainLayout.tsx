import { useEffect, useMemo, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import {
  Bell,
  ChevronDown,
  Command,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  Shield,
  UserCircle2,
  X,
} from "lucide-react";
import HeaderActionModal from "../components/dashboard/HeaderActionModal";
import HeaderNotificationsModal from "../components/dashboard/HeaderNotificationsModal";
import { useAuth } from "../hooks";

type HeaderActionMode = "profile" | "security" | "notifications" | null;

interface MainLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Overview", href: "/#overview", icon: <LayoutDashboard size={16} />, description: "Starter command center" },
  { label: "Workspace", href: "/#workspace", icon: <Sparkles size={16} />, description: "Reusable module foundation" },
  { label: "UI Kit", href: "/products", icon: <Package size={16} />, description: "Design reference page" },
  { label: "Settings", href: "/#settings", icon: <Settings size={16} />, description: "Pattern and shell controls" },
];

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [headerActionMode, setHeaderActionMode] = useState<HeaderActionMode>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const { logout, user } = useAuth();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");

    const update = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : media.matches;
      setIsMobile(matches);
      setCollapsed(matches);
      if (!matches) {
        setMobileSidebarOpen(false);
      }
    };

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!profileRef.current?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileSidebarOpen]);

  const initials = useMemo(
    () => (user?.name ?? "Starter User").split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase(),
    [user?.name],
  );

  const sidebarWidth = isMobile ? 280 : collapsed ? 76 : 280;

  return (
    <>
      <div className="flex min-h-screen bg-transparent text-slate-900">
        {isMobile && mobileSidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar overlay"
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden"
          />
        )}

        <aside
          className={`flex h-screen flex-shrink-0 flex-col overflow-hidden border-r border-violet-900/50 bg-gradient-to-b from-violet-950 via-violet-900 to-indigo-950 text-white ${isMobile ? "fixed left-0 top-0 z-50" : "sticky top-0"}`}
          style={{
            width: sidebarWidth,
            transition: "width 0.24s cubic-bezier(.4,0,.2,1), transform 0.24s cubic-bezier(.4,0,.2,1)",
            transform: isMobile ? (mobileSidebarOpen ? "translateX(0)" : "translateX(-100%)") : "translateX(0)",
          }}
        >
          <div className={`flex h-[68px] items-center gap-3 border-b border-white/10 px-4 ${collapsed && !isMobile ? "justify-center" : ""}`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-fuchsia-400 shadow-lg shadow-violet-900/20">
              <Command size={18} className="text-white" />
            </div>
            {(!collapsed || isMobile) && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold tracking-wide text-white">MCB UI Boilerplate</p>
                <p className="text-xs text-violet-200/70">Reusable module shell</p>
              </div>
            )}
            <button
              onClick={() => {
                if (isMobile) {
                  setMobileSidebarOpen(false);
                } else {
                  setCollapsed((value) => !value);
                }
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-violet-200/80 transition hover:bg-white/10 hover:text-white"
              aria-label={isMobile ? "Close sidebar" : collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isMobile ? <X size={16} /> : collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>

          <nav className="scrollbar flex-1 overflow-y-auto px-3 py-4">
            {(!collapsed || isMobile) && <p className="px-2 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-300/50">Starter sections</p>}
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  title={collapsed && !isMobile ? item.label : undefined}
                  onClick={() => {
                    if (isMobile) setMobileSidebarOpen(false);
                  }}
                  className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-violet-100/80 transition hover:bg-white/10 hover:text-white ${collapsed && !isMobile ? "justify-center" : ""}`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-violet-100/80 transition group-hover:bg-white/15 group-hover:text-white">{item.icon}</span>
                  {(!collapsed || isMobile) && (
                    <div className="min-w-0">
                      <p className="truncate">{item.label}</p>
                      <p className="truncate text-[11px] font-medium text-violet-200/55">{item.description}</p>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </nav>

          <div className="border-t border-white/10 px-3 py-3">
            <button onClick={logout} className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-violet-100/80 transition hover:bg-rose-500/10 hover:text-rose-100 ${collapsed && !isMobile ? "justify-center" : ""}`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5"><LogOut size={16} /></span>
              {(!collapsed || isMobile) && "Log Out"}
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col lg:pl-0">
          <header className="sticky top-0 z-40 flex h-[68px] flex-shrink-0 items-center gap-3 border-b border-violet-100 bg-white/95 px-4 shadow-sm backdrop-blur md:px-6">
            {isMobile && (
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-100 text-violet-500 transition hover:bg-violet-50 hover:text-violet-700 lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={18} />
              </button>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-400/80 sm:text-xs sm:tracking-[0.28em]">Boilerplate overview</p>
              <h1 className="truncate text-sm font-semibold text-slate-900 sm:text-base md:text-lg">Reusable module UI starter</h1>
            </div>
            <button onClick={() => setNotificationsOpen(true)} className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-100 text-violet-500 transition hover:bg-violet-50 hover:text-violet-700" aria-label="Open notifications">
              <Bell size={16} />
              <span className="absolute right-[9px] top-[9px] h-2 w-2 rounded-full bg-violet-500 ring-2 ring-white" />
            </button>
            <div ref={profileRef} className="relative">
              <button onClick={() => setProfileOpen((value) => !value)} className="flex items-center gap-2 rounded-2xl border border-violet-100 bg-white px-2 py-1.5 shadow-sm transition hover:border-violet-200 sm:gap-3" aria-haspopup="menu" aria-expanded={profileOpen}>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-xs font-bold text-violet-700">{initials}</div>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-semibold text-slate-900">{user?.name ?? "Starter User"}</p>
                  <p className="text-xs text-slate-500">Pattern Owner</p>
                </div>
                <ChevronDown size={14} className={`hidden text-slate-400 transition md:block ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(22rem,calc(100vw-1rem))] overflow-hidden rounded-[24px] border border-violet-100 bg-white shadow-[0_22px_60px_rgba(76,29,149,0.16)]">
                  <div className="border-b border-slate-100 bg-violet-50/70 px-4 py-4">
                    <p className="text-sm font-semibold text-slate-900">{user?.name ?? "Starter User"}</p>
                    <p className="mt-1 text-xs text-slate-500">Reusable shell owner · Cross-module visibility</p>
                  </div>
                  <div className="p-2">
                    {[
                      { label: "View profile", action: () => setHeaderActionMode("profile"), icon: <UserCircle2 size={16} /> },
                      { label: "Security preferences", action: () => setHeaderActionMode("security"), icon: <Shield size={16} /> },
                      { label: "Notification settings", action: () => setHeaderActionMode("notifications"), icon: <Bell size={16} /> },
                      { label: "Open starter settings", action: () => { window.location.hash = "settings"; }, icon: <Settings size={16} /> },
                    ].map((item) => (
                      <button key={item.label} onClick={() => { item.action(); setProfileOpen(false); }} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-violet-700">
                        <span className="text-violet-500">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                    <button onClick={logout} className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </header>

          <main className="scrollbar flex-1 overflow-auto px-4 py-4 md:px-6 md:py-6 xl:px-8">{children}</main>
        </div>
      </div>

      <HeaderNotificationsModal open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <HeaderActionModal open={headerActionMode !== null} mode={headerActionMode} userName={user?.name ?? "Starter User"} onClose={() => setHeaderActionMode(null)} />
    </>
  );
};

export default MainLayout;

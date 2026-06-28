import { useState } from "react";
import type { FC, ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  FileText,
  Shield,
  Bell,
  Package,
  CreditCard,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  UserCheck,
  FileKey,
  AlertCircle,
  List,
  RotateCcw,
  Zap,
  TrendingUp,
  Receipt,
  RefreshCw,
  User,
  Bell as BellIcon,
  Key,
} from "lucide-react";
import { useAuth } from "../hooks";


interface SubMenuItem {
  label: string;
  href: string;
  icon?: ReactNode;
  permission: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  permission: string;
  badge?: string;
  subMenu?: SubMenuItem[];
}

interface MainLayoutProps {
  children: ReactNode;
  userPermissions?: Set<string>;
}

const DEFAULT_PERMISSIONS = new Set([
  "dashboard",
  "users.list",
  "users.roles",
  "orders.list",
  "orders.returns",
  "reports.sales",
  "settings.profile",
  "settings.notifications",
  "products.list",
  "products.inventory",
]);

const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
    href: "/",
    permission: "dashboard",
  },
  {
    id: "users",
    label: "Users",
    icon: <Users size={16} />,
    permission: "users",
    badge: "Admin",
    subMenu: [
      {
        label: "All Users",
        href: "/users",
        permission: "users.list",
        icon: <UserCheck size={14} />,
      },
      {
        label: "Roles & Permissions",
        href: "/users/roles",
        permission: "users.roles",
        icon: <Shield size={14} />,
      },
      {
        label: "Audit Log",
        href: "/users/audit",
        permission: "users.audit",
        icon: <FileKey size={14} />,
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: <ShoppingCart size={16} />,
    permission: "orders",
    subMenu: [
      {
        label: "All Orders",
        href: "/orders",
        permission: "orders.list",
        icon: <List size={14} />,
      },
      {
        label: "Returns",
        href: "/orders/returns",
        permission: "orders.returns",
        icon: <RotateCcw size={14} />,
      },
      {
        label: "Disputes",
        href: "/orders/disputes",
        permission: "orders.disputes",
        icon: <AlertCircle size={14} />,
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    icon: <Package size={16} />,
    permission: "products",
    subMenu: [
      {
        label: "Catalogue",
        href: "/products",
        permission: "products.list",
        icon: <Package size={14} />,
      },
      {
        label: "Inventory",
        href: "/products/inventory",
        permission: "products.inventory",
        icon: <Zap size={14} />,
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 size={16} />,
    permission: "analytics",
    subMenu: [
      {
        label: "Overview",
        href: "/analytics",
        permission: "analytics.overview",
        icon: <BarChart3 size={14} />,
      },
      {
        label: "Funnels",
        href: "/analytics/funnels",
        permission: "analytics.funnels",
        icon: <TrendingUp size={14} />,
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: <FileText size={16} />,
    permission: "reports",
    subMenu: [
      {
        label: "Sales Report",
        href: "/reports/sales",
        permission: "reports.sales",
        icon: <BarChart3 size={14} />,
      },
      {
        label: "Revenue",
        href: "/reports/revenue",
        permission: "reports.revenue",
        icon: <TrendingUp size={14} />,
      },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    icon: <CreditCard size={16} />,
    permission: "billing",
    subMenu: [
      {
        label: "Invoices",
        href: "/billing/invoices",
        permission: "billing.invoices",
        icon: <Receipt size={14} />,
      },
      {
        label: "Subscriptions",
        href: "/billing/subscriptions",
        permission: "billing.subscriptions",
        icon: <RefreshCw size={14} />,
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: <Shield size={16} />,
    href: "/security",
    permission: "security",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings size={16} />,
    permission: "settings",
    subMenu: [
      {
        label: "Profile",
        href: "/settings/profile",
        permission: "settings.profile",
        icon: <User size={14} />,
      },
      {
        label: "Notifications",
        href: "/settings/notifications",
        permission: "settings.notifications",
        icon: <BellIcon size={14} />,
      },
      {
        label: "API Keys",
        href: "/settings/api",
        permission: "settings.api",
        icon: <Key size={14} />,
      },
    ],
  },
];

function canSeeMenu(item: MenuItem, perms: Set<string>): boolean {
  if (item.subMenu) return item.subMenu.some((s) => perms.has(s.permission));
  return perms.has(item.permission);
}

const NavItem: FC<{
  item: MenuItem;
  perms: Set<string>;
  collapsed: boolean;
}> = ({ item, perms, collapsed }) => {
  const [open, setOpen] = useState(false);
  const hasSub = !!item.subMenu;

  if (!canSeeMenu(item, perms)) return null;

  return (
    <div>
      <button
        onClick={() => hasSub && setOpen((v) => !v)}
        title={collapsed ? item.label : undefined}
        className={[
          "w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13px] font-medium",
          "transition-all duration-150 group relative",
          open
            ? "bg-indigo-50 text-indigo-700"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          collapsed ? "justify-center" : "",
        ].join(" ")}
      >
        {/* Active pill */}
        {open && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-indigo-500 rounded-r-full" />
        )}

        {/* Icon wrapper */}
        <span
          className={[
            "flex-shrink-0 flex items-center justify-center w-[30px] h-[30px] rounded-lg transition-colors duration-150",
            open
              ? "bg-indigo-100 text-indigo-600"
              : "text-gray-400 group-hover:text-gray-600 group-hover:bg-gray-100",
          ].join(" ")}
        >
          {item.icon}
        </span>
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>

            {item.badge && (
              <span className="text-[10px] font-semibold px-1.5 py-[2px] rounded-md bg-indigo-50 text-indigo-500 leading-none border border-indigo-100">
                {item.badge}
              </span>
            )}

            {hasSub && (
              <ChevronDown
                size={13}
                className={[
                  "flex-shrink-0 text-gray-400 transition-transform duration-200",
                  open ? "rotate-180" : "",
                ].join(" ")}
              />
            )}
          </>
        )}
      </button>

      {/* Submenu */}
      {hasSub && !collapsed && (
        <div
          className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
          style={{
            maxHeight: open ? `${item.subMenu!.length * 34 + 8}px` : "0px",
          }}
        >
          <div className="ml-[18px] pl-3.5 border-l border-gray-100 mt-0.5 mb-1 space-y-0.5">
            {item.subMenu!.map((sub) => {
              const allowed = perms.has(sub.permission);
              return (
                allowed && (
                  <a
                  key={sub.label}
                  href={allowed ? sub.href : undefined}
                  className={[
                    "flex items-center gap-2 px-2.5 py-[6px] rounded-md text-[12px] transition-all duration-100",
                    allowed
                      ? "text-gray-500 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
                      : "text-gray-300 hidden select-none",
                  ].join(" ")}
                >
                  {sub.icon && (
                    <span className="flex-shrink-0 text-gray-400">
                      {sub.icon}
                    </span>
                  )}
                  <span className="truncate flex-1">{sub.label}</span>
                </a>
                )
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar: FC<{
  perms: Set<string>;
  collapsed: boolean;
  onToggle: () => void;
}> = ({ perms, collapsed, onToggle }) => {
   const { logout,} = useAuth();
  return (
    <aside
      className="flex flex-col bg-white border-r border-gray-100 h-screen sticky top-0 flex-shrink-0 overflow-hidden"
      style={{
        width: collapsed ? 64 : 224,
        transition: "width 0.22s cubic-bezier(.4,0,.2,1)",
      }}
    >
      {/* Header */}
      <div
        className={[
          "flex items-center h-[56px] border-b border-gray-100 flex-shrink-0 px-3 gap-2",
          collapsed ? "justify-center" : "",
        ].join(" ")}
      >
        {!collapsed && (
          <>
            <div className="w-[28px] h-[28px] rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <LayoutDashboard size={13} className="text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900 tracking-tight flex-1 truncate">
              Medi Car
            </span>
          </>
        )}
        <button
          onClick={onToggle}
          className={[
            "flex-shrink-0 flex items-center justify-center w-[28px] h-[28px] rounded-lg",
            "text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150",
            collapsed ? "mx-auto" : "",
          ].join(" ")}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <PanelLeftOpen size={15} />
          ) : (
            <PanelLeftClose size={15} />
          )}
        </button>
      </div>
      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {!collapsed && (
          <p className="text-[10px] font-bold tracking-[0.12em] text-gray-300 uppercase px-2.5 pt-1 pb-2">
            Main Menu
          </p>
        )}
        <div className="space-y-0.5">
          {MENU_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              perms={perms}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 px-2 py-2 space-y-0.5 flex-shrink-0">
        <button
          onClick={logout}
          title={collapsed ? "Log Out" : undefined}
          className={[
            "w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13px] font-medium",
            "text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150",
            collapsed ? "justify-center" : "",
          ].join(" ")}
        >
          <span className="flex-shrink-0 w-[30px] h-[30px] flex items-center justify-center">
            <LogOut size={16} />
          </span>
          {!collapsed && "Log Out"}
        </button>
      </div>
    </aside>
  );
};

const MainLayout: FC<MainLayoutProps> = ({
  children,
  userPermissions = DEFAULT_PERMISSIONS,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        perms={userPermissions}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-[56px] bg-white border-b border-gray-100 flex items-center px-5 gap-3 sticky top-0 z-10 flex-shrink-0">
          <h1 className="text-sm font-semibold text-gray-900 flex-1">
            Dashboard
          </h1>
          <button className="relative w-[34px] h-[34px] rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
            <Bell size={16} />
            <span className="absolute top-[8px] right-[8px] w-[7px] h-[7px] rounded-full bg-indigo-500 border-2 border-white" />
          </button>

          <div className="w-[34px] h-[34px] rounded-full bg-indigo-100 flex items-center justify-center cursor-pointer">
            <span className="text-[10px] font-bold text-indigo-600">JD</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
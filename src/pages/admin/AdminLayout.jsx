import { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { LayoutDashboard, Inbox, Package, FolderKanban, Image, LogOut, Menu, X, ExternalLink } from "lucide-react";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { to: "/admin/products", label: "Spoilers", icon: Package },
  { to: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { to: "/admin/media", label: "Media", icon: Image },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-border">
          <Link to="/admin" className="flex items-center gap-2.5">
            <span className="relative inline-flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 border-2 border-primary rotate-45" />
              <span className="h-2 w-2 bg-primary" />
            </span>
            <span className="font-heading font-bold text-sm tracking-tight">CARBO<span className="text-primary">TECH</span></span>
          </Link>
          <button className="lg:hidden text-muted-foreground" onClick={() => setOpen(false)} aria-label="Close sidebar"><X size={18} /></button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors min-h-[44px] ${
                  isActive ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-muted-foreground hover:text-foreground hover:bg-background"
                }`
              }
            >
              <n.icon size={16} /> {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <Link to="/" target="_blank" className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-muted-foreground hover:text-primary">
            <ExternalLink size={14} /> View Site
          </Link>
          <div className="px-3 py-2 text-xs">
            <p className="text-foreground truncate">{user?.email}</p>
            <p className="font-mono text-[10px] uppercase text-primary">{user?.role}</p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-mono uppercase text-muted-foreground hover:text-primary border border-border min-h-[44px]">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-background/60 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden h-14 flex items-center justify-between px-4 border-b border-border bg-card sticky top-0 z-20">
          <button onClick={() => setOpen(true)} aria-label="Open sidebar"><Menu size={20} /></button>
          <span className="font-mono text-xs uppercase text-muted-foreground">Control Panel</span>
        </header>
        <main className="flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
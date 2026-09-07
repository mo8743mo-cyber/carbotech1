import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-5 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Carbotech home">
          <span className="relative inline-flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 border-2 border-primary rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
            <span className="h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="font-heading font-bold text-lg tracking-tight">
            CARBO<span className="text-primary">TECH</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const active = location.pathname === l.path;
            return (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className={`relative px-3.5 py-2 text-[13px] font-mono uppercase tracking-wider transition-colors ${
                    active ? "text-primary" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {l.label}
                  {active && <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-primary" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background/98 backdrop-blur-xl border-b border-border">
          <ul className="px-5 py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="block py-3 font-mono text-sm uppercase tracking-wider text-foreground/80 hover:text-primary border-b border-border/50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
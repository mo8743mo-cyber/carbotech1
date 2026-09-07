import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Instagram, Youtube, Facebook, Linkedin } from "lucide-react";
import { NAV_LINKS, COMPANY } from "@/lib/site";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-background border-t border-border carbon-weave">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <span className="relative inline-flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 border-2 border-primary rotate-45" />
                <span className="h-2.5 w-2.5 bg-primary" />
              </span>
              <span className="font-heading font-bold text-lg tracking-tight">
                CARBO<span className="text-primary">TECH</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Youtube, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="inline-flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-5">[ {t.footer.navigate} ]</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    {Object.values(t.nav)[NAV_LINKS.findIndex((item) => item.path === l.path)]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-5">[ {t.footer.contact} ]</h3>
            <ul className="space-y-3.5 text-sm text-foreground/70">
              <li className="flex gap-3"><MapPin size={16} className="text-primary shrink-0 mt-0.5" /><span>{COMPANY.address}</span></li>
              <li className="flex gap-3"><Phone size={16} className="text-primary shrink-0 mt-0.5" /><a href={`tel:${COMPANY.phone}`} className="hover:text-primary">{COMPANY.phone}</a></li>
              <li className="flex gap-3"><Mail size={16} className="text-primary shrink-0 mt-0.5" /><a href={`mailto:${COMPANY.email}`} className="hover:text-primary">{COMPANY.email}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-5">[ {t.footer.hours} ]</h3>
            <ul className="space-y-3.5 text-sm text-foreground/70">
              <li className="flex gap-3"><Clock size={16} className="text-primary shrink-0 mt-0.5" /><span>{COMPANY.hours}</span></li>
              <li className="text-xs text-muted-foreground pt-2 border-t border-border">
                Reduced-motion controls available in site settings. We meet WCAG 2.2 AA accessibility standards.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">© {new Date().getFullYear()} Carbotech. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted-foreground font-mono">
            <Link to="/privacy" className="hover:text-primary">{t.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-primary">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
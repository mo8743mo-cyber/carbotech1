import { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Filter, X, ArrowRight, Package, Search } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/site";

const SPOILER_TYPES = ["rear-wing", "lip-spoiler", "ducktail", "gt-wing", "splitter", "diffuser", "side-skirt", "other"];
const AVAILABILITY = ["in-stock", "low-stock", "made-to-order", "out-of-stock"];

const AVAIL_STYLE = {
  "in-stock": "text-emerald-400 border-emerald-500/40",
  "low-stock": "text-amber-400 border-amber-500/40",
  "made-to-order": "text-primary border-primary/40",
  "out-of-stock": "text-muted-foreground border-border",
};

export default function Spoilers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ make: "", type: "", availability: "", q: "" });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Spoiler.filter({ published: true }, "-featured", 100);
        setItems(data);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const makes = useMemo(() => [...new Set(items.map((i) => i.vehicle_make).filter(Boolean))].sort(), [items]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (filters.make && i.vehicle_make !== filters.make) return false;
      if (filters.type && i.spoiler_type !== filters.type) return false;
      if (filters.availability && i.availability !== filters.availability) return false;
      if (filters.q) {
        const q = filters.q.toLowerCase();
        if (!(`${i.name} ${i.vehicle_model ?? ""}`.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [items, filters]);

  const set = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <section className="relative py-16 lg:py-24 border-b border-border grid-wires">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Catalog / 01 ]</span>
            <h1 className="mt-4 font-heading font-bold text-4xl lg:text-6xl tracking-tight">Pre-Made Spoilers</h1>
            <p className="mt-5 max-w-xl text-foreground/70">
              Ready-to-ship carbon-fiber spoilers engineered for precise vehicle fitment. Filter by make, type, and availability.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-30 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-4 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 font-mono text-xs uppercase text-muted-foreground mr-2">
            <Filter size={14} className="text-primary" /> Filter
          </span>
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={filters.q}
              onChange={(e) => set("q", e.target.value)}
              placeholder="Search name or model"
              className="w-full h-10 pl-9 pr-3 bg-card border border-border text-sm focus:border-primary outline-none"
            />
          </div>
          <select value={filters.make} onChange={(e) => set("make", e.target.value)} className="h-10 px-3 bg-card border border-border text-sm focus:border-primary outline-none min-h-[44px]">
            <option value="">All Makes</option>
            {makes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={filters.type} onChange={(e) => set("type", e.target.value)} className="h-10 px-3 bg-card border border-border text-sm focus:border-primary outline-none min-h-[44px]">
            <option value="">All Types</option>
            {SPOILER_TYPES.map((t) => <option key={t} value={t}>{t.replace("-", " ")}</option>)}
          </select>
          <select value={filters.availability} onChange={(e) => set("availability", e.target.value)} className="h-10 px-3 bg-card border border-border text-sm focus:border-primary outline-none min-h-[44px]">
            <option value="">Any Availability</option>
            {AVAILABILITY.map((a) => <option key={a} value={a}>{a.replace("-", " ")}</option>)}
          </select>
          {(filters.make || filters.type || filters.availability || filters.q) && (
            <button onClick={() => setFilters({ make: "", type: "", availability: "", q: "" })} className="inline-flex items-center gap-1.5 h-10 px-3 text-xs font-mono uppercase text-muted-foreground hover:text-primary">
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => <div key={i} className="aspect-[4/5] bg-card animate-pulse border border-border" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Package size={40} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No spoilers match your filters.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <article className="group bg-card border border-border hover:border-primary/50 transition-colors flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden bg-background">
                      <Image src={p.images?.[0] || IMAGES.spoiler} alt={`${p.name} carbon fiber spoiler`} fittingType="fill" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      {p.featured && <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-primary text-white">Featured</span>}
                      <span className={`absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider px-2 py-1 border bg-background/80 ${AVAIL_STYLE[p.availability] || ""}`}>
                        {p.availability?.replace("-", " ")}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="font-mono text-xs text-muted-foreground">{p.vehicle_make} {p.vehicle_model} {p.vehicle_year_from ? `· ${p.vehicle_year_from}${p.vehicle_year_to ? `–${p.vehicle_year_to}` : "+"}` : ""}</div>
                      <h3 className="font-heading font-semibold text-lg mt-1">{p.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 flex-1">{p.description}</p>
                      <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                        <span className="font-heading font-bold text-primary">
                          {p.price_on_request || !p.price ? "Request Price" : `$${p.price.toLocaleString()}`}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">{p.spoiler_type?.replace("-", " ")}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <button onClick={() => setSelected(p)} className="h-10 border border-border text-xs font-mono uppercase hover:border-primary transition-colors min-h-[44px]">View Details</button>
                        <a href={`mailto:sales@carbotech.com?subject=Order: ${p.name}`} className="h-10 inline-flex items-center justify-center bg-primary text-white text-xs font-mono uppercase hover:bg-primary/90 min-h-[44px]">Request Order</a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail overlay */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl overflow-y-auto" role="dialog" aria-modal="true" aria-label={`${selected.name} details`}>
          <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-8">
            <button onClick={() => setSelected(null)} className="inline-flex items-center gap-2 h-10 px-4 border border-border font-mono text-xs uppercase hover:border-primary mb-6 min-h-[44px]">
              <X size={16} /> Close
            </button>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="aspect-square border border-border overflow-hidden">
                <Image src={selected.images?.[0] || IMAGES.spoiler} alt={selected.name} fittingType="fill" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="font-mono text-xs text-primary">[ {selected.spoiler_type?.replace("-", " ")} ]</div>
                <h2 className="font-heading font-bold text-3xl lg:text-4xl mt-2">{selected.name}</h2>
                <div className="mt-3 font-mono text-sm text-muted-foreground">{selected.vehicle_make} {selected.vehicle_model}</div>
                <p className="mt-5 text-foreground/70 leading-relaxed">{selected.description}</p>
                <div className="mt-6 font-heading font-bold text-2xl text-primary">
                  {selected.price_on_request || !selected.price ? "Request Price" : `$${selected.price.toLocaleString()}`}
                </div>
                <div className="mt-6 border border-border divide-y divide-border">
                  {[
                    ["Material", selected.material || "2x2 Twill Carbon Fiber"],
                    ["Weight", selected.weight || "—"],
                    ["Availability", selected.availability?.replace("-", " ")],
                    ["Stock", selected.stock_quantity ?? "—"],
                    ["Fitment", `${selected.vehicle_make ?? ""} ${selected.vehicle_model ?? ""}`.trim() || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between px-4 py-3 text-sm">
                      <span className="font-mono text-xs uppercase text-muted-foreground">{k}</span>
                      <span className="font-mono">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a href={`mailto:sales@carbotech.com?subject=Order: ${selected.name}`} className="scan-btn inline-flex items-center justify-center gap-2 h-12 px-6 bg-primary text-white font-mono text-sm uppercase min-h-[44px]">
                    Request Order <ArrowRight size={15} />
                  </a>
                  <a href="/quote" className="inline-flex items-center justify-center h-12 px-6 border border-border font-mono text-sm uppercase hover:border-primary min-h-[44px]">Get a Quote</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
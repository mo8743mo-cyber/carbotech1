import { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { X, Calendar, Layers, Cpu } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/site";

const CATEGORIES = ["all", "automotive", "motorcycle", "drone", "industrial", "marine", "prototype", "custom"];

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.PortfolioProject.filter({ published: true }, "-completion_date", 100);
        setItems(data);
      } catch { setItems([]); }
      finally { setLoading(false); }
    })();
  }, []);

  const filtered = useMemo(() => cat === "all" ? items : items.filter((i) => i.category === cat), [items, cat]);

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-16 lg:py-24 border-b border-border grid-wires">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Work / 04 ]</span>
            <h1 className="mt-4 font-heading font-bold text-4xl lg:text-6xl tracking-tight">Project Portfolio</h1>
            <p className="mt-5 max-w-xl text-foreground/70">A selection of carbon-fiber components engineered and manufactured by Carbotech.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`h-10 px-4 font-mono text-xs uppercase tracking-wider border transition-colors min-h-[44px] ${
                  cat === c ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => <div key={i} className="aspect-[4/3] bg-card animate-pulse border border-border" />)}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center py-24 text-muted-foreground">No projects in this category yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <button onClick={() => setSelected(p)} className="group block w-full text-left">
                    <div className="relative aspect-[4/3] overflow-hidden border border-border">
                      <Image src={p.images?.[0] || IMAGES.drone} alt={p.title} fittingType="fill" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-5">
                        <span className="font-mono text-xs text-primary">[ {p.category} ]</span>
                        <h3 className="font-heading font-semibold text-lg mt-1">{p.title}</h3>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl overflow-y-auto" role="dialog" aria-modal="true" aria-label={selected.title}>
          <div className="mx-auto max-w-[1100px] px-5 lg:px-8 py-8">
            <button onClick={() => setSelected(null)} className="inline-flex items-center gap-2 h-10 px-4 border border-border font-mono text-xs uppercase hover:border-primary mb-6 min-h-[44px]">
              <X size={16} /> Close
            </button>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="aspect-square border border-border overflow-hidden">
                <Image src={selected.images?.[0] || IMAGES.drone} alt={selected.title} fittingType="fill" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="font-mono text-xs text-primary">[ {selected.category} ]</span>
                <h2 className="font-heading font-bold text-3xl mt-2">{selected.title}</h2>
                <p className="mt-5 text-foreground/70 leading-relaxed">{selected.description}</p>
                <div className="mt-6 space-y-3 border-t border-border pt-5">
                  <SpecRow icon={Layers} label="Materials" value={selected.materials} />
                  <SpecRow icon={Cpu} label="Process" value={selected.process} />
                  <SpecRow icon={Calendar} label="Completed" value={selected.completion_date} />
                </div>
                {selected.video_url && (
                  <a href={selected.video_url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 h-12 px-6 bg-primary text-white font-mono text-sm uppercase min-h-[44px]">Watch Video</a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SpecRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-primary mt-0.5 shrink-0" />
      <div>
        <span className="font-mono text-xs uppercase text-muted-foreground">{label}</span>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}
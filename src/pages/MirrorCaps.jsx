import { useMemo, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Image } from "@/components/ui/image";

const PRODUCTS = [
  {
    name: "BMW 2 Series — Carbon Mirror Caps",
    brand: "BMW",
    series: "2 Series",
    price: 1200,
    availability: "in-stock",
    description: "Pre-preg twill carbon-fiber mirror caps contoured for the 2 Series sport silhouette. OEM-fit clip replacement.",
    image: "/assets/mirror-2-series.png",
  },
  {
    name: "BMW 3 Series — Carbon Mirror Caps",
    brand: "BMW",
    series: "3 Series",
    price: 1280,
    availability: "in-stock",
    description: "Aerodynamic twill carbon mirror caps for the 3 Series sedan and wagon. UV-stable clear coat.",
    image: "/assets/mirror-2-series.png",
  },
  {
    name: "BMW 4 Series — Carbon Mirror Caps",
    brand: "BMW",
    series: "4 Series",
    price: 1350,
    availability: "low-stock",
    description: "Aggressive coupe-style carbon mirror caps for the 4 Series. Autoclave-cured for a flawless weave.",
    image: "/assets/mirror-4-series.png",
  },
  {
    name: "BMW 5 Series — Carbon Mirror Caps",
    brand: "BMW",
    series: "5 Series",
    price: 1430,
    availability: "in-stock",
    description: "Executive-grade twill carbon mirror caps for the 5 Series. Precise OEM fitment and finish.",
    image: "/assets/mirror-5-series.png",
  },
  {
    name: "BMW 6 Series — Carbon Mirror Caps",
    brand: "BMW",
    series: "6 Series",
    price: 1540,
    availability: "made-to-order",
    description: "Grand-tourer styled carbon mirror caps for the 6 Series. Hand-laid for a deep, consistent weave.",
    image: "/assets/mirror-7-series.png",
  },
  {
    name: "BMW 7 Series — Carbon Mirror Caps",
    brand: "BMW",
    series: "7 Series",
    price: 1690,
    availability: "low-stock",
    description: "Flagship-luxury twill carbon mirror caps for the 7 Series. Premium fit and mirror finish.",
    image: "/assets/mirror-7-series.png",
  },
  {
    name: "Mercedes C-Class — Carbon Mirror Caps",
    brand: "Mercedes-Benz",
    series: "C-Class",
    price: 1310,
    availability: "in-stock",
    description: "Compact-sport carbon mirror caps for the C-Class. Direct OEM replacement with flawless weave alignment.",
    image: "/assets/mirror-c-class.png",
  },
  {
    name: "Mercedes E-Class — Carbon Mirror Caps",
    brand: "Mercedes-Benz",
    series: "E-Class",
    price: 1460,
    availability: "in-stock",
    description: "Executive-styled twill carbon mirror caps for the E-Class. UV-stable, autoclave-cured finish.",
    image: "/assets/mirror-e-class.png",
  },
  {
    name: "Mercedes S-Class — Carbon Mirror Caps",
    brand: "Mercedes-Benz",
    series: "S-Class",
    price: 1760,
    availability: "made-to-order",
    description: "Flagship-limousine carbon mirror caps for the S-Class. Hand-finished for concours-grade presentation.",
    image: "/assets/mirror-e-class.png",
  },
];

const AVAIL_STYLE = {
  "in-stock": "text-emerald-400 border-emerald-500/40",
  "low-stock": "text-amber-400 border-amber-500/40",
  "made-to-order": "text-primary border-primary/40",
  "out-of-stock": "text-muted-foreground border-border",
};

const BRANDS = ["All", "BMW", "Mercedes-Benz"];

export default function MirrorCaps() {
  const [brand, setBrand] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () => (brand === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.brand === brand)),
    [brand]
  );

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-16 lg:py-24 border-b border-border grid-wires">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Catalog / 03 ]</span>
            <h1 className="mt-4 font-heading font-bold text-4xl lg:text-6xl tracking-tight">Carbon Mirror Caps</h1>
            <p className="mt-5 max-w-xl text-foreground/70">
              Pre-preg carbon-fiber mirror caps engineered for precise OEM fitment across BMW and Mercedes-Benz model lines.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sticky top-16 lg:top-20 z-30 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-4 flex items-center gap-2">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`h-10 px-5 font-mono text-xs uppercase tracking-wider border transition-colors min-h-[44px] ${
                brand === b ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {b}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-muted-foreground">{filtered.length} products</span>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 80}>
                <article className="group bg-card border border-border hover:border-primary/50 transition-colors flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden bg-background">
                    <Image src={p.image} alt={p.name} fittingType="fill" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className={`absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider px-2 py-1 border bg-background/80 ${AVAIL_STYLE[p.availability]}`}>
                      {p.availability.replace("-", " ")}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="font-mono text-xs text-muted-foreground">{p.brand} · {p.series}</div>
                    <h3 className="font-heading font-semibold text-lg mt-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2 flex-1">{p.description}</p>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                      <span className="font-heading font-bold text-primary">{`${p.price.toLocaleString()} SAR`}</span>
                      <button onClick={() => setSelected(p)} className="h-10 px-4 border border-border text-xs font-mono uppercase hover:border-primary transition-colors min-h-[44px]">View Details</button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl overflow-y-auto" role="dialog" aria-modal="true" aria-label={`${selected.name} details`}>
          <div className="mx-auto max-w-[1100px] px-5 lg:px-8 py-8">
            <button onClick={() => setSelected(null)} className="inline-flex items-center gap-2 h-10 px-4 border border-border font-mono text-xs uppercase hover:border-primary mb-6 min-h-[44px]">
              <X size={16} /> Close
            </button>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="aspect-square border border-border overflow-hidden">
                <Image src={selected.image} alt={selected.name} fittingType="fill" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="font-mono text-xs text-primary">[ {selected.series} ]</div>
                <h2 className="font-heading font-bold text-3xl lg:text-4xl mt-2">{selected.name}</h2>
                <div className="mt-3 font-mono text-sm text-muted-foreground">{selected.brand} {selected.series}</div>
                <p className="mt-5 text-foreground/70 leading-relaxed">{selected.description}</p>
                <div className="mt-6 font-heading font-bold text-2xl text-primary">{`${selected.price.toLocaleString()} SAR`}</div>
                <div className="mt-6 border border-border divide-y divide-border">
                  {[["Material", "2x2 Twill Carbon Fiber"], ["Finish", "Glossy UV-stable clear coat"], ["Fitment", `${selected.brand} ${selected.series}`], ["Availability", selected.availability.replace("-", " ")]].map(([k, v]) => (
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
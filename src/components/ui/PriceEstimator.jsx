import { useMemo, useState } from "react";
import { Calculator, Info } from "lucide-react";
import Reveal from "@/components/Reveal";
import { formatSAR, useLanguage } from "@/lib/i18n";

const MATERIALS = [
  { id: "twill", label: "2x2 Twill Carbon", base: 450, desc: "Classic weave, autoclave cured" },
  { id: "forged", label: "Forged Carbon", base: 680, desc: "Marbled, high-strength" },
  { id: "spread", label: "Spread-Tow Carbon", base: 720, desc: "Ultra-light, performance" },
  { id: "kevlar", label: "Kevlar Hybrid", base: 820, desc: "Impact-resistant blend" },
];

const COMPLEXITY = [
  { id: "simple", label: "Simple", mult: 1.0, desc: "Flat / single curvature" },
  { id: "moderate", label: "Moderate", mult: 1.6, desc: "Multi-surface, mounting points" },
  { id: "complex", label: "Complex", mult: 2.4, desc: "Double curvature, intricate" },
  { id: "advanced", label: "Advanced", mult: 3.5, desc: "Aero-optimized, integrated hardware" },
];

export default function PriceEstimator() {
  const { language } = useLanguage();
  const [material, setMaterial] = useState("twill");
  const [complexity, setComplexity] = useState("moderate");
  const [quantity, setQuantity] = useState("1");

  const mat = MATERIALS.find((m) => m.id === material);
  const comp = COMPLEXITY.find((c) => c.id === complexity);
  const qty = Math.max(1, Number(quantity) || 1);

  const { perUnit, total, range } = useMemo(() => {
    const perUnit = Math.round((mat.base * comp.mult) / 10) * 10;
    const total = perUnit * qty;
    const low = Math.round((perUnit * 0.8) / 10) * 10;
    const high = Math.round((perUnit * 1.3) / 10) * 10;
    return { perUnit, total, range: [low, high] };
  }, [mat, comp, qty]);

  return (
    <section className="py-16 lg:py-24 border-b border-border carbon-weave">
      <div className="mx-auto max-w-[1100px] px-5 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <Calculator size={20} className="text-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Estimator / 02-A ]</span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl">Rough Price Estimator</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            Select your material and part complexity to get a ballpark estimate before you submit a request. Final pricing is confirmed after engineering review.
          </p>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Controls */}
          <div className="space-y-8">
            <div>
              <span className="font-mono text-xs uppercase text-muted-foreground block mb-3">Material</span>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id)}
                    className={`text-left p-4 border transition-colors min-h-[44px] ${
                      material === m.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="font-mono text-xs text-primary">[ {formatSAR(m.base, language)} ]</span>
                    <h4 className="font-heading font-semibold text-sm mt-1">{m.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-xs uppercase text-muted-foreground block mb-3">Complexity</span>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {COMPLEXITY.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setComplexity(c.id)}
                    className={`text-left p-4 border transition-colors min-h-[44px] ${
                      complexity === c.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="font-mono text-xs text-primary">[ x{c.mult} ]</span>
                    <h4 className="font-heading font-semibold text-sm mt-1">{c.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-xs">
              <span className="font-mono text-xs uppercase text-muted-foreground block mb-3">Quantity</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity((q) => String(Math.max(1, Number(q) - 1)))} className="w-11 h-11 border border-border font-mono hover:border-primary">−</button>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="inp text-center"
                />
                <button onClick={() => setQuantity((q) => String(Number(q) + 1))} className="w-11 h-11 border border-border font-mono hover:border-primary">+</button>
              </div>
            </div>
          </div>

          {/* Estimate panel */}
          <div className="border border-border bg-card p-6 lg:p-8 h-fit">
            <span className="font-mono text-xs uppercase text-muted-foreground">Estimated Range</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-bold text-4xl text-primary text-glow">{formatSAR(range[0], language)}</span>
              <span className="font-mono text-muted-foreground">— {formatSAR(range[1], language)}</span>
            </div>
            <div className="mt-6 space-y-2 border-t border-border pt-4 font-mono text-xs">
              <Row label="Per unit" value={formatSAR(perUnit, language)} />
              <Row label="Material" value={mat.label} />
              <Row label="Complexity" value={`x${comp.mult}`} />
              <Row label="Quantity" value={qty} />
              <div className="border-t border-border pt-2 mt-2">
                <Row label="Estimated total" value={formatSAR(total, language)} bold />
              </div>
            </div>
            <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <Info size={14} className="shrink-0 mt-0.5 text-primary" />
              <span>Indicative only. Final quote includes finishing, hardware, tooling, and shipping after engineering review.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, bold = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="uppercase text-muted-foreground">{label}</span>
      <span className={bold ? "text-primary font-semibold" : "text-foreground"}>{value}</span>
    </div>
  );
}
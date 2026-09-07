import { Link } from "react-router-dom";
import { ArrowRight, Box, Scan, Layers, Cpu, Wrench, FlaskConical, Wind, Gauge, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/site";

const CAPABILITIES = [
  { icon: Box, title: "CAD & 3D Product Design", desc: "Full parametric modeling from concept to production-ready geometry." },
  { icon: Scan, title: "Reverse Engineering", desc: "Reconstruct digital models from physical samples and damaged parts." },
  { icon: Sparkles, title: "3D Scanning", desc: "High-precision optical scanning for exact surface capture." },
  { icon: FlaskConical, title: "Prototype Development", desc: "Rapid iteration to validate form, fit, and function." },
  { icon: Wrench, title: "Mold & Tooling Design", desc: "Custom tooling engineered for repeatable, high-yield layups." },
  { icon: Cpu, title: "CNC-Assisted Manufacturing", desc: "5-axis CNC machining for molds, plugs, and trim fixtures." },
  { icon: Layers, title: "Composite Material Engineering", desc: "Resin, fiber, and core selection tuned to your load case." },
  { icon: Wind, title: "Carbon-Fiber Layup", desc: "Manual and automated layup for optimized fiber orientation." },
  { icon: Gauge, title: "Vacuum Bagging & Infusion", desc: "Controlled resin content and void-free laminates." },
  { icon: Cpu, title: "Autoclave Manufacturing", desc: "High-pressure cure cycles for aerospace-grade consolidation." },
  { icon: Sparkles, title: "Finishing & Polishing", desc: "Trimming, surface refinement, and UV-stable clear coats." },
  { icon: Scan, title: "Quality Control", desc: "Dimensional inspection and structural validation on every part." },
];

export default function Technology() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-16 lg:py-24 border-b border-border grid-wires">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Engineering / 03 ]</span>
            <h1 className="mt-4 font-heading font-bold text-4xl lg:text-6xl tracking-tight">3D Design & Manufacturing Technology</h1>
            <p className="mt-5 max-w-2xl text-foreground/70">
              Carbotech combines composite craftsmanship with advanced digital engineering — from first scan to final finish.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Feature image */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <div className="relative aspect-[21/9] border border-border overflow-hidden">
              <Image src={IMAGES.cnc} alt="CNC machine carving a carbon fiber mold with red lighting" fittingType="fill" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="font-mono text-xs text-primary">[ Live Process ]</span>
                <h2 className="font-heading font-bold text-2xl lg:text-3xl mt-2">Precision at every stage</h2>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal><h2 className="font-heading font-bold text-3xl lg:text-4xl mb-12">Capabilities</h2></Reveal>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 80}>
                <div className="group bg-background p-7 h-full hover:bg-card transition-colors">
                  <div className="inline-flex h-11 w-11 items-center justify-center border border-border text-primary group-hover:border-primary transition-colors mb-4">
                    <c.icon size={20} />
                  </div>
                  <h3 className="font-heading font-semibold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 carbon-weave-red">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-tight max-w-2xl mx-auto">
              Have a part that needs <span className="text-primary">engineering precision?</span>
            </h2>
            <Link to="/custom-parts" className="scan-btn mt-8 inline-flex items-center gap-2 h-13 px-8 bg-primary text-white font-mono text-sm uppercase tracking-wider min-h-[44px]">
              Start an Engineering Project <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
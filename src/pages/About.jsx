import { Link } from "react-router-dom";
import { Target, ShieldCheck, Cpu, Award, Layers, Factory, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/site";

const VALUES = [
  { icon: Target, title: "Precision-Focused", desc: "Every part is engineered to micron-level tolerances and validated before it ships." },
  { icon: ShieldCheck, title: "Quality Control", desc: "Dimensional inspection and structural validation on every single component." },
  { icon: Cpu, title: "Advanced Technology", desc: "CAD, 3D scanning, CNC, and autoclave curing under one roof." },
  { icon: Award, title: "Composite Craftsmanship", desc: "Decades of combined experience in carbon-fiber layup and finishing." },
];

const STANDARDS = [
  "ISO-grade quality management",
  "Aerospace-grade autoclave curing",
  "Vacuum infusion & bagging",
  "Full material traceability",
  "Dimensional CMM inspection",
  "UV-stable clear coat finishing",
];

export default function About() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-16 lg:py-24 border-b border-border grid-wires">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Company / 05 ]</span>
            <h1 className="mt-4 font-heading font-bold text-4xl lg:text-6xl tracking-tight">About Carbotech</h1>
            <p className="mt-5 max-w-2xl text-foreground/70">
              A precision-focused carbon-fiber manufacturing company combining composite craftsmanship with advanced 3D design and manufacturing technology.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story + image */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] border border-border overflow-hidden">
              <Image src={IMAGES.workshop} alt="Carbotech carbon fiber manufacturing workshop" fittingType="fill" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Our Story ]</span>
            <h2 className="mt-4 font-heading font-bold text-3xl lg:text-4xl">Engineered to perform, built to last</h2>
            <p className="mt-5 text-foreground/70 leading-relaxed">
              Carbotech was founded on a single principle: carbon fiber should be engineered without compromise. From a single spoiler to a full drone airframe, we apply the same rigorous process — digital design, precision tooling, controlled layup, and validated curing.
            </p>
            <p className="mt-4 text-foreground/70 leading-relaxed">
              Our workshop brings together designers, composite technicians, and CNC machinists under one roof, enabling us to take a project from first sketch to finished part entirely in-house.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal><h2 className="font-heading font-bold text-3xl lg:text-4xl mb-12">What drives us</h2></Reveal>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 80}>
                <div className="bg-background p-7 h-full">
                  <div className="inline-flex h-11 w-11 items-center justify-center border border-border text-primary mb-4">
                    <v.icon size={20} />
                  </div>
                  <h3 className="font-heading font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-16 lg:py-24 border-b border-border carbon-weave">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Standards ]</span>
            <h2 className="mt-4 font-heading font-bold text-3xl lg:text-4xl">Manufacturing standards</h2>
            <ul className="mt-8 space-y-4">
              {STANDARDS.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-primary" />
                  <span className="font-mono text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-px bg-border">
              {[
                { icon: Factory, label: "In-house facility" },
                { icon: Layers, label: "Full-stack composites" },
                { icon: Cpu, label: "CNC + 3D scanning" },
                { icon: ShieldCheck, label: "100% QC inspected" },
              ].map((b) => (
                <div key={b.label} className="bg-background p-8 text-center">
                  <b.icon size={28} className="mx-auto text-primary mb-3" />
                  <p className="font-mono text-xs uppercase text-muted-foreground">{b.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 carbon-weave-red text-center">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-tight max-w-2xl mx-auto">Let's build something <span className="text-primary">extraordinary</span>.</h2>
            <Link to="/quote" className="scan-btn mt-8 inline-flex items-center gap-2 h-13 px-8 bg-primary text-white font-mono text-sm uppercase min-h-[44px]">Request a Quote <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
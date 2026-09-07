import { Link } from "react-router-dom";
import { ArrowRight, Feather, Shield, Cpu, Layers, Gauge, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { IMAGES } from "@/lib/site";
import { Image } from "@/components/ui/image";

const BENEFITS = [
  { icon: Feather, title: "Lightweight Performance", desc: "Up to 70% lighter than metal equivalents without sacrificing rigidity." },
  { icon: Shield, title: "Exceptional Strength", desc: "High tensile-to-weight ratio engineered for extreme loads and stress." },
  { icon: Cpu, title: "Precision Manufacturing", desc: "CAD-driven, CNC-assisted production with micron-level tolerances." },
  { icon: Layers, title: "Custom-Made Solutions", desc: "From concept to delivery — built around your exact specification." },
];

const APPLICATIONS = [
  { label: "Cars & Motorsport", img: IMAGES.spoiler },
  { label: "Motorcycles & Bicycles", img: IMAGES.workshop },
  { label: "Drones & Robotics", img: IMAGES.drone },
  { label: "Industrial Equipment", img: IMAGES.cnc },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center grid-wires">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.hero}
            alt="Macro close-up of carbon fiber weave with red lighting"
            fittingType="fill"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-5 lg:px-8 w-full pt-24 pb-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2 w-2 bg-primary animate-pulse-red rounded-full" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Carbon Fiber Manufacturing ]</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-heading font-bold leading-[0.95] tracking-tight text-glow" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
              Carbon Fiber Parts,<br />
              <span className="text-primary">Engineered</span> Without Limits
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-7 max-w-xl text-base lg:text-lg text-foreground/70 leading-relaxed">
              Carbotech designs and manufactures high-performance carbon-fiber parts for cars, motorcycles, drones, industrial applications, and anything you can imagine.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                to="/custom-parts"
                className="scan-btn inline-flex items-center justify-center gap-2 h-13 px-8 bg-primary text-white font-mono text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors min-h-[44px]"
              >
                Request a Custom Part <ArrowRight size={16} />
              </Link>
              <Link
                to="/spoilers"
                className="inline-flex items-center justify-center gap-2 h-13 px-8 border border-border bg-card/50 backdrop-blur text-foreground font-mono text-sm uppercase tracking-wider hover:border-primary transition-colors min-h-[44px]"
              >
                Explore Our Products
              </Link>
            </div>
          </Reveal>

          <Reveal delay={550}>
            <div className="mt-16 flex items-center gap-8 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-2"><Gauge size={14} className="text-primary" /> ISO-Grade QC</span>
              <span className="hidden sm:flex items-center gap-2"><Cpu size={14} className="text-primary" /> CNC + Autoclave</span>
              <span className="hidden md:flex items-center gap-2"><Layers size={14} className="text-primary" /> Vacuum Infusion</span>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </section>

      {/* BENEFITS */}
      <section className="relative py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <div className="group bg-background p-8 lg:p-10 h-full hover:bg-card transition-colors">
                  <div className="inline-flex h-12 w-12 items-center justify-center border border-border text-primary group-hover:border-primary transition-colors mb-5">
                    <b.icon size={22} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal className="max-w-3xl mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Applications ]</span>
            <h2 className="mt-4 font-heading font-bold text-4xl lg:text-6xl tracking-tight">
              If You Can Imagine It,<br /><span className="text-primary">We Can Engineer It.</span>
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {APPLICATIONS.map((a, i) => (
              <Reveal key={a.label} delay={i * 100}>
                <div className="group relative aspect-[3/4] overflow-hidden border border-border">
                  <Image src={a.img} alt={a.label} fittingType="fill" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <span className="font-mono text-xs text-primary">[ 0{i + 1} ]</span>
                    <h3 className="font-heading font-semibold text-lg mt-1">{a.label}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link to="/custom-parts" className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-primary hover:gap-3 transition-all">
              Start a custom project <ChevronRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 lg:py-32 border-t border-border carbon-weave-red">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 text-center">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Tell Us What You Want to Build ]</span>
            <h2 className="mt-5 font-heading font-bold text-3xl lg:text-5xl tracking-tight max-w-3xl mx-auto">
              Your Idea. Our Engineering. <span className="text-primary">Carbon Fiber Without Limits.</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-foreground/70">
              From ready-made spoilers to completely original components — share your vision and our engineers will take it from there.
            </p>
            <Link
              to="/quote"
              className="scan-btn mt-9 inline-flex items-center justify-center gap-2 h-13 px-9 bg-primary text-white font-mono text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors min-h-[44px]"
            >
              Request a Quote <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
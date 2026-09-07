import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { COMPANY } from "@/lib/site";

export default function Contact() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-16 lg:py-24 border-b border-border grid-wires">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Contact / 07 ]</span>
            <h1 className="mt-4 font-heading font-bold text-4xl lg:text-6xl tracking-tight">Get in touch</h1>
            <p className="mt-5 max-w-xl text-foreground/70">Questions, partnerships, or a project to discuss — reach out and our team will respond within one business day.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <div className="space-y-px bg-border">
              {[
                { icon: MapPin, label: "Visit", value: COMPANY.address },
                { icon: Phone, label: "Call", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: Clock, label: "Hours", value: COMPANY.hours },
                { icon: MessageCircle, label: "WhatsApp", value: "Contact us for chat details" },
              ].map((c) => (
                <div key={c.label} className="bg-background p-6 flex items-start gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center border border-border text-primary shrink-0">
                    <c.icon size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase text-muted-foreground">[ {c.label} ]</span>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block mt-1 font-heading font-semibold hover:text-primary">{c.value}</a>
                    ) : (
                      <p className="mt-1 font-heading font-semibold">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="border border-border bg-card p-8 h-full flex flex-col justify-center">
              <h2 className="font-heading font-bold text-2xl">Ready to start a project?</h2>
              <p className="mt-3 text-foreground/70">Submit a detailed quotation request and our engineers will get back to you with a tailored proposal.</p>
              <Link to="/quote" className="scan-btn mt-6 inline-flex items-center justify-center gap-2 h-13 px-7 bg-primary text-white font-mono text-sm uppercase tracking-wider self-start min-h-[44px]">
                Request a Quote <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
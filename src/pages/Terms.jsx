import Reveal from "@/components/Reveal";

export default function Terms() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[800px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Legal ]</span>
            <h1 className="mt-4 font-heading font-bold text-4xl lg:text-5xl">Terms & Conditions</h1>
            <div className="mt-8 space-y-4 text-foreground/70 leading-relaxed text-sm">
              <p>These terms govern the use of the Carbotech website and the submission of custom-part and quotation requests.</p>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6">Quotations</h2>
              <p>All quotations are valid for 30 days from the date issued and are subject to material availability and final design approval.</p>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6">Custom orders</h2>
              <p>Custom-manufactured parts are made to your specification. Once production begins, orders cannot be cancelled. A design approval step precedes manufacturing.</p>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6">Intellectual property</h2>
              <p>Customer-provided designs, sketches, and files remain the property of the customer. Carbotech may showcase completed work in its portfolio unless otherwise agreed.</p>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6">Warranty</h2>
              <p>Manufactured parts carry a workmanship warranty against defects. Warranty does not cover misuse, modification, or racing damage.</p>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6">Liability</h2>
              <p>Carbotech is not liable for indirect or consequential damages arising from the use of manufactured parts.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
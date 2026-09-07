import Reveal from "@/components/Reveal";

export default function Privacy() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[800px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Legal ]</span>
            <h1 className="mt-4 font-heading font-bold text-4xl lg:text-5xl">Privacy Policy</h1>
            <div className="mt-8 prose-invert space-y-4 text-foreground/70 leading-relaxed text-sm">
              <p>Carbotech ("we", "us") respects your privacy. This policy explains how we collect, use, and protect the personal information you submit through our website and forms.</p>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6">Information we collect</h2>
              <p>When you submit a custom-part request or quotation, we collect your name, email, phone, company, project details, and any files you upload. We use this solely to prepare quotations and fulfill your project.</p>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6">How we use your data</h2>
              <p>Your information is used to respond to inquiries, prepare quotes, manufacture requested parts, and communicate about your project. We do not sell your data to third parties.</p>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6">Data retention</h2>
              <p>Submitted data and attachments are stored securely and retained for the duration of your project plus a reasonable archival period, after which they are deleted.</p>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6">Your rights</h2>
              <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us.</p>
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6">Contact</h2>
              <p>For privacy questions, contact us at sales@carbotech.com.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
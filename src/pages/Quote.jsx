import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, Check, FileText, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/ui/use-toast";

const CATEGORIES = ["Automotive", "Motorcycle", "Drone", "Industrial", "Marine", "Prototype", "Other"];
const BUDGETS = ["< 3,750 SAR", "3,750 – 18,750 SAR", "18,750 – 75,000 SAR", "75,000+ SAR", "To be discussed"];

export default function Quote() {
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", location: "", customer_type: "individual",
    project_category: "", vehicle_application: "", part_description: "", dimensions: "",
    quantity: 1, budget_range: "", deadline: "", consent: false,
  });

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleFiles = (e) => setFiles((prev) => [...prev, ...Array.from(e.target.files || [])].slice(0, 8));

  const submit = async () => {
    if (!form.name || !form.email || !form.consent) {
      toast({ title: "Please complete required fields and accept the privacy policy.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      let attachments = [];
      for (const f of files) {
        try {
          const { file_url } = await base44.integrations.Core.UploadFile({ file: f });
          attachments.push(file_url);
        } catch { /* skip */ }
      }
      const created = await base44.entities.QuoteRequest.create({
        ...form,
        quantity: Number(form.quantity) || 1,
        attachments,
        status: "new",
      });
      base44.functions.invoke("notifySubmission", {
        type: "Quote Request",
        name: form.name,
        email: form.email,
        summary: form.part_description?.slice(0, 200),
        refId: created?.id,
      }).catch(() => {});
      setDone(true);
      toast({ title: "Quote request submitted", description: "We'll respond within one business day." });
    } catch {
      toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="pt-16 lg:pt-20">
        <div className="mx-auto max-w-[700px] px-5 lg:px-8 py-32 text-center border border-border carbon-weave-red">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white mb-6">
            <Check size={30} />
          </div>
          <h1 className="font-heading font-bold text-3xl">Quote Request Received</h1>
          <p className="mt-4 text-foreground/70 max-w-md mx-auto">
            Thank you, {form.name}. Our team will prepare your quotation and contact you within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-16 lg:py-24 border-b border-border grid-wires">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Quotation / 06 ]</span>
            <h1 className="mt-4 font-heading font-bold text-4xl lg:text-6xl tracking-tight">Request a Quote</h1>
            <p className="mt-5 max-w-xl text-foreground/70">Tell us about your project. The more detail you provide, the more accurate your quotation will be.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[900px] px-5 lg:px-8">
          <div className="border border-border bg-card p-6 lg:p-10 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name *"><input value={form.name} onChange={(e) => upd("name", e.target.value)} className="inp" /></Field>
              <Field label="Email *"><input type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} className="inp" /></Field>
              <Field label="Phone"><input value={form.phone} onChange={(e) => upd("phone", e.target.value)} className="inp" /></Field>
              <Field label="Country / City"><input value={form.location} onChange={(e) => upd("location", e.target.value)} className="inp" /></Field>
              <Field label="Individual or Company">
                <select value={form.customer_type} onChange={(e) => upd("customer_type", e.target.value)} className="inp">
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                </select>
              </Field>
              <Field label="Project Category">
                <select value={form.project_category} onChange={(e) => upd("project_category", e.target.value)} className="inp">
                  <option value="">Select…</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Vehicle / Application"><input value={form.vehicle_application} onChange={(e) => upd("vehicle_application", e.target.value)} placeholder="e.g. 2022 Porsche 911 GT3" className="inp" /></Field>
              <Field label="Dimensions (mm)"><input value={form.dimensions} onChange={(e) => upd("dimensions", e.target.value)} className="inp" /></Field>
              <Field label="Quantity"><input type="number" min="1" value={form.quantity} onChange={(e) => upd("quantity", e.target.value)} className="inp" /></Field>
              <Field label="Budget Range">
                <select value={form.budget_range} onChange={(e) => upd("budget_range", e.target.value)} className="inp">
                  <option value="">Select…</option>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="Deadline"><input type="date" value={form.deadline} onChange={(e) => upd("deadline", e.target.value)} className="inp" /></Field>
            </div>
            <Field label="Part Description">
              <textarea rows={4} value={form.part_description} onChange={(e) => upd("part_description", e.target.value)} className="inp resize-none" placeholder="Describe the part, its function, and any requirements…" />
            </Field>

            <div>
              <span className="font-mono text-xs uppercase text-muted-foreground block mb-2">File Attachments</span>
              <label className="block border-2 border-dashed border-border hover:border-primary transition-colors p-8 text-center cursor-pointer">
                <Upload size={28} className="mx-auto text-primary mb-2" />
                <span className="font-mono text-sm">Drag & drop or click to browse</span>
                <input type="file" multiple className="hidden" onChange={handleFiles} accept=".jpg,.jpeg,.png,.pdf,.step,.stp,.stl,.obj,.iges,.igs,.dxf,.dwg,.zip" />
              </label>
              {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 bg-background border border-border px-4 py-2 text-sm">
                      <FileText size={15} className="text-primary shrink-0" /> {f.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.consent} onChange={(e) => upd("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" />
              <span className="text-sm text-muted-foreground">I consent to Carbotech processing my data in accordance with the <a href="/privacy" className="text-primary underline">Privacy Policy</a> to respond to this request.</span>
            </label>

            <button onClick={submit} disabled={submitting} className="scan-btn w-full inline-flex items-center justify-center gap-2 h-13 bg-primary text-white font-mono text-sm uppercase tracking-wider disabled:opacity-50 min-h-[44px]">
              {submitting ? "Submitting…" : <>Submit Quote Request <ShieldCheck size={16} /></>}
            </button>
          </div>
        </div>
      </section>

      <style>{`.inp{width:100%;height:44px;padding:0 12px;background:hsl(0 0% 7%);border:1px solid hsl(var(--border));font-size:14px;outline:none}.inp:focus{border-color:hsl(var(--primary))}textarea.inp{height:auto;padding:12px}`}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase text-muted-foreground block mb-1.5">{label}</span>
      {children}
    </label>
  );
}
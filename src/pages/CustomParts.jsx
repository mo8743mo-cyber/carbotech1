import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, Check, ArrowRight, ArrowLeft, FileText, PencilRuler, Boxes, Wrench, Scan, Truck } from "lucide-react";
import Reveal from "@/components/Reveal";
import PriceEstimator from "@/components/PriceEstimator";
import { useToast } from "@/components/ui/use-toast";

const STEPS = ["Concept", "Consultation", "3D Design", "Approval", "Mold Production", "Carbon-Fiber Manufacturing", "Quality Inspection", "Delivery"];
const STEP_ICONS = [PencilRuler, FileText, Boxes, Check, Wrench, Boxes, Scan, Truck];

const STARTING_POINTS = [
  { id: "concept", label: "Concept / Idea", desc: "A vision or written description" },
  { id: "sketch", label: "Sketch", desc: "Hand-drawn or digital sketch" },
  { id: "sample", label: "Sample Part", desc: "An existing physical part" },
  { id: "damaged", label: "Damaged Part", desc: "A broken original to replicate" },
  { id: "mold", label: "Existing Mold", desc: "A mold already in hand" },
  { id: "cad", label: "3D / CAD Model", desc: "STEP, STL, OBJ, IGES files" },
];

const CATEGORIES = ["Automotive", "Motorcycle", "Drone", "Industrial", "Marine", "Prototype", "Other"];
const CONTACT_METHODS = ["email", "phone", "whatsapp"];

export default function CustomParts() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [starting, setStarting] = useState("");
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    customer_name: "", email: "", phone: "", company: "", part_category: "", intended_application: "",
    dimensions: "", quantity: 1, target_deadline: "", project_description: "", preferred_contact: "email",
  });

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleFiles = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...list].slice(0, 10));
  };

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async () => {
    if (!form.customer_name || !form.email) {
      toast({ title: "Name and email are required", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      let attachments = [];
      for (const f of files) {
        try {
          const { file_url } = await base44.integrations.Core.UploadFile({ file: f });
          attachments.push(file_url);
        } catch { /* skip failed upload */ }
      }
      const created = await base44.entities.CustomInquiry.create({
        ...form,
        quantity: Number(form.quantity) || 1,
        part_category: form.part_category || starting,
        attachments,
        status: "new",
      });
      base44.functions.invoke("notifySubmission", {
        type: "Custom Part Request",
        name: form.customer_name,
        email: form.email,
        summary: form.project_description?.slice(0, 200),
        refId: created?.id,
      }).catch(() => {});
      setDone(true);
      toast({ title: "Request submitted", description: "Our team will contact you shortly." });
    } catch (err) {
      toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <section className="relative py-16 lg:py-24 border-b border-border grid-wires">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Bespoke / 02 ]</span>
            <h1 className="mt-4 font-heading font-bold text-4xl lg:text-6xl tracking-tight">Custom-Made Parts</h1>
            <p className="mt-5 max-w-2xl text-foreground/70">
              Carbotech manufactures unique carbon-fiber parts from your concept, sketch, sample, damaged part, existing mold, or 3D model. Tell us what you want to build.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal><h2 className="font-heading font-bold text-3xl lg:text-4xl mb-12">The Production Process</h2></Reveal>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Reveal key={s} delay={(i % 4) * 80}>
                  <div className="bg-background p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-primary">[ {String(i + 1).padStart(2, "0")} ]</span>
                      <Icon size={20} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold">{s}</h3>
                    {i < STEPS.length - 1 && <div className="mt-3 h-px w-8 bg-primary/40" />}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Estimator */}
      <PriceEstimator />

      {/* Configurator */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1000px] px-5 lg:px-8">
          {done ? (
            <div className="text-center py-20 border border-border carbon-weave-red">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white mb-6">
                <Check size={30} />
              </div>
              <h2 className="font-heading font-bold text-3xl">Request Received</h2>
              <p className="mt-4 text-foreground/70 max-w-md mx-auto">
                Thank you, {form.customer_name}. Our engineering team will review your project and contact you within one business day.
              </p>
            </div>
          ) : (
            <div className="border border-border bg-card">
              {/* Progress */}
              <div className="flex border-b border-border">
                {["Starting Point", "Project Details", "Files & Submit"].map((label, i) => (
                  <button
                    key={label}
                    onClick={() => i < step && setStep(i)}
                    className={`flex-1 py-4 px-3 font-mono text-xs uppercase tracking-wider transition-colors text-center min-h-[44px] ${
                      step === i ? "text-primary border-b-2 border-primary bg-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="text-primary mr-1">0{i + 1}</span> {label}
                  </button>
                ))}
              </div>

              <div className="p-6 lg:p-10">
                {step === 0 && (
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-2">What's your starting point?</h3>
                    <p className="text-sm text-muted-foreground mb-6">Select how you'll provide your part reference.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {STARTING_POINTS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => { setStarting(p.id); setStep(1); }}
                          className={`text-left p-5 border transition-colors min-h-[44px] ${
                            starting === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          }`}
                        >
                          <span className="font-mono text-xs text-primary">[ {p.id} ]</span>
                          <h4 className="font-heading font-semibold mt-1">{p.label}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="font-heading font-semibold text-xl">Project details</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Customer Name *"><input value={form.customer_name} onChange={(e) => upd("customer_name", e.target.value)} className="inp" /></Field>
                      <Field label="Email *"><input type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} className="inp" /></Field>
                      <Field label="Phone"><input value={form.phone} onChange={(e) => upd("phone", e.target.value)} className="inp" /></Field>
                      <Field label="Company"><input value={form.company} onChange={(e) => upd("company", e.target.value)} className="inp" /></Field>
                      <Field label="Part Category">
                        <select value={form.part_category} onChange={(e) => upd("part_category", e.target.value)} className="inp">
                          <option value="">Select…</option>
                          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label="Intended Application"><input value={form.intended_application} onChange={(e) => upd("intended_application", e.target.value)} placeholder="e.g. Track-day GT wing" className="inp" /></Field>
                      <Field label="Dimensions (mm)"><input value={form.dimensions} onChange={(e) => upd("dimensions", e.target.value)} placeholder="e.g. 1500 x 300 x 80" className="inp" /></Field>
                      <Field label="Quantity"><input type="number" min="1" value={form.quantity} onChange={(e) => upd("quantity", e.target.value)} className="inp" /></Field>
                      <Field label="Target Deadline"><input type="date" value={form.target_deadline} onChange={(e) => upd("target_deadline", e.target.value)} className="inp" /></Field>
                      <Field label="Preferred Contact">
                        <select value={form.preferred_contact} onChange={(e) => upd("preferred_contact", e.target.value)} className="inp">
                          {CONTACT_METHODS.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="Project Description">
                      <textarea rows={4} value={form.project_description} onChange={(e) => upd("project_description", e.target.value)} className="inp resize-none" placeholder="Describe your part, requirements, and any special notes…" />
                    </Field>
                    <div className="flex justify-between pt-2">
                      <button onClick={() => setStep(0)} className="inline-flex items-center gap-2 h-12 px-5 border border-border font-mono text-sm uppercase hover:border-primary min-h-[44px]"><ArrowLeft size={15} /> Back</button>
                      <button onClick={() => setStep(2)} className="scan-btn inline-flex items-center gap-2 h-12 px-6 bg-primary text-white font-mono text-sm uppercase min-h-[44px]">Continue <ArrowRight size={15} /></button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-2">Upload reference files</h3>
                    <p className="text-sm text-muted-foreground mb-6">Accepted: JPG, PNG, PDF, STEP, STP, STL, OBJ, IGES, IGS, DXF, DWG, ZIP. Max 10 files.</p>
                    <label className="block border-2 border-dashed border-border hover:border-primary transition-colors p-10 text-center cursor-pointer">
                      <Upload size={32} className="mx-auto text-primary mb-3" />
                      <span className="font-mono text-sm">Drag & drop or click to browse</span>
                      <input type="file" multiple className="hidden" onChange={handleFiles} accept=".jpg,.jpeg,.png,.pdf,.step,.stp,.stl,.obj,.iges,.igs,.dxf,.dwg,.zip" />
                    </label>
                    {files.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {files.map((f, i) => (
                          <li key={i} className="flex items-center justify-between bg-background border border-border px-4 py-2.5 text-sm">
                            <span className="flex items-center gap-2 truncate"><FileText size={15} className="text-primary shrink-0" /> {f.name}</span>
                            <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-primary font-mono text-xs">Remove</button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex justify-between pt-8">
                      <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 h-12 px-5 border border-border font-mono text-sm uppercase hover:border-primary min-h-[44px]"><ArrowLeft size={15} /> Back</button>
                      <button onClick={submit} disabled={submitting} className="scan-btn inline-flex items-center gap-2 h-12 px-8 bg-primary text-white font-mono text-sm uppercase disabled:opacity-50 min-h-[44px]">
                        {submitting ? "Submitting…" : <>Submit Request <Check size={15} /></>}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
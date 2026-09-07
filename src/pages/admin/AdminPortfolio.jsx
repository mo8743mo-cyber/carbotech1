import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Image as Img } from "@/components/ui/image";
import { IMAGES } from "@/lib/site";

const CATEGORIES = ["automotive", "motorcycle", "drone", "industrial", "marine", "prototype", "custom"];

const EMPTY = {
  title: "", category: "automotive", description: "", materials: "", process: "",
  completion_date: "", images: [], video_url: "", featured: false, published: true,
};

export default function AdminPortfolio() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = async () => {
    setLoading(true);
    try { setItems(await base44.entities.PortfolioProject.list("-created_date", 200)); }
    catch { setItems([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditing("new"); };
  const openEdit = (p) => { setForm({ ...p }); setEditing(p.id); };

  const save = async () => {
    if (!form.title) { toast({ title: "Title is required", variant: "destructive" }); return; }
    try {
      if (editing === "new") await base44.entities.PortfolioProject.create(form);
      else await base44.entities.PortfolioProject.update(editing, form);
      toast({ title: "Project saved" });
      setEditing(null);
      load();
    } catch { toast({ title: "Save failed", variant: "destructive" }); }
  };

  const remove = async (id) => {
    if (!confirm("Delete this project?")) return;
    try { await base44.entities.PortfolioProject.delete(id); toast({ title: "Deleted" }); load(); }
    catch { toast({ title: "Delete failed", variant: "destructive" }); }
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm((f) => ({ ...f, images: [...(f.images || []), file_url] }));
    } catch { toast({ title: "Upload failed", variant: "destructive" }); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Work ]</span>
          <h1 className="mt-2 font-heading font-bold text-3xl lg:text-4xl">Portfolio</h1>
        </div>
        <button onClick={openNew} className="scan-btn inline-flex items-center gap-2 h-11 px-5 bg-primary text-white font-mono text-xs uppercase min-h-[44px]"><Plus size={16} /> Add Project</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [...Array(3)].map((_, i) => <div key={i} className="aspect-[4/3] bg-card animate-pulse border border-border" />)
        ) : items.map((p) => (
          <div key={p.id} className="bg-card border border-border">
            <div className="relative aspect-[4/3] bg-background overflow-hidden">
              <Img src={p.images?.[0] || IMAGES.drone} alt={p.title} fittingType="fill" className="h-full w-full object-cover" />
              {!p.published && <span className="absolute top-2 left-2 font-mono text-[10px] uppercase px-2 py-1 bg-background/80 text-muted-foreground border border-border">Draft</span>}
            </div>
            <div className="p-4">
              <span className="font-mono text-xs text-primary">[ {p.category} ]</span>
              <h3 className="font-heading font-semibold mt-1 truncate">{p.title}</h3>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(p)} className="flex-1 h-9 inline-flex items-center justify-center gap-1.5 border border-border font-mono text-xs uppercase hover:border-primary min-h-[44px]"><Pencil size={13} /> Edit</button>
                <button onClick={() => remove(p.id)} className="h-9 w-9 inline-flex items-center justify-center border border-border text-muted-foreground hover:border-destructive hover:text-destructive min-h-[44px] min-w-[44px]"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setEditing(null)} />
          <div className="relative w-full max-w-lg h-full bg-card border-l border-border overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-5 flex items-center justify-between z-10">
              <h2 className="font-heading font-semibold text-lg">{editing === "new" ? "New Project" : "Edit Project"}</h2>
              <button onClick={() => setEditing(null)} className="h-9 w-9 flex items-center justify-center border border-border hover:border-primary min-h-[44px] min-w-[44px]"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <F label="Title"><input value={form.title} onChange={(e) => setF("title", e.target.value)} className="inp" /></F>
              <F label="Category"><select value={form.category} onChange={(e) => setF("category", e.target.value)} className="inp">{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></F>
              <F label="Description"><textarea rows={4} value={form.description} onChange={(e) => setF("description", e.target.value)} className="inp resize-none" /></F>
              <div className="grid grid-cols-2 gap-3">
                <F label="Materials"><input value={form.materials} onChange={(e) => setF("materials", e.target.value)} className="inp" /></F>
                <F label="Process"><input value={form.process} onChange={(e) => setF("process", e.target.value)} className="inp" /></F>
                <F label="Completion Date"><input type="date" value={form.completion_date?.slice(0, 10) || ""} onChange={(e) => setF("completion_date", e.target.value)} className="inp" /></F>
                <F label="Video URL"><input value={form.video_url} onChange={(e) => setF("video_url", e.target.value)} className="inp" /></F>
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setF("featured", e.target.checked)} className="h-4 w-4 accent-[hsl(var(--primary))]" /> Featured</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => setF("published", e.target.checked)} className="h-4 w-4 accent-[hsl(var(--primary))]" /> Published</label>
              </div>
              <div>
                <label className="font-mono text-xs uppercase text-muted-foreground block mb-2">Images</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {(form.images || []).map((url, i) => (
                    <div key={i} className="relative aspect-square border border-border overflow-hidden">
                      <Img src={url} alt={`Project image ${i + 1}`} fittingType="fill" className="h-full w-full object-cover" />
                      <button onClick={() => setF("images", form.images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 h-6 w-6 bg-background/80 border border-border flex items-center justify-center"><X size={12} /></button>
                    </div>
                  ))}
                </div>
                <label className="block border border-dashed border-border hover:border-primary p-4 text-center cursor-pointer">
                  <Upload size={18} className="mx-auto text-primary mb-1" />
                  <span className="font-mono text-xs">Upload image</span>
                  <input type="file" className="hidden" onChange={uploadImage} accept="image/*" />
                </label>
              </div>
              <button onClick={save} className="scan-btn w-full h-12 bg-primary text-white font-mono text-sm uppercase min-h-[44px]">Save Project</button>
            </div>
          </div>
        </div>
      )}

      <style>{`.inp{width:100%;height:44px;padding:0 12px;background:hsl(0 0% 7%);border:1px solid hsl(var(--border));font-size:14px;outline:none}.inp:focus{border-color:hsl(var(--primary))}textarea.inp{height:auto;padding:12px}`}</style>
    </div>
  );

  function setF(k, v) { setForm((f) => ({ ...f, [k]: v })); }
}

function F({ label, children }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase text-muted-foreground block mb-1.5">{label}</span>
      {children}
    </label>
  );
}
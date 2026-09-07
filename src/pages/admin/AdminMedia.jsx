import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, Trash2, Search, FolderPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Image as Img } from "@/components/ui/image";

const FOLDERS = ["All", "Spoilers", "Portfolio", "Hero", "Documents"];

export default function AdminMedia() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [folder, setFolder] = useState("All");
  const [q, setQ] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setItems(await base44.entities.MediaAsset.list("-created_date", 200)); }
    catch { setItems([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const upload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const created = [];
      for (const f of files) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file: f });
        created.push(await base44.entities.MediaAsset.create({
          filename: f.name, file_url, file_size: f.size, file_type: f.type, folder: folder === "All" ? "Uncategorized" : folder, category: folder === "All" ? "Uncategorized" : folder, alt_text: "",
        }));
      }
      setItems((prev) => [...created, ...prev]);
      toast({ title: `${files.length} file(s) uploaded` });
    } catch { toast({ title: "Upload failed", variant: "destructive" }); }
    finally { setUploading(false); }
  };

  const updateAlt = async (id, alt_text) => {
    try { await base44.entities.MediaAsset.update(id, { alt_text }); }
    catch { toast({ title: "Update failed", variant: "destructive" }); }
  };

  const remove = async (id) => {
    if (!confirm("Delete this asset?")) return;
    try { await base44.entities.MediaAsset.delete(id); setItems((p) => p.filter((i) => i.id !== id)); toast({ title: "Deleted" }); }
    catch { toast({ title: "Delete failed", variant: "destructive" }); }
  };

  const filtered = items.filter((i) => {
    if (folder !== "All" && i.folder !== folder) return false;
    if (q && !i.filename.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Library ]</span>
          <h1 className="mt-2 font-heading font-bold text-3xl lg:text-4xl">Media</h1>
        </div>
        <label className="scan-btn inline-flex items-center gap-2 h-11 px-5 bg-primary text-white font-mono text-xs uppercase cursor-pointer min-h-[44px]">
          <Upload size={16} /> {uploading ? "Uploading…" : "Upload"}
          <input type="file" multiple className="hidden" onChange={upload} accept="image/*,.pdf" />
        </label>
      </div>

      {/* Folders */}
      <div className="flex flex-wrap gap-2 mb-4">
        {FOLDERS.map((f) => (
          <button key={f} onClick={() => setFolder(f)} className={`h-10 px-4 font-mono text-xs uppercase border transition-colors inline-flex items-center gap-1.5 min-h-[44px] ${folder === f ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {f === "All" ? null : <FolderPlus size={13} />} {f}
          </button>
        ))}
      </div>

      <div className="relative max-w-xs mb-6">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search files" className="w-full h-10 pl-9 pr-3 bg-card border border-border text-sm focus:border-primary outline-none" />
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="border-2 border-dashed border-border p-16 text-center">
          <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground text-sm">No media yet. Upload files to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((m) => (
            <div key={m.id} className="bg-card border border-border group">
              <div className="relative aspect-square bg-background overflow-hidden">
                {m.file_type?.startsWith("image/") || m.filename.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                  <Img src={m.file_url} alt={m.alt_text || m.filename} fittingType="fill" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full flex items-center justify-center font-mono text-xs text-muted-foreground">{m.filename.split(".").pop()?.toUpperCase()}</div>
                )}
                <button onClick={() => remove(m.id)} className="absolute top-2 right-2 h-8 w-8 bg-background/80 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-destructive hover:text-destructive">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs truncate font-medium">{m.filename}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{m.file_size ? `${(m.file_size / 1024).toFixed(0)} KB` : ""} · {m.folder}</p>
                <input
                  defaultValue={m.alt_text}
                  onBlur={(e) => updateAlt(m.id, e.target.value)}
                  placeholder="Alt text…"
                  className="mt-2 w-full h-8 px-2 bg-background border border-border text-xs focus:border-primary outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
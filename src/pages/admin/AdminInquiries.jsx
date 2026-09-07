import { useEffect, useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Search, X, Download, FileText, Mail, Phone, Building2, Calendar, Ruler, Hash, Wallet, Tag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { INQUIRY_STATUSES } from "@/lib/site";

const STATUS_STYLE = {
  new: "text-primary border-primary/40 bg-primary/5",
  reviewing: "text-amber-400 border-amber-500/40",
  quoted: "text-sky-400 border-sky-500/40",
  approved: "text-violet-400 border-violet-500/40",
  "in-production": "text-orange-400 border-orange-500/40",
  completed: "text-emerald-400 border-emerald-500/40",
  archived: "text-muted-foreground border-border",
};

export default function AdminInquiries() {
  const { toast } = useToast();
  const [tab, setTab] = useState("custom");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  const entity = tab === "custom" ? base44.entities.CustomInquiry : base44.entities.QuoteRequest;

  const load = async () => {
    setLoading(true);
    try {
      const data = await entity.list("-created_date", 200);
      setItems(data);
    } catch { setItems([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [tab]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (statusFilter && i.status !== statusFilter) return false;
      if (q) {
        const s = `${i.customer_name || i.name || ""} ${i.email || ""} ${i.project_description || i.part_description || ""}`.toLowerCase();
        if (!s.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [items, statusFilter, q]);

  const updateStatus = async (id, status) => {
    try {
      await entity.update(id, { status });
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      if (selected?.id === id) setSelected((s) => ({ ...s, status }));
      toast({ title: `Status updated to ${status}` });
    } catch {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Inbox ]</span>
        <h1 className="mt-2 font-heading font-bold text-3xl lg:text-4xl">Inquiries & Quotes</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {[
          { id: "custom", label: "Custom Part Requests" },
          { id: "quote", label: "Quote Requests" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setSelected(null); setStatusFilter(""); }}
            className={`px-4 py-3 font-mono text-xs uppercase tracking-wider border-b-2 transition-colors min-h-[44px] ${
              tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, description" className="w-full h-10 pl-9 pr-3 bg-card border border-border text-sm focus:border-primary outline-none" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 px-3 bg-card border border-border text-sm focus:border-primary outline-none min-h-[44px]">
          <option value="">All Statuses</option>
          {INQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s.replace("-", " ")}</option>)}
        </select>
      </div>

      {/* List */}
      <div className="border border-border divide-y divide-border">
        {loading ? (
          <p className="p-6 text-muted-foreground text-sm">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-muted-foreground text-sm">No submissions found.</p>
        ) : (
          filtered.map((i) => (
            <button key={i.id} onClick={() => setSelected(i)} className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 text-left hover:bg-card transition-colors">
              <div className="min-w-0">
                <p className="font-medium truncate">{i.customer_name || i.name}</p>
                <p className="font-mono text-xs text-muted-foreground truncate">{i.email} · {i.part_category || i.project_category || "—"}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs text-muted-foreground">{new Date(i.created_date).toLocaleDateString()}</span>
                <span className={`font-mono text-[10px] uppercase px-2 py-1 border ${STATUS_STYLE[i.status]}`}>{i.status}</span>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-xl h-full bg-card border-l border-border overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-5 flex items-center justify-between z-10">
              <div>
                <span className="font-mono text-xs text-primary">[ {tab === "custom" ? "Custom Part" : "Quote"} ]</span>
                <h2 className="font-heading font-semibold text-lg mt-0.5">{selected.customer_name || selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="h-9 w-9 flex items-center justify-center border border-border hover:border-primary min-h-[44px] min-w-[44px]"><X size={16} /></button>
            </div>

            <div className="p-5 space-y-5">
              {/* Status control */}
              <div>
                <label className="font-mono text-xs uppercase text-muted-foreground block mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`h-9 px-3 font-mono text-[10px] uppercase border transition-colors min-h-[44px] ${
                        selected.status === s ? STATUS_STYLE[s] : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div className="border border-border divide-y divide-border">
                <DetailRow icon={Mail} label="Email" value={selected.email} href={`mailto:${selected.email}`} />
                <DetailRow icon={Phone} label="Phone" value={selected.phone} href={selected.phone ? `tel:${selected.phone}` : null} />
                {selected.company && <DetailRow icon={Building2} label="Company" value={selected.company} />}
                {selected.location && <DetailRow icon={Tag} label="Location" value={selected.location} />}
                {selected.customer_type && <DetailRow icon={Tag} label="Customer Type" value={selected.customer_type} />}
                {selected.part_category && <DetailRow icon={Tag} label="Category" value={selected.part_category} />}
                {selected.project_category && <DetailRow icon={Tag} label="Category" value={selected.project_category} />}
                {selected.intended_application && <DetailRow icon={Tag} label="Application" value={selected.intended_application} />}
                {selected.vehicle_application && <DetailRow icon={Tag} label="Vehicle / Application" value={selected.vehicle_application} />}
                {selected.dimensions && <DetailRow icon={Ruler} label="Dimensions" value={selected.dimensions} />}
                {selected.quantity && <DetailRow icon={Hash} label="Quantity" value={String(selected.quantity)} />}
                {selected.budget_range && <DetailRow icon={Wallet} label="Budget" value={selected.budget_range} />}
                {selected.target_deadline && <DetailRow icon={Calendar} label="Deadline" value={selected.target_deadline} />}
                {selected.deadline && <DetailRow icon={Calendar} label="Deadline" value={selected.deadline} />}
                {selected.preferred_contact && <DetailRow icon={Mail} label="Preferred Contact" value={selected.preferred_contact} />}
              </div>

              {(selected.project_description || selected.part_description) && (
                <div>
                  <label className="font-mono text-xs uppercase text-muted-foreground block mb-2">Description</label>
                  <p className="text-sm text-foreground/80 leading-relaxed border border-border p-4">{selected.project_description || selected.part_description}</p>
                </div>
              )}

              {/* Attachments */}
              {selected.attachments?.length > 0 && (
                <div>
                  <label className="font-mono text-xs uppercase text-muted-foreground block mb-2">Attachments ({selected.attachments.length})</label>
                  <ul className="space-y-2">
                    {selected.attachments.map((url, idx) => (
                      <li key={idx}>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-border px-4 py-2.5 text-sm hover:border-primary">
                          <FileText size={15} className="text-primary shrink-0" />
                          <span className="truncate flex-1">{url.split("/").pop() || `File ${idx + 1}`}</span>
                          <Download size={15} className="text-muted-foreground" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 font-mono text-xs text-muted-foreground">
                Received {new Date(selected.created_date).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ icon: Icon, label, value, href = null }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Icon size={15} className="text-primary shrink-0" />
      <span className="font-mono text-xs uppercase text-muted-foreground w-32 shrink-0">{label}</span>
      {href ? <a href={href} className="text-sm hover:text-primary truncate">{value}</a> : <span className="text-sm truncate">{value}</span>}
    </div>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Inbox, Package, FolderKanban, ArrowRight, TrendingUp } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState({ inquiries: 0, quotes: 0, products: 0, projects: 0, newCount: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [inquiries, quotes, products, projects] = await Promise.all([
          base44.entities.CustomInquiry.list("-created_date", 50),
          base44.entities.QuoteRequest.list("-created_date", 50),
          base44.entities.Spoiler.list("-created_date", 100),
          base44.entities.PortfolioProject.list("-created_date", 100),
        ]);
        const newCount = [...inquiries, ...quotes].filter((i) => i.status === "new").length;
        setStats({ inquiries: inquiries.length, quotes: quotes.length, products: products.length, projects: projects.length, newCount });
        const merged = [
          ...inquiries.map((i) => ({ ...i, type: "Custom Part" })),
          ...quotes.map((q) => ({ ...q, type: "Quote" })),
        ].sort((a, b) => Number(new Date(b.created_date)) - Number(new Date(a.created_date))).slice(0, 8);
        setRecent(merged);
      } catch { /* ignore */ }
      finally { setLoading(false); }
    })();
  }, []);

  const cards = [
    { label: "New Submissions", value: stats.newCount, icon: TrendingUp, color: "text-primary" },
    { label: "Custom Inquiries", value: stats.inquiries, icon: Inbox, link: "/admin/inquiries" },
    { label: "Quote Requests", value: stats.quotes, icon: Inbox, link: "/admin/inquiries" },
    { label: "Spoiler Products", value: stats.products, icon: Package, link: "/admin/products" },
    { label: "Portfolio Projects", value: stats.projects, icon: FolderKanban, link: "/admin/portfolio" },
  ];

  return (
    <div>
      <div className="mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">[ Control Panel ]</span>
        <h1 className="mt-2 font-heading font-bold text-3xl lg:text-4xl">Overview</h1>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-10">
        {cards.map((c) => {
          const Card = c.link ? Link : "div";
          return (
            <Card key={c.label} to={c.link} className="bg-background p-6 block hover:bg-card transition-colors">
              <div className="flex items-center justify-between mb-3">
                <c.icon size={18} className={c.color || "text-muted-foreground"} />
                {c.link && <ArrowRight size={14} className="text-muted-foreground" />}
              </div>
              <p className="font-heading font-bold text-3xl">{loading ? "—" : c.value}</p>
              <p className="font-mono text-xs uppercase text-muted-foreground mt-1">{c.label}</p>
            </Card>
          );
        })}
      </div>

      <div>
        <h2 className="font-heading font-semibold text-xl mb-4">Recent Submissions</h2>
        <div className="border border-border divide-y divide-border">
          {loading ? (
            <p className="p-6 text-muted-foreground text-sm">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="p-6 text-muted-foreground text-sm">No submissions yet.</p>
          ) : (
            recent.map((r) => (
              <Link key={r.id} to="/admin/inquiries" className="flex items-center justify-between p-4 hover:bg-card transition-colors">
                <div className="min-w-0">
                  <p className="font-medium truncate">{r.customer_name || r.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{r.email} · {r.type}</p>
                </div>
                <span className={`font-mono text-[10px] uppercase px-2 py-1 border ${statusStyle(r.status)}`}>{r.status}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function statusStyle(s) {
  const map = {
    new: "text-primary border-primary/40",
    reviewing: "text-amber-400 border-amber-500/40",
    quoted: "text-sky-400 border-sky-500/40",
    approved: "text-violet-400 border-violet-500/40",
    "in-production": "text-orange-400 border-orange-500/40",
    completed: "text-emerald-400 border-emerald-500/40",
    archived: "text-muted-foreground border-border",
  };
  return map[s] || map.new;
}
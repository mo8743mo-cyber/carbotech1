import { useEffect, useState } from "react";
export function Toaster() {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const handler = (event) => { setMessage(event.detail); window.setTimeout(() => setMessage(null), 3500); };
    window.addEventListener("carbotech:toast", handler);
    return () => window.removeEventListener("carbotech:toast", handler);
  }, []);
  if (!message) return null;
  return <div className="fixed bottom-5 right-5 z-[100] border border-primary bg-card px-5 py-4 shadow-lg"><strong className="block">{message.title}</strong>{message.description && <span className="text-sm text-muted-foreground">{message.description}</span>}</div>;
}

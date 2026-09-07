import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, FileText } from "lucide-react";

export default function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col gap-3 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <a
        href="/contact"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-black shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle size={22} />
      </a>
      <Link
        to="/quote"
        aria-label="Request a quote"
        className="scan-btn inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white red-glow hover:scale-110 transition-transform"
      >
        <FileText size={20} />
      </Link>
    </div>
  );
}
export function Button({ variant = "default", className = "", ...props }) {
  const styles = variant === "outline" ? "border border-border bg-transparent hover:bg-card" : "bg-primary text-white hover:opacity-90";
  return <button className={`inline-flex items-center justify-center px-4 transition-colors ${styles} ${className}`} {...props} />;
}

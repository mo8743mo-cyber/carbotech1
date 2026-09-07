export function Input({ className = "", ...props }) {
  return <input className={`w-full border border-border bg-background px-3 outline-none focus:border-primary ${className}`} {...props} />;
}

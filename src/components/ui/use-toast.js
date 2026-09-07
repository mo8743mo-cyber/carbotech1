export function toast({ title, description = "", variant: _variant = "default" }) {
  window.dispatchEvent(new CustomEvent("carbotech:toast", { detail: { title, description } }));
}
export function useToast() {
  return { toast };
}

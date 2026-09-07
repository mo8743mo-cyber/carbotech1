export function InputOTP({ maxLength, value, onChange, children: _children, autoFocus: _autoFocus, autoComplete: _autoComplete }) {
  return <div className="flex gap-2">{Array.from({ length: maxLength }, (_, index) => <input key={index} value={value[index] || ""} maxLength={1} onChange={(event) => { const next = value.split(""); next[index] = event.target.value.slice(-1); onChange(next.join("")); }} className="h-12 w-10 border border-border bg-background text-center" />)}</div>;
}
export function InputOTPGroup({ children }) { return <>{children}</>; }
export function InputOTPSlot({ index: _index }) { return null; }

export function Image({ src, alt, className = "", fittingType: _fittingType, ...props }) {
  return <img src={src} alt={alt || ""} className={className} loading="lazy" {...props} onError={(event) => { event.currentTarget.src = "/assets/carbon-panel.svg"; }} />;
}

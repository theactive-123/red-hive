/** Decorative SVG honeycomb with a few highlighted cells that pulse. */
export default function HexField({ className = "" }: { className?: string }) {
  const cells: { x: number; y: number; hot: number }[] = [];
  const R = 34;
  const w = Math.sqrt(3) * R;
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 9; c++) {
      const seed = (r * 13 + c * 7) % 11;
      cells.push({ x: c * w + (r % 2 ? w / 2 : 0), y: r * R * 1.5, hot: seed === 3 ? 2 : seed === 7 ? 1 : 0 });
    }
  const hex = (cx: number, cy: number, s: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${(cx + s * Math.cos(a)).toFixed(1)},${(cy + s * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  return (
    <svg viewBox="-40 -40 620 520" className={className} aria-hidden>
      <defs>
        <radialGradient id="hf-fade" cx="70%" cy="40%" r="65%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hf-mask">
          <rect x="-40" y="-40" width="620" height="520" fill="url(#hf-fade)" />
        </mask>
      </defs>
      <g mask="url(#hf-mask)">
        {cells.map((c, i) => (
          <polygon
            key={i}
            points={hex(c.x, c.y, R - 3)}
            fill={c.hot === 2 ? "#e1013b" : c.hot === 1 ? "rgba(225,1,59,0.18)" : "transparent"}
            stroke={c.hot ? "#f40040" : "rgba(255,255,255,0.09)"}
            strokeWidth="1"
            style={c.hot ? { animation: `pulse-hex 3.6s ${(i % 5) * 0.6}s ease-in-out infinite` } : undefined}
          />
        ))}
      </g>
      <style>{`@keyframes pulse-hex{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
    </svg>
  );
}

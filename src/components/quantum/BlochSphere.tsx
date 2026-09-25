import { cn } from "@/lib/utils";

// Vector tip sampled around the precession ellipse (cx 150, cy 92, rx 78, ry 22).
const STEPS = 24;
const pts = Array.from({ length: STEPS + 1 }, (_, i) => {
  const t = (i / STEPS) * 2 * Math.PI;
  return [150 + 78 * Math.cos(t), 92 + 22 * Math.sin(t)].map((v) => v.toFixed(1));
});
const xs = pts.map((p) => p[0]).join(";");
const ys = pts.map((p) => p[1]).join(";");

/** Decorative Bloch sphere with a precessing state vector |ψ⟩. */
export default function BlochSphere({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 300" className={cn("h-auto w-full", className)} role="img" aria-label="Bloch sphere showing a qubit state precessing">
      <defs>
        <radialGradient id="sphere" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#FFCC29" stopOpacity="0.18" />
          <stop offset="1" stopColor="#FFCC29" stopOpacity="0.02" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="110" fill="url(#sphere)" className="stroke-current opacity-60" strokeWidth="1.5" />
      <ellipse cx="150" cy="150" rx="110" ry="30" className="fill-none stroke-current opacity-40" strokeWidth="1.2" strokeDasharray="4 5" />
      <ellipse cx="150" cy="150" rx="30" ry="110" className="fill-none stroke-current opacity-25" strokeWidth="1.2" strokeDasharray="4 5" />
      <line x1="150" y1="30" x2="150" y2="270" className="stroke-current opacity-40" strokeWidth="1.2" />
      <line x1="40" y1="150" x2="260" y2="150" className="stroke-current opacity-25" strokeWidth="1.2" />
      <text x="150" y="20" textAnchor="middle" className="fill-current font-mono text-[15px]">
        |0⟩
      </text>
      <text x="150" y="292" textAnchor="middle" className="fill-current font-mono text-[15px]">
        |1⟩
      </text>
      {/* precession orbit of the vector tip */}
      <ellipse cx="150" cy="92" rx="78" ry="22" className="fill-none stroke-[#FFCC29] opacity-60" strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="150" cy="150" r="4" className="fill-current" />
      <g className="q-precess">
        <line x1="150" y1="150" x2="228" y2="92" stroke="#FFCC29" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="x2" values={xs} dur="8s" repeatCount="indefinite" />
          <animate attributeName="y2" values={ys} dur="8s" repeatCount="indefinite" />
        </line>
        <circle cx="228" cy="92" r="8" fill="#FFCC29">
          <animate attributeName="cx" values={xs} dur="8s" repeatCount="indefinite" />
          <animate attributeName="cy" values={ys} dur="8s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* static vector shown when reduced motion is preferred */}
      <g className="q-static">
        <line x1="150" y1="150" x2="228" y2="92" stroke="#FFCC29" strokeWidth="3" strokeLinecap="round" />
        <circle cx="228" cy="92" r="8" fill="#FFCC29" />
      </g>
      <text x="238" y="84" className="fill-[#FFCC29] font-mono text-[16px] font-bold">
        |ψ⟩
      </text>
    </svg>
  );
}

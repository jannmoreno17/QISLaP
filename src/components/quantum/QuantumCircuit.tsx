import { cn } from "@/lib/utils";

/**
 * Decorative quantum circuit (4 qubits) drawn in the QISLaP logo style:
 * wires with junction dots, H / Rz gates, CNOTs and measurement meters.
 * Yellow "probability pulses" travel along the wires (disabled for reduced motion).
 */
const WIRES = [60, 130, 200, 270];
const X0 = 70;
const X1 = 860;

function Gate({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x - 22} y={y - 22} width={44} height={44} rx={6} className="fill-[var(--q-bg)] stroke-[#FFCC29]" strokeWidth={2.5} />
      <text x={x} y={y + 7} textAnchor="middle" className="fill-[#FFCC29] font-mono text-[20px] font-bold">
        {label}
      </text>
    </g>
  );
}

function Cnot({ x, control, target }: { x: number; control: number; target: number }) {
  return (
    <g className="stroke-white/80" strokeWidth={2.5}>
      <line x1={x} y1={control} x2={x} y2={target + (target > control ? 16 : -16)} />
      <circle cx={x} cy={control} r={7} className="fill-white/90" stroke="none" />
      <circle cx={x} cy={target} r={16} className="fill-[var(--q-bg)]" />
      <line x1={x - 16} y1={target} x2={x + 16} y2={target} />
      <line x1={x} y1={target - 16} x2={x} y2={target + 16} />
    </g>
  );
}

function Meter({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 24} y={y - 22} width={48} height={44} rx={6} className="fill-[var(--q-bg)] stroke-white/70" strokeWidth={2.5} />
      <path d={`M${x - 14} ${y + 10} A 14 14 0 0 1 ${x + 14} ${y + 10}`} className="fill-none stroke-[#FFCC29]" strokeWidth={2.5} />
      <line x1={x} y1={y + 10} x2={x + 11} y2={y - 11} className="stroke-[#FFCC29]" strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

export default function QuantumCircuit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 330" className={cn("h-auto w-full", className)} role="img" aria-label="Illustration of a four-qubit quantum circuit with Hadamard, rotation and CNOT gates followed by measurement">
      <defs>
        <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#FFE38A" />
          <stop offset="0.45" stopColor="#FFCC29" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFCC29" stopOpacity="0" />
        </radialGradient>
      </defs>

      {WIRES.map((y, i) => (
        <g key={y}>
          <text x={10} y={y + 6} className="fill-white/60 font-mono text-[18px]">
            q{i}
          </text>
          <text x={36} y={y + 6} className="fill-white/80 font-mono text-[18px]">
            |0⟩
          </text>
          <line x1={X0} y1={y} x2={X1} y2={y} className="stroke-white/35" strokeWidth={2} />
          <circle cx={X1} cy={y} r={6} className="fill-[#FFCC29]" />
          {/* travelling amplitude pulse */}
          <circle r={14} cy={y} fill="url(#pulse)" className="q-pulse" style={{ animationDelay: `${i * 0.9}s` }} />
        </g>
      ))}

      {WIRES.map((y) => (
        <Gate key={`h${y}`} x={140} y={y} label="H" />
      ))}
      <Cnot x={240} control={WIRES[0]} target={WIRES[1]} />
      <Cnot x={310} control={WIRES[2]} target={WIRES[3]} />
      <Gate x={400} y={WIRES[1]} label="Rz" />
      <Gate x={400} y={WIRES[3]} label="Rz" />
      <Cnot x={490} control={WIRES[1]} target={WIRES[2]} />
      <Gate x={580} y={WIRES[0]} label="Rx" />
      <Gate x={580} y={WIRES[2]} label="Rx" />
      <Cnot x={660} control={WIRES[3]} target={WIRES[0]} />
      {WIRES.map((y) => (
        <Meter key={`m${y}`} x={770} y={y} />
      ))}
    </svg>
  );
}

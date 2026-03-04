"use client";

import { ArrowUp, ChevronUp, ChevronsUp, Rocket, Zap, ArrowUpCircle, MoveUp, ChevronUpCircle } from "lucide-react";

const options = [
  {
    id: 1,
    name: "Minimal Circle",
    desc: "Limpio y simple — borde cyan, fondo oscuro",
    className:
      "flex h-14 w-14 items-center justify-center rounded-full border border-cyan-500/40 bg-[rgba(5,10,30,0.8)] text-cyan-400 backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:scale-110",
    icon: <ArrowUp className="h-5 w-5" strokeWidth={2} />,
  },
  {
    id: 2,
    name: "Glow Pulse",
    desc: "Gradiente cyan-azul con pulso de brillo animado",
    className:
      "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,212,254,0.4),0_0_40px_rgba(34,212,254,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,212,254,0.6),0_0_60px_rgba(34,212,254,0.25)] hover:scale-110 animate-[pulse-glow_3s_ease-in-out_infinite]",
    icon: <ChevronsUp className="h-6 w-6" strokeWidth={2.5} />,
  },
  {
    id: 3,
    name: "Gradient Border Ring",
    desc: "Borde gradiente rotatorio animado",
    className:
      "gradient-border-card flex h-14 w-14 items-center justify-center !rounded-full bg-[rgba(5,10,30,0.9)] text-cyan-400 transition-all duration-300 hover:text-white hover:scale-110",
    icon: <ChevronUp className="h-6 w-6" strokeWidth={2.5} />,
  },
  {
    id: 4,
    name: "Rocket Launch",
    desc: "Icono de cohete con glow púrpura",
    className:
      "group flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/40 bg-[rgba(5,10,30,0.85)] backdrop-blur-md transition-all duration-300 hover:border-purple-400 hover:scale-110 hover:shadow-[0_0_30px_rgba(115,120,255,0.3)]",
    icon: <Rocket className="h-5 w-5 text-purple-400 transition-all group-hover:text-purple-300 group-hover:-translate-y-0.5" strokeWidth={2} />,
  },
  {
    id: 5,
    name: "Pill Shape",
    desc: "Forma de pastilla horizontal con texto 'Top'",
    className:
      "flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[rgba(5,10,30,0.85)] px-5 py-3 text-sm font-medium text-cyan-400 backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-500/15 hover:shadow-[0_0_25px_rgba(34,212,254,0.2)]",
    icon: (
      <>
        <ArrowUp className="h-4 w-4" strokeWidth={2} />
        <span>Top</span>
      </>
    ),
  },
  {
    id: 6,
    name: "Progress Ring",
    desc: "Anillo SVG que muestra el progreso del scroll",
    className:
      "relative flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(5,10,30,0.9)] transition-all duration-300 hover:scale-110",
    icon: (
      <>
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(34,212,254,0.15)" strokeWidth="2" />
          <circle
            cx="24" cy="24" r="20" fill="none"
            stroke="rgba(34,212,254,0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={2 * Math.PI * 20 * 0.35}
          />
        </svg>
        <ArrowUp className="h-5 w-5 text-cyan-400" strokeWidth={2} />
      </>
    ),
  },
  {
    id: 7,
    name: "Neon Square",
    desc: "Cuadrado con bordes neon afilados",
    className:
      "flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-400/50 bg-[rgba(5,10,30,0.9)] text-cyan-400 shadow-[inset_0_0_12px_rgba(34,212,254,0.1),0_0_15px_rgba(34,212,254,0.15)] transition-all duration-300 hover:border-cyan-300 hover:text-cyan-300 hover:shadow-[inset_0_0_20px_rgba(34,212,254,0.15),0_0_25px_rgba(34,212,254,0.3)] hover:scale-105",
    icon: <MoveUp className="h-5 w-5" strokeWidth={2} />,
  },
  {
    id: 8,
    name: "Dual Tone",
    desc: "Gradiente completo cyan → azul → púrpura",
    className:
      "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-110",
    icon: <ArrowUpCircle className="h-6 w-6" strokeWidth={1.8} />,
  },
  {
    id: 9,
    name: "Lightning Bolt",
    desc: "Rayo eléctrico con brillo amarillo/dorado",
    className:
      "group flex h-14 w-14 items-center justify-center rounded-full border border-yellow-500/30 bg-[rgba(5,10,30,0.85)] backdrop-blur-md transition-all duration-300 hover:border-yellow-400/60 hover:scale-110 hover:shadow-[0_0_20px_rgba(250,204,21,0.2),0_0_40px_rgba(250,204,21,0.1)]",
    icon: <Zap className="h-5 w-5 text-yellow-400 fill-yellow-400/20 transition-all group-hover:fill-yellow-400/40 group-hover:text-yellow-300" strokeWidth={2} />,
  },
  {
    id: 10,
    name: "Glass Morphism",
    desc: "Vidrio esmerilado con blur extremo",
    className:
      "flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:scale-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
    icon: <ChevronUpCircle className="h-6 w-6" strokeWidth={1.5} />,
  },
];

export default function ScrollPreviewPage() {
  return (
    <div className="min-h-screen bg-[rgba(5,10,30,1)] text-white px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-2xl font-bold text-cyan-400">
          Scroll-to-Top Button — 10 Opciones
        </h1>
        <p className="mb-10 text-sm text-white/50">
          Pasa el mouse sobre cada botón para ver el efecto hover. Dime cuál te gusta.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {options.map((opt) => (
            <div
              key={opt.id}
              className="flex items-center gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-cyan-500/20 hover:bg-white/[0.04]"
            >
              {/* Button preview */}
              <div className="flex-shrink-0">
                <button className={opt.className}>
                  {opt.icon}
                </button>
              </div>

              {/* Info */}
              <div>
                <p className="text-base font-semibold text-white/90">
                  <span className="mr-2 text-cyan-400">#{opt.id}</span>
                  {opt.name}
                </p>
                <p className="mt-1 text-sm text-white/40">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

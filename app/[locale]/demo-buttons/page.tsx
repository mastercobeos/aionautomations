"use client"

const scrollContent = (
  <div className="space-y-3 text-xs text-white/30">
    {Array.from({ length: 20 }).map((_, i) => (
      <p key={i}>Línea de contenido #{i + 1} — Haz scroll para ver la barra personalizada en acción.</p>
    ))}
  </div>
)

export default function DemoButtons() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══ Hero header ═══ */}
      <div className="relative overflow-hidden border-b border-border/30">
        <div className="hero-bg-slide" />
        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            AION Automations
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Scrollbar{" "}
            <span className="gradient-text-animated">Showcase</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            15 diseños modernos de scrollbar con colores neón. Haz scroll dentro de cada caja para ver el efecto.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
         SCROLLBAR OPTIONS
         ═══════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {/* 1 — Neon Cyan Thin */}
          <DemoCard number={1} title="Neon Cyan Thin" desc="Delgada 5px con glow cyan neón. Minimalista y futurista.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-1">
              <style>{`
                .sb-1::-webkit-scrollbar { width: 5px; }
                .sb-1::-webkit-scrollbar-track { background: transparent; }
                .sb-1::-webkit-scrollbar-thumb { background: #22d3ee; border-radius: 3px; box-shadow: 0 0 8px #22d3ee, 0 0 20px rgba(34,211,238,0.3); }
                .sb-1::-webkit-scrollbar-thumb:hover { background: #67e8f9; box-shadow: 0 0 12px #67e8f9, 0 0 30px rgba(103,232,249,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 2 — Neon Magenta */}
          <DemoCard number={2} title="Neon Magenta" desc="Rosa/magenta eléctrico con resplandor intenso.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-2">
              <style>{`
                .sb-2::-webkit-scrollbar { width: 6px; }
                .sb-2::-webkit-scrollbar-track { background: rgba(255,0,128,0.03); border-radius: 3px; }
                .sb-2::-webkit-scrollbar-thumb { background: #ff0080; border-radius: 3px; box-shadow: 0 0 10px #ff0080, 0 0 25px rgba(255,0,128,0.3); }
                .sb-2::-webkit-scrollbar-thumb:hover { background: #ff3399; box-shadow: 0 0 15px #ff3399, 0 0 35px rgba(255,51,153,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 3 — Neon Green */}
          <DemoCard number={3} title="Neon Green" desc="Verde neón estilo Matrix / terminal hacker.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-3">
              <style>{`
                .sb-3::-webkit-scrollbar { width: 5px; }
                .sb-3::-webkit-scrollbar-track { background: transparent; }
                .sb-3::-webkit-scrollbar-thumb { background: #00ff88; border-radius: 3px; box-shadow: 0 0 8px #00ff88, 0 0 20px rgba(0,255,136,0.3); }
                .sb-3::-webkit-scrollbar-thumb:hover { background: #33ffaa; box-shadow: 0 0 12px #33ffaa, 0 0 30px rgba(51,255,170,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 4 — Gradient Cyan→Magenta */}
          <DemoCard number={4} title="Cyan → Magenta" desc="Gradiente neón de cyan a magenta. Vibrante y moderno.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-4">
              <style>{`
                .sb-4::-webkit-scrollbar { width: 7px; }
                .sb-4::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
                .sb-4::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #22d3ee, #ff0080); border-radius: 4px; box-shadow: 0 0 10px rgba(34,211,238,0.3), 0 0 10px rgba(255,0,128,0.3); }
                .sb-4::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #67e8f9, #ff3399); box-shadow: 0 0 15px rgba(103,232,249,0.4), 0 0 15px rgba(255,51,153,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 5 — Neon Purple */}
          <DemoCard number={5} title="Neon Purple" desc="Púrpura eléctrico con glow violeta intenso.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-5">
              <style>{`
                .sb-5::-webkit-scrollbar { width: 6px; }
                .sb-5::-webkit-scrollbar-track { background: rgba(139,92,246,0.03); border-radius: 3px; }
                .sb-5::-webkit-scrollbar-thumb { background: #a855f7; border-radius: 3px; box-shadow: 0 0 10px #a855f7, 0 0 25px rgba(168,85,247,0.3); }
                .sb-5::-webkit-scrollbar-thumb:hover { background: #c084fc; box-shadow: 0 0 15px #c084fc, 0 0 35px rgba(192,132,252,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 6 — Neon Orange */}
          <DemoCard number={6} title="Neon Orange" desc="Naranja neón con resplandor cálido y energético.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-6">
              <style>{`
                .sb-6::-webkit-scrollbar { width: 6px; }
                .sb-6::-webkit-scrollbar-track { background: transparent; }
                .sb-6::-webkit-scrollbar-thumb { background: #ff6b00; border-radius: 3px; box-shadow: 0 0 10px #ff6b00, 0 0 25px rgba(255,107,0,0.3); }
                .sb-6::-webkit-scrollbar-thumb:hover { background: #ff8c33; box-shadow: 0 0 15px #ff8c33, 0 0 35px rgba(255,140,51,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 7 — Rainbow Gradient */}
          <DemoCard number={7} title="Rainbow Neon" desc="Gradiente arcoíris neón completo. Máximo impacto visual.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-7">
              <style>{`
                .sb-7::-webkit-scrollbar { width: 8px; }
                .sb-7::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
                .sb-7::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #ff0000, #ff8800, #ffff00, #00ff88, #00ccff, #8800ff, #ff0080); border-radius: 4px; box-shadow: 0 0 12px rgba(255,0,128,0.3); }
                .sb-7::-webkit-scrollbar-thumb:hover { box-shadow: 0 0 20px rgba(255,0,128,0.5), 0 0 20px rgba(0,204,255,0.3); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 8 — Neon Blue Electric */}
          <DemoCard number={8} title="Blue Electric" desc="Azul eléctrico intenso con doble capa de glow.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-8">
              <style>{`
                .sb-8::-webkit-scrollbar { width: 6px; }
                .sb-8::-webkit-scrollbar-track { background: rgba(0,100,255,0.03); border-radius: 3px; }
                .sb-8::-webkit-scrollbar-thumb { background: #0066ff; border-radius: 3px; box-shadow: 0 0 8px #0066ff, 0 0 20px rgba(0,102,255,0.4), 0 0 40px rgba(0,102,255,0.15); }
                .sb-8::-webkit-scrollbar-thumb:hover { background: #3388ff; box-shadow: 0 0 12px #3388ff, 0 0 30px rgba(51,136,255,0.5), 0 0 50px rgba(51,136,255,0.2); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 9 — Neon Yellow */}
          <DemoCard number={9} title="Neon Yellow" desc="Amarillo neón brillante. Alto contraste sobre fondo oscuro.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-9">
              <style>{`
                .sb-9::-webkit-scrollbar { width: 5px; }
                .sb-9::-webkit-scrollbar-track { background: transparent; }
                .sb-9::-webkit-scrollbar-thumb { background: #facc15; border-radius: 3px; box-shadow: 0 0 8px #facc15, 0 0 20px rgba(250,204,21,0.3); }
                .sb-9::-webkit-scrollbar-thumb:hover { background: #fde047; box-shadow: 0 0 12px #fde047, 0 0 30px rgba(253,224,71,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 10 — Green→Cyan Gradient */}
          <DemoCard number={10} title="Green → Cyan" desc="Gradiente verde a cyan. Estilo naturaleza digital.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-10">
              <style>{`
                .sb-10::-webkit-scrollbar { width: 7px; }
                .sb-10::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
                .sb-10::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #00ff88, #22d3ee); border-radius: 4px; box-shadow: 0 0 10px rgba(0,255,136,0.3), 0 0 10px rgba(34,211,238,0.3); }
                .sb-10::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #33ffaa, #67e8f9); box-shadow: 0 0 15px rgba(51,255,170,0.4), 0 0 15px rgba(103,232,249,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 11 — Neon Red */}
          <DemoCard number={11} title="Neon Red" desc="Rojo neón agresivo. Ideal para temas oscuros con acento fuerte.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-11">
              <style>{`
                .sb-11::-webkit-scrollbar { width: 6px; }
                .sb-11::-webkit-scrollbar-track { background: rgba(255,0,0,0.03); border-radius: 3px; }
                .sb-11::-webkit-scrollbar-thumb { background: #ff1744; border-radius: 3px; box-shadow: 0 0 10px #ff1744, 0 0 25px rgba(255,23,68,0.3); }
                .sb-11::-webkit-scrollbar-thumb:hover { background: #ff5252; box-shadow: 0 0 15px #ff5252, 0 0 35px rgba(255,82,82,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 12 — Purple→Pink Gradient */}
          <DemoCard number={12} title="Purple → Pink" desc="Gradiente púrpura a rosa. Estilo vaporwave / synthwave.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-12">
              <style>{`
                .sb-12::-webkit-scrollbar { width: 7px; }
                .sb-12::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
                .sb-12::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #8b5cf6, #ec4899); border-radius: 4px; box-shadow: 0 0 10px rgba(139,92,246,0.3), 0 0 10px rgba(236,72,153,0.3); }
                .sb-12::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #a78bfa, #f472b6); box-shadow: 0 0 15px rgba(167,139,250,0.4), 0 0 15px rgba(244,114,182,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 13 — Wide Capsule Cyan */}
          <DemoCard number={13} title="Wide Capsule Neon" desc="Barra ancha 12px tipo cápsula con glow cyan. Bold y visible.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-13">
              <style>{`
                .sb-13::-webkit-scrollbar { width: 12px; }
                .sb-13::-webkit-scrollbar-track { background: rgba(34,211,238,0.05); border-radius: 6px; margin: 4px 0; }
                .sb-13::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.6); border-radius: 6px; border: 2px solid rgba(5,10,30,0.9); box-shadow: 0 0 12px rgba(34,211,238,0.4); }
                .sb-13::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.9); box-shadow: 0 0 20px rgba(34,211,238,0.6), 0 0 40px rgba(34,211,238,0.2); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 14 — Neon Teal */}
          <DemoCard number={14} title="Neon Teal" desc="Teal/turquesa neón. Sutil pero elegante con glow suave.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-14">
              <style>{`
                .sb-14::-webkit-scrollbar { width: 5px; }
                .sb-14::-webkit-scrollbar-track { background: transparent; }
                .sb-14::-webkit-scrollbar-thumb { background: #2dd4bf; border-radius: 3px; box-shadow: 0 0 8px #2dd4bf, 0 0 20px rgba(45,212,191,0.3); }
                .sb-14::-webkit-scrollbar-thumb:hover { background: #5eead4; box-shadow: 0 0 12px #5eead4, 0 0 30px rgba(94,234,212,0.4); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

          {/* 15 — Neon White Frost */}
          <DemoCard number={15} title="White Frost Glow" desc="Blanco con glow frío. Ultra premium, estilo cristal de hielo.">
            <div className="h-44 w-full overflow-y-scroll rounded-lg bg-black/40 p-4 sb-15">
              <style>{`
                .sb-15::-webkit-scrollbar { width: 6px; }
                .sb-15::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 3px; }
                .sb-15::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.6); border-radius: 3px; box-shadow: 0 0 8px rgba(255,255,255,0.3), 0 0 20px rgba(200,220,255,0.2); }
                .sb-15::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.85); box-shadow: 0 0 12px rgba(255,255,255,0.5), 0 0 30px rgba(200,220,255,0.3); }
              `}</style>
              {scrollContent}
            </div>
          </DemoCard>

        </div>
      </div>

      {/* Legend */}
      <div className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-xl border border-border/30 bg-white/[0.02] p-6 backdrop-blur-sm">
          <p className="mb-3 text-sm font-semibold text-foreground">Instrucciones</p>
          <p className="text-sm text-muted-foreground">
            Haz scroll dentro de cada caja para ver el estilo de scrollbar en acción. Elige tu favorita y la aplico globalmente a todo el sitio.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   Demo Card Wrapper
   ═══════════════════════════════════════════════════ */
function DemoCard({
  number,
  title,
  desc,
  children,
}: {
  number: number
  title: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <div className="group/card relative flex flex-col gap-4 rounded-2xl border border-border/30 bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.04]">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-xs font-bold text-white">
          {number}
        </span>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
      <div className="rounded-xl border border-dashed border-border/40 bg-black/20 p-2">
        {children}
      </div>
    </div>
  )
}

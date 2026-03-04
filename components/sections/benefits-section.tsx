/**
 * Benefits Section
 * Reference: list of benefits or advantages
 */
const BENEFITS = [
  "Benefit one goes here.",
  "Benefit two goes here.",
  "Benefit three goes here.",
  "Benefit four goes here.",
  "Benefit five goes here.",
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 md:py-24" aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <h2 id="benefits-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Benefits Section
          </h2>
          <p className="mt-4 text-muted-foreground">Subtitle goes here.</p>
        </header>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {BENEFITS.map((benefit, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-cyan-500/20 bg-white/[0.03] p-4"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                ✓
              </span>
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

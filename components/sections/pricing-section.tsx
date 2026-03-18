/**
 * Pricing Section
 * Reference: packages or pricing tiers (placeholder)
 */
const PLANS = [
  { name: "Plan One", price: "Price", description: "Description goes here.", cta: "Call to Action" },
  { name: "Plan Two", price: "Price", description: "Description goes here.", cta: "Call to Action", popular: true },
  { name: "Plan Three", price: "Price", description: "Description goes here.", cta: "Call to Action" },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-24" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <h2 id="pricing-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pricing Section
          </h2>
          <p className="mt-4 text-muted-foreground">Subtitle goes here.</p>
        </header>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <article
              key={i}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-cyan-500/40 bg-gradient-to-b from-cyan-500/10 to-transparent shadow-lg shadow-cyan-500/10"
                  : "border-cyan-500/20 bg-white/[0.03]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-2 text-2xl font-bold text-cyan-400">{plan.price}</p>
              <p className="mt-4 text-sm text-muted-foreground">{plan.description}</p>
              <a
                href="/contact"
                className={`mt-6 block w-full rounded-xl py-3 text-center text-sm font-semibold transition ${
                  plan.popular
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                    : "border border-cyan-500/30 text-foreground hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

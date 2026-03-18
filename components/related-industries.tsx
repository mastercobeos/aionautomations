import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

/** Industry clusters for cross-linking SEO */
const INDUSTRY_CLUSTERS: Record<string, string[]> = {
  restaurants: ['hotels', 'tours'],
  hotels: ['restaurants', 'tours'],
  tours: ['hotels', 'restaurants'],
  dental: ['vets', 'salons'],
  vets: ['dental', 'gyms'],
  salons: ['dental', 'gyms'],
  gyms: ['salons', 'vets'],
  'real-estate': ['legal', 'hotels'],
  legal: ['real-estate', 'schools'],
  schools: ['legal', 'dental'],
};

const INDUSTRY_KEYS: Record<string, string> = {
  restaurants: 'restaurants',
  hotels: 'hotels',
  tours: 'tours',
  dental: 'dental',
  vets: 'vets',
  salons: 'salons',
  gyms: 'gyms',
  'real-estate': 'realEstate',
  legal: 'legal',
  schools: 'schools',
};

export async function RelatedIndustries({
  locale,
  current,
}: {
  locale: string;
  current: string;
}) {
  const tNav = await getTranslations({ locale, namespace: 'Navbar' });
  const tLinks = await getTranslations({ locale, namespace: 'InternalNav' });

  const related = INDUSTRY_CLUSTERS[current] ?? [];
  if (related.length === 0) return null;

  return (
    <nav className="mx-auto max-w-4xl px-6 pb-6" aria-label={tLinks('ariaLabel')}>
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted-foreground">
        <span>{locale === 'es' ? 'Industrias relacionadas:' : 'Related industries:'}</span>
        {related.map((ind, i) => (
          <span key={ind}>
            {i > 0 && <span className="text-border">·</span>}
            <Link
              href={`/industries/${ind}`}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {tNav(INDUSTRY_KEYS[ind])}
            </Link>
          </span>
        ))}
      </p>
    </nav>
  );
}

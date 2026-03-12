import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const ALL_LINKS = [
  { href: '/services/web' as const, key: 'webDesignNav' },
  { href: '/services/automations' as const, key: 'automationNav' },
  { href: '/services/marketing' as const, key: 'marketingNav' },
  { href: '/pricing' as const, key: 'pricing' },
  { href: '/industries' as const, key: 'industries' },
  { href: '/blog' as const, key: 'blog' },
  { href: '/contact' as const, key: 'contact' },
];

export async function InternalNav({
  locale,
  exclude = [],
}: {
  locale: string;
  exclude?: string[];
}) {
  const tNav = await getTranslations({ locale, namespace: 'Navbar' });
  const tLinks = await getTranslations({ locale, namespace: 'InternalNav' });

  const links = ALL_LINKS.filter((l) => !exclude.includes(l.href));

  return (
    <nav
      className="mx-auto max-w-4xl px-6 pb-12"
      aria-label={tLinks('ariaLabel')}
    >
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted-foreground">
        <span>{tLinks('explore')}</span>
        {links.map((link, i) => (
          <span key={link.href}>
            {i > 0 && <span className="text-border">·</span>}
            <Link
              href={link.href}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {tNav(link.key)}
            </Link>
          </span>
        ))}
      </p>
    </nav>
  );
}

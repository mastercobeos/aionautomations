# CONTEXTO COMPLETO DEL PROYECTO — AION AUTOMATIONS

## 1. TECH STACK
- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **React:** 19.2.4
- **CSS:** Tailwind CSS 4.2 (CSS-based config, NO tailwind.config.js) + tw-animate-css
- **i18n:** next-intl 4.8.3 (locales: es, en; defaultLocale: en)
- **UI:** Radix UI primitives + shadcn/ui components
- **TypeScript:** 5.7.3 (strict mode)
- **Icons:** lucide-react
- **Analytics:** @vercel/analytics
- **Forms:** react-hook-form + zod
- **Fonts:** Geist + Geist Mono (next/font/google)
- **Path alias:** `@/*` → `./*`

## 2. FILE STRUCTURE
```
app/
  [locale]/
    layout.tsx          ← Main layout (generateMetadata, html lang, JsonLd, GA)
    page.tsx            ← Landing page (Navbar, Hero, sections, Footer)
    not-found.tsx       ← 404 page
    error.tsx           ← Error boundary
    demo-buttons/page.tsx
    scroll-preview/page.tsx
  globals.css           ← All custom CSS (animations, theme vars, effects)
  robots.ts
  sitemap.ts

components/
  hero.tsx              ← Hero section (H1, subtitle, CTAs, social proof, trust badges, floating cards)
  globe-world.tsx       ← Canvas 2D per-pixel ray-caster (energy filaments, 280x280)
  hero-particles.tsx    ← CSS particles for hero background
  navbar.tsx            ← Navigation bar with language switcher
  footer.tsx            ← Footer with social links, quick links
  floating-social-buttons.tsx ← Fixed position WhatsApp/Instagram/Facebook
  case-studies.tsx      ← Metrics section (73%, 2.4x, 160+)
  what-we-build.tsx     ← Services grid (4 cards)
  how-it-works.tsx      ← 4-step timeline
  pricing.tsx           ← 3-tier pricing
  testimonials-section.tsx ← Testimonials carousel (8 testimonials)
  final-cta.tsx         ← Final CTA with contact form
  contact-form.tsx      ← Form → WhatsApp message
  json-ld.tsx           ← JSON-LD schema injection
  language-switcher.tsx
  page-loader.tsx
  scroll-reveal-init.tsx
  scroll-to-top.tsx
  cursor-glow.tsx
  (+ ~15 unused components: agency-section, audit-section, benefits-section, etc.)
  ui/                   ← shadcn/ui primitives (button, card, dialog, etc.)

lib/
  seo.ts               ← SEO config (siteUrl, schemas: ProfessionalService, WebSite, Service)
  site-config.ts        ← Social media URLs from env vars
  utils.ts              ← cn() helper

i18n/
  routing.ts            ← defineRouting (locales: ['en', 'es'], defaultLocale: 'en')
  request.ts            ← getRequestConfig (loads messages/{locale}.json)

messages/
  es.json               ← Spanish translations (all sections)
  en.json               ← English translations (all sections)

hooks/
  use-count-up.ts
  use-mobile.ts
  use-scroll-reveal.ts
  use-toast.ts

public/
  LOGO.svg, favicon.png, apple-icon.png, icon.svg
  hero-bg.png, mundo.svg (world map SVG, not used currently)
  placeholder-*.{jpg,png,svg}
  (NO og-image-es.jpg ni og-image-en.jpg — pendientes de crear)
```

## 3. MAIN PAGE SECTION ORDER
```
Navbar → Hero → CaseStudies → WhatWeBuild → HowItWorks → Pricing → Testimonials → FinalCTA → Footer
(+ FloatingSocialButtons y ScrollToTop como overlays fijos)
```

## 4. KEY CONFIGS

### package.json
```json
{
  "scripts": { "dev": "next dev --webpack", "build": "next build", "start": "next start", "lint": "eslint ." },
  "dependencies": {
    "next": "16.1.6", "react": "19.2.4", "next-intl": "^4.8.3", "next-themes": "^0.4.6",
    "lucide-react": "^0.564.0", "tailwind-merge": "^3.3.1", "clsx": "^2.1.1",
    "react-hook-form": "^7.54.1", "zod": "^3.24.1", "@vercel/analytics": "1.6.1",
    "three": "^0.183.1", "@types/three": "^0.183.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.0", "tailwindcss": "^4.2.0", "tw-animate-css": "1.3.3", "typescript": "5.7.3"
  }
}
```

### next.config.mjs
```js
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const nextConfig = { transpilePackages: ['next-intl'] };
export default withNextIntl(nextConfig);
```

### .env (current values)
```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_PHONE=
NEXT_PUBLIC_WHATSAPP_NUMBER=523411687566
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/aionautomations/
NEXT_PUBLIC_FACEBOOK_PAGE_URL=https://www.facebook.com/share/18bgMhX2eC/?mibextid=wwXIfr
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=
NEXT_PUBLIC_GOOGLE_MAPS_PLACE_URL=
```

## 5. LAYOUT (app/[locale]/layout.tsx)
- `<html lang={locale}>` dinámico
- generateMetadata: title, description, canonical, hreflang (es, en, x-default), OG tags con locale + alternateLocale, Twitter Card con images, robots
- Google Analytics placeholder (G-XXXXXXXXXX)
- JsonLd component en body (3 schemas: ProfessionalService, WebSite, Service)
- Skip-to-content link
- NextIntlClientProvider + PageLoader + Analytics

## 6. HERO SECTION (components/hero.tsx)
Orden visual actual (de arriba a abajo):
1. Badge: "Agencia de Automatización con IA"
2. H1: "Páginas web que venden. Automatización con IA **para impulsar** tu negocio." (para impulsar = gradient animado)
3. Subtexto: "Sin que muevas un dedo: tu sitio atrae visitantes y les da seguimiento hasta convertirlos en clientes."
4. Botones: "Solicitar Cotización →" + "Ver casos"
5. Microcopy: "Respuesta en menos de 24 horas."
6. Delivery: "Tu sitio listo en 2 semanas. Atendemos clientes en todo el mundo."
7. Social proof: blockquote con testimonio (placeholder — [Nombre real])
8. Trust badges: ul/li (Optimizado para conversiones | Seguimiento de leads 24/7 | Listo para escalar)
9. Globe + 3 floating cards (cards ocultas en mobile < md)

## 7. GLOBE (components/globe-world.tsx)
- Canvas 2D per-pixel ray-caster (SIZE=280)
- NO solid sphere — only energy filaments + nodes
- 8 filaments (great circles) with traveling gaussian pulses
- 16 energy nodes with pulsing glow
- Auto-rotate + drag interaction + momentum
- Responsive: 200/240/300px
- `role="img"` + `aria-label` traducible

## 8. TRANSLATIONS (messages/es.json — Hero section)
```json
"Hero": {
    "badge": "Agencia de Automatización con IA",
    "title1": "Páginas web que venden.",
    "title2": "Automatización con IA",
    "titleHighlight": "para impulsar",
    "title3": "tu negocio.",
    "subtitle": "Sin que muevas un dedo: tu sitio atrae visitantes y les da seguimiento hasta convertirlos en clientes.",
    "ctaMini": "Respuesta en menos de 24 horas.",
    "ctaDelivery": "Tu sitio listo en 2 semanas. Atendemos clientes en todo el mundo.",
    "quoteCta": "Solicitar Cotización",
    "casesCta": "Ver casos",
    "socialProofQuote": "Nos entregaron el sitio en tiempo récord...",
    "socialProofAuthor": "— [Nombre real], [Empresa real, País]",
    "trustSecure": "Optimizado para conversiones",
    "trustScale": "Seguimiento de leads 24/7",
    "trustAi": "Listo para escalar",
    "card1": "✓ Sitio web entregado",
    "card2": "↑ Más clientes este mes",
    "card3": "🔔 Nuevo contacto recibido",
    "globeAlt": "Visualización de automatización inteligente..."
}
```

## 9. SEO (lib/seo.ts)
- siteUrl: from NEXT_PUBLIC_SITE_URL or "https://www.aionautomations.com"
- organizationSchema: ProfessionalService con @id, logo, telephone (vacío), email (vacío), priceRange "$$", serviceType, areaServed (3 continentes), sameAs (Instagram, Facebook)
- websiteSchema: WebSite con SearchAction
- serviceSchema: Service linked to org via @id

## 10. CSS THEME (app/globals.css)
- Dark theme by default (--background: oklch(0.07 0.03 265))
- Paleta: cyan (#22D4FE / oklch 0.85), blue (#0289FF), violet (#7378FF / oklch 0.58)
- Custom animations: fade-up, gradient-shift, hero-bg-slide, grid-pulse, float-particle, scan-sweep, streak-rise, glow-drift, border-gradient-rotate, pulse-glow, marquee, icon-float, timeline-draw, page-in, hero-card-in/float
- All animations wrapped in @media (prefers-reduced-motion)
- Floating social buttons: scale(0.8) + opacity 0.4 on desktop, opacity 0.5 on mobile

## 11. FLOATING SOCIAL BUTTONS
- Fixed position top-right
- 3 buttons: WhatsApp, Instagram, Facebook
- URLs from lib/site-config.ts (env vars)
- aria-labels traducibles: "Contáctanos por WhatsApp", "Síguenos en Instagram", "Síguenos en Facebook"
- Reduced prominence via `.floating-social-btn` class

## 12. CONTACT FORM
- react-hook-form + zod validation
- Sends to WhatsApp via wa.me link (constructs message URL)
- Fields: name, email, message

## 13. KNOWN ISSUES / PENDIENTES
- OG images (og-image-es.jpg, og-image-en.jpg) no existen en /public
- Google Analytics ID es placeholder (G-XXXXXXXXXX)
- NEXT_PUBLIC_SITE_URL vacío en .env
- telephone y email vacíos en schema JSON-LD
- Social proof author es placeholder ([Nombre real])
- "2 semanas" en delivery text pendiente de ajustar
- three.js package instalado pero no usado (se puede eliminar)
- proxy.ts tiene middleware code pero no se llama middleware.ts
- not-found.tsx y error.tsx tienen texto hardcodeado en español

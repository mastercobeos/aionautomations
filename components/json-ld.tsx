import { organizationSchema, websiteSchema, serviceSchema, siteNavigationSchema } from "@/lib/seo";

export function JsonLd({ locale }: { locale: string }) {
  const website = websiteSchema(locale);
  const service = serviceSchema(locale);
  const navigation = siteNavigationSchema(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(service),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigation),
        }}
      />
    </>
  );
}

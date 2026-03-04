import { organizationSchema, websiteSchema, serviceSchema } from "@/lib/seo";

export function JsonLd({ locale }: { locale: string }) {
  const website = websiteSchema(locale);
  const service = serviceSchema(locale);
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
    </>
  );
}

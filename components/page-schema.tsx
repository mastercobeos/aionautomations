/**
 * Renders JSON-LD schema scripts for any page.
 * Accepts one or more schema objects.
 */
export function PageSchema({ schemas }: { schemas: Record<string, unknown>[] }) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

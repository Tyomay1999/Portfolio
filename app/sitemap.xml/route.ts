export const runtime = 'edge';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://tyomay.dev';
const staticPaths = ['']; // ['','about','projects']
const locales = ['en', 'ru', 'hy'] as const;

function makeEntry(path: string, isRoot: boolean) {
  const pathSuffix = path ? `/${path}` : '';
  const loc = isRoot ? `${SITE}${pathSuffix}` : `${SITE}${pathSuffix}`;

  const alternates = [
    `<xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pathSuffix}"/>`,
    ...locales.map(
      l => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE}/${l}${pathSuffix}"/>`,
    ),
  ].join('');

  return `
  <url>
    <loc>${loc}</loc>
    ${alternates}
    <changefreq>monthly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;
}

export async function GET(): Promise<Response> {
  const items = staticPaths
    .map(p => {
      const root = makeEntry(p, true);
      const localized = locales
        .map(l => {
          const suffix = p ? `/${p}` : '';
          const locUrl = `${SITE}/${l}${suffix}`;
          const alternates = [
            `<xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${suffix}"/>`,
            ...locales.map(
              ll => `<xhtml:link rel="alternate" hreflang="${ll}" href="${SITE}/${ll}${suffix}"/>`,
            ),
          ].join('');
          return `
  <url>
    <loc>${locUrl}</loc>
    ${alternates}
    <changefreq>monthly</changefreq>
    <priority>${p === '' ? '0.8' : '0.7'}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;
        })
        .join('');

      return root + localized;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${items}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}

export const runtime = 'edge';
export const dynamic = 'force-static';

const RAW = process.env.NEXT_PUBLIC_SITE_URL || 'https://tyomay.dev';
const SITE = RAW.replace(/\/+$/, '');

const staticPaths = ['', 'booking'] as const;
const locales = ['en', 'ru', 'hy'] as const;

const LASTMOD = new Date().toISOString();

function altLinks(pathSuffix: string) {
  const suffix = pathSuffix ? `/${pathSuffix}` : '';
  const xDefault = `${SITE}/en${suffix}`;
  const alts = [
    `<xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>`,
    ...locales.map(
      l => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE}/${l}${suffix}"/>`,
    ),
  ];
  return alts.join('');
}

function urlTag(loc: string, pathSuffix: string, isRoot: boolean) {
  const priority = pathSuffix === '' ? (isRoot ? '1.0' : '0.8') : isRoot ? '0.8' : '0.7';

  return `
  <url>
    <loc>${loc}</loc>
    ${altLinks(pathSuffix)}
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    <lastmod>${LASTMOD}</lastmod>
  </url>`;
}

export async function GET(): Promise<Response> {
  const items = staticPaths
    .map(p => {
      const suffix = p ? `/${p}` : '';
      return locales.map(l => urlTag(`${SITE}/${l}${suffix}`, p, true)).join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${items}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}

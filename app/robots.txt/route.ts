export const runtime = 'edge';
// статический ответ — пусть кэшируется CDN/браузером
export const dynamic = 'force-static';

export async function GET(): Promise<Response> {
  const RAW = process.env.NEXT_PUBLIC_SITE_URL || 'https://tyomay.dev';
  const SITE = RAW.replace(/\/+$/, ''); // без хвостового слеша

  const content = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /assets/',
    '',
    `Sitemap: ${SITE}/sitemap.xml`,
    `Host: ${SITE.replace(/^https?:\/\//, '')}`,
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // кэш на сутки
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}

export const runtime = 'edge';
export const dynamic = 'force-static';

export async function GET(): Promise<Response> {
  const RAW = process.env.NEXT_PUBLIC_SITE_URL || 'https://tyomay.dev';
  const SITE = RAW.replace(/\/+$/, '');

  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /assets/',
    '',
    `Sitemap: ${SITE}/sitemap.xml`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}

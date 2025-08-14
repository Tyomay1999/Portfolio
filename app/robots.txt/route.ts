export const runtime = 'edge';

export async function GET(): Promise<Response> {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://tyomay.dev';

  const content = `
User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`.trim();

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}

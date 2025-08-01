const baseUrl = 'https://yourdomain.com';

export async function GET(): Promise<Response> {
  const locales = ['en', 'ru', 'hy'];

  const staticPaths = [
    '',
    // 'about',
    // 'projects',
    // 'and more'
  ];

  const urls = locales.flatMap(locale =>
    staticPaths.map(path => {
      const url = path ? `${baseUrl}/${locale}/${path}` : `${baseUrl}/${locale}`;
      return `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

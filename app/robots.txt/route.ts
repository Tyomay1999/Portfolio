const baseUrl = 'https://yourdomain.com'; // твой домен

export async function GET(): Promise<Response> {
  const content = `
User-Agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

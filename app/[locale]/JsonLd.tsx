'use client';

export default function JsonLd({ locale }: { locale: string }) {
  const base = 'https://tyomay.dev';
  const pageUrl = `${base}/${locale}`;
  const ids = {
    person: `${base}/#person`,
    website: `${base}/#website`,
    webpage: `${pageUrl}#webpage`,
    image: `${base}/#primaryimage`,
    breadcrumb: `${pageUrl}#breadcrumb`,
  };

  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': ids.person,
      name: 'Artyom Bordulanyuk',
      alternateName: [
        'Артём Бордулянюк',
        'Tyomay',
        'Artyom Bordulanyuk',
        'Artyom Bordulanyk',
        'Արտյոմ Բորդուլանյուկ',
      ],
      givenName: 'Artyom',
      familyName: 'Bordulanyuk',
      jobTitle: 'Full‑Stack Web Engineer',
      description:
        'Full‑Stack Web Engineer. React, Next.js, Node.js, PostgreSQL, Docker, CI/CD. Official website and portfolio.',
      url: base,
      image: {
        '@type': 'ImageObject',
        '@id': ids.image,
        url: `${base}/og-image.png`,
        width: 1200,
        height: 630,
        caption: 'Artyom Bordulanyuk — Portfolio cover',
      },
      sameAs: [
        'https://www.instagram.com/_tyomay_',
        'https://www.tiktok.com/@_tyomay_',
        'https://www.linkedin.com/in/tyomay',
        'https://github.com/Tyomay1999',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': ids.website,
      name: 'Artyom Bordulanyuk',
      url: base,
      inLanguage: locale,
      publisher: { '@id': ids.person },
      // potentialAction: {
      //   '@type': 'SearchAction',
      //   target: `${base}/search?q={search_term_string}`,
      //   'query-input': 'required name=search_term_string',
      // },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': ids.webpage,
      url: pageUrl,
      name: 'Home',
      headline: 'Artyom Bordulanyuk — Full‑Stack Web Engineer',
      description:
        'Official website of Artyom Bordulanyuk: modern, scalable, SEO‑ready web applications with React, Next.js, Node.js, PostgreSQL, Docker, CI/CD.',
      inLanguage: locale,
      isPartOf: { '@id': ids.website },
      primaryImageOfPage: { '@id': ids.image },
      mainEntityOfPage: { '@id': ids.person },
      publisher: { '@id': ids.person },
      datePublished: '2025-08-05',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': ids.breadcrumb,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

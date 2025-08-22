'use client';

const RAW = process.env.NEXT_PUBLIC_SITE_URL || 'https://tyomay.dev';
const BASE = RAW.replace(/\/+$/, '');

export default function JsonLd({ locale }: { locale: string }) {
  const pageUrl = `${BASE}/${locale}`;
  const ids = {
    person: `${BASE}/#person`,
    website: `${BASE}/#website`,
    webpage: `${pageUrl}#webpage`,
    image: `${BASE}/#primaryimage`,
    breadcrumb: `${pageUrl}#breadcrumb`,
  };

  const published = '2025-08-05';
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': ids.person,
      name: 'Artyom Bordulanyuk',
      alternateName: ['Артём Бордуланюк', 'Tyomay'],
      givenName: 'Artyom',
      familyName: 'Bordulanyuk',
      jobTitle: 'Full‑Stack Web Engineer',
      description:
        'Full‑Stack Web Engineer. React, Next.js, Node.js, PostgreSQL, Docker, CI/CD. Official website and portfolio.',
      url: BASE,
      image: {
        '@type': 'ImageObject',
        '@id': ids.image,
        url: `${BASE}/og-image.png`,
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
      url: BASE,
      inLanguage: locale,
      publisher: { '@id': ids.person },
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
      mainEntityOfPage: { '@id': ids.webpage },
      publisher: { '@id': ids.person },
      datePublished: published,
      dateModified: published,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': ids.breadcrumb,
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: pageUrl }],
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

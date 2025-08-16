'use client';

import Script from 'next/script';

type FAQItem = { question: string; answer: string };

export default function FAQJsonLd({ items }: { items: FAQItem[] }) {
  if (!items?.length) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question.replace(/<\/?[^>]+(>|$)/g, ''),
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer.replace(/<\/?[^>]+(>|$)/g, ''),
      },
    })),
  };

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

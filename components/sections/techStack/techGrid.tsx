'use client';

import React from 'react';
import TechCard, { TechItem } from './techCard';

type Props = { items: TechItem[] };

const TechGrid: React.FC<Props> = ({ items }) => {
  return (
    <div className="mb-8 grid min-h-[50vh] grid-cols-2 gap-4 md:mb-12 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5">
      {items.map((item, idx) => (
        <TechCard key={item.name} item={item} index={idx} />
      ))}
    </div>
  );
};

export default TechGrid;

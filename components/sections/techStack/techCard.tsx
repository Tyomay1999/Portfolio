'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export type TechItem = {
  name: string;
  icon: string;
  colorClass: string;
};

type Props = { item: TechItem; index: number };

const TechCard: React.FC<Props> = ({ item, index }) => {
  return (
    <div
      className="tech-item group cursor-pointer transition duration-300"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="transform rounded-xl border border-slate-200 bg-white/70 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl dark:border-slate-700 dark:bg-slate-800/70 dark:hover:bg-slate-800 md:p-6">
        <div className="flex flex-col items-center space-y-3">
          <div
            className={clsx(
              'flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16',
              `bg-gradient-to-br ${item.colorClass}`,
            )}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={32}
              height={32}
              className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110 md:h-8 md:w-8"
            />
          </div>
          <span className="font-sans text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white md:text-base">
            {item.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TechCard;

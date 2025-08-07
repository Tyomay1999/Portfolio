'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';
import Image from 'next/image';
import {
  projects,
  getVisibleProjects,
  getNextStep,
  getButtonLabel,
  shouldShowButton,
} from './utils';

const Projects: React.FC = () => {
  const t = useTranslations('projects');
  const [locale, setLocale] = useState<'en' | 'ru' | 'hy'>('en');
  const [viewStep, setViewStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const langFromUrl = window.location.pathname.split('/')[1] as 'en' | 'ru' | 'hy';
    setLocale(['en', 'ru', 'hy'].includes(langFromUrl) ? langFromUrl : 'en');
  }, []);

  const visibleProjects = getVisibleProjects(projects, viewStep);
  const showButton = shouldShowButton(projects);

  return (
    <StorySectionWrapper sectionId={1} innerClassName="max-w-7xl mx-auto px-4">
      <h2 className="mb-12 text-center font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-16 md:text-4xl lg:text-6xl">
        {t('title')}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
        {visibleProjects.map((project, index) => (
          <div key={index} className="project-card group cursor-pointer">
            <div
              onClick={() => project.url && window.open(project.url, '_blank')}
              className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg shadow-lg md:mb-6"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mb-2 font-serif text-lg font-medium text-slate-900 dark:text-slate-100 md:text-xl lg:text-2xl">
              {project.title}
            </h3>
            <p className="mb-3 font-sans text-sm text-slate-600 dark:text-slate-400 md:text-base">
              {project.desc[locale] || project.desc.en}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-300 md:px-3"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showButton && (
        <div className="mt-12 pb-8 text-center md:mt-16">
          <button
            onClick={() => setViewStep(getNextStep(viewStep, projects.length))}
            className="rounded-lg border border-slate-300 px-6 py-3 font-sans text-slate-900 transition-colors duration-300 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 md:px-8"
          >
            {getButtonLabel(viewStep, projects.length, t)}
          </button>
        </div>
      )}
    </StorySectionWrapper>
  );
};

export default Projects;

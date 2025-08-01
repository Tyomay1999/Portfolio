'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';

type Project = {
  title: string;
  descEN: string;
  descES: string;
  tags: string[];
  icon: React.ReactNode;
};

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    descEN: 'Full-stack marketplace with React & Node.js',
    descES: 'Marketplace full-stack con React y Node.js',
    tags: ['React', 'Node.js', 'MongoDB'],
    icon: (
      <svg
        className="text-my-light-text/40 dark:text-my-dark-text/40 h-12 w-12 transition-colors duration-300 md:h-16 md:w-16"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Task Management App',
    descEN: 'Collaborative productivity tool with real-time sync',
    descES: 'Herramienta de productividad colaborativa con sincronización en tiempo real',
    tags: ['Vue.js', 'Express', 'Socket.io'],
    icon: (
      <svg
        className="text-my-light-text/40 dark:text-my-dark-text/40 h-12 w-12 transition-colors duration-300 md:h-16 md:w-16"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    title: 'Analytics Dashboard',
    descEN: 'Data visualization platform with AI insights',
    descES: 'Plataforma de visualización de datos con insights de IA',
    tags: ['Next.js', 'Python', 'PostgreSQL'],
    icon: (
      <svg
        className="text-my-light-text/40 dark:text-my-dark-text/40 h-12 w-12 transition-colors duration-300 md:h-16 md:w-16"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l.09.06c.18.14.37.29.54.46L21 10.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5l8.37-7.98c.17-.17.36-.32.54-.46L12 2z" />
      </svg>
    ),
  },
];

const Projects: React.FC = () => {
  const t = useTranslations('projects');

  return (
    <StorySectionWrapper sectionId={1} innerClassName="max-w-7xl mx-auto px-4">
      <h2 className="mb-12 text-center font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-16 md:text-4xl lg:text-6xl">
        {t('title')}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
        {projects.map((project, index) => (
          <div key={index} className="project-card group cursor-pointer">
            <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg dark:from-slate-800 dark:to-slate-700 md:mb-6">
              {project.icon}
            </div>
            <h3 className="mb-2 font-serif text-lg font-medium text-slate-900 dark:text-slate-100 md:text-xl lg:text-2xl">
              {project.title}
            </h3>
            <p className="mb-3 font-sans text-sm text-slate-600 dark:text-slate-400 md:text-base">
              {project.descEN}
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

      <div className="mt-12 pb-8 text-center md:mt-16">
        <button className="rounded-lg border border-slate-300 px-6 py-3 font-sans text-slate-900 transition-colors duration-300 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 md:px-8">
          {t('viewAll')}
        </button>
      </div>
    </StorySectionWrapper>
  );
};

export default Projects;

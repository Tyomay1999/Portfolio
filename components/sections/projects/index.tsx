'use client';

import React from 'react';
import StorySectionWrapper from '../../../HOC/storySectionWrapper';

const projects = [
  {
    title: 'E-Commerce Platform',
    descEN: 'Full-stack marketplace with React & Node.js',
    descES: 'Marketplace full-stack con React y Node.js',
    tags: ['React', 'Node.js', 'MongoDB'],
    icon: (
      <svg
        className="w-12 h-12 md:w-16 md:h-16 text-slate-400 dark:text-slate-500"
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
        className="w-12 h-12 md:w-16 md:h-16 text-slate-400 dark:text-slate-500"
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
        className="w-12 h-12 md:w-16 md:h-16 text-slate-400 dark:text-slate-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l.09.06c.18.14.37.29.54.46L21 10.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5l8.37-7.98c.17-.17.36-.32.54-.46L12 2z" />
      </svg>
    ),
  },
  {
    title: 'E-Commerce Platform',
    descEN: 'Full-stack marketplace with React & Node.js',
    descES: 'Marketplace full-stack con React y Node.js',
    tags: ['React', 'Node.js', 'MongoDB'],
    icon: (
      <svg
        className="w-12 h-12 md:w-16 md:h-16 text-slate-400 dark:text-slate-500"
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
        className="w-12 h-12 md:w-16 md:h-16 text-slate-400 dark:text-slate-500"
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
        className="w-12 h-12 md:w-16 md:h-16 text-slate-400 dark:text-slate-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l.09.06c.18.14.37.29.54.46L21 10.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5l8.37-7.98c.17-.17.36-.32.54-.46L12 2z" />
      </svg>
    ),
  },
];

export default function Projects() {
  return (
    <StorySectionWrapper sectionId={1}>
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 text-center mb-12 md:mb-16"
          data-en="Selected Projects"
          data-es="Proyectos Seleccionados"
        >
          Selected Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group cursor-pointer transition-all duration-400 hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 aspect-[4/3] rounded-lg mb-4 md:mb-6 flex items-center justify-center shadow-lg">
                {project.icon}
              </div>
              <h3 className="font-serif text-lg md:text-xl lg:text-2xl font-medium text-slate-900 dark:text-slate-100 mb-2">
                {project.title}
              </h3>
              <p
                className="text-slate-600 dark:text-slate-400 font-sans mb-3 text-sm md:text-base"
                data-en={project.descEN}
                data-es={project.descES}
              >
                {project.descEN}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 md:px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16 pb-8">
          <button
            className="font-sans text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 px-6 md:px-8 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300"
            data-en="View All Projects"
            data-es="Ver Todos los Proyectos"
          >
            View All Projects
          </button>
        </div>
      </div>
    </StorySectionWrapper>
  );
}

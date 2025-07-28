'use client';

import React from 'react';
import StorySectionWrapper from '../../../HOC/storySectionWrapper';

const experiences = [
    {
        company: 'TechCorp Inc.',
        period: '2021–2024',
        title: {
            en: 'Senior Full-Stack Developer',
            es: 'Desarrollador Full-Stack Senior',
        },
        description: {
            en: 'Built scalable platforms using React, Node.js and PostgreSQL. Led architecture redesign that improved performance by 40%. Mentored junior developers and established coding standards across the engineering team.',
            es: 'Construí plataformas escalables usando React, Node.js y PostgreSQL. Lideré el rediseño de arquitectura que mejoró el rendimiento en un 40%. Mentoré desarrolladores junior y establecí estándares de código en todo el equipo de ingeniería.',
        },
    },
    {
        company: 'PixelWorks Studio',
        period: '2018–2021',
        title: {
            en: 'Frontend Developer',
            es: 'Desarrollador Frontend',
        },
        description: {
            en: 'Designed and developed responsive UIs using Vue.js, Tailwind, and Figma. Collaborated with cross-functional teams to launch 12+ web products. Optimized user experiences resulting in 25% increase in user engagement.',
            es: 'Diseñé y desarrollé interfaces responsivas usando Vue.js, Tailwind y Figma. Colaboré con equipos multifuncionales para lanzar más de 12 productos web. Optimicé experiencias de usuario resultando en un 25% de aumento en el engagement.',
        },
    },
    {
        company: 'Digital Solutions Co.',
        period: '2016–2018',
        title: {
            en: 'Full-Stack Developer',
            es: 'Desarrollador Full-Stack',
        },
        description: {
            en: 'Developed custom web applications using PHP, Laravel, and MySQL. Implemented RESTful APIs and integrated third-party services. Worked closely with clients to deliver tailored solutions for small to medium businesses.',
            es: 'Desarrollé aplicaciones web personalizadas usando PHP, Laravel y MySQL. Implementé APIs RESTful e integré servicios de terceros. Trabajé estrechamente con clientes para entregar soluciones personalizadas para pequeñas y medianas empresas.',
        },
    },
    {
        company: 'StartupLab',
        period: '2015–2016',
        title: {
            en: 'Junior Web Developer',
            es: 'Desarrollador Web Junior',
        },
        description: {
            en: 'Built responsive websites using HTML5, CSS3, and JavaScript. Assisted in developing e-commerce platforms and content management systems. Gained experience in agile development methodologies and version control with Git.',
            es: 'Construí sitios web responsivos usando HTML5, CSS3 y JavaScript. Asistí en el desarrollo de plataformas de e-commerce y sistemas de gestión de contenido. Adquirí experiencia en metodologías de desarrollo ágil y control de versiones con Git.',
        },
    },
    {
        company: 'Freelance',
        period: '2014–2015',
        title: {
            en: 'Web Developer & Designer',
            es: 'Desarrollador Web y Diseñador',
        },
        description: {
            en: 'Created custom websites for local businesses and entrepreneurs. Designed user interfaces and developed WordPress themes. Managed client relationships and project timelines while building a strong foundation in web development.',
            es: 'Creé sitios web personalizados para empresas locales y emprendedores. Diseñé interfaces de usuario y desarrollé temas de WordPress. Gestioné relaciones con clientes y cronogramas de proyectos mientras construía una base sólida en desarrollo web.',
        },
    },
];

export default function WorkExperience() {
    return (
        <StorySectionWrapper sectionId={2}>
            <div className="max-w-4xl mx-auto px-4">
                <h2
                    className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 text-center mb-12 md:mb-16"
                    data-en="Work Experience"
                    data-es="Experiencia Profesional"
                >
                    Work Experience
                </h2>

                <div className="space-y-8 md:space-y-12">
                    {experiences.map((exp, i) => (
                        <div key={i} className="relative">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                                <div className="md:text-right">
                                    <div
                                        className="text-slate-500 dark:text-slate-400 font-sans text-sm md:text-base mb-1"
                                        data-en={exp.period}
                                        data-es={exp.period}
                                    >
                                        {exp.period}
                                    </div>
                                    <div
                                        className="text-slate-600 dark:text-slate-300 font-sans text-sm md:text-base font-medium"
                                        data-en={exp.company}
                                        data-es={exp.company}
                                    >
                                        {exp.company}
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <h3
                                        className="font-serif text-xl md:text-2xl font-medium text-slate-900 dark:text-slate-100 mb-3"
                                        data-en={exp.title.en}
                                        data-es={exp.title.es}
                                    >
                                        {exp.title.en}
                                    </h3>
                                    <p
                                        className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-sm md:text-base"
                                        data-en={exp.description.en}
                                        data-es={exp.description.es}
                                    >
                                        {exp.description.en}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                        </div>
                    ))}
                </div>

                <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-500 mx-auto mt-12 md:mt-16" />
            </div>
        </StorySectionWrapper>
    );
}

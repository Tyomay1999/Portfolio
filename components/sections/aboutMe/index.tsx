'use client';

import React from 'react';
import StorySectionWrapper from '../../../HOC/storySectionWrapper';

export default function AboutMe() {
  return (
    <StorySectionWrapper sectionId={0}>
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2
          className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 mb-8 md:mb-12"
          data-en="About Me"
          data-es="Sobre Mí"
        >
          About Me
        </h2>
        <div className="space-y-6 md:space-y-8 text-base md:text-lg lg:text-xl leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
          <p
            data-en="I'm a passionate full-stack developer who crafts digital experiences that seamlessly blend beautiful design with robust functionality."
            data-es="Soy un desarrollador full-stack apasionado que crea experiencias digitales que combinan perfectamente un diseño hermoso con funcionalidad robusta."
          >
            I&aposm a passionate full-stack developer who crafts digital experiences that seamlessly
            blend beautiful design with robust functionality.
          </p>
          <p
            data-en="With expertise spanning from elegant frontend interfaces to scalable backend architectures, I bring ideas to life through clean, efficient code."
            data-es="Con experiencia que abarca desde interfaces frontend elegantes hasta arquitecturas backend escalables, doy vida a las ideas a través de código limpio y eficiente."
          >
            With expertise spanning from elegant frontend interfaces to scalable backend
            architectures, I bring ideas to life through clean, efficient code.
          </p>
          <p
            data-en="I believe in the power of minimalism and attention to detail to create solutions that are both powerful and intuitive."
            data-es="Creo en el poder del minimalismo y la atención al detalle para crear soluciones que sean tanto poderosas como intuitivas."
          >
            I believe in the power of minimalism and attention to detail to create solutions that
            are both powerful and intuitive.
          </p>
        </div>
        <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-500 mx-auto mt-8 md:mt-12" />
      </div>
    </StorySectionWrapper>
  );
}

'use client';
import React from 'react';
import StorySectionWrapper from '../../../HOC/storySectionWrapper';
import clsx from 'clsx';

const testimonials = [
  {
    initials: 'SM',
    name: 'Sarah Mitchell',
    role: 'CEO, TechStart Inc.',
    message:
      'Davit delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made our launch seamless.',
  },
  {
    initials: 'MR',
    name: 'Marcus Rodriguez',
    role: 'Product Manager, InnovateLab',
    message:
      'Working with Davit was a game-changer for our team. He transformed our complex requirements into an elegant, user-friendly solution.',
  },
  {
    initials: 'EK',
    name: 'Elena Kim',
    role: 'Founder, CreativeSpace',
    message:
      "Davit's full-stack expertise and collaborative approach made our project a huge success. I highly recommend him for any development needs.",
  },
  {
    initials: 'JL',
    name: 'James Liu',
    role: 'CTO, DataFlow Systems',
    message:
      'The analytics dashboard Davit built for us has become the cornerstone of our business intelligence. His code quality and performance optimization skills are outstanding.',
  },
  {
    initials: 'AP',
    name: 'Anna Petrov',
    role: 'Director, EduTech Solutions',
    message:
      "Davit's learning platform revolutionized how we deliver education. His understanding of user experience and scalable architecture is impressive.",
  },
];

export default function TestimonialsSection() {
  return (
    <StorySectionWrapper sectionId={5} innerClassName="max-w-6xl mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 text-center mb-12 md:mb-16">
        Testimonials
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className={clsx(
              'bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-6 md:p-8 shadow-lg',
              index === 3 || index === 4 ? 'md:col-span-2 lg:col-span-1' : '',
            )}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg font-serif font-medium text-slate-700 dark:text-slate-300">
                  {t.initials}
                </span>
              </div>
              <div>
                <h4 className="font-sans font-medium text-slate-900 dark:text-slate-100">
                  {t.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t.role}</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-sm md:text-base">
              “{t.message}”
            </p>
          </div>
        ))}
      </div>

      <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-500 mx-auto mt-12 md:mt-16"></div>
    </StorySectionWrapper>
  );
}

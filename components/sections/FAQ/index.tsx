'use client';
import React from 'react';
import StorySectionWrapper from '../../../HOC/storySectionWrapper';

const faqs = [
  {
    question: 'What technologies do you specialize in?',
    answer:
      "I work primarily with React, Node.js, Python, and modern databases like PostgreSQL and MongoDB. I'm also experienced with cloud platforms like AWS and containerization with Docker. I stay current with emerging technologies and choose the best tools for each project's specific needs.",
  },
  {
    question: 'How do you approach new projects?',
    answer:
      'I start by deeply understanding your business goals and user needs. Then I create a detailed technical plan, design wireframes, and build iteratively with regular feedback loops. Communication is key - I provide regular updates and involve you in key decisions throughout the development process.',
  },
  {
    question: "What's your typical project timeline?",
    answer:
      'Project timelines vary based on complexity and scope. A simple website might take 2–4 weeks, while a full-stack application could take 2–4 months. I always provide realistic estimates upfront and break projects into milestones so you can track progress and provide feedback along the way.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer:
      'Absolutely! I offer various support packages including bug fixes, feature updates, performance monitoring, and technical consultation. I believe in building long-term relationships with my clients and helping their projects evolve as their business grows.',
  },
  {
    question: 'How do you ensure code quality?',
    answer:
      'I follow industry best practices including comprehensive testing, code reviews, and documentation. I use modern development tools for linting, formatting, and continuous integration. Every project includes proper error handling, security measures, and performance optimization from the ground up.',
  },
  {
    question: 'Can you work with existing teams?',
    answer:
      "Yes! I'm experienced in collaborating with existing development teams, designers, and stakeholders. I adapt to your current workflows, tools, and methodologies. Whether you need additional development capacity or specialized expertise, I integrate seamlessly into your team structure.",
  },
];

export default function FAQPhilosophySection() {
  return (
    <StorySectionWrapper sectionId={6} innerClassName="max-w-4xl mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 text-center mb-8 md:mb-12">
        FAQ & Philosophy
      </h2>

      {/* Philosophy Text */}
      <div className="text-center mb-12 md:mb-16">
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-sans leading-relaxed max-w-3xl mx-auto">
          I believe in creating digital experiences that are not just functional, but meaningful.
          Every line of code should serve a purpose, every design decision should enhance the
          user&aposs journey, and every project should leave a positive impact.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-8 md:space-y-12">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={
              idx < faqs.length - 1
                ? 'border-b border-slate-200 dark:border-slate-700 pb-6 md:pb-8'
                : 'pb-6 md:pb-8'
            }
          >
            <h3 className="font-serif text-xl md:text-2xl font-medium text-slate-900 dark:text-slate-100 mb-4">
              {faq.question}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-sm md:text-base">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-500 mx-auto mt-12 md:mt-16" />
    </StorySectionWrapper>
  );
}

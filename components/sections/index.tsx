'use client';

import React from 'react';
import style from './sections.module.scss';
import HeroSections from '../heroSection';
import AboutSection from './aboutMe';
import ProjectsSection from './projects';
import WorkExperience from './workExperience';
import TechStack from './techStack';
import ContactSection from './connect';
import TestimonialsSection from './testimonials';
import FAQPhilosophySection from './FAQ';
import CallToActionSection from './getInTouch';

const Sections = () => {
    return <div className="story-sections">
        <HeroSections />
        <AboutSection />
        <ProjectsSection />
        <WorkExperience />
        <TechStack />
        <ContactSection />
        <TestimonialsSection />
        <FAQPhilosophySection />
        <CallToActionSection />
    </div >;
};

export default Sections;

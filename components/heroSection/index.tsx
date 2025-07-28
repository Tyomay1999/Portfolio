'use client';

import React from 'react';

const HeroSections = () => {
    return <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-center hero-parallax">
            <h1 className="text-gray-700 font-serif text-6xl md:text-8xl lg:text-9xl font-light text-slate-900 dark:text-slate-100 tracking-wide drop-shadow-sm"
                data-en="Hi, I'm Davit" data-es="Hola, soy Davit">
                Hi, I'm Artyom
            </h1>
            <div className="w-24 h-0.5 bg-slate-300 dark:bg-slate-600 mx-auto mt-8"></div>
            <p className="font-sans text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-6 tracking-wide"
               data-en="Full Stack Developer" data-es="Desarrollador Full Stack">
                Full Stack Web Architect
            </p>
        </div>
    </div>
};

export default HeroSections;

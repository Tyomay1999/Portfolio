'use client';

import React from 'react';
import Navigation from '../navigation';
import LanguageSwitcher from '../languageThemeToggle';
import Sections from '../sections';

const Root = () => {
    return <div>
        <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-x-hidden transition-colors duration-300">
            <Navigation />
            <LanguageSwitcher />
            <Sections />
        </div>
    </div>;
};

export default Root;

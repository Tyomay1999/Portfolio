'use client';

import React from 'react';
import Navigation from '../navigation';
import LanguageSwitcher from '../languageThemeToggle';
import Sections from '../sections';

const Root: React.FC = () => {
  return (
    <div>
      <Navigation />
      <LanguageSwitcher />
      <Sections />
    </div>
  );
};

export default Root;

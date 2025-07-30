'use client';

import React from 'react';
import Navigation from '../navigation';
import LanguageSwitcher from '../languageThemeToggle';
import Sections from '../sections';

const Root = () => {
  return (
    <div>
      <Navigation />
      <LanguageSwitcher />
      <Sections />
    </div>
  );
};

export default Root;

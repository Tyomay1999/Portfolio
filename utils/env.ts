export const env = {
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Default Site',
  DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en',
};

// import { env } from '@/utils/env';
//
// console.log(env.SITE_NAME);
//
// require('dotenv').config();

function getEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value === undefined && fallback === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value ?? fallback!;
}

export const env = {
  SITE_NAME: getEnv('NEXT_PUBLIC_SITE_NAME', 'Default Site'),
  DEFAULT_LOCALE: getEnv('NEXT_PUBLIC_DEFAULT_LOCALE', 'en'),
  CONTACT_API: getEnv('NEXT_PUBLIC_CONTACT_API', 'http://localhost:3000/api/contact'),
};

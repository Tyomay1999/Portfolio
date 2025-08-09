export type Category = 'all' | 'frontend' | 'backend' | 'tools';

interface TechItem {
  name: string;
  icon: string;
  category: Category;
  colorClass: string;
}

export const techItems: TechItem[] = [
  {
    name: 'React.js',
    icon: '/react.svg',
    category: 'frontend',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Next.js',
    icon: '/next.svg',
    category: 'frontend',
    colorClass: 'from-gray-100 to-gray-200 dark:from-white-900/30 dark:to-purple-800/30',
  },
  {
    name: 'Redux Toolkit',
    icon: '/redux.svg',
    category: 'frontend',
    colorClass: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    name: 'Redux Thunk',
    icon: '/reduxThunk.svg',
    category: 'frontend',
    colorClass: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    name: 'TypeScript',
    icon: '/typescript.svg',
    category: 'frontend',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'JavaScript',
    icon: '/js.svg',
    category: 'frontend',
    colorClass: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    name: 'jQuery',
    icon: '/jquery.svg',
    category: 'frontend',
    colorClass: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
  },
  {
    name: 'HTML5',
    icon: '/html.svg',
    category: 'frontend',
    colorClass: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
  },
  {
    name: 'CSS3',
    icon: '/css.svg',
    category: 'frontend',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'SCSS/SASS',
    icon: '/scss.svg',
    category: 'frontend',
    colorClass: 'from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30',
  },
  {
    name: 'Less',
    icon: '/less.svg',
    category: 'frontend',
    colorClass: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30',
  },
  {
    name: 'WebRTC',
    icon: '/webrtc.svg',
    category: 'frontend',
    colorClass: 'from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30',
  },
  {
    name: 'Bootstrap',
    icon: '/bootstrap.svg',
    category: 'frontend',
    colorClass: 'from-violet-100 to-violet-200 dark:from-violet-900/30 dark:to-violet-800/30',
  },
  {
    name: 'Ant Design',
    icon: '/ant-design.svg',
    category: 'frontend',
    colorClass: 'from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30',
  },
  {
    name: 'Material-UI',
    icon: '/material-ui.svg',
    category: 'frontend',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Tailwind css',
    icon: '/tailwind.svg',
    category: 'frontend',
    colorClass: 'from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30',
  },
  {
    name: 'Node.js',
    icon: '/nodejs.svg',
    category: 'backend',
    colorClass: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  },
  {
    name: 'Express.js',
    icon: '/express.svg',
    category: 'backend',
    colorClass: 'from-red-100 to-red-200 dark:from-white-900/30 dark:to-red-800/30',
  },
  {
    name: 'NestJS',
    icon: '/nestjs.svg',
    category: 'backend',
    colorClass: 'from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30',
  },
  {
    name: 'RESTful APIs',
    icon: '/RESTapi.svg',
    category: 'backend',
    colorClass: 'from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30',
  },
  {
    name: 'API Gateway',
    icon: '/APIGetaway.svg',
    category: 'backend',
    colorClass: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    name: 'Socket.io',
    icon: '/socket-io.svg',
    category: 'backend',
    colorClass: 'from-lime-100 to-lime-200 dark:from-white-900/30 dark:to-pink-800/30',
  },
  {
    name: 'WebSockets',
    icon: '/websocket.svg',
    category: 'backend',
    colorClass: 'from-lime-100 to-lime-200 dark:from-white-900/30 dark:to-yellow-800/30',
  },
  {
    name: 'Docker',
    icon: '/docker.svg',
    category: 'tools',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Docker Compose',
    icon: '/container.svg',
    category: 'tools',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Nginx',
    icon: '/nginx.svg',
    category: 'tools',
    colorClass: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  },
  {
    name: 'Apache2',
    icon: '/apache.svg',
    category: 'tools',
    colorClass: 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30',
  },
  {
    name: 'Jenkins',
    icon: '/jenkins.svg',
    category: 'tools',
    colorClass: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
  },
  {
    name: 'PM2',
    icon: '/pm2.svg',
    category: 'tools',
    colorClass: 'from-slate-100 to-slate-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'CI/CD automation',
    icon: '/ci-cd.svg',
    category: 'tools',
    colorClass: 'from-gray-100 to-gray-200 dark:from-white-900/30 dark:to-gray-800/30',
  },
  {
    name: 'Load Balancing',
    icon: '/load-balancing.svg',
    category: 'tools',
    colorClass: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    name: 'PostgreSQL',
    icon: '/postgresql.svg',
    category: 'backend',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'MongoDB',
    icon: '/mongodb.svg',
    category: 'backend',
    colorClass: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  },
  {
    name: 'Sequelize ORM',
    icon: '/sequelize.svg',
    category: 'backend',
    colorClass: 'from-fuchsia-100 to-fuchsia-200 dark:from-fuchsia-900/30 dark:to-fuchsia-800/30',
  },
  {
    name: 'Mongoose ODM',
    icon: '/mongoose.svg',
    category: 'backend',
    colorClass: 'from-lime-100 to-lime-200 dark:from-white-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Redis',
    icon: '/redis.svg',
    category: 'backend',
    colorClass: 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30',
  },
  {
    name: 'RabbitMQ',
    icon: '/rabbitmq.svg',
    category: 'backend',
    colorClass: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
  },
  {
    name: 'Stripe',
    icon: '/stripe.svg',
    category: 'backend',
    colorClass: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30',
  },
  {
    name: 'PayPal',
    icon: '/paypal.svg',
    category: 'backend',
    colorClass: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30',
  },
  {
    name: 'GitHub',
    icon: '/github.svg',
    category: 'tools',
    colorClass: 'from-gray-100 to-gray-200 dark:from-white-900/30 dark:to-gray-800/30',
  },
  {
    name: 'GitLab',
    icon: '/gitlab.svg',
    category: 'tools',
    colorClass: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
  },
  {
    name: 'Bitbucket',
    icon: '/bitbucket.svg',
    category: 'tools',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Jest',
    icon: '/jest.svg',
    category: 'tools',
    colorClass: 'from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30',
  },
  {
    name: 'SuperTest',
    icon: '/superTests.svg',
    category: 'tools',
    colorClass: 'from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30',
  },
  {
    name: 'Figma',
    icon: '/figma.svg',
    category: 'tools',
    colorClass: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
  },
  {
    name: 'Adobe XD',
    icon: '/adobe-xd.svg',
    category: 'tools',
    colorClass: 'from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30',
  },
];

export const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Tools', value: 'tools' },
];

export const getFilteredItems = (items: TechItem[], category: Category): TechItem[] => {
  return category === 'all' ? items : items.filter(i => i.category === category);
};

export const getVisibleItems = (items: TechItem[], step: 0 | 1 | 2): TechItem[] => {
  if (items.length <= 10) return items;
  if (step === 0) return items.slice(0, 10);
  if (step === 1) return items.slice(0, 20);
  return items;
};

export const getNextStep = (current: 0 | 1 | 2, total: number): 0 | 1 | 2 => {
  if (total <= 10) return 0;
  if (total <= 20) return current === 0 ? 2 : 0;
  return ((current + 1) % 3) as 0 | 1 | 2;
};

export const getButtonLabel = (
  step: 0 | 1 | 2,
  total: number,
  t: (key: string) => string,
): string => {
  if (total <= 10) return '';
  if (total <= 20) return step === 0 ? t('viewAll') : t('viewLess');
  if (step === 0) return t('viewMore');
  if (step === 1) return t('viewAll');
  return t('viewLess');
};

export const shouldShowButton = (items: TechItem[]): boolean => {
  return items.length > 10;
};

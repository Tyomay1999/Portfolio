type Project = {
  title: string;
  desc: {
    en: string;
    ru: string;
    hy: string;
  };
  url: string;
  gitUrl: string;
  tags: string[];
  image: string;
};

export const getVisibleProjects = (allProjects: Project[], step: 0 | 1 | 2) => {
  if (allProjects.length <= 3) return allProjects;
  if (step === 0) return allProjects.slice(0, 3);
  if (step === 1) return allProjects.slice(0, 6);
  return allProjects;
};

export const getNextStep = (currentStep: 0 | 1 | 2, total: number): 0 | 1 | 2 => {
  if (total <= 3) return 0;
  if (total <= 6) return currentStep === 0 ? 2 : 0;
  return ((currentStep + 1) % 3) as 0 | 1 | 2;
};

export const getButtonLabel = (step: 0 | 1 | 2, total: number, t: (key: string) => string) => {
  if (total <= 3) return '';
  if (total <= 6) {
    return step === 0 ? t('viewAll') : t('viewLess');
  }
  if (step === 0) return t('viewMore');
  if (step === 1) return t('viewAll');
  return t('viewLess');
};

export const shouldShowButton = (allProjects: Project[]) => {
  return allProjects.length > 3;
};

export const projects: Project[] = [
  {
    title: 'GenieWeb UI',
    desc: {
      en: 'Public-facing landing page and onboarding system for GenieWeb. Users can discover programming courses, explore available services, and seamlessly register for IT education.',
      ru: 'Публичный лендинг и система регистрации для платформы GenieWeb. Пользователи могут изучать курсы программирования, просматривать услуги и легко зарегистрироваться на обучение.',
      hy: 'GenieWeb-ի հասարակական էջն ու մուտք գործելու համակարգը, որտեղ օգտատերերը կարող են ծանոթանալ ծրագրավորման դասընթացներին, ծառայություններին և հեշտությամբ գրանցվել։',
    },
    tags: ['Next.js', 'Redux', 'SCSS', 'Multilingual'],
    image: '/GeniewebUI.png',
    url: 'https://genieweb.org',
    gitUrl: '',
  },
  {
    title: 'GenieWeb Teachers',
    desc: {
      en: 'Internal web platform for GenieWeb instructors. Enables teachers to manage student groups, schedule lessons, assign homework and exams, and monitor academic progress. ( Access available upon request ).',
      ru: 'Внутренняя веб-платформа для преподавателей GenieWeb. Позволяет управлять группами, расписанием, домашними заданиями и экзаменами, а также отслеживать успеваемость студентов. ( Доступ предоставляется по запросу ).',
      hy: 'GenieWeb-ի ուսուցիչների համար նախատեսված ներքին վեբ հարթակ է՝ խմբերի վարում, դասացուցակ, առաջադրանքների ու քննությունների նշանակում, ինչպես նաև առաջադիմության վերահսկում։ ( Մուտքը հասանելի է ըստ հարցման )։',
    },
    tags: ['React', 'Redux Toolkit', 'Ant Design', 'Multilingual'],
    image: '/GenieWebTeachers.png',
    url: 'https://teachers.genieweb.org',
    gitUrl: '',
  },
  {
    title: 'GenieWeb Students',
    desc: {
      en: 'Dedicated student platform with secure access to lessons, homework submission, exam schedules, and progress tracking. Login credentials available upon request.',
      ru: 'Платформа для студентов с безопасным доступом к урокам, сдаче домашних заданий, расписанию экзаменов и прогрессу. ( Доступ предоставляется по запросу ).',
      hy: 'Ուսանողների համար նախատեսված հարթակ՝ ապահով մուտքով դեպի դասեր, առաջադրանքների հանձնում, քննությունների ժամանակացույց և առաջադիմության հետևում։ ( Մուտքը հասանելի է ըստ հարցման )։',
    },
    tags: ['React', 'Redux Toolkit', 'Ant Design', 'Stripe', 'Multilingual'],
    image: '/GenieWebStudents.png',
    url: 'https://students.genieweb.org',
    gitUrl: '',
  },
  {
    title: 'GenieWeb Admin',
    desc: {
      en: 'Comprehensive admin dashboard for managing users, courses, lessons, UI settings, and internal operations. ( Access available upon request ).',
      ru: 'Полноценная админ-панель для управления пользователями, курсами, уроками, интерфейсом и внутренними процессами. ( Доступ предоставляется по запросу ).',
      hy: 'Ադմինիստրատորների վահանակ՝ օգտատերերի, դասընթացների, դասերի, ինտերֆեյսի և ներքին գործընթացների կառավարման համար։ ( Մուտքը հասանելի է ըստ հարցման )։',
    },
    tags: ['React', 'Redux Toolkit', 'Admin UI', 'Ant Design', 'Multilingual'],
    image: '/GenieWebAdmin.png',
    url: 'https://admin.genieweb.org',
    gitUrl: '',
  },
  {
    title: 'GenieWeb Backend',
    desc: {
      en: 'Scalable and modular backend powering the entire GenieWeb ecosystem. Built with Node.js, Express, PostgreSQL, Redis, and RabbitMQ. Handles APIs, authentication, billing, notifications, and caching.',
      ru: 'Масштабируемый модульный backend, обеспечивающий всю экосистему GenieWeb. Реализован на Node.js, Express, PostgreSQL, Redis и RabbitMQ. Отвечает за API, авторизацию, платежи, уведомления и кэш.',
      hy: 'GenieWeb-ի ամբողջ համակարգը սպասարկող մասշտաբավորվող backend՝ կառուցված Node.js, Express, PostgreSQL, Redis և RabbitMQ տեխնոլոգիաներով։ Աշխատեցնում է API-ները, վավերացումը, վճարումները, ծանուցումները և քեշավորման գործընթացը։',
    },
    tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'RabbitMQ'],
    image: '/GenieWebBackend.png',
    url: 'https://api.genieweb.org',
    gitUrl: '',
  },
  {
    title: 'MTAD Admin Portal',
    desc: {
      en: 'Administrative web system for the Ministry of Territorial Administration and Infrastructure of Armenia. I worked mainly on the admin area: data management interfaces, permissions, and analytics. Built with React, Redux Thunk, TypeScript, and SCSS.',
      ru: 'Административная веб‑система для Министерства территориального управления и инфраструктур РА. Я работал в основном над админ‑частью: интерфейсы управления данными, права доступа и аналитика. Стек: React, Redux Thunk, TypeScript, SCSS.',
      hy: 'ՀՀ Տարածքային կառավարման և ենթակառուցվածքների նախարարության վարչական վեբ համակարգ։ Աշխատել եմ հիմնականում ադմին հատվածում՝ տվյալների կառավարման ինտերֆեյսներ, մուտքի իրավունքներ և վերլուծություն։ Կառուցված է React, Redux Thunk, TypeScript և SCSS տեխնոլոգիաներով։',
    },
    tags: ['React', 'Redux Thunk', 'TypeScript', 'SCSS', 'Admin Panel', 'Data Management'],
    image: '/mtad.jpg',
    url: 'https://mtad.am/',
    gitUrl: '',
  },
  {
    title: '4everstock',
    desc: {
      en: 'Creative platform for talented authors from Armenia to showcase and sell their work. Worked on both client and admin sides, implementing UI, data management, and integrations using ReactJS, Redux, Next.js, TypeScript, and SCSS.',
      ru: 'Креативная платформа для талантливых авторов из Армении, где они могут демонстрировать и продавать свои работы. Работал как над клиентской, так и над админской частью, реализуя интерфейсы, управление данными и интеграции. Использованы ReactJS, Redux, Next.js, TypeScript, SCSS.',
      hy: 'Ստեղծագործական հարթակ Հայաստանի տաղանդավոր հեղինակների համար՝ իրենց աշխատանքները ներկայացնելու և վաճառելու նպատակով։ Աշխատել եմ և՛ հաճախորդի, և՛ ադմին հատվածում՝ իրականացնելով UI, տվյալների կառավարում և ինտեգրացիաներ ReactJS, Redux, Next.js, TypeScript, SCSS տեխնոլոգիաներով։',
    },
    tags: [
      'React',
      'Redux',
      'Redux Thunk',
      'Next.js',
      'TypeScript',
      'SCSS',
      'Admin Panel',
      'Client Side',
    ],
    image: '/4everstock.jpg',
    url: 'https://4everstock.com/',
    gitUrl: '',
  },
];

export const matchesProjectName = (input: string): boolean => {
  const projects = ['mtad', 'genieweb teacher', 'genieweb ui'];

  return projects.some(project => input.toLowerCase().includes(project.toLowerCase()));
};

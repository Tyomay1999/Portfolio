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

export const projects: Project[] = [
  {
    title: 'GenieWeb UI',
    desc: {
      en: 'Public landing and onboarding platform for GenieWeb. Users can explore courses, services, and register for programming education.',
      ru: 'Публичная платформа компании GenieWeb. Пользователи могут узнать о компании, курсах, услугах и пройти регистрацию на обучение программированию.',
      hy: 'GenieWeb-ի հանրային վեբկայք, որտեղ օգտատերերը կարող են ծանոթանալ ծառայություններին և գրանցվել ծրագրավորման դասընթացների համար։',
    },
    tags: ['Next.js', 'Redux', 'SCSS', 'Multilingual'],
    image: '/GeniewebUI.png',
    url: 'https://genieweb.io',
    gitUrl: 'https://github.com/your-org/genieweb-ui',
  },
  {
    title: 'GenieWeb Teachers',
    desc: {
      en: 'Internal platform for GenieWeb instructors. Teachers can manage groups, assign homework and exams, and monitor student progress. Contact me to request access.',
      ru: 'Внутренняя платформа для преподавателей GenieWeb. Преподаватели управляют группами, назначают домашние задания и экзамены. Для доступа — свяжитесь со мной.',
      hy: 'GenieWeb-ի ներբանկային հարթակ ուսուցիչների համար։ Նրանք կարող են վարել խմբեր, հանձնարարել առաջադրանքներ ու քննություններ։ Մուտքի համար դիմեք ինձ։',
    },
    tags: ['React', 'Redux Toolkit', 'Ant Design', 'SCSS'],
    image: '/GenieWebTeachers.png',
    url: 'https://teachers.genieweb.io',
    gitUrl: 'https://github.com/your-org/genieweb-teachers',
  },
  {
    title: 'GenieWeb Students',
    desc: {
      en: 'Student platform for accessing lessons, submitting homework, and tracking class schedules. Contact me to receive login access.',
      ru: 'Платформа для студентов: доступ к урокам, сдача домашних заданий и отслеживание расписания. Для входа свяжитесь со мной.',
      hy: 'Ուսանողների հարթակ՝ դասերին հասանելիություն, առաջադրանքների հանձնում և դասացուցակի հետևում։ Մուտքի համար կապվեք ինձ հետ։',
    },
    tags: ['React', 'Redux Toolkit', 'Timer', 'Ant Design'],
    image: '/GenieWebStudents.png',
    url: 'https://students.genieweb.io',
    gitUrl: 'https://github.com/your-org/genieweb-students',
  },
  {
    title: 'GenieWeb Admin',
    desc: {
      en: 'Full control dashboard for managing teachers, students, lessons, and UI configurations. Contact me for login credentials.',
      ru: 'Панель администратора для управления учителями, студентами, уроками и интерфейсом. Для доступа — свяжитесь со мной.',
      hy: 'Ադմինիստրատորի վահանակ՝ ուսուցիչների, ուսանողների, դասընթացների և ինտերֆեյսի կառավարման համար։ Մուտքի համար դիմեք ինձ։',
    },
    tags: ['React', 'Redux Toolkit', 'Admin UI', 'Ant Design'],
    image: '/GenieWebAdmin.png',
    url: 'https://admin.genieweb.io',
    gitUrl: 'https://github.com/your-org/genieweb-admin',
  },
  {
    title: 'GenieWeb Backend',
    desc: {
      en: 'Robust backend built with Node.js, Express, PostgreSQL, Redis, and RabbitMQ. Handles all APIs, authentication, payments, email, caching and more.',
      ru: 'Надёжный backend на Node.js, Express, PostgreSQL, Redis и RabbitMQ. Отвечает за API, авторизацию, платежи, email, кэширование и прочее.',
      hy: 'Ազդեցիկ backend՝ կառուցված Node.js, Express, PostgreSQL, Redis և RabbitMQ տեխնոլոգիաներով։ Աշխատեցնում է բոլոր API-ները, վավերացում, վճարումներ, էլ․փոստ և քեշավորում։',
    },
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'RabbitMQ'],
    image: '/GenieWebBackend.png',
    url: 'https://api.genieweb.io',
    gitUrl: 'https://github.com/your-org/genieweb-backend',
  },
];

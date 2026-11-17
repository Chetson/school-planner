const MAIN = '/';
const AUTH = '/auth';
const USERS = '/users';
const CREATE_USER = '/users/create';
const UPLOAD_USERS = '/users/upload';
const EDIT_USER = '/users/edit';
const SUBJECTS = '/subjects';
const CREATE_SUBJECT = `${SUBJECTS}/create`;
const EDIT_SUBJECT = `${SUBJECTS}/edit`;
const CLASSES_AND_GROUPS = '/cg';
const CLASSES = `${CLASSES_AND_GROUPS}/classes`;
const CREATE_CLASS = `${CLASSES}/create`;
const EDIT_CLASS = `${CLASSES}/edit`;
const GROUPS = `${CLASSES_AND_GROUPS}/groups`;
const EDIT_GROUP = `${GROUPS}/edit`;
const CREATE_GROUP = `${GROUPS}/create`;
const ROOMS = '/rooms';
const CREATE_ROOM = `${ROOMS}/create`;
const EDIT_ROOM = `${ROOMS}/edit`;
const SCHEDULE = '/schedule';
const SCHEDULE_COMMON = `${SCHEDULE}/common`;
const SCHEDULE_CREATE_EVENT = `${SCHEDULE}/create`;
const SCHEDULE_EDIT_EVENT = `${SCHEDULE}/edit`;
const SCHEDULE_UPLOAD = `${SCHEDULE}/upload`;
const STATISTICS = '/statistics';
const SETTINGS = '/settings';
const PROFILE = '/profile';
const JOURNAL = '/journal';
const JOURNAL_DETAILS = `${JOURNAL}/details`;
const ACTIVITIES = `${JOURNAL}/activites`;
const THEMES = `${JOURNAL}/themes`;
const CREATE_ACTIVITY = `${ACTIVITIES}/create`;
const EDIT_ACTIVITY = `${ACTIVITIES}/edit`;
const CREATE_THEME = `${THEMES}/create`;
const EDIT_THEME = `${THEMES}/edit`;
const UPLOAD_THEMES = `${THEMES}/upload`;
const DUPLICATE_THEMES = `${THEMES}/duplicate`;

const DEFAULT_CRUMB_BY_PAGE = {
  [USERS]: {
    title: 'Все пользователи',
    href: USERS,
  },
  [ROOMS]: {
    title: 'Все кабинеты',
    href: ROOMS,
  },
  [SUBJECTS]: {
    title: 'Все предметы',
    href: SUBJECTS,
  },
  [CLASSES]: {
    title: 'Все классы',
    href: CLASSES,
  },
  [GROUPS]: {
    title: 'Все группы',
    href: GROUPS,
  },
  [SCHEDULE]: {
    title: 'Расписание',
    href: SCHEDULE,
  },
  [ACTIVITIES]: {
    title: 'Все виды деятельности',
    href: ACTIVITIES,
  },
  [THEMES]: {
    title: 'Все темы уроков',
    href: THEMES,
  },
  [DUPLICATE_THEMES]: {
    title: 'Дублирование тем уроков',
    href: DUPLICATE_THEMES,
  },
} as const;

export const PAGES = {
  MAIN: {
    title: 'Главная',
    mask: MAIN,
  },
  AUTH: {
    mask: AUTH,
  },
  USERS: {
    title: 'Пользователи',
    mask: USERS,
  },
  USER: {
    title: 'Пользователь',
    mask: `${USERS}/:userId`,
    crumb: DEFAULT_CRUMB_BY_PAGE[USERS],
    create: (userId: number) => `${USERS}/${userId}`,
  },
  CREATE_USER: {
    mask: CREATE_USER,
    crumb: DEFAULT_CRUMB_BY_PAGE[USERS],
  },
  UPLOAD_USERS: {
    title: '',
    mask: UPLOAD_USERS,
    crumb: DEFAULT_CRUMB_BY_PAGE[USERS],
  },
  EDIT_USER: {
    title: '',
    mask: `${EDIT_USER}/:userId`,
    crumb: DEFAULT_CRUMB_BY_PAGE[USERS],
    create: (userId: number) => `${EDIT_USER}/${userId}`,
  },
  SUBJECTS: {
    title: 'Предметы',
    mask: SUBJECTS,
  },
  CREATE_SUBJECT: {
    mask: CREATE_SUBJECT,
    crumb: DEFAULT_CRUMB_BY_PAGE[SUBJECTS],
  },
  EDIT_SUBJECT: {
    mask: `${EDIT_SUBJECT}/:subjectId`,
    create: (subjectId: number) => `${EDIT_SUBJECT}/${subjectId}`,
    crumb: DEFAULT_CRUMB_BY_PAGE[SUBJECTS],
  },
  CLASSES_AND_GROUPS: {
    title: 'Классы и группы',
    mask: CLASSES_AND_GROUPS,
  },
  CLASSES: {
    title: 'Классы',
    mask: CLASSES,
  },
  CREATE_CLASS: {
    mask: CREATE_CLASS,
    crumb: DEFAULT_CRUMB_BY_PAGE[CLASSES],
  },
  EDIT_CLASS: {
    mask: `${EDIT_CLASS}/:classId`,
    crumb: DEFAULT_CRUMB_BY_PAGE[CLASSES],
    create: (classId: number) => `${EDIT_CLASS}/${classId}`,
  },
  GROUPS: {
    title: 'Группы',
    mask: GROUPS,
  },
  CREATE_GROUP: {
    mask: CREATE_GROUP,
    crumb: DEFAULT_CRUMB_BY_PAGE[GROUPS],
  },
  EDIT_GROUP: {
    mask: `${EDIT_GROUP}/:groupId`,
    crumb: DEFAULT_CRUMB_BY_PAGE[GROUPS],
    create: (groupId: number) => `${EDIT_GROUP}/${groupId}`,
  },
  ROOMS: {
    title: 'Кабинеты',
    mask: ROOMS,
  },
  CREATE_ROOM: {
    mask: CREATE_ROOM,
    crumb: DEFAULT_CRUMB_BY_PAGE[ROOMS],
  },
  EDIT_ROOM: {
    title: '',
    mask: `${EDIT_ROOM}/:roomId`,
    create: (roomId: number) => `${EDIT_ROOM}/${roomId}`,
    crumb: DEFAULT_CRUMB_BY_PAGE[ROOMS],
  },
  SCHEDULE: {
    title: 'Расписание',
    mask: SCHEDULE,
  },
  SCHEDULE_COMMON: {
    mask: SCHEDULE_COMMON,
  },
  SCHEDULE_CREATE_EVENT: {
    mask: SCHEDULE_CREATE_EVENT,
    crumb: DEFAULT_CRUMB_BY_PAGE[SCHEDULE],
  },
  SCHEDULE_EDIT_EVENT: {
    mask: `${SCHEDULE_EDIT_EVENT}/:eventId`,
    create: (eventId: number, eventDate: string) =>
      `${SCHEDULE_EDIT_EVENT}/${eventId}?eventDate=${eventDate}`,
    crumb: DEFAULT_CRUMB_BY_PAGE[SCHEDULE],
  },
  UPLOAD_SCHEDULE: {
    mask: SCHEDULE_UPLOAD,
    crumb: DEFAULT_CRUMB_BY_PAGE[SCHEDULE],
  },
  STATISTICS: {
    title: 'Статистика',
    mask: STATISTICS,
  },
  SETTINGS: {
    title: 'Настройки',
    mask: SETTINGS,
  },
  PROFILE: {
    mask: PROFILE,
  },
  JOURNAL: {
    title: 'Журнал',
    mask: JOURNAL,
  },
  JOURNAL_DETAILS: {
    title: 'Журнал',
    mask: JOURNAL_DETAILS,
  },
  ACTIVITIES: {
    title: 'Виды деятельности',
    mask: ACTIVITIES,
  },
  THEMES: {
    title: 'Темы уроков',
    mask: THEMES,
  },
  CREATE_ACTIVITY: {
    mask: CREATE_ACTIVITY,
    crumb: DEFAULT_CRUMB_BY_PAGE[ACTIVITIES],
  },
  EDIT_ACTIVITY: {
    mask: `${EDIT_ACTIVITY}/:activityId`,
    crumb: DEFAULT_CRUMB_BY_PAGE[ACTIVITIES],
    create: (activityId: number) => `${EDIT_ACTIVITY}/${activityId}`,
  },
  CREATE_THEME: {
    mask: CREATE_THEME,
    crumb: DEFAULT_CRUMB_BY_PAGE[THEMES],
  },
  EDIT_THEME: {
    mask: `${EDIT_THEME}/:themeId`,
    crumb: DEFAULT_CRUMB_BY_PAGE[THEMES],
    create: (themeId: number) => `${EDIT_THEME}/${themeId}`,
  },
  UPLOAD_THEMES: {
    mask: UPLOAD_THEMES,
    crumb: DEFAULT_CRUMB_BY_PAGE[THEMES],
  },
  DUPLICATE_THEMES: {
    mask: DUPLICATE_THEMES,
    crumb: DEFAULT_CRUMB_BY_PAGE[THEMES],
  },
};

export const TABS_BY_PAGE = {
  [PAGES.JOURNAL.mask]: [
    {
      title: PAGES.JOURNAL_DETAILS.title,
      to: PAGES.JOURNAL_DETAILS.mask,
    },
    {
      title: PAGES.ACTIVITIES.title,
      to: PAGES.ACTIVITIES.mask,
    },
    {
      title: PAGES.THEMES.title,
      to: PAGES.THEMES.mask,
    },
  ],
  [PAGES.CLASSES_AND_GROUPS.mask]: [
    {
      title: PAGES.CLASSES.title,
      to: PAGES.CLASSES.mask,
    },
    {
      title: PAGES.GROUPS.title,
      to: PAGES.GROUPS.mask,
    },
  ],
};

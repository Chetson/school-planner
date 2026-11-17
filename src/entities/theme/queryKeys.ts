const THEME_QUERY_KEY = 'THEME_QUERY_KEY';
const THEMES_QUERY_KEY = 'THEMES_QUERY_KEY';

export type ThemeQueryKeys = [typeof THEME_QUERY_KEY, id: number];

export type ThemesQueryData = {
  subjectId?: number;
  classId?: number;
};

export type ThemesQueryKeys = [
  key: typeof THEMES_QUERY_KEY,
  data: ThemesQueryData,
];

export const THEME_QUERY_KEYS = (id: number): ThemeQueryKeys => [
  THEME_QUERY_KEY,
  id,
];

export const THEMES_QUERY_KEYS = (data: ThemesQueryData): ThemesQueryKeys => [
  THEMES_QUERY_KEY,
  data,
];

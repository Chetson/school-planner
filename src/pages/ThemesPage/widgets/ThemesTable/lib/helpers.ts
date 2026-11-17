import type { ThemesModel } from '@entities/theme';
import type { InfiniteData } from '@tanstack/react-query';

type Direction = 'raise' | 'lower';

export const moveTheme = (
  list: InfiniteData<ThemesModel, number>,
  themeId: number,
  direction: Direction,
): InfiniteData<ThemesModel, number> => ({
  ...list,
  pages: list.pages.map((page) => {
    const index = page.results.findIndex((item) => item.id === themeId);
    const offset = direction === 'raise' ? -1 : 1;

    if (
      index === -1 ||
      index + offset < 0 ||
      index + offset >= page.results.length
    ) {
      return page;
    }

    const results = [...page.results];
    [results[index], results[index + offset]] = [
      results[index + offset],
      results[index],
    ];

    return {
      ...page,
      results,
    };
  }),
});

export const deleteTheme = (
  list: InfiniteData<ThemesModel, number>,
  themeId: number,
): InfiniteData<ThemesModel, number> => ({
  ...list,
  pages: list.pages.map((page) => ({
    ...page,
    results: page.results.filter((item) => item.id !== themeId),
  })),
});

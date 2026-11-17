import { useCallback, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  THEMES_QUERY_KEYS,
  themesQueryFn,
  useMoveTheme,
} from '@entities/theme';
import { useClassFilter } from '@features/ClassFilter';
import { InfiniteTable } from '@features/InfiniteTable';
import { useSubjectFilter } from '@features/SubjectFilter';
import { DeleteThemeModal } from '@pages/ThemesPage';
import { PAGES } from '@shared/helpers';

import { deleteTheme, moveTheme } from './lib/helpers';
import { THEMES_TABLE_COLUMNS } from './lib/table';

import type { ThemeModel, ThemesModel } from '@entities/theme';
import type { InfiniteData } from '@tanstack/react-query';
import type { TableMeta } from '@tanstack/react-table';

export const ThemesTable = () => {
  const queryClient = useQueryClient();

  const [subject] = useSubjectFilter();
  const [deletedTheme, setDeletedTheme] = useState<ThemeModel | null>(null);
  const [cls] = useClassFilter();
  const navigate = useNavigate();

  const queryKey = useMemo(
    () =>
      THEMES_QUERY_KEYS({
        classId: cls?.id,
        subjectId: subject?.id,
      }),
    [subject?.id, cls?.id],
  );

  const { mutate } = useMoveTheme({
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const handleRaiseTheme = useCallback(
    (theme: ThemeModel) => {
      queryClient.setQueryData(
        queryKey,
        (list: InfiniteData<ThemesModel, number>) =>
          moveTheme(list, theme.id, 'raise'),
      );
      mutate({ themeId: theme.id, action: 'raise' });
    },
    [mutate, queryKey, queryClient],
  );

  const handleLowerTheme = useCallback(
    (theme: ThemeModel) => {
      queryClient.setQueryData(
        queryKey,
        (list: InfiniteData<ThemesModel, number>) =>
          moveTheme(list, theme.id, 'lower'),
      );
      mutate({ themeId: theme.id, action: 'lower' });
    },
    [mutate, queryKey, queryClient],
  );

  const handleDeleteThemeSettled = useCallback(() => {
    if (deletedTheme) {
      queryClient.setQueryData(
        queryKey,
        (list: InfiniteData<ThemesModel, number>) =>
          deleteTheme(list, deletedTheme.id),
      );
    }
    setDeletedTheme(null);
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey, queryClient, deletedTheme]);

  const handleCancelDeleteTheme = useCallback(() => setDeletedTheme(null), []);

  const handleModalOpenChange = useCallback(
    (opened: boolean) => !opened && setDeletedTheme(null),
    [],
  );

  const handleGoToEdit = useCallback(
    (theme: ThemeModel) => {
      navigate(PAGES.EDIT_THEME.create(theme.id));
    },
    [navigate],
  );

  const isEnabled = Boolean(subject?.id && cls?.id);

  const meta = useMemo<TableMeta<ThemeModel>>(
    () => ({
      onEdit: handleGoToEdit,
      onDelete: setDeletedTheme,
      onRaise: handleRaiseTheme,
      onLower: handleLowerTheme,
    }),
    [handleGoToEdit, handleRaiseTheme, handleLowerTheme],
  );

  return (
    <>
      <InfiniteTable
        meta={meta}
        isEnabled={isEnabled}
        columns={THEMES_TABLE_COLUMNS}
        queryKey={queryKey}
        queryFn={themesQueryFn}
      />
      <DeleteThemeModal
        open={Boolean(deletedTheme)}
        entity={deletedTheme}
        onOpenChange={handleModalOpenChange}
        onSettled={handleDeleteThemeSettled}
        onCancel={handleCancelDeleteTheme}
      />
    </>
  );
};

import { Navigate, useParams } from 'react-router-dom';

import { THEME_QUERY_KEYS, useTheme } from '@entities/theme';
import { Role } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';
import { PAGES } from '@shared/helpers';
import { ErrorStub, PageLayout, PageSpinner } from '@shared/ui';

import { EditThemeForm } from './EditThemeForm';

import type { FC } from 'react';

const EditThemePage: FC = () => {
  const params = useParams<{ themeId: string }>();
  const themeId = Number(params.themeId);
  const queryKey = THEME_QUERY_KEYS(themeId);

  const { data, isLoading, isError, refetch } = useTheme({
    queryKey,
    enabled: Boolean(themeId),
  });

  if (isError) {
    return <ErrorStub onClick={refetch} />;
  }

  if (isLoading) {
    return (
      <PageLayout className="h-full">
        <PageSpinner />
      </PageLayout>
    );
  }

  if (!data) {
    return <Navigate to={PAGES.SCHEDULE.mask} />;
  }

  return <EditThemeForm theme={data} />;
};

export default withRoleAccess(EditThemePage)(Role.ADMIN, Role.TEACHER);

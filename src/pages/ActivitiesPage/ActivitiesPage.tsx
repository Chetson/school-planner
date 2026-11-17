import { useCallback, useMemo, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
  ACTIVITIES_QUERY_KEYS,
  activitiesQueryFn,
  ACTIVITY_QUERY_KEYS,
} from '@entities/activity';
import { Role } from '@entities/user';
import { GradebookNavigation } from '@features/GradebookNavigation';
import { InfiniteTable } from '@features/InfiniteTable';
import { useSearchText } from '@features/SearchField';
import { TableLayout } from '@features/TableLayout';
import { withRoleAccess } from '@features/withRoleAccess';
import { queryClient } from '@shared/api';
import { IconKind, PAGES, useSorting } from '@shared/helpers';
import { Button } from '@shared/ui';

import { DeleteActivityModal } from './DeleteActivityModal';
import { ACTIVITIES_TABLE_COLUMNS } from './table';

import type { ActivityModel } from '@entities/activity';

const ActivitiesPage = () => {
  const { sortDir, sortId } = useSorting();
  const [search] = useSearchText();

  const [deletedActivity, setDeletedActivity] = useState<ActivityModel | null>(
    null,
  );

  const queryKey = useMemo(
    () => ACTIVITIES_QUERY_KEYS({ sortDir, sortId, search }),
    [sortDir, sortId, search],
  );

  const handleDeleteActivitySettled = useCallback(() => {
    setDeletedActivity(null);
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey]);

  const handleCancelDeleteActivity = useCallback(
    () => setDeletedActivity(null),
    [],
  );

  const handleModalOpenChange = useCallback(
    (opened: boolean) => !opened && setDeletedActivity(null),
    [],
  );

  const navigate = useNavigate();

  const handleGoToEditActivity = useCallback(
    (activity: ActivityModel) => {
      queryClient.setQueryData(
        ACTIVITY_QUERY_KEYS(activity.id),
        () => activity,
      );
      navigate(PAGES.EDIT_ACTIVITY.create(activity.id));
    },
    [navigate],
  );

  const meta = useMemo(
    () => ({
      onDelete: setDeletedActivity,
      onEdit: handleGoToEditActivity,
    }),
    [handleGoToEditActivity],
  );

  return (
    <TableLayout
      title={<GradebookNavigation />}
      tools={
        <Link to={PAGES.CREATE_ACTIVITY.mask}>
          <Button isFullSize={false} leftElement={IconKind.FOLDER_PLUS}>
            Добавить
          </Button>
        </Link>
      }
    >
      <InfiniteTable
        meta={meta}
        columns={ACTIVITIES_TABLE_COLUMNS}
        queryKey={queryKey}
        queryFn={activitiesQueryFn}
      />
      <DeleteActivityModal
        open={Boolean(deletedActivity)}
        entity={deletedActivity}
        onOpenChange={handleModalOpenChange}
        onSettled={handleDeleteActivitySettled}
        onCancel={handleCancelDeleteActivity}
      />
    </TableLayout>
  );
};

export default withRoleAccess(ActivitiesPage)(Role.ADMIN, Role.STUDENT);

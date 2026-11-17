import { useCallback, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  GROUP_QUERY_KEYS,
  GROUPS_LIST_QUERY_KEYS,
  groupsListQueryFn,
} from '@entities/group';
import { Role } from '@entities/user';
import { useClassFilter } from '@features/ClassFilter';
import { InfiniteTable } from '@features/InfiniteTable';
import { useSearchText } from '@features/SearchField';
import { useSubjectFilter } from '@features/SubjectFilter';
import { TableLayout } from '@features/TableLayout';
import { useUserFilter } from '@features/UserFilter';
import { withRoleAccess } from '@features/withRoleAccess';
import { PAGES, useSorting } from '@shared/helpers';
import { RouterNavigation } from '@shared/ui';

import { DeleteModal } from './DeleteModal';
import { GroupsToolbar } from './features/GroupsToolbar';
import { GROUPS_TABLE_COLUMNS } from './lib/table';

import type { GroupModel } from '@entities/group';
import type { FC } from 'react';

const GroupsPage: FC = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { sortDir, sortId } = useSorting();

  const [deleted, setDeleted] = useState<GroupModel | null>(null);

  const [search] = useSearchText();
  const [teacher] = useUserFilter(Role.TEACHER);
  const [subject] = useSubjectFilter();
  const [cls] = useClassFilter();

  const teacherId = teacher?.id;
  const subjectId = subject?.id;
  const classId = cls?.id;

  const queryKey = useMemo(
    () =>
      GROUPS_LIST_QUERY_KEYS({
        sortDir,
        sortId,
        search,
        teacherId,
        subjectId,
        classId,
      }),
    [sortDir, sortId, search, teacherId, subjectId, classId],
  );

  const handleDeleteSettled = useCallback(() => {
    setDeleted(null);
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey, queryClient]);

  const handleModalOpenChange = useCallback(
    (opened: boolean) => !opened && setDeleted(null),
    [],
  );

  const handleCancelDelete = useCallback(() => setDeleted(null), []);

  const onEdit = useCallback(
    (group: GroupModel) => {
      queryClient.setQueryData(GROUP_QUERY_KEYS(group.id), () => group);
      navigate(PAGES.EDIT_GROUP.create(group.id));
    },
    [queryClient, navigate],
  );

  const tableMeta = useMemo(() => ({ onEdit, onDelete: setDeleted }), [onEdit]);

  return (
    <TableLayout title={<RouterNavigation />} tools={<GroupsToolbar />}>
      <InfiniteTable
        meta={tableMeta}
        columns={GROUPS_TABLE_COLUMNS}
        queryKey={queryKey}
        queryFn={groupsListQueryFn}
      />
      <DeleteModal
        open={Boolean(deleted)}
        entity={deleted}
        onOpenChange={handleModalOpenChange}
        onSettled={handleDeleteSettled}
        onCancel={handleCancelDelete}
      />
    </TableLayout>
  );
};

export default withRoleAccess(GroupsPage)(Role.ADMIN);

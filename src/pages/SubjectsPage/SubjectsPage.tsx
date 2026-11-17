import { useCallback, useMemo, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
  SUBJECT_LIST_QUERY_KEYS,
  SUBJECT_QUERY_KEYS,
  subjectsQueryFn,
} from '@entities/subject';
import { Role } from '@entities/user';
import DeleteSubject from '@features/DeleteSubject/DeleteSubject';
import { InfiniteTable } from '@features/InfiniteTable';
import { useSearchText } from '@features/SearchField';
import { TableLayout } from '@features/TableLayout';
import { withRoleAccess } from '@features/withRoleAccess';
import { queryClient } from '@shared/api';
import { IconKind, PAGES, useSorting } from '@shared/helpers';
import { Button, withModal } from '@shared/ui';

import { SUBJECTS_TABLE_COLUMNS } from './lib/table';

import type { SubjectModel } from '@entities/subject';
import type { SubjectListQueryKeys } from '@entities/subject';

const DeleteSubjectModal = withModal(DeleteSubject);

const SubjectsPage = () => {
  const { sortId, sortDir } = useSorting();
  const [name] = useSearchText();

  const [deletedSubject, setDeletedSubject] = useState<SubjectModel | null>(
    null,
  );

  const queryKey = useMemo<SubjectListQueryKeys>(
    () => SUBJECT_LIST_QUERY_KEYS({ sortDir, sortId, name }),
    [sortId, sortDir, name],
  );

  const navigate = useNavigate();

  const handleDeleteRoomSettled = useCallback(() => {
    setDeletedSubject(null);
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey]);

  const handleCancelDeleteRoom = useCallback(() => setDeletedSubject(null), []);

  const handleGoToEditSubject = useCallback(
    (subject: SubjectModel) => {
      queryClient.setQueryData(SUBJECT_QUERY_KEYS(subject.id), () => subject);
      navigate(PAGES.EDIT_SUBJECT.create(subject.id));
    },
    [navigate],
  );

  const handleModalOpenChange = useCallback(
    (opened: boolean) => !opened && setDeletedSubject(null),
    [],
  );

  const meta = useMemo(
    () => ({
      onDelete: setDeletedSubject,
      onEdit: handleGoToEditSubject,
    }),
    [handleGoToEditSubject],
  );

  return (
    <TableLayout
      title="Предметы"
      tools={
        <Link to={PAGES.CREATE_SUBJECT.mask}>
          <Button isFullSize={false} leftElement={IconKind.FOLDER_PLUS}>
            Добавить
          </Button>
        </Link>
      }
    >
      <InfiniteTable
        meta={meta}
        columns={SUBJECTS_TABLE_COLUMNS}
        queryKey={queryKey}
        queryFn={subjectsQueryFn}
      />
      <DeleteSubjectModal
        open={Boolean(deletedSubject)}
        subject={deletedSubject}
        onOpenChange={handleModalOpenChange}
        onSettled={handleDeleteRoomSettled}
        onCancel={handleCancelDeleteRoom}
      />
    </TableLayout>
  );
};

export default withRoleAccess(SubjectsPage)(Role.ADMIN);

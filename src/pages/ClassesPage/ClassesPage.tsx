import { useCallback, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import {
  CLASS_QUERY_KEYS,
  CLASSES_LIST_QUERY_KEYS,
  classesQueryFn,
} from '@entities/class';
import { Role } from '@entities/user';
import { InfiniteTable } from '@features/InfiniteTable';
import { useSearchText } from '@features/SearchField';
import { TableLayout } from '@features/TableLayout';
import { withRoleAccess } from '@features/withRoleAccess';
import { IconKind, PAGES, useSorting } from '@shared/helpers';
import { Button, RouterNavigation } from '@shared/ui';

import { DeleteClassModal } from './DeleteClassModal';
import { CLASSES_TABLE_COLUMNS } from './table';

import type { ClassModel } from '@entities/class';
import type { FC } from 'react';

const ClassesPage: FC = () => {
  const navigate = useNavigate();

  const [search] = useSearchText();

  const [deletedClass, setDeletedClass] = useState<ClassModel | null>(null);

  const { sortId, sortDir } = useSorting();

  const queryClient = useQueryClient();

  const queryKey = useMemo(
    () => CLASSES_LIST_QUERY_KEYS({ sortId, sortDir, search }),
    [sortId, sortDir, search],
  );

  const handleDeleteClassSettled = useCallback(() => {
    setDeletedClass(null);
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey, queryClient]);

  const handleCancelDeleteClass = useCallback(() => setDeletedClass(null), []);

  const handleGoToEditClass = useCallback(
    (cls: ClassModel) => {
      queryClient.setQueryData(CLASS_QUERY_KEYS(cls.id), () => cls);
      navigate(PAGES.EDIT_CLASS.create(cls.id));
    },
    [queryClient, navigate],
  );

  const handleModalOpenChange = useCallback(
    (opened: boolean) => !opened && setDeletedClass(null),
    [],
  );

  const meta = useMemo(
    () => ({
      onDelete: setDeletedClass,
      onEdit: handleGoToEditClass,
    }),
    [handleGoToEditClass],
  );

  return (
    <TableLayout
      title={<RouterNavigation />}
      tools={
        <Link to={PAGES.CREATE_CLASS.mask}>
          <Button isFullSize={false} leftElement={IconKind.FOLDER_PLUS}>
            Добавить
          </Button>
        </Link>
      }
    >
      <InfiniteTable
        meta={meta}
        columns={CLASSES_TABLE_COLUMNS}
        queryKey={queryKey}
        queryFn={classesQueryFn}
      />
      <DeleteClassModal
        onOpenChange={handleModalOpenChange}
        onSettled={handleDeleteClassSettled}
        onCancel={handleCancelDeleteClass}
        open={Boolean(deletedClass)}
        entity={deletedClass}
      />
    </TableLayout>
  );
};

export default withRoleAccess(ClassesPage)(Role.ADMIN);

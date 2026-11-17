import { memo, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { useCreateUsers } from '@entities/user';
import { TableLayout } from '@features/TableLayout';
import { CrossIcon, UserAddIcon } from '@shared/assets';
import { pluralize } from '@shared/helpers';
import { PAGES } from '@shared/helpers';
import { Button, ErrorStub, PageLayout, SuccessStub, Table } from '@shared/ui';

import { TABLE_COLUMNS, createTableData } from './lib/table';

import type { UploadedUsers } from '../../lib';
import type { FC } from 'react';

interface SaveScreenProps {
  users: UploadedUsers;
  onCancel: VoidFunction;
}

const SaveScreen: FC<SaveScreenProps> = ({ users, onCancel }) => {
  const navigate = useNavigate();

  const { isError, isSuccess, isPending, mutate } = useCreateUsers();

  const tableData = useMemo(() => createTableData(users), [users]);

  const handleSave = () => mutate({ users: users.successfull });

  const handleGoToUsers = () => navigate(PAGES.USERS.mask);

  const usersText = `${users.successfull.length} ${pluralize(users.successfull.length, 'пользователь', 'пользователя', 'пользователей')}`;

  if (isError) {
    return <ErrorStub />;
  }

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Добавлено ${usersText}`}
        buttonText="Ко всем пользователям"
        onClick={handleGoToUsers}
      />
    );
  }

  return (
    <PageLayout className="overflow-auto h-full flex flex-col gap-8">
      <TableLayout
        titleVariant="h2"
        title={`Загружено ${usersText}`}
        tools={
          <>
            <Button
              isFullSize={false}
              onClick={handleSave}
              isLoading={isPending}
              disabled={!users.successfull.length}
              className="min-w-36"
              leftElement={<UserAddIcon />}
            >
              Сохранить
            </Button>
            <Button
              isFullSize={false}
              variant="secondary"
              disabled={isPending}
              onClick={onCancel}
              className="min-w-36"
              leftElement={<CrossIcon />}
            >
              Сбросить всё
            </Button>
          </>
        }
      >
        <Table
          variant="secondary"
          withHeader={false}
          columns={TABLE_COLUMNS}
          data={tableData}
        />
      </TableLayout>
    </PageLayout>
  );
};

export default memo(SaveScreen);

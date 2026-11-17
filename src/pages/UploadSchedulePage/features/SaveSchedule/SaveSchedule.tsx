import { useMemo } from 'react';

import { useCreateEvents } from '@entities/event';
import { TableLayout } from '@features/TableLayout';
import { CrossIcon, UserAddIcon } from '@shared/assets';
import { pluralize, useGoBack } from '@shared/helpers';
import { Button, ErrorStub, SuccessStub, Table } from '@shared/ui';

import { createTableData, TABLE_COLUMNS } from './lib/table';

import type { UploadedEvents } from '@entities/event';
import type { FC } from 'react';

export type SaveScheduleProps = {
  events: UploadedEvents;
  onCancel: VoidFunction;
};

export const SaveSchedule: FC<SaveScheduleProps> = ({ events, onCancel }) => {
  const goBack = useGoBack();

  const { mutate, isPending, isSuccess, isError, reset } = useCreateEvents();

  const tableData = useMemo(() => createTableData(events), [events]);

  const eventsText = `${events.successful.length} ${pluralize(events.successful.length, 'событие', 'события', 'событий')}`;

  const handleSave = () => {
    mutate({ data: events.successful });
  };

  if (isError) {
    return <ErrorStub onClick={reset} />;
  }

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Добавлено ${eventsText}`}
        buttonText="К расписанию"
        onClick={goBack}
      />
    );
  }

  return (
    <TableLayout
      titleVariant="h2"
      title={`Загружено ${eventsText}`}
      tools={
        <>
          <Button
            isFullSize={false}
            onClick={handleSave}
            isLoading={isPending}
            disabled={!events.successful.length}
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
      <Table columns={TABLE_COLUMNS} data={tableData} />
    </TableLayout>
  );
};

import { useMemo } from 'react';

import { useCreateThemes } from '@entities/theme';
import { TableLayout } from '@features/TableLayout';
import { CrossIcon, UserAddIcon } from '@shared/assets';
import { pluralize, useGoBack } from '@shared/helpers';
import { Button, ErrorStub, SuccessStub, Table } from '@shared/ui';

import { createTableData, TABLE_COLUMNS } from './lib/table';

import type { UploadedThemes } from '@entities/theme';
import type { FC } from 'react';

export type SaveThemesProps = {
  themes: UploadedThemes;
  onCancel: VoidFunction;
};

export const SaveThemes: FC<SaveThemesProps> = ({ themes, onCancel }) => {
  const goBack = useGoBack();

  const { mutate, isPending, isSuccess, isError, reset } = useCreateThemes();

  const handleSave = () => {
    mutate({ data: themes.successfull });
  };

  const tableData = useMemo(() => createTableData(themes), [themes]);

  const themesText = `${themes.successfull.length} ${pluralize(themes.successfull.length, 'тема урока', 'темы уроков', 'тем уроков')}`;

  if (isError) {
    return <ErrorStub onClick={reset} />;
  }

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Добавлено ${themesText}`}
        buttonText="Ко всем темам уроков"
        onClick={goBack}
      />
    );
  }

  return (
    <TableLayout
      titleVariant="h2"
      title={`Загружено ${themesText}`}
      tools={
        <>
          <Button
            isFullSize={false}
            onClick={handleSave}
            isLoading={isPending}
            disabled={!themes.successfull.length}
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

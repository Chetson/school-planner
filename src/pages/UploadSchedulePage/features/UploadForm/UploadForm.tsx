import { useUploadEvents } from '@entities/event';
import { SelectQuarter } from '@features/SelectQuarter';
import { createForm } from '@shared/helpers';
import { ErrorStub, PageLayout } from '@shared/ui';
import { FileInput } from '@shared/ui/FileInput';

import { FILE_ACCEPT_HINT, FILE_ACCEPT_STRING } from './lib/config';
import { schema } from './lib/schema';

import type { UploadedEvents } from '@entities/event';
import type { FC } from 'react';

const Form = createForm(schema, {
  quarter: (props) => <SelectQuarter label="Четверть" {...props} />,
  file: (props) => (
    <FileInput
      {...props}
      label="Прикрепите файл"
      accept={FILE_ACCEPT_STRING}
      caption={FILE_ACCEPT_HINT}
    />
  ),
});

export type UploadFormProps = {
  onUpload: (events: UploadedEvents) => void;
};

export const UploadForm: FC<UploadFormProps> = ({ onUpload }) => {
  const { mutate, isPending, error, reset } = useUploadEvents({
    onSuccess: onUpload,
  });

  if (error) {
    return <ErrorStub onClick={reset} />;
  }

  return (
    <PageLayout>
      <Form
        title="Загрузить расписание"
        isLoading={isPending}
        onSubmit={(data) => {
          mutate({
            file: data.file,
            dateStart: data.quarter.dateStart,
            dateEnd: data.quarter.dateEnd,
          });
        }}
      />
    </PageLayout>
  );
};

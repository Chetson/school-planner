import { useUploadThemes } from '@entities/theme';
import { SelectClass } from '@features/SelectClass';
import { SelectSubject } from '@features/SelectSubject';
import { createForm } from '@shared/helpers';
import { ErrorStub, PageLayout } from '@shared/ui';
import { FileInput } from '@shared/ui/FileInput';

import { FILE_ACCEPT_HINT, FILE_ACCEPT_STRING } from './lib/config';
import { schema } from './lib/schema';

import type { UploadedThemes } from '@entities/theme';
import type { FC } from 'react';

const Form = createForm(schema, {
  cls: (props) => <SelectClass {...props} label="Класс" />,
  subject: (props) => <SelectSubject {...props} label="Предмет" />,
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
  onUpload: (themes: UploadedThemes) => void;
};

export const UploadForm: FC<UploadFormProps> = ({ onUpload }) => {
  const { mutate, isPending, error, reset } = useUploadThemes({
    onSuccess: onUpload,
  });

  if (error) {
    return <ErrorStub onClick={reset} />;
  }

  return (
    <PageLayout>
      <Form
        title="Загрузить темы уроков"
        isLoading={isPending}
        onSubmit={(data) => {
          mutate({
            subjectId: data.subject.id,
            classId: data.cls.id,
            file: data.file,
          });
        }}
      />
    </PageLayout>
  );
};

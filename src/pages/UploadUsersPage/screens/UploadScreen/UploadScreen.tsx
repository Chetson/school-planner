import { memo, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';

import { IconKind } from '@shared/helpers';
import { FormLayout } from '@shared/ui';
import { Button, PageLayout } from '@shared/ui';
import { FileInput } from '@shared/ui/FileInput';

import { uploadMutationFn } from './api/mutations';
import { FILE_ACCEPT_HINT, FILE_ACCEPT_STRING } from './lib/config';
import { uploadSchema } from './lib/schema';

import type { UploadFormData } from './lib/types';
import type { UploadedUsers } from '../../lib';
import type { CommonApiError } from '@shared/helpers';
import type { FC } from 'react';

interface UploadScreenProps {
  onUpload: (data: UploadedUsers) => void;
}

const UploadScreen: FC<UploadScreenProps> = ({ onUpload }) => {
  const {
    watch,
    control,
    formState: { isValid, isSubmitted },
    handleSubmit,
    setError,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const { mutate, isPending, error, reset } = useMutation<
    UploadedUsers,
    CommonApiError,
    UploadFormData
  >({
    onSuccess: onUpload,
    mutationFn: uploadMutationFn,
    onError: (error) => setError('file', { message: error.detail }),
  });

  useEffect(() => reset(), [watch('file')]);

  return (
    <PageLayout>
      <FormLayout
        onSubmit={handleSubmit((data) => mutate(data))}
        title="Загрузить пользователей"
        illustration={IconKind.USER_ADD_ILLUSTRATION}
        action={
          <Button
            type="submit"
            isLoading={isPending}
            disabled={!isValid && isSubmitted}
          >
            Добавить
          </Button>
        }
      >
        <Controller
          name="file"
          control={control}
          render={({ field, formState: { errors } }) => (
            <FileInput
              {...field}
              required
              label="Прикрепите файл"
              accept={FILE_ACCEPT_STRING}
              caption={error?.detail ?? FILE_ACCEPT_HINT}
              isError={Boolean(errors.file || error?.detail)}
            />
          )}
        />
      </FormLayout>
    </PageLayout>
  );
};

export default memo(UploadScreen);

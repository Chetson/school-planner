import { memo } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Controller, useWatch } from 'react-hook-form';

import { useAuthOperationKind, useToggle } from '@shared/helpers';
import { AuthOperationKind } from '@shared/types';
import { Button, Input } from '@shared/ui';
import { resetPasswordQueryFn } from '@widgets/AuthWidget/api';
import { FormLayout } from '@widgets/AuthWidget/ui';

import { SuccessScreen } from './ui/SuccessScreen/SuccessScreen';

import type {
  ResetPasswordApiError,
  AuthFormProps,
  ResetPasswordApiParams,
} from '../../lib';
import type { FC } from 'react';

const ResetPasswordForm: FC<AuthFormProps> = ({
  onSubmit,
  control,
  disabled,
}) => {
  const [isSuccessScreenShown, { open, close }] = useToggle();

  const { setOperationKind } = useAuthOperationKind();

  const email = useWatch({ control, name: 'email' });

  const { mutate, isPending, isError, error } = useMutation<
    unknown,
    ResetPasswordApiError,
    ResetPasswordApiParams
  >({
    mutationFn: resetPasswordQueryFn,
    onSuccess: open,
    onError: close,
  });

  const handleGoToLogin = () => setOperationKind(AuthOperationKind.LOGIN);

  const handleMutate = () => mutate({ email });

  const handleSubmit = onSubmit(handleMutate);

  if (isSuccessScreenShown) {
    return (
      <SuccessScreen
        onResend={handleMutate}
        onGoToLogin={handleGoToLogin}
        isLoading={isPending}
        email={email}
      />
    );
  }

  return (
    <FormLayout
      title="Сброс пароля"
      onSubmit={handleSubmit}
      controls={
        <Controller
          name={'email'}
          control={control}
          render={({ field, formState: { errors } }) => (
            <Input
              {...field}
              label="Логин"
              disabled={isPending}
              containerClassName="!bg-bg-default"
              caption={
                errors.email?.message ||
                error?.detail ||
                'Введите свой e-mail, к которому привязан аккаунт, мы пришлем вам письмо с паролем'
              }
              isError={Boolean(errors.email) || isError}
            />
          )}
        />
      }
      buttons={
        <>
          <Button isLoading={isPending} type="submit" disabled={disabled}>
            Выслать пароль
          </Button>
          <Button disabled={isPending} variant="link" onClick={handleGoToLogin}>
            Войти
          </Button>
        </>
      }
    />
  );
};

export default memo(ResetPasswordForm);

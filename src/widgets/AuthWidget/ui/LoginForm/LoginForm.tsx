import { memo, useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';

import { CURRENT_USER_QUERY_KEYS } from '@entities/user';
import { apiService } from '@shared/api';
import { useAuthOperationKind } from '@shared/helpers';
import { AuthOperationKind } from '@shared/types';
import { Button, Input } from '@shared/ui';
import { loginMutationFn } from '@widgets/AuthWidget/api';
import { FormLayout } from '@widgets/AuthWidget/ui';

import type {
  AuthFormProps,
  LoginApiError,
  LoginApiParams,
  LoginApiResponse,
} from '../../lib';
import type { FC } from 'react';

const LoginForm: FC<AuthFormProps> = ({ onSubmit, control, disabled }) => {
  const queryClient = useQueryClient();

  const { setOperationKind } = useAuthOperationKind();

  const { mutate, isPending, isError, error } = useMutation<
    LoginApiResponse,
    LoginApiError,
    LoginApiParams
  >({
    mutationFn: loginMutationFn,
    onSuccess: ({ profile, tokens }) => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEYS, () => profile);
      apiService.setTokens(tokens);
    },
  });

  const handleGoToReset = useCallback(
    () => setOperationKind(AuthOperationKind.RESET),
    [setOperationKind],
  );

  const handleSubmit = onSubmit(({ email, password }) =>
    mutate({ email, password }),
  );

  return (
    <FormLayout
      title="Личный кабинет"
      onSubmit={handleSubmit}
      controls={
        <>
          <Controller
            name="email"
            control={control}
            render={({ field, formState: { errors } }) => (
              <Input
                {...field}
                label="Логин"
                disabled={isPending}
                containerClassName="bg-bg-default"
                caption={errors.email?.message}
                isError={Boolean(errors.email) || isError}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, formState: { errors } }) => (
              <Input
                {...field}
                label="Пароль"
                disabled={isPending}
                type="password"
                containerClassName="bg-bg-default"
                caption={errors.password?.message || error?.detail}
                isError={Boolean(errors.password) || isError}
              />
            )}
          />
        </>
      }
      buttons={
        <>
          <Button isLoading={isPending} disabled={disabled} type="submit">
            Войти
          </Button>
          <Button disabled={isPending} variant="link" onClick={handleGoToReset}>
            Забыли пароль?
          </Button>
        </>
      }
    />
  );
};

export default memo(LoginForm);

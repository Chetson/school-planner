import { useEffect, type FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthOperationKind } from '@shared/helpers';
import { AuthOperationKind } from '@shared/types';
import { useForm } from 'react-hook-form';

import { getAuthSchema, type AuthFormData } from './lib';
import { LoginForm } from './ui/LoginForm';
import { ResetPasswordForm } from './ui/ResetPasswordForm';

export const AuthWidget: FC = () => {
  const { operationKind } = useAuthOperationKind();

  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { isValid, isSubmitted },
  } = useForm<AuthFormData>({
    mode: 'onBlur',
    resolver: zodResolver(getAuthSchema(operationKind)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => reset(getValues()), [operationKind]);

  const Component =
    operationKind === AuthOperationKind.RESET ? ResetPasswordForm : LoginForm;

  return (
    <Component
      onSubmit={handleSubmit}
      control={control}
      disabled={!isValid && isSubmitted}
    />
  );
};

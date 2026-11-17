import type { FC } from 'react';

import { IconKind } from '@shared/helpers';
import { Button, VerticalTemplate } from '@shared/ui';

interface SuccessScreenProps {
  email?: string;
  onGoToLogin: VoidFunction;
  onResend: VoidFunction;
  isLoading: boolean;
}

export const SuccessScreen: FC<SuccessScreenProps> = ({
  email,
  isLoading,
  onGoToLogin,
  onResend,
}) => (
  <VerticalTemplate
    icon={IconKind.SUCCESS_ILLUSTRATION}
    title="Пароль уже на почте"
    description={`Проверьте почту по адресу ${email}`}
  >
    <div className="w-full space-y-6">
      <Button onClick={onGoToLogin}>Войти</Button>
      <Button variant="link" isLoading={isLoading} onClick={onResend}>
        Выслать пароль еще раз
      </Button>
    </div>
  </VerticalTemplate>
);

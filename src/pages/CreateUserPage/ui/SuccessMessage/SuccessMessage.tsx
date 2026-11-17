import type { FC } from 'react';

export const SuccessMessage: FC<{ email: string }> = ({ email }) => (
  <>
    Пользователь добавлен. На e-mail{' '}
    <a
      className="text-decorative-blue"
      href={'mailto:' + email}
      rel="noreferrer"
      target="_blank"
    >
      {email}
    </a>{' '}
    выслан пароль для входа в личный кабинет
  </>
);

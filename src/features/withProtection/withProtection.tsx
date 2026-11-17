import type { FC } from 'react';

import type { UserModel } from '@entities/user';
import { useCurrentUser } from '@entities/user';
import { PageSpinner } from '@shared/ui';
import type { UseQueryResult } from '@tanstack/react-query';

export interface WithProtectionOptions<Props extends object> {
  Component: FC<Props>;
  Fallback: FC;
  protector: (user: UseQueryResult<UserModel, Error>) => boolean;
}

export const withProtection = <Props extends object>({
  Component,
  Fallback,
  protector,
}: WithProtectionOptions<Props>): FC<Props> => {
  const ComponentWithProtection = (props: Props) => {
    const user = useCurrentUser();

    if (user.isLoading) {
      return <PageSpinner />;
    }

    if (!protector(user)) {
      return <Fallback />;
    }

    return <Component {...props} />;
  };

  return ComponentWithProtection;
};

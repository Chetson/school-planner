import { useCurrentUser } from '@entities/user';

import type { Role, UserModelsMap } from '@entities/user';
import type { ReactNode } from 'react';

export type AccessRoleProps<R extends Role> = {
  role: R | R[];
  children?: ReactNode | ((data: UserModelsMap[R]) => ReactNode);
};

export const AccessRole = <R extends Role>({
  role,
  children,
}: AccessRoleProps<R>) => {
  const { data } = useCurrentUser();

  if (!data) return null;

  const hasAccess = (Array.isArray(role) ? role : [role]).some(
    (role) => role === data.role,
  );

  if (!hasAccess) return null;

  if (typeof children === 'function') {
    return children(data as UserModelsMap[R]);
  }

  return children;
};

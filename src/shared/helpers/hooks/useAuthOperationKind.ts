import { useCallback } from 'react';

import { useSearchParams } from 'react-router-dom';

import { AuthOperationKind } from '@shared/types';

export const useAuthOperationKind = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setOperationKind = useCallback(
    (kind: AuthOperationKind) => {
      setSearchParams({ k: kind });
    },
    [setSearchParams],
  );

  const operationKind = (searchParams.get('k') ??
    AuthOperationKind.LOGIN) as AuthOperationKind;

  return { operationKind, setOperationKind };
};

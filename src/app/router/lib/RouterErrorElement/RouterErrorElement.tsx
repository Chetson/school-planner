import { useLayoutEffect } from 'react';

import { useRouteError } from 'react-router-dom';

import { ErrorStub } from '@shared/ui';

import type { FC } from 'react';

const MODULE_LOAD_ERROR = 'module_load_error';

export const RouterErrorElement: FC = () => {
  const error = String(useRouteError());
  const isChunkErrorString = error.indexOf('chunk') !== -1;

  useLayoutEffect(() => {
    if (error && isChunkErrorString) {
      const retries = Number(sessionStorage.getItem(MODULE_LOAD_ERROR) || 0);

      if (retries > 1) {
        sessionStorage.removeItem(MODULE_LOAD_ERROR);
      }

      sessionStorage.setItem(MODULE_LOAD_ERROR, String(retries + 1));
      window.location.reload();
    }
  }, [error, isChunkErrorString]);

  return <ErrorStub />;
};

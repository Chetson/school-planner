import { useEffect, useRef } from 'react';

export const useUpdate = (callback: () => void, deps: unknown[]) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    callback();
  }, deps);
};

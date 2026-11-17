import { type MutableRefObject, useLayoutEffect } from 'react';

export const useScrollToTop = (
  container: MutableRefObject<HTMLElement | null>,
  deps: unknown[],
) => useLayoutEffect(() => container.current?.scrollTo({ top: 0 }), deps);

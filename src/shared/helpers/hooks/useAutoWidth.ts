import { useLayoutEffect, useRef, useState } from 'react';

import { debounce } from '../debounce';

export const useAutoWidth = <E extends HTMLElement>(enabled?: boolean) => {
  const [width, setWidth] = useState<number>();
  const parentRef = useRef<E | null>(null);

  useLayoutEffect(() => {
    const parentRefCurrent = parentRef.current;

    if (!(enabled && parentRefCurrent)) {
      return;
    }

    const changeWidth = () =>
      setWidth(parentRefCurrent.getBoundingClientRect?.()?.width || 0);

    const debounceSetWidth = debounce(changeWidth, 150);

    window.addEventListener('resize', debounceSetWidth);
    changeWidth();

    return () => {
      window.removeEventListener('resize', debounceSetWidth);
    };
  }, [enabled]);

  return { width, parentRef };
};

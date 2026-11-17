import { useLayoutEffect, useRef } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';

export const PersistSearchParams = () => {
  const { pathname, state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsRef = useRef(searchParams);

  useLayoutEffect(() => {
    if (!searchParams.toString()) {
      setSearchParams(
        new URLSearchParams(sessionStorage.getItem(pathname) ?? ''),
        { replace: true, state },
      );
    }

    return () => {
      if (!searchParamsRef.current.toString()) {
        sessionStorage.removeItem(pathname);
      } else {
        sessionStorage.setItem(pathname, searchParamsRef.current.toString());
      }
    };
  }, [pathname]);

  useLayoutEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  return null;
};

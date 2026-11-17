import { useContext, useEffect } from 'react';

import { extractExistingParams } from '@shared/helpers';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { SearchVisibleContext } from './context';

export const useSearchVisible = () => {
  const visibleData = useContext(SearchVisibleContext);

  if (!visibleData) {
    throw new Error(
      'useSearchVisible must be used within SearchVisibleProvider',
    );
  }

  return visibleData;
};

export const useSearchTextInternal = (): [string, (v: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = useDebouncedCallback(
    (search: string) =>
      setSearchParams({
        ...extractExistingParams(searchParams),
        search,
      }),
    400,
  );

  return [searchParams.get('search') ?? '', handleChange];
};

/**
 * Хук для внешнего использования.
 * Хук создаёт/удаляет подписку на поиск.
 */
export const useSearchText = (): [string, (v: string) => void] => {
  const { show } = useSearchVisible();

  useEffect(() => {
    const hide = show();

    return () => hide();
  }, []);

  return useSearchTextInternal();
};

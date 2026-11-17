import type { FC, PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

interface SearchVisibleContextData {
  isVisible: boolean;
  show: () => () => void;
}

export const SearchVisibleContext =
  createContext<SearchVisibleContextData | null>(null);

/**
 * Поскольку поиск нужен лишь на нескольких страницах,
 * отображаем его только по необходимости.
 * Контекст хранит список слушателей поиска и возвращает
 * признак видимости компонента поиска.
 */
export const SearchVisibleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [listeners, setListener] = useState<number[]>([]);

  const show = () => {
    const listener = Math.random();

    setListener((list) => [...list, listener]);

    return () => {
      setListener((list) => list.filter((item) => item !== listener));
    };
  };

  const isVisible = Boolean(listeners.length);

  return (
    <SearchVisibleContext.Provider value={{ show, isVisible }}>
      {children}
    </SearchVisibleContext.Provider>
  );
};

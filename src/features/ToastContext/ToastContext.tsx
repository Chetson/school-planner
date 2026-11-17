import { createContext, useCallback, useContext, useState } from 'react';

import { ToastKind } from '@entities/toast';
import { Toasts } from '@shared/ui';

import type { ToastMessage, ToastMessageTypes } from '@entities/toast';
import type { FC, ReactNode } from 'react';

type ToastContextType = (
  message: string,
  type?: ToastKind,
  delay?: number,
) => void;

// TODO Перейти на Radix
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (
      message: string,
      type: ToastMessageTypes = ToastKind.SUCCESS,
      delay = 5000,
    ) => {
      const newToast = {
        id: Number(Date.now() + Math.random()),
        message,
        type,
      };
      setToasts((prevToasts) => [...prevToasts, newToast]);
      setTimeout(
        () =>
          setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== newToast.id),
          ),
        delay,
      );
    },
    [],
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Toasts toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');

  return context;
};

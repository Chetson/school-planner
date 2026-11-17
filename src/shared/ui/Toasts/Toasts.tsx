import { ToastKind } from '@entities/toast';
import { IconKind } from '@shared/helpers';
import { Icon, Typography } from '@shared/ui';

import type { ToastMessage } from '@entities/toast';
import type { FC } from 'react';

interface ToastsProps {
  toasts: ToastMessage[];
}

export const TOAST_ICON_MAP: Record<ToastKind, IconKind> = {
  [ToastKind.SUCCESS]: IconKind.SUCCESS_ILLUSTRATION,
  [ToastKind.ERROR]: IconKind.ERROR_ILLUSTRATION,
};

export const Toasts: FC<ToastsProps> = ({ toasts }) => {
  return (
    <section className="fixed z-50 w-[400px] bottom-6 right-12">
      <div className="flex flex-col-reverse gap-2">
        {toasts.map((toast: ToastMessage) => (
          <article key={toast.id} className="flex justify-end">
            <div className="bg-white shadow-md flex gap-4 p-4 pr-8 rounded-2xl">
              <div className="flex flex-col justify-center">
                <Icon
                  kind={TOAST_ICON_MAP[toast.type]}
                  size={60}
                  className="w-14 h-14"
                />
              </div>
              <div className="flex flex-col justify-center">
                <Typography variant="regular2">{toast.message}</Typography>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Toasts;

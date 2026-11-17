import type { ComponentPropsWithoutRef, FC } from 'react';

import type {
  Content,
  DialogClose,
  DialogProps,
  Trigger,
} from '@radix-ui/react-dialog';

export type ModalProps = DialogProps;

export type ModalContentProps = {
  /**
   * Возможность закрывать модалку по клику вне модалки
   * default: true
   */
  isOutsideIntercted?: boolean;
} & ComponentPropsWithoutRef<typeof Content>;

export type ModalTriggerProps = ComponentPropsWithoutRef<typeof Trigger>;

export type ModalCloseProps = ComponentPropsWithoutRef<typeof DialogClose>;

export interface ModalType {
  Content: FC<ModalContentProps>;
  Trigger: FC<ModalTriggerProps>;
  Close: FC<ModalCloseProps>;
}

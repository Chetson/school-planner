import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';

import styles from './modal.module.css';

import type {
  ModalContentProps,
  ModalTriggerProps,
  ModalCloseProps,
  ModalType,
} from './lib/types';
import type { FC } from 'react';

export const Modal = DialogPrimitive.Root as FC<DialogPrimitive.DialogProps> &
  ModalType;

const ModalTrigger: FC<ModalTriggerProps> = ({ children, ...props }) => (
  <DialogPrimitive.Trigger {...props} asChild>
    {children}
  </DialogPrimitive.Trigger>
);

const ModalClose: FC<ModalCloseProps> = ({ children, ...props }) => (
  <DialogPrimitive.Trigger {...props} asChild>
    {children}
  </DialogPrimitive.Trigger>
);

const stateClasses =
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0';

const ModalContent: FC<ModalContentProps> = ({
  isOutsideIntercted = true,
  children,
  className,
  ...props
}) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      className={clsx(
        styles.overlay,
        stateClasses,
        'z-50 bg-bg-default-inverted opacity-30',
      )}
    />
    <DialogPrimitive.Overlay
      className={clsx(styles.overlay, stateClasses, `z-50 backdrop-blur`)}
    />
    <DialogPrimitive.Content
      onInteractOutside={(e) => !isOutsideIntercted && e.preventDefault()}
      className={clsx(
        styles.modal,
        stateClasses,
        `data-[state=closed]:zoom-out-95 
        data-[state=open]:zoom-in-95 
        data-[state=closed]:slide-out-to-left-1/2 
        data-[state=closed]:slide-out-to-top-[48%]
        data-[state=open]:slide-in-from-left-1/2
        data-[state=open]:slide-in-from-top-[48%]`,
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

Modal.Content = ModalContent;
Modal.Trigger = ModalTrigger;
Modal.Close = ModalClose;

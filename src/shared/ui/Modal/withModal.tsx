import { memo, useRef } from 'react';

import { Modal } from './Modal';

import type { ModalProps } from './lib/types';
import type { FC } from 'react';

export type WithModalProps = {
  className?: string;
} & Omit<ModalProps, 'children'>;

export const withModal = <Props extends object>(Component: FC<Props>) => {
  const ComponentWithModal: FC<Props & WithModalProps> = ({
    open,
    onOpenChange,
    defaultOpen,
    modal,
    className,
    ...props
  }) => {
    const targetButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleOpenFocus = (event: Event) => {
      event.preventDefault();
      targetButtonRef.current?.focus();
    };

    return (
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        modal={modal}
      >
        <Modal.Content className={className} onOpenAutoFocus={handleOpenFocus}>
          <Component {...(props as Props)} ref={targetButtonRef} />
        </Modal.Content>
      </Modal>
    );
  };

  return memo(ComponentWithModal);
};

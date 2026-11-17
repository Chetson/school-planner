import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';

import { presenceMutationFn } from '@entities/gradebook';
import { ToastKind } from '@entities/toast';
import { useToast } from '@features/ToastContext';
import { useToggle } from '@shared/helpers';

import { PRESENCE_VALUES } from './lib/config';
import { createDropdownItem, DROPDOWN_OPTIONS } from './lib/options';
import { ACTIVE_CELL_ID, useGradebookActions } from '../../lib';
import { GradebookDropdown, StaticCell } from '../../ui';

import type { LessonRef } from '../../lib';
import type { Presence } from '@entities/gradebook';
import type { DropdownItemType } from '@shared/ui';
import type { FC } from 'react';

export type PresenceCellProps = {
  lessonId: number;
  studentId: number;
  presence?: Presence;
  lessonRef: LessonRef;
};

export const PresenceCellReadonly: FC<PresenceCellProps> = ({ presence }) => (
  <StaticCell>{presence && PRESENCE_VALUES[presence]}</StaticCell>
);

export const PresenceCellEdit: FC<PresenceCellProps> = ({
  lessonId,
  studentId,
  presence,
  lessonRef,
}) => {
  const { modifyPresence } = useGradebookActions();
  const addToast = useToast();

  const [value, setValue] = useState<DropdownItemType<Presence> | null>(() =>
    createDropdownItem(presence),
  );

  const [opened, { open, setOpened }] = useToggle();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: presenceMutationFn,
  });

  const handleChange = async (option: DropdownItemType<Presence> | null) => {
    if (option && option.id !== value?.id) {
      setValue(option);

      try {
        await mutateAsync({
          lessonId,
          studentId,
          presence: option.id,
        });

        modifyPresence?.({
          lessonId,
          studentId,
          presence: option.id,
        });
      } catch (err) {
        addToast('Ошибка! Не удалось сохранить статус.', ToastKind.ERROR);
      }
    }
  };

  const handleOpenChange = (opened: boolean) => {
    if (!isPending) {
      setOpened(opened);
    }

    if (!opened) {
      lessonRef.current?.blur();
    }
  };

  const handleDoubleClick = () => {
    lessonRef.current?.focus();
    open();
  };

  return (
    <GradebookDropdown
      isAutoWidth={false}
      popoverClassName="w-40"
      isOpened={opened}
      onChange={handleChange}
      items={DROPDOWN_OPTIONS}
      onOpenChange={handleOpenChange}
      value={value}
      isMultiselect={false}
    >
      <StaticCell
        id={opened ? ACTIVE_CELL_ID : undefined}
        onDoubleClick={handleDoubleClick}
        className={clsx(
          'whitespace-nowrap box-border select-none min-w-13',
          opened && 'border border-decorative-mint rounded-md',
        )}
      >
        {value && PRESENCE_VALUES[value.id]}
      </StaticCell>
    </GradebookDropdown>
  );
};

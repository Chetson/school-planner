import { useMutation } from '@tanstack/react-query';

import {
  columnDeleteMutationFn,
  columnModifyMutationFn,
} from '@entities/gradebook';
import { ToastKind } from '@entities/toast';
import { useGradebookActions } from '@features/Gradebook/lib';
import { useToast } from '@features/ToastContext';
import { IconKind } from '@shared/helpers';
import { Spinner, Typography } from '@shared/ui';
import { IconButton } from '@shared/ui/IconButton';

import { SubHeader, TextAreaHover } from '../../ui';
import { AddDummyActivityButton } from '../AddDummyActivityButton';

import type { GradebookActivityModel } from '@entities/gradebook';
import type { FC, MouseEvent } from 'react';
export type ActivityHeaderProps = {
  gradebookActivity: GradebookActivityModel;
  lessonId: number;
  isDeleteAllowed: boolean;
  withAddButton: boolean;
};

export const ActivityHeaderReadonly: FC<ActivityHeaderProps> = ({
  gradebookActivity: { activity, comment },
}) => (
  <TextAreaHover readOnly text={comment}>
    <SubHeader className="cursor-pointer">
      <Typography variant="caption1">{activity.shortname}</Typography>
    </SubHeader>
  </TextAreaHover>
);

export const ActivityHeaderEdit: FC<ActivityHeaderProps> = ({
  gradebookActivity: { activity, comment },
  lessonId,
  isDeleteAllowed,
  withAddButton,
}) => {
  const { modifyActivity, deleteActivity } = useGradebookActions();
  const addToast = useToast();

  const { mutateAsync: mutateModify } = useMutation({
    mutationFn: columnModifyMutationFn,
  });

  const { mutateAsync: mutateDelete, isPending: isDeletePending } = useMutation(
    {
      mutationFn: columnDeleteMutationFn,
    },
  );

  const handleEdit = async (text: string) => {
    try {
      await mutateModify({
        lessonId,
        activityId: activity.id,
        info: text,
      });

      modifyActivity?.(lessonId, {
        activity,
        comment: text,
      });
    } catch (err) {
      addToast('Ошибка! Не удалось сохранить деятельность.', ToastKind.ERROR);
    }
  };

  const handleDelete = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      await mutateDelete({ lessonId, activityId: activity.id });
      deleteActivity?.(lessonId, activity.id);
    } catch (err) {
      addToast('Ошибка! Не удалось удалить деятельность.', ToastKind.ERROR);
    }
  };

  return (
    <div className="h-full w-full !inline-flex items-center justify-between">
      <TextAreaHover
        triggerClassName="grow"
        onEdit={handleEdit}
        text={comment}
        isPending={isDeletePending}
      >
        <SubHeader>
          <Typography
            variant="caption1"
            className="grow text-left cursor-default"
          >
            {activity.shortname}
          </Typography>
          {isDeletePending && <Spinner size={15} className="-mr-1 ml-[1px]" />}
          {!isDeletePending && isDeleteAllowed && (
            <IconButton
              onClick={handleDelete}
              size={20}
              className="!text-decorative-gray -mr-2"
              icon={IconKind.TRASH}
            />
          )}
        </SubHeader>
      </TextAreaHover>
      {withAddButton && <AddDummyActivityButton lessonId={lessonId} />}
    </div>
  );
};

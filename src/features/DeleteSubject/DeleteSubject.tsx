import { memo, forwardRef } from 'react';

import { useDeleteSubject } from '@entities/subject';
import { IconKind } from '@shared/helpers';
import { Button, ErrorStub, VerticalTemplate } from '@shared/ui';

import type { SubjectModel } from '@entities/subject';
import type { ForwardRefRenderFunction } from 'react';

export interface DeleteSubjectProps {
  subject?: SubjectModel | null;
  onCancel?: VoidFunction;
  onSettled?: VoidFunction;
}

// TODO Удалить. Использовать createOperationModal
const DeleteSubject: ForwardRefRenderFunction<
  HTMLButtonElement,
  DeleteSubjectProps
> = ({ subject, onCancel, onSettled }: DeleteSubjectProps, targetButtonRef) => {
  const { isPending, isError, mutate } = useDeleteSubject({ onSettled });

  const handleDeleteSubject = () => {
    if (subject) {
      mutate({ id: subject.id });
    }
  };

  if (!subject) {
    return null;
  }

  if (isError) {
    return <ErrorStub />;
  }

  return (
    <VerticalTemplate
      icon={IconKind.DELETE_ILLUSTRATION}
      title="Удалить предмет"
      description={`Вы действительно хотите удалить предмет ${subject.name}`}
    >
      <Button disabled={isPending} variant="tertiary" onClick={onCancel}>
        Отменить
      </Button>
      <Button
        ref={targetButtonRef}
        isLoading={isPending}
        variant="destructive"
        onClick={handleDeleteSubject}
        className="capitalize"
      >
        Удалить
      </Button>
    </VerticalTemplate>
  );
};

export default memo(forwardRef(DeleteSubject));

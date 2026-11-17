import { useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';

import { Button, VerticalTemplate, withModal } from '@shared/ui';

import type { IconKind } from '@shared/helpers';
import type { MutationFunction } from '@tanstack/react-query';
import type { ReactNode } from 'react';

type CreateOperationModalArg<Model extends object, Data> = {
  mutationFn: MutationFunction<Data, Model>;
  meta: (entity: Model) => {
    icon: IconKind;
    title: ReactNode;
    description: ReactNode;
    actionText: ReactNode;
  };
};

type OperationComponentProps<Model> = {
  entity?: Model | null;
  onSettled?: VoidFunction;
  onCancel?: VoidFunction;
};

export const createOperationModal = <Model extends object, Data>({
  mutationFn,
  meta,
}: CreateOperationModalArg<Model, Data>) => {
  const OperationComponent = ({
    entity,
    onSettled,
    onCancel,
  }: OperationComponentProps<Model>) => {
    const { mutate, isPending } = useMutation({
      onSettled,
      mutationFn,
    });

    const handleClick = () => entity && mutate(entity);

    const metaProps = useMemo(() => (entity ? meta(entity) : null), []);

    if (!metaProps) return null;

    const { actionText, ...verticalTemplateProps } = metaProps;

    return (
      <VerticalTemplate {...verticalTemplateProps}>
        <Button disabled={isPending} variant="tertiary" onClick={onCancel}>
          Отменить
        </Button>
        <Button
          isLoading={isPending}
          variant="destructive"
          onClick={handleClick}
          className="capitalize"
        >
          {actionText}
        </Button>
      </VerticalTemplate>
    );
  };

  return withModal(OperationComponent);
};

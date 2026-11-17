import { memo, forwardRef } from 'react';

import { useUpdateUser } from '@entities/user';
import { IconKind, getFullName } from '@shared/helpers';
import { Button, ErrorStub, VerticalTemplate } from '@shared/ui';

import type { UserModel } from '@entities/user';
import type { ForwardRefRenderFunction } from 'react';

export interface BlockUserProps {
  user?: UserModel | null;
  onSuccess?: (user: UserModel) => void;
  onCancel?: VoidFunction;
}

// TODO Удалить. Использовать createOperationModal
const BlockUser: ForwardRefRenderFunction<HTMLButtonElement, BlockUserProps> = (
  { user, onCancel, onSuccess }: BlockUserProps,
  targetButtonRef,
) => {
  const { isPending, isError, mutate } = useUpdateUser({ onSuccess });

  const handleBlockUser = () => {
    if (user) {
      mutate({
        id: user.id,
        data: { isBlocked: !user.isBlocked },
      });
    }
  };

  if (isError) {
    return <ErrorStub />;
  }

  const fullName = user ? getFullName(user) : '';
  const actionText = user?.isBlocked ? 'разблокировать' : 'заблокировать';
  const iconKind = user?.isBlocked
    ? IconKind.UNLOCK_ILLUSTRATION
    : IconKind.LOCK_ILLUSTRATION;

  return (
    <VerticalTemplate
      icon={iconKind}
      title={
        <>
          <span className="capitalize">{actionText}</span> пользователя
        </>
      }
      description={`Вы действительно хотите ${actionText} пользователя ${fullName}`}
    >
      <Button disabled={isPending} variant="tertiary" onClick={onCancel}>
        Отменить
      </Button>
      <Button
        ref={targetButtonRef}
        isLoading={isPending}
        variant="destructive"
        onClick={handleBlockUser}
        className="capitalize"
      >
        {actionText}
      </Button>
    </VerticalTemplate>
  );
};

export default memo(forwardRef(BlockUser));

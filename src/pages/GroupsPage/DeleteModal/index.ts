import { deleteGroupMutation } from '@entities/group';
import { IconKind } from '@shared/helpers';
import { createOperationModal } from '@widgets/OperationModal';

export const DeleteModal = createOperationModal({
  mutationFn: deleteGroupMutation,
  meta: (group) => ({
    icon: IconKind.DELETE_ILLUSTRATION,
    title: 'Удалить группу',
    description: `Вы действительно хотите удалить группу ${group.name}?`,
    actionText: 'Удалить',
  }),
});

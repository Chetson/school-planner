import type { GroupModel } from '@entities/group';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

export const getTitle = ({ name }: GroupModel) => name;

export const createDropdownItem = (
  group: GroupModel,
): DropdownRemoteItemType<number, GroupModel> => ({
  id: group.id,
  title: getTitle(group),
  value: group,
});

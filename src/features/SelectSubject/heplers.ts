import type { SubjectModel } from '@entities/subject';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

export const createDropdownItem = (
  subject: SubjectModel,
): DropdownRemoteItemType<number, SubjectModel> => ({
  id: subject.id,
  title: subject.name,
  value: subject,
});

export const getTitle = ({ name }: SubjectModel) => name;

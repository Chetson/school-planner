import type { StudentModel } from '@entities/user';
import type { DropdownItemType } from '@shared/ui';

export type StudentOption = DropdownItemType<number> & {
  student: StudentModel;
};

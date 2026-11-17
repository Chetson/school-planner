import { Role } from '@entities/user';

export enum TableAccessorKey {
  NAME = 'name',
  BIRTH_DATE = 'birth_date',
  ROLE = 'role',
  CITY = 'city',
  PHONE = 'phone',
  PASSWORD = 'password',
  UTILITY = 'utility',
}

export const CURATOR_ID = 'CURATOR';

export type DropdownRole = Role | typeof CURATOR_ID;

export const ROLE_NAMES: Record<DropdownRole, string> = {
  [Role.ADMIN]: 'Админ',
  [Role.TEACHER]: 'Учитель',
  [Role.STUDENT]: 'Ученик',
  [Role.PARENT]: 'Родитель',
  [CURATOR_ID]: 'Куратор',
};

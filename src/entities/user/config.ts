export enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  STUDENT = 'STUDENT',
}

export const ROLE_NAMES: Record<Role, string> = {
  [Role.ADMIN]: 'Админ',
  [Role.TEACHER]: 'Учитель',
  [Role.STUDENT]: 'Ученик',
  [Role.PARENT]: 'Родитель',
};

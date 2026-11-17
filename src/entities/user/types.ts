import type { Role } from './config';
import type { userBaseSchema, userSchema } from './schema';
import type { ClassBaseModel } from '@entities/class';
import type { CURATOR_ID } from '@pages/UsersPage';
import type {
  ApiError,
  ApiErrorKind,
  CommonApiError,
  FormFieldError,
  userNameSchema,
} from '@shared/helpers';
import type { ApiList } from '@shared/types';
import type { z } from 'zod';

export type UserName = z.infer<typeof userNameSchema>;

export type UserBaseModel = z.infer<typeof userBaseSchema>;

type UserModelRaw<R extends Role, E extends object | null = null> = {
  role: R;
  extra: E;
} & z.infer<typeof userSchema>;

export type TeacherExtra = {
  isCurator: boolean;
  curatedClasses: ClassBaseModel[];
};
export type StudentExtra = { currentClass?: ClassBaseModel | null };

export type AdminModel = UserModelRaw<Role.ADMIN>;
export type ParentModel = UserModelRaw<Role.PARENT>;
export type TeacherModel = UserModelRaw<Role.TEACHER, TeacherExtra>;
export type StudentModel = UserModelRaw<Role.STUDENT, StudentExtra>;

export type UserModel = TeacherModel | StudentModel | AdminModel | ParentModel;

export type UserModelsMap = {
  [Role.ADMIN]: AdminModel;
  [Role.PARENT]: ParentModel;
  [Role.STUDENT]: StudentModel;
  [Role.TEACHER]: TeacherModel;
  [CURATOR_ID]: TeacherModel;
};

export type UserListModel = ApiList<UserModel>;

export type CreateUserPayload = Pick<
  UserModel,
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'patronim'
  | 'birthDate'
  | 'city'
  | 'phoneNumber'
  | 'comment'
  | 'role'
>;

export type UpdateUserPayload = {
  id: number;
  data: Partial<
    Pick<
      UserModel,
      | 'email'
      | 'firstName'
      | 'lastName'
      | 'patronim'
      | 'birthDate'
      | 'city'
      | 'phoneNumber'
      | 'comment'
      | 'isBlocked'
    >
  >;
};

export type ValidationUserError = Partial<
  Record<keyof UserModel, FormFieldError[]>
>;

export type SaveUserError =
  | CommonApiError
  | ApiError<ApiErrorKind.VALIDATION, ValidationUserError[]>;

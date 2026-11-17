import type { UserModel } from '@entities/user';
import type { CommonApiError } from '@shared/helpers';
import type { Control, UseFormHandleSubmit } from 'react-hook-form';

export interface AuthFormData {
  email: string;
  password: string;
}

export interface AuthFormProps {
  onSubmit: UseFormHandleSubmit<AuthFormData, undefined>;
  control: Control<AuthFormData>;
  disabled: boolean;
}

export interface LoginApiParams {
  email: string;
  password: string;
}

export interface ResetPasswordApiParams {
  email: string;
}

export interface LoginApiResponse {
  profile: UserModel;
  tokens: {
    refresh: string;
    access: string;
  };
}

export type LoginApiError = CommonApiError;

export type ResetPasswordApiError = CommonApiError;

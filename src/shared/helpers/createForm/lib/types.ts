import type { FormFieldError } from '@shared/helpers';
import type { FormLayoutProps } from '@shared/ui';
import type { ReactElement } from 'react';
import type { ControllerRenderProps, DefaultValues } from 'react-hook-form';

export interface FormProps<FormData extends object>
  extends Omit<FormLayoutProps, 'onSubmit' | 'action'> {
  defaultValues?: DefaultValues<FormData>;
  errors?: Partial<Record<keyof FormData, FormFieldError[]>>;
  isLoading?: boolean;
  disabledFields?: (keyof FormData)[];
  onSubmit: (data: FormData) => void;
  onCancel?: VoidFunction;
}

export type RenderControlProps<Value> = {
  isError?: boolean;
  caption?: string;
  disabled?: boolean;
  required?: boolean;
  value?: Value;
} & Omit<ControllerRenderProps, 'value'>;

export type Control<Value> = (props: RenderControlProps<Value>) => ReactElement;

export type ControlConfig<Value> = {
  // В будущем добавим новые параметры отображения
  render: (props: RenderControlProps<Value>) => ReactElement;
};

export type ControlMap<T> = {
  [K in keyof T]: ControlConfig<T[K]> | Control<T[K]>;
};

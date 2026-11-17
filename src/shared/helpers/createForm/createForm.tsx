import { memo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormActions } from '@features/FormActions';
import { useApplyFormErrors } from '@shared/helpers';
import { FormLayout } from '@shared/ui';

import type { ControlMap, FormProps } from './lib/types';
import type { FieldPath } from 'react-hook-form';

export const createForm = <
  Schema extends z.ZodObject<z.ZodRawShape>,
  FormData extends z.infer<Schema>,
>(
  schema: Schema,
  controls: ControlMap<FormData>,
) => {
  const Form = ({
    defaultValues,
    errors,
    isLoading,
    onSubmit,
    onCancel,
    disabledFields = [],
    ...props
  }: FormProps<FormData>) => {
    const form = useForm<FormData>({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues: defaultValues,
    });

    const isDisableField = (fieldName: string) =>
      disabledFields.includes(fieldName);

    useApplyFormErrors(form.setError, errors);

    return (
      <FormProvider {...form}>
        <FormLayout
          {...props}
          onSubmit={form.handleSubmit(onSubmit)}
          action={<FormActions isLoading={isLoading} onCancel={onCancel} />}
        >
          {Object.keys(controls).map((name) => {
            const shape = schema.shape[name];
            const isOptional =
              shape instanceof z.ZodOptional || shape instanceof z.ZodNullable;

            const control = controls[name];
            const render =
              typeof control === 'function' ? control : control.render;

            return (
              <Controller
                key={name}
                name={name as FieldPath<FormData>}
                control={form.control}
                render={({ field, formState: { errors } }) => {
                  const error = errors[name];
                  const isError = Boolean(error);
                  const caption = error?.message ? String(error?.message) : '';

                  return render({
                    ...field,
                    isError,
                    caption,
                    disabled: isLoading || isDisableField(name),
                    required: !isOptional,
                  });
                }}
              />
            );
          })}
        </FormLayout>
      </FormProvider>
    );
  };

  return memo(Form) as typeof Form;
};

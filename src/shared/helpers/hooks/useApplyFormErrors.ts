import { useEffect } from 'react';

import { applyFormErrors } from '../forms';

import type { FormFieldError } from '../forms';
import type { UseFormSetError } from 'react-hook-form';

export const useApplyFormErrors = <Form extends Record<string, unknown>>(
  setError: UseFormSetError<Form>,
  errors?: Partial<Record<keyof Form, FormFieldError[]>> | null,
) =>
  useEffect(() => {
    if (errors) {
      applyFormErrors(setError, errors);
    }
  }, [errors]);

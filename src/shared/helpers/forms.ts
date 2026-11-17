import { subYears } from 'date-fns';

import type { Path, UseFormSetError } from 'react-hook-form';

export type FormFieldError = { message: string; code: string };

export const VALIDATION_ERRORS = {
  REQUIRED: 'Обязательное поле',
  EMAIL: 'Некорректный e-mail',
  PHONE: 'Некорректный номер',
  MAX: (count: number) => `Максимум ${count} символов`,
  MAX_COUNT: (count: number) => `Максимальное значение: ${count}`,
  MIN_COUNT: (count: number) => `Минимальное значение ${count}`,
  FIRST_NAME: 'Некорректное имя',
  LAST_NAME: 'Некорректная фамилия',
  PATRONIM: 'Некорректное отчество',
  BIRTH_DATE: 'Некорректная дата рождения',
  VALUE: 'Некорректное значение',
};

export const applyFormErrors = <Form extends Record<string, unknown>>(
  setError: UseFormSetError<Form>,
  errors?: Partial<Record<keyof Form, FormFieldError[]>> | null,
) => {
  if (!errors) return;

  Object.entries(errors).forEach(([key, errors]) => {
    const error = errors?.[0];

    if (error) {
      setError(
        key as Path<Form>,
        { type: error.code, message: error.message },
        { shouldFocus: true },
      );
    }
  });
};

/**
 * Функция для валидации ФИО.
 * Разрешены русские буквы, пробелы, дефисы, пустая строка.
 */
export const validateName = (value?: string) =>
  !value || /^[А-Яа-яЁё\s-]+$/.test(value);

/**
 * Функция для валидации даты рождения.
 * Разрешены даты не позднее чем 6 лет назад.
 */
export const validateBirthDate = (date?: Date | null) =>
  !date || date < subYears(new Date(), 6);

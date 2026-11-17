import { z } from 'zod';

import { validateName, VALIDATION_ERRORS } from './forms';

export const userNameSchema = z.object({
  firstName: z
    .string({ message: VALIDATION_ERRORS.REQUIRED })
    .min(1, VALIDATION_ERRORS.REQUIRED)
    .max(50, VALIDATION_ERRORS.MAX(50))
    .refine(validateName, { message: VALIDATION_ERRORS.FIRST_NAME }),
  lastName: z
    .string({ message: VALIDATION_ERRORS.REQUIRED })
    .min(1, VALIDATION_ERRORS.REQUIRED)
    .max(50, VALIDATION_ERRORS.MAX(50))
    .refine(validateName, { message: VALIDATION_ERRORS.LAST_NAME }),
  patronim: z
    .string()
    .max(50, VALIDATION_ERRORS.MAX(50))
    .refine(validateName, { message: VALIDATION_ERRORS.PATRONIM })
    .optional(),
});

export type UserName = z.infer<typeof userNameSchema>;

export const getLastNameAndInitials = ({
  firstName,
  lastName,
  patronim,
}: UserName) => {
  const nameArray = [lastName, `${firstName[0]}.`];

  if (patronim) {
    nameArray.push(`${patronim[0]}.`);
  }

  return nameArray.join(' ');
};

export const getFullName = ({ firstName, lastName, patronim }: UserName) => {
  const nameArray = [lastName, firstName];

  if (patronim) {
    nameArray.push(patronim);
  }

  return nameArray.join(' ');
};

/**
 * Имена учеников всегда отображаем как фамилия + имя
 */
export const getStudentName = ({ lastName, firstName }: UserName) =>
  getFullName({ lastName, firstName });

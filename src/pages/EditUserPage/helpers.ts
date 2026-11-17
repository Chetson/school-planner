import type { UserModel } from '@entities/user';

export const getDefaultFormValues = (user: UserModel) => ({
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  patronim: user.patronim || '',
  role: user.role || undefined,
  comment: user.comment || '',
  birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
  city: user.city || '',
  // Временное решение. Нужно придумать как
  // правильно форматировать номер, с учётом разных стран
  phoneNumber: user.phoneNumber ?? '',
});

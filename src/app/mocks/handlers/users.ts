import { HttpResponse, delay, http } from 'msw';

import { Role } from '@entities/user';
import { apiUrls } from '@shared/api';

import { EMAIL, MOCK_TOKEN } from '../config/auth';
import { USERS } from '../config/users';

import type { ResetPasswordApiParams } from '@widgets/AuthWidget/lib';

export default [
  http.post(apiUrls.USERS.RECOVER_PASSWORD, async ({ request }) => {
    const { email } = (await request.json()) as ResetPasswordApiParams;

    if (email === EMAIL) {
      return HttpResponse.json({});
    }

    return HttpResponse.json({ details: 'Не верный email' }, { status: 401 });
  }),
  http.get(apiUrls.USERS.CURRENT, async ({ request }) => {
    await delay(1000);

    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (token === MOCK_TOKEN) {
      return HttpResponse.json({
        first_name: 'first_name',
        last_name: 'last_name',
        id: 1,
        role: Role.ADMIN,
      });
    }

    return HttpResponse.json({ details: 'Не авторизован' }, { status: 401 });
  }),
  http.get(apiUrls.USERS.LIST({}), async () => {
    await delay(1000);

    return HttpResponse.json({
      count: 9999999999,
      results: USERS.map((user) => ({
        ...user,
        id: Math.floor(Math.random() * 10001),
      })),
    });
  }),
];

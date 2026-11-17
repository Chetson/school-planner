import { HttpResponse, http } from 'msw';

import { Role } from '@entities/user';
import { apiUrls } from '@shared/api';

import { EMAIL, MOCK_TOKEN, PASSWORD } from '../config/auth';

import type { LoginApiParams, LoginApiResponse } from '@widgets/AuthWidget/lib';

export default [
  http.post(apiUrls.JWT.CREATE, async ({ request }) => {
    const { password, email } = (await request.json()) as LoginApiParams;

    if (password === PASSWORD && email === EMAIL) {
      return HttpResponse.json({
        profile: {
          lastName: 'last_name',
          firstName: 'first_name',
          email: '',
          role: Role.ADMIN,
          id: 1,
          rawPassword: 'rawPassword',
          extra: null,
        },
        tokens: {
          refresh: MOCK_TOKEN,
          access: MOCK_TOKEN,
        },
      } satisfies LoginApiResponse);
    }

    return HttpResponse.json(
      { details: 'Не верный email или пароль' },
      { status: 401 },
    );
  }),
  http.post(apiUrls.JWT.REFRESH, async () => {
    return HttpResponse.json({ details: 'Не авторизован' }, { status: 401 });
  }),
];

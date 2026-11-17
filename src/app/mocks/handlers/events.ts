import { HttpResponse, delay, http } from 'msw';

import { apiUrls } from '@shared/api';

import { getEvents } from '../config/events';

export default [
  http.get(apiUrls.EVENTS.LIST({}), async ({ request }) => {
    await delay(1000);

    const url = new URL(request.url);
    const start = url.searchParams.get('start');
    const end = url.searchParams.get('end');

    const startDate = start ? new Date(start) : new Date();

    return HttpResponse.json({
      start: start,
      end: end,
      events: getEvents(startDate),
    });
  }),
];

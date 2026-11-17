import { HttpResponse, delay, http } from 'msw';

import { apiUrls } from '@shared/api';

import type { TimeslotsSettings } from '@entities/settings';

export default [
  http.get(apiUrls.SETTINGS.TIMESLOTS, async () => {
    await delay(1000);

    return HttpResponse.json({
      count: 8,
      results: [
        { id: Math.random(), startTime: '9:00', endTime: '9:40' },
        { id: Math.random(), startTime: '9:50', endTime: '10:30' },
        { id: Math.random(), startTime: '10:50', endTime: '11:30' },
        { id: Math.random(), startTime: '11:50', endTime: '12:30' },
        { id: Math.random(), startTime: '12:40', endTime: '13:20' },
        { id: Math.random(), startTime: '13:45', endTime: '14:25' },
        { id: Math.random(), startTime: '15:40', endTime: '16:20' },
        { id: Math.random(), startTime: '16:30', endTime: '18:00' },
      ],
    } satisfies TimeslotsSettings);
  }),
];

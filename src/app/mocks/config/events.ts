import { startOfWeek, addDays } from 'date-fns';

import { EventKind, EventPeriod } from '@entities/event';
import { DayOfWeek, parseDateToServerFormat } from '@shared/helpers';

import type { EventModel } from '@entities/event';

export const getDayOfWeek = (date: Date, day: DayOfWeek): string => {
  const monday = startOfWeek(date, { weekStartsOn: 1 });

  return parseDateToServerFormat(addDays(monday, day))!;
};

export const getEvents = (date: Date): EventModel[][] => [
  [
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.MONDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '09:00',
        endTime: '09:40',
      },
      group: {
        id: Math.random(),
        name: 'Зельеварение',
        subject: {
          id: Math.random(),
          name: 'Зельеварение',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.MONDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '09:50',
        endTime: '10:30',
      },
      group: {
        id: Math.random(),
        name: 'Заклинания',
        subject: {
          id: Math.random(),
          name: 'Заклинания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.MONDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '09:50',
        endTime: '10:30',
      },
      group: {
        id: Math.random(),
        name: 'Английски',
        subject: {
          id: Math.random(),
          name: 'Английски',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.MONDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '11:30',
      },
      group: {
        id: Math.random(),
        name: 'Физика',
        subject: {
          id: Math.random(),
          name: 'Физика',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.MONDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '11:30',
      },
      group: {
        id: Math.random(),
        name: 'Русский язык',
        subject: {
          id: Math.random(),
          name: 'Русский язык',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.MONDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '12:30',
      },
      group: {
        id: Math.random(),
        name: 'Трансфигурация',
        subject: {
          id: Math.random(),
          name: 'Трансфигурация',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.MONDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '12:40',
        endTime: '13:20',
      },
      group: {
        id: Math.random(),
        name: 'Зельеварение',
        subject: {
          id: Math.random(),
          name: 'Зельеварение',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.MONDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '13:45',
        endTime: '14:25',
      },
      group: {
        id: Math.random(),
        name: 'Заклинания',
        subject: {
          id: Math.random(),
          name: 'Заклинания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },

    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.MONDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '15:40',
        endTime: '16:20',
      },
      group: {
        id: Math.random(),
        name: 'Полёты на мётлах',
        subject: {
          id: Math.random(),
          name: 'Полёты на мётлах',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.MONDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '16:30',
        endTime: '18:00',
      },
      group: {
        id: Math.random(),
        name: 'История магии',
        subject: {
          id: Math.random(),
          name: 'История магии',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
  ],
  [
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.TUESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '09:00',
        endTime: '09:40',
      },
      group: {
        id: Math.random(),
        name: 'Защита от тёмных искусств',
        subject: {
          id: Math.random(),
          name: 'Защита от тёмных искусств',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.TUESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '9:50',
        endTime: '10:30',
      },
      group: {
        id: Math.random(),
        name: 'Заклинания',
        subject: {
          id: Math.random(),
          name: 'Заклинания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.TUESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '9:50',
        endTime: '10:30',
      },
      group: {
        id: Math.random(),
        name: 'Английски',
        subject: {
          id: Math.random(),
          name: 'Английски',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.TUESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '11:30',
      },
      group: {
        id: Math.random(),
        name: 'Физика',
        subject: {
          id: Math.random(),
          name: 'Физика',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.TUESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '11:30',
      },
      group: {
        id: Math.random(),
        name: 'Русский язык',
        subject: {
          id: Math.random(),
          name: 'Русский язык',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.TUESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '11:50',
        endTime: '12:30',
      },
      group: {
        id: Math.random(),
        name: 'Трансфигурация',
        subject: {
          id: Math.random(),
          name: 'Трансфигурация',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.TUESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '12:40',
        endTime: '13:20',
      },
      group: {
        id: Math.random(),
        name: 'Зельеварение',
        subject: {
          id: Math.random(),
          name: 'Зельеварение',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.TUESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '13:45',
        endTime: '14:25',
      },
      group: {
        id: Math.random(),
        name: 'Заклинания',
        subject: {
          id: Math.random(),
          name: 'Заклинания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },

    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.TUESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '15:40',
        endTime: '16:20',
      },
      group: {
        id: Math.random(),
        name: 'Полёты на мётлах',
        subject: {
          id: Math.random(),
          name: 'Полёты на мётлах',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },

    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.TUESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '16:30',
        endTime: '18:00',
      },
      group: {
        id: Math.random(),
        name: 'История магии',
        subject: {
          id: Math.random(),
          name: 'История магии',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
  ],
  [
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.WEDNESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '09:00',
        endTime: '09:40',
      },
      group: {
        id: Math.random(),
        name: 'Зельеварение',
        subject: {
          id: Math.random(),
          name: 'Зельеварение',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.WEDNESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '9:50',
        endTime: '10:30',
      },
      group: {
        id: Math.random(),
        name: 'Заклинания',
        subject: {
          id: Math.random(),
          name: 'Заклинания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.WEDNESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '9:50',
        endTime: '10:30',
      },
      group: {
        id: Math.random(),
        name: 'Прорицания',
        subject: {
          id: Math.random(),
          name: 'Прорицания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.WEDNESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '11:30',
      },
      group: {
        id: Math.random(),
        name: 'Физика',
        subject: {
          id: Math.random(),
          name: 'Физика',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.WEDNESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '11:30',
      },
      group: {
        id: Math.random(),
        name: 'Русский язык',
        subject: {
          id: Math.random(),
          name: 'Русский язык',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.WEDNESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '11:50',
        endTime: '12:30',
      },
      group: {
        id: Math.random(),
        name: 'Трансфигурация',
        subject: {
          id: Math.random(),
          name: 'Трансфигурация',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.WEDNESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '12:40',
        endTime: '13:20',
      },
      group: {
        id: Math.random(),
        name: 'Зельеварение',
        subject: {
          id: Math.random(),
          name: 'Зельеварение',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.WEDNESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '13:45',
        endTime: '14:25',
      },
      group: {
        id: Math.random(),
        name: 'Заклинания',
        subject: {
          id: Math.random(),
          name: 'Заклинания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },

    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.WEDNESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '15:40',
        endTime: '16:20',
      },
      group: {
        id: Math.random(),
        name: 'Полёты на мётлах',
        subject: {
          id: Math.random(),
          name: 'Полёты на мётлах',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },

    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.WEDNESDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '16:30',
        endTime: '18:00',
      },
      group: {
        id: Math.random(),
        name: 'История магии',
        subject: {
          id: Math.random(),
          name: 'История магии',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
  ],
  [
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.THURSDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '09:00',
        endTime: '09:40',
      },
      group: {
        id: Math.random(),
        name: 'Магловедение',
        subject: {
          id: Math.random(),
          name: 'Магловедение',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.THURSDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '9:50',
        endTime: '10:30',
      },
      group: {
        id: Math.random(),
        name: 'Заклинания',
        subject: {
          id: Math.random(),
          name: 'Заклинания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.THURSDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '9:50',
        endTime: '10:30',
      },
      group: {
        id: Math.random(),
        name: 'Прорицания',
        subject: {
          id: Math.random(),
          name: 'Прорицания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.THURSDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '11:30',
      },
      group: {
        id: Math.random(),
        name: 'Физика',
        subject: {
          id: Math.random(),
          name: 'Физика',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.THURSDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '11:30',
      },
      group: {
        id: Math.random(),
        name: 'Русский язык',
        subject: {
          id: Math.random(),
          name: 'Русский язык',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.THURSDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '11:50',
        endTime: '12:30',
      },
      group: {
        id: Math.random(),
        name: 'Трансфигурация',
        subject: {
          id: Math.random(),
          name: 'Трансфигурация',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.THURSDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '12:40',
        endTime: '13:20',
      },
      group: {
        id: Math.random(),
        name: 'Зельеварение',
        subject: {
          id: Math.random(),
          name: 'Зельеварение',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.THURSDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '13:45',
        endTime: '14:25',
      },
      group: {
        id: Math.random(),
        name: 'Заклинания',
        subject: {
          id: Math.random(),
          name: 'Заклинания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },

    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.THURSDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '15:40',
        endTime: '16:20',
      },
      group: {
        id: Math.random(),
        name: 'Полёты на мётлах',
        subject: {
          id: Math.random(),
          name: 'Полёты на мётлах',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },

    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.THURSDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '16:30',
        endTime: '18:00',
      },
      group: {
        id: Math.random(),
        name: 'История магии',
        subject: {
          id: Math.random(),
          name: 'История магии',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
  ],
  [
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.FRIDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '09:00',
        endTime: '09:40',
      },
      group: {
        id: Math.random(),
        name: 'Трансфигурация',
        subject: {
          id: Math.random(),
          name: 'Трансфигурация',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.FRIDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '9:50',
        endTime: '10:30',
      },
      group: {
        id: Math.random(),
        name: 'Зельеварение',
        subject: {
          id: Math.random(),
          name: 'Зельеварение',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.FRIDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '9:50',
        endTime: '10:30',
      },
      group: {
        id: Math.random(),
        name: 'Прорицания',
        subject: {
          id: Math.random(),
          name: 'Прорицания',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.FRIDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '11:30',
      },
      group: {
        id: Math.random(),
        name: 'Химия',
        subject: {
          id: Math.random(),
          name: 'Химия',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.FRIDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '10:50',
        endTime: '11:30',
      },
      group: {
        id: Math.random(),
        name: 'Русский язык',
        subject: {
          id: Math.random(),
          name: 'Русский язык',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.FRIDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '11:50',
        endTime: '12:30',
      },
      group: {
        id: Math.random(),
        name: 'Трансфигурация',
        subject: {
          id: Math.random(),
          name: 'Трансфигурация',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.FACULTY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.FRIDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '12:40',
        endTime: '13:20',
      },
      group: {
        id: Math.random(),
        name: 'Защита от тёмных искусств',
        subject: {
          id: Math.random(),
          name: 'Защита от тёмных искусств',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.FRIDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '13:45',
        endTime: '14:25',
      },
      group: {
        id: Math.random(),
        name: 'История магии',
        subject: {
          id: Math.random(),
          name: 'История магии',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },

    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.FRIDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '15:40',
        endTime: '16:20',
      },
      group: {
        id: Math.random(),
        name: 'Полёты на мётлах',
        subject: {
          id: Math.random(),
          name: 'Полёты на мётлах',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },

    {
      id: Math.random(),
      isGroupEvent: false,
      eventType: EventKind.MANDATORY,
      period: EventPeriod.MONTHLY,
      eventDate: getDayOfWeek(date, DayOfWeek.FRIDAY),
      dateStart: '',
      dateEnd: '',
      timeslot: {
        id: Math.random(),
        startTime: '16:30',
        endTime: '18:00',
      },
      group: {
        id: Math.random(),
        name: 'История магии',
        subject: {
          id: Math.random(),
          name: 'История магии',
        },
        room: {
          roomName: '101',
          id: Math.random(),
        },
        teacher: {
          id: Math.random(),
          firstName: 'Иван',
          lastName: 'Иванов',
          patronim: 'Иванович',
        },
      },
    },
  ],
];

import { createColumnHelper } from '@tanstack/react-table';

import { DayOfWeek } from '@shared/helpers';

import { TableAccessorKey } from './types';
import { DayOfWeekHeader } from '../ui/DayOfWeekHeader';
import { EventsCell } from '../ui/EventsCell';
import { ShiftPeriodCell } from '../ui/ShiftPeriodCell';
import { TimeCell } from '../ui/TimeCell';

import type { TimeslotInfoModel } from '@entities/settings';

const columnHelper = createColumnHelper<TimeslotInfoModel>();

const getEventsAccessor =
  (day: DayOfWeek) =>
  // eslint-disable-next-line
  (row: TimeslotInfoModel) => <EventsCell row={row} day={day} />;

export const SCHEDULE_COLUMNS = [
  columnHelper.accessor((row) => <TimeCell {...row} />, {
    id: TableAccessorKey.TIME,
    header: () => (
      <div className="px-2 py-1 min-w-15 text-text-secondary relative top-0.5">
        <sup>№/ </sup>Время
      </div>
    ),
    size: 85,
    cell: (info) => (
      <TimeCell {...info.getValue().props} index={info.row.index} />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor(getEventsAccessor(DayOfWeek.MONDAY), {
    id: TableAccessorKey.MONDAY,
    header: () => <DayOfWeekHeader day={DayOfWeek.MONDAY} />,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),
  columnHelper.accessor(getEventsAccessor(DayOfWeek.TUESDAY), {
    id: TableAccessorKey.TUESDAY,
    header: () => <DayOfWeekHeader day={DayOfWeek.TUESDAY} />,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),
  columnHelper.accessor(getEventsAccessor(DayOfWeek.WEDNESDAY), {
    id: TableAccessorKey.WEDNESDAY,
    header: () => <DayOfWeekHeader day={DayOfWeek.WEDNESDAY} />,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),
  columnHelper.accessor(getEventsAccessor(DayOfWeek.THURSDAY), {
    id: TableAccessorKey.THURSDAY,
    header: () => <DayOfWeekHeader day={DayOfWeek.THURSDAY} />,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),
  columnHelper.accessor(getEventsAccessor(DayOfWeek.FRIDAY), {
    id: TableAccessorKey.FRIDAY,
    header: () => <DayOfWeekHeader day={DayOfWeek.FRIDAY} />,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),
  columnHelper.accessor(getEventsAccessor(DayOfWeek.SATURDAY), {
    id: TableAccessorKey.SATURDAY,
    header: () => <DayOfWeekHeader day={DayOfWeek.SATURDAY} />,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),
  columnHelper.accessor(getEventsAccessor(DayOfWeek.SUNDAY), {
    id: TableAccessorKey.SUNDAY,
    header: () => <DayOfWeekHeader day={DayOfWeek.SUNDAY} />,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),
  columnHelper.accessor(() => null, {
    id: TableAccessorKey.ACTIONS,
    header: () => <ShiftPeriodCell />,
    size: 52,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),
];

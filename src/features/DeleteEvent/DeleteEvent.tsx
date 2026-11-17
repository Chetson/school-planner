import { forwardRef, memo, useState } from 'react';

import {
  CONFIRM_CHANGE_OPTIONS,
  useDeleteEvent,
  EventChangeKind,
  EventPeriod,
} from '@entities/event';
import {
  getTimeslotRange,
  IconKind,
  parseDateToFrontFormat,
} from '@shared/helpers';
import { Button, ErrorStub, RadioGroup, VerticalTemplate } from '@shared/ui';

import type { EventModel } from '@entities/event';
import type { ForwardRefRenderFunction } from 'react';

export interface DeleteEventProps {
  event?: EventModel | null;
  onCancel?: VoidFunction;
  onSuccess?: VoidFunction;
}

export const DeleteEvent: ForwardRefRenderFunction<
  HTMLButtonElement,
  DeleteEventProps
> = ({ event, onCancel, onSuccess }: DeleteEventProps, targetButtonRef) => {
  const [eventKind, setEventKind] = useState(EventChangeKind.SINGLE);
  const { mutate, isPending, isError, error } = useDeleteEvent({ onSuccess });

  const handleDeleteEvent = () => {
    if (event) {
      mutate({
        id: event.id,
        data: {
          isPermanent: eventKind === EventChangeKind.PERMANENT,
          eventDate: event.eventDate,
        },
      });
    }
  };

  const handleChangeKind = (kind: EventChangeKind | null) =>
    kind && setEventKind(kind);

  if (!event) return null;

  if (isError)
    return (
      <ErrorStub onClick={onCancel} title={error.detail} buttonText="Закрыть" />
    );

  return (
    <VerticalTemplate
      icon={IconKind.DELETE_ILLUSTRATION}
      title="Удалить событие"
      description={
        <>
          Вы действительно хотите удалить событие
          <br />
          {parseDateToFrontFormat(event?.eventDate)} в{' '}
          {getTimeslotRange(event.timeslot.startTime, event.timeslot.endTime)}{' '}
          {event?.group?.subject?.name}?
        </>
      }
    >
      <div className="flex flex-col w-full gap-8">
        {event.period !== EventPeriod.UNIQUE && (
          <RadioGroup
            data={CONFIRM_CHANGE_OPTIONS}
            value={eventKind}
            onChange={handleChangeKind}
            isInline={true}
          />
        )}
        <div className="flex gap-4">
          <Button disabled={isPending} variant="tertiary" onClick={onCancel}>
            Отменить
          </Button>
          <Button
            ref={targetButtonRef}
            isLoading={isPending}
            variant="destructive"
            onClick={handleDeleteEvent}
            className="capitalize"
          >
            Удалить
          </Button>
        </div>
      </div>
    </VerticalTemplate>
  );
};

export default memo(forwardRef(DeleteEvent));

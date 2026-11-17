import { useCallback, useMemo, useState } from 'react';

import { isSameDay } from 'date-fns';

import { EventPeriod, useUpdateEvent, EventChangeKind } from '@entities/event';
import { ConfirmEventForm } from '@features/ConfirmEventForm';
import { EventGroupForm } from '@features/EventForm';
import { EventClassForm } from '@features/EventForm';
import {
  ApiErrorKind,
  parseDateToServerFormat,
  useGoBack,
  useToggle,
} from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub, withModal } from '@shared/ui';

import { prepareDefaultValues } from './lib/helpers';

import type { EventModel } from '@entities/event';
import type { ConfirmChangeFormData } from '@features/ConfirmEventForm';
import type { EventFormData } from '@features/EventForm/lib';
import type { FC } from 'react';

export interface EditEventFormProps {
  event: EventModel;
}

const ConfirmChangeModal = withModal(ConfirmEventForm);

export const EditEventForm: FC<EditEventFormProps> = ({ event }) => {
  const [formData, setFormData] = useState<EventFormData | null>(null);
  const [modalOpen, { open, close, setOpened }] = useToggle();

  const { mutate, isPending, isSuccess, error } = useUpdateEvent();

  const goBack = useGoBack();

  const handleMutate = useCallback(
    (data: EventFormData, isPermanent: boolean) => {
      const dateStart = parseDateToServerFormat(data.range.from);
      const dateEnd = parseDateToServerFormat(data.range.to);

      if (dateStart && dateEnd) {
        const requestObject = {
          isPermanent,
          eventDate: event.eventDate,
          period: data.period ?? EventPeriod.UNIQUE,
          eventType: data.eventType,
          timeslotId: data.timeslot.id,
          comment: data.comment,
          dateStart,
          dateEnd,
        };

        if ('group' in data) {
          mutate({
            id: event.id,
            data: {
              ...requestObject,
              data: {
                groupId: data?.group?.id,
              },
            },
          });
        } else {
          mutate({
            id: event.id,
            data: {
              ...requestObject,
              data: {
                roomId: data?.room?.id,
                teacherId: data?.teacher?.id,
                classId: data?.groupClass?.id,
                subjectId: data?.subject?.id,
              },
            },
          });
        }
      }
    },
    [mutate, event],
  );

  const handleSumbitConfirmForm = useCallback(
    ({ changeType }: ConfirmChangeFormData) => {
      if (formData) {
        handleMutate(formData, changeType === EventChangeKind.PERMANENT);
      }
      close();
    },
    [handleMutate, close, formData],
  );

  const handleSubmitEventForm = useCallback(
    (data: EventFormData) => {
      if (
        event.period !== EventPeriod.UNIQUE &&
        data.period === event.period &&
        isSameDay(data.range.from, new Date(event.dateStart)) &&
        isSameDay(data.range.to, new Date(event.dateEnd))
      ) {
        setFormData(data);
        open();
      } else {
        handleMutate(data, true);
      }
    },
    [event, open, handleMutate],
  );

  const eventFormDefaultValues = useMemo(
    () => prepareDefaultValues(event),
    [event],
  );
  const confirmChangeDefaultValues = useMemo(
    () => ({ changeType: EventChangeKind.SINGLE }),
    [],
  );

  if (isSuccess) {
    return (
      // TODO Убрать. Отображать тост при успешном обновлении
      <SuccessStub
        description="Событие обновлёно"
        buttonText="К расписанию"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub />;
  }

  const eventFormProps = {
    title: 'Редактирование события',
    onSubmit: handleSubmitEventForm,
    isLoading: isPending,
    defaultValues: eventFormDefaultValues,
    errors: error?.detail,
    onCancel: goBack,
  };

  return (
    <>
      <ConfirmChangeModal
        className="max-w-2xl"
        title="Изменение события"
        defaultValues={confirmChangeDefaultValues}
        open={modalOpen}
        onOpenChange={setOpened}
        onCancel={close}
        onSubmit={handleSumbitConfirmForm}
      />
      <PageLayout className="h-full overflow-hidden">
        {event?.isGroupEvent ? (
          <EventGroupForm {...eventFormProps} />
        ) : (
          <EventClassForm {...eventFormProps} />
        )}
      </PageLayout>
    </>
  );
};

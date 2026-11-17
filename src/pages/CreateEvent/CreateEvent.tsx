import { EventPeriod, useCreateEvent } from '@entities/event';
import { Role } from '@entities/user';
import { EventForm } from '@features/EventForm';
import { withRoleAccess } from '@features/withRoleAccess';
import {
  ApiErrorKind,
  parseDateToServerFormat,
  useGoBack,
  useQueryParams,
} from '@shared/helpers';
import { ErrorStub, PageLayout } from '@shared/ui';
import { SuccessStub } from '@shared/ui';

import { defaultValues } from './lib/config';

import type { EventFormData } from '@features/EventForm/lib';
import type { TabItem } from '@shared/ui/Tabs';
import type { FC } from 'react';

const CreateEventPage: FC = () => {
  const { mutate, isPending, isSuccess, error, reset } = useCreateEvent();
  const goBack = useGoBack();
  const { setQueryParams, removeQueryParams } = useQueryParams();

  const handleChangeTab = (activeTab: TabItem<string>) => {
    if (activeTab.id === 'class') {
      setQueryParams({ isGroupEvent: ['true'] });
    } else {
      removeQueryParams('isGroupEvent');
    }
  };

  const handleSubmit = (data: EventFormData) => {
    const dateStart = parseDateToServerFormat(data.range.from);
    const dateEnd = parseDateToServerFormat(data.range.to);

    if (dateStart && dateEnd) {
      const requestObject = {
        period: data.period ?? EventPeriod.UNIQUE,
        eventType: data.eventType,
        timeslotId: data.timeslot.id,
        comment: data.comment,
        dateStart,
        dateEnd,
      };

      if ('group' in data) {
        mutate({
          ...requestObject,
          data: {
            groupId: data?.group?.id,
          },
        });
      } else {
        mutate({
          ...requestObject,
          data: {
            roomId: data?.room?.id,
            teacherId: data?.teacher?.id,
            classId: data?.groupClass?.id,
            subjectId: data?.subject?.id,
          },
        });
      }
    }
  };

  if (isSuccess) {
    return (
      <SuccessStub
        description="Событие добавлено!"
        buttonText="К расписанию"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub onClick={reset} />;
  }

  return (
    <PageLayout className="h-full overflow-hidden">
      <EventForm
        title="Новое событие"
        isLoading={isPending}
        onSubmit={handleSubmit}
        errors={error?.detail}
        defaultValues={defaultValues}
        onChangeTab={handleChangeTab}
      />
    </PageLayout>
  );
};

export default withRoleAccess(CreateEventPage)(Role.ADMIN);

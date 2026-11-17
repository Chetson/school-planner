import { useQueryParams } from '@shared/helpers';
import { Typography } from '@shared/ui';
import { Tabs } from '@shared/ui/Tabs';

import { EventClassForm } from './features/EventClassForm';
import { EventGroupForm } from './features/EventGroupForm';

import type { EventFormData } from '@features/EventForm/lib';
import type { FormProps } from '@shared/helpers';
import type { TabItem } from '@shared/ui/Tabs';
import type { FC } from 'react';

export const EventForm: FC<
  FormProps<EventFormData> & { onChangeTab?: (newTab: TabItem<string>) => void }
> = ({ title, onChangeTab, ...props }) => {
  const {
    queryParams: { isGroupEvent: isGroupEventQueryFlag = false },
  } = useQueryParams();
  const isGroupEvent = Boolean(isGroupEventQueryFlag);

  const eventTabs = [
    {
      id: 'group',
      title: 'Для группы',
      content: <EventGroupForm {...props} />,
    },
    {
      id: 'class',
      title: 'Для класса',
      content: <EventClassForm {...props} />,
    },
  ];

  return (
    <>
      <Typography variant="h2" className="leading-none">
        {title}
      </Typography>
      <Tabs
        className="pt-4 overflow-auto"
        active={isGroupEvent ? eventTabs[1] : eventTabs[0]}
        onChange={onChangeTab}
        tabs={eventTabs}
      />
    </>
  );
};

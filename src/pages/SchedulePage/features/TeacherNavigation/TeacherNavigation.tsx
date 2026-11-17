import { memo } from 'react';

import qs from 'query-string';
import { useLocation } from 'react-router-dom';

import {
  ScheduleTeacherView,
  useScheduleTeacherView,
} from '@pages/SchedulePage/lib';
import { withQueryString } from '@shared/helpers';
import { Navigation } from '@shared/ui';

import type { TeacherModel } from '@entities/user';
import type { FC } from 'react';
import type { Location } from 'react-router-dom';

export type TeacherNavigation = {
  teacher: TeacherModel;
};

const createTabLink = (location: Location, view: ScheduleTeacherView) => {
  const queryParams = qs.parse(location.search);

  return withQueryString(location.pathname, { ...queryParams, view });
};

const TeacherNavigation: FC<TeacherNavigation> = ({ teacher }) => {
  const view = useScheduleTeacherView();
  const location = useLocation();

  const { isCurator, curatedClasses } = teacher.extra;

  return (
    <Navigation>
      <Navigation.Tab
        to={createTabLink(location, ScheduleTeacherView.MY_SCHEDULE)}
        isActive={view === ScheduleTeacherView.MY_SCHEDULE}
      >
        Мое расписание
      </Navigation.Tab>
      <Navigation.Tab
        to={createTabLink(location, ScheduleTeacherView.COMMON_SCHEDULE)}
        isActive={view === ScheduleTeacherView.COMMON_SCHEDULE}
      >
        Общее расписание
      </Navigation.Tab>
      {isCurator && Boolean(curatedClasses.length) && (
        <Navigation.Tab
          to={createTabLink(
            location,
            ScheduleTeacherView.CURATED_CLASSES_SCHEDULE,
          )}
          isActive={view === ScheduleTeacherView.CURATED_CLASSES_SCHEDULE}
        >
          {`Расписание ${curatedClasses[0].className}`}
        </Navigation.Tab>
      )}
    </Navigation>
  );
};

export default memo(TeacherNavigation);

import qs from 'query-string';
import { useLocation } from 'react-router-dom';

import { Role } from '@entities/user';
import { AccessRole } from '@features/AccessRole';
import { PAGES, withQueryString } from '@shared/helpers';
import { Navigation } from '@shared/ui';

import { useGradebookTeacherView, GradebookTeacherView } from './lib';

import type { Location } from 'react-router-dom';

export const createTeacherLink = (
  location: Location,
  view: GradebookTeacherView,
) => {
  const queryParams = qs.parse(location.search);

  return withQueryString(PAGES.JOURNAL_DETAILS.mask, { ...queryParams, view });
};

export const GradebookNavigation = () => {
  const view = useGradebookTeacherView();
  const location = useLocation();

  return (
    <Navigation>
      <AccessRole role={[Role.ADMIN, Role.PARENT, Role.STUDENT]}>
        <Navigation.Tab to={PAGES.JOURNAL_DETAILS.mask}>
          {PAGES.JOURNAL_DETAILS.title}
        </Navigation.Tab>
      </AccessRole>

      <AccessRole role={Role.ADMIN}>
        <Navigation.Tab to={PAGES.ACTIVITIES.mask}>
          {PAGES.ACTIVITIES.title}
        </Navigation.Tab>
      </AccessRole>
      <AccessRole role={Role.TEACHER}>
        {(teacher) => (
          <>
            <Navigation.Tab
              to={createTeacherLink(
                location,
                GradebookTeacherView.COMMON_GRADEBOOK,
              )}
              isActive={view === GradebookTeacherView.COMMON_GRADEBOOK}
            >
              Общий Журнал
            </Navigation.Tab>
            {teacher.extra.curatedClasses.length ? (
              <Navigation.Tab
                to={createTeacherLink(
                  location,
                  GradebookTeacherView.CURATED_CLASS_GRATEBOOK,
                )}
                isActive={view === GradebookTeacherView.CURATED_CLASS_GRATEBOOK}
              >
                Журнал {teacher.extra.curatedClasses[0].className}
              </Navigation.Tab>
            ) : null}
          </>
        )}
      </AccessRole>
      <AccessRole role={[Role.ADMIN, Role.TEACHER]}>
        <Navigation.Tab to={PAGES.THEMES.mask}>
          {PAGES.THEMES.title}
        </Navigation.Tab>
      </AccessRole>
    </Navigation>
  );
};

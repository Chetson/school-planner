import { useCallback, useMemo } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  GRADEBOOK_QUERY_KEYS,
  gradebookStudentsQueryFn,
} from '@entities/gradebook';
import { useClassFilter } from '@features/ClassFilter';
import { Gradebook } from '@features/Gradebook';
import { useQuarterFilter } from '@features/QuarterFilter/lib';
import { useSubjectFilter } from '@features/SubjectFilter';
import { ErrorStub, NotFoundStub, PageSpinner } from '@shared/ui';

import {
  getDeleteActivity,
  getModifyActivity,
  getModifyGrade,
  getModifyPresence,
  getModifyTheme,
} from '../../lib';

import type { GradebookModifier } from '../../lib';
import type {
  DeleteActivityType,
  ModifyActivityType,
  ModifyGradeType,
  ModifyPresenceType,
  ModifyThemeType,
} from '@features/Gradebook';

export const CommonGradebook = () => {
  const [cls] = useClassFilter();
  const [subject] = useSubjectFilter();

  const queryClient = useQueryClient();

  const { quarterRange } = useQuarterFilter();

  const queryKey = useMemo(
    () =>
      GRADEBOOK_QUERY_KEYS({
        from: quarterRange?.from,
        to: quarterRange?.to,
        classId: cls?.id,
        subjectId: subject?.id,
      }),
    [quarterRange, cls, subject],
  );

  const { data, isFetching, isError, isFetched } = useQuery({
    queryFn: gradebookStudentsQueryFn,
    enabled: Boolean(cls && subject && quarterRange),
    queryKey,
    structuralSharing: false,
  });

  const setQueryData = useCallback(
    (updater: GradebookModifier) => queryClient.setQueryData(queryKey, updater),
    [queryKey, queryClient],
  );

  const modifyActivity: ModifyActivityType = useCallback(
    (lessonId, activity) => setQueryData(getModifyActivity(lessonId, activity)),
    [setQueryData],
  );

  const deleteActivity: DeleteActivityType = useCallback(
    (lessonId, activityId) =>
      setQueryData(getDeleteActivity(lessonId, activityId)),
    [setQueryData],
  );

  const modifyGrade: ModifyGradeType = useCallback(
    (payload) => setQueryData(getModifyGrade(payload)),
    [setQueryData],
  );
  const modifyTheme: ModifyThemeType = useCallback(
    (payload) => setQueryData(getModifyTheme(payload)),
    [setQueryData],
  );

  const modifyPresence: ModifyPresenceType = useCallback(
    (payload) => setQueryData(getModifyPresence(payload)),
    [setQueryData],
  );

  if (isFetching) {
    return <PageSpinner />;
  }

  if (isError) {
    return <ErrorStub />;
  }

  if (
    (!data || !data.dates.length || !data.dates[0].studentList.length) &&
    isFetched
  ) {
    return <NotFoundStub />;
  }

  if (data) {
    return (
      <Gradebook.StudentList
        data={data}
        cls={cls}
        modifyActivity={modifyActivity}
        deleteActivity={deleteActivity}
        modifyGrade={modifyGrade}
        modifyTheme={modifyTheme}
        modifyPresence={modifyPresence}
      />
    );
  }

  return null;
};

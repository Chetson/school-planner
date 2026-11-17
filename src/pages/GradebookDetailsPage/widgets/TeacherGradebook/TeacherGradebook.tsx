import { useCallback, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { Role, USERS_LIST_QUERY_KEYS, usersQueryFn } from '@entities/user';
import {
  GradebookTeacherView,
  useGradebookTeacherView,
} from '@features/GradebookNavigation';
import { useQueryParams } from '@shared/helpers';
import { PageSpinner } from '@shared/ui';

import { CommonGradebook } from '../CommonGradebook';
import { StudentGradebook } from '../StudentGradebook';

import type { StudentModel, TeacherModel } from '@entities/user';
import type { FC } from 'react';

export type TeacherGradebookProps = {
  teacher: TeacherModel;
};

const schema = z.object({
  userId: z
    .array(
      z
        .string()
        .optional()
        .transform((value) => Number(value)),
    )
    .pipe(z.array(z.number().optional())),
});

export const TeacherGradebook: FC<TeacherGradebookProps> = ({ teacher }) => {
  const view = useGradebookTeacherView();

  const [curatedClass] = teacher.extra.curatedClasses ?? [];

  const { queryParams, setQueryParams } = useQueryParams(schema);

  const [userId] = queryParams.userId || [];

  const isCuratedClassVew =
    view === GradebookTeacherView.CURATED_CLASS_GRATEBOOK;

  const { data, isLoading } = useQuery({
    queryFn: usersQueryFn,
    staleTime: Infinity,
    enabled: isCuratedClassVew && !!curatedClass,
    queryKey: USERS_LIST_QUERY_KEYS({
      role: [Role.STUDENT],
      currentClassId: curatedClass?.id,
    }),
  });

  const setStudent = useCallback(
    (student: StudentModel) => setQueryParams({ userId: String(student.id) }),
    [setQueryParams],
  );

  const studentList = useMemo(
    () => (data?.results || []) as StudentModel[],
    [data],
  );

  const student = useMemo(() => {
    if (studentList.length) {
      const student = studentList.find(({ id }) => id === userId);

      return student ?? studentList[0];
    }
  }, [studentList, userId]);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (curatedClass && isCuratedClassVew && student) {
    return (
      <StudentGradebook
        student={student}
        studentList={studentList}
        onSelectStudent={setStudent}
      />
    );
  }

  return <CommonGradebook />;
};

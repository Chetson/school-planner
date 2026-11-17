import { useQuery } from '@tanstack/react-query';

import {
  GRADEBOOK_QUERY_KEYS,
  gradebookSubjectsQueryFn,
} from '@entities/gradebook';
import { Gradebook } from '@features/Gradebook';
import { useQuarterFilter } from '@features/QuarterFilter/lib';
import { ErrorStub, NotFoundStub, PageSpinner } from '@shared/ui';

import type { StudentModel } from '@entities/user';
import type { FC } from 'react';

export type StudentGradebookProps = {
  student: StudentModel;
  studentList?: StudentModel[];
  onSelectStudent?: (student: StudentModel) => void;
};

export const StudentGradebook: FC<StudentGradebookProps> = ({
  student,
  studentList,
  onSelectStudent,
}) => {
  const { quarterRange } = useQuarterFilter();

  const { data, isFetching, isError, isFetched } = useQuery({
    queryFn: gradebookSubjectsQueryFn,
    enabled: Boolean(quarterRange),
    queryKey: GRADEBOOK_QUERY_KEYS({
      from: quarterRange?.from,
      to: quarterRange?.to,
      studentId: student.id,
    }),
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (isError) {
    return <ErrorStub />;
  }

  if (
    (!data || !data.dates.length || !data.dates[0].subjectList.length) &&
    isFetched
  ) {
    return <NotFoundStub />;
  }

  if (data) {
    return (
      <Gradebook.SubjectList
        studentList={studentList}
        onSelectStudent={onSelectStudent}
        student={student}
        data={data}
      />
    );
  }

  return null;
};

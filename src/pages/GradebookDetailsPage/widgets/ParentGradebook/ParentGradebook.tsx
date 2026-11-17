import { useLayoutEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Role, USERS_LIST_QUERY_KEYS, usersQueryFn } from '@entities/user';
import { ErrorStub, PageSpinner } from '@shared/ui';

import { StudentGradebook } from '../StudentGradebook';

import type { ParentModel, StudentModel } from '@entities/user';
import type { FC } from 'react';

type ParentGradebookProps = {
  parent: ParentModel;
};

export const ParentGradebook: FC<ParentGradebookProps> = ({ parent }) => {
  const [currentChild, setCurrentChild] = useState<StudentModel | null>(null);

  const { data, isPending, isError, refetch } = useQuery({
    queryFn: usersQueryFn,
    staleTime: Infinity,
    queryKey: USERS_LIST_QUERY_KEYS({
      role: [Role.STUDENT],
      parentId: parent.id,
    }),
  });

  useLayoutEffect(() => {
    if (data) {
      setCurrentChild((data.results[1] as StudentModel) ?? null);
    }
  }, [data]);

  if (isPending) {
    return <PageSpinner />;
  }

  if (isError) {
    return <ErrorStub onClick={refetch} />;
  }

  if (currentChild) {
    return (
      <StudentGradebook
        student={currentChild}
        studentList={(data?.results ?? []) as StudentModel[]}
        onSelectStudent={setCurrentChild}
      />
    );
  }

  return null;
};

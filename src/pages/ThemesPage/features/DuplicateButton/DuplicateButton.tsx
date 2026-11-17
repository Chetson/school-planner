import { useMemo } from 'react';

import { Link } from 'react-router-dom';

import { THEMES_QUERY_KEYS, useThemes } from '@entities/theme';
import { useClassFilter } from '@features/ClassFilter';
import { useSubjectFilter } from '@features/SubjectFilter';
import { PAGES, withQueryString } from '@shared/helpers';
import { Button } from '@shared/ui';

export const DuplicateButton = () => {
  const [cls] = useClassFilter();
  const [subject] = useSubjectFilter();

  const queryKey = useMemo(
    () =>
      THEMES_QUERY_KEYS({
        classId: cls?.id,
        subjectId: subject?.id,
      }),
    [subject?.id, cls?.id],
  );

  const { isSuccess, isFetched, data } = useThemes(queryKey, false);

  const params = useMemo(
    () => ({
      cls: JSON.stringify(cls),
      subject: JSON.stringify(subject),
    }),
    [cls, subject],
  );

  if (subject && cls && isSuccess && isFetched && data?.pages?.[0]?.count) {
    return (
      <Link to={withQueryString(PAGES.DUPLICATE_THEMES.mask, params)}>
        <Button variant="blank">Дублировать</Button>
      </Link>
    );
  }

  return null;
};

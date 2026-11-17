import { memo } from 'react';

import { Link } from 'react-router-dom';

import { IconKind, useBreadcrumb } from '@shared/helpers';
import { Icon, Typography } from '@shared/ui';

const Breadcrumbs = () => {
  const { href, title } = useBreadcrumb();

  if (!href) return null;

  return (
    <Link to={href} className="inline-flex gap-2 mb-8">
      <Icon kind={IconKind.ARROW_DOWN} className="rotate-[90deg]" />

      <Typography className="leading-6 self-end" variant="accent2">
        {title}
      </Typography>
    </Link>
  );
};

export default memo(Breadcrumbs);

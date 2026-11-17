import { useLocation, useMatches } from 'react-router-dom';

import type { Breadcrumb } from '@shared/helpers';
import type { RouteObject } from 'react-router-dom';

export const useBreadcrumb = (): Breadcrumb => {
  const location = useLocation();
  const matches: RouteObject[] = useMatches();

  const defaultCrumb: Breadcrumb | undefined =
    matches.findLast((match) => match.handle?.crumb)?.handle?.crumb ?? {};

  const crumb: Breadcrumb | undefined = location.state?.crumb;

  return {
    title: crumb?.title ?? defaultCrumb?.title,
    href: crumb?.href ?? defaultCrumb?.href,
  };
};

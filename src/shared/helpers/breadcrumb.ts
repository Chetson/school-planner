import type { Location } from 'react-router-dom';

export interface Breadcrumb {
  href?: string;
  title?: string;
}

export const createBreadcrumb = ({
  pathname,
  title,
}: Location & { title?: string }): Breadcrumb => ({
  href: pathname,
  title,
});

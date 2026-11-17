import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useBreadcrumb } from './useBreadcrumb';

export const useGoBack = () => {
  const { href } = useBreadcrumb();
  const navigate = useNavigate();

  return useCallback(() => {
    if (href) {
      navigate(href);
    } else {
      navigate(-1);
    }
  }, [href, navigate]);
};

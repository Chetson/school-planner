import { IconKind, text } from '@shared/helpers';
import { PageLayout } from '@shared/ui';
import { Typography } from '@shared/ui';

import { Button } from '../../Button';
import { Icon } from '../../Icon';

import type { FC } from 'react';

interface ErrorStubProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onClick?: VoidFunction;
}

export const ErrorStub: FC<ErrorStubProps> = ({
  title,
  description,
  buttonText,
  onClick,
}) => {
  const handleReload = () => {
    onClick ? onClick() : window.location.reload();
  };

  return (
    <PageLayout className="h-full ">
      <div className="flex h-full justify-center flex-col items-center gap-8 w-full">
        <div className="flex justify-center">
          <Icon kind={IconKind.ERROR_ILLUSTRATION} className="h-26" />
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <Typography variant="h2">
            {title ? title : text.COMMON_ERROR}
          </Typography>

          {description && (
            <Typography variant="regular2">{description}</Typography>
          )}

          <Button
            className="max-w-40"
            variant="secondary"
            onClick={handleReload}
          >
            {buttonText || 'Перезагрузить'}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

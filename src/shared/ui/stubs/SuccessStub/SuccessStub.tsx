import { IconKind } from '@shared/helpers';
import { Button } from '@shared/ui/Button';
import { PageLayout } from '@shared/ui/PageLayout';
import { VerticalTemplate } from '@shared/ui/VerticalTemplate';

import type { FC, ReactNode } from 'react';

interface SuccessStubProps {
  description?: ReactNode;
  buttonText: string;
  onClick: VoidFunction;
}

export const SuccessStub: FC<SuccessStubProps> = ({
  description,
  buttonText,
  onClick,
}) => (
  <PageLayout>
    <VerticalTemplate
      icon={IconKind.SUCCESS_ILLUSTRATION}
      title="Готово!"
      description={description}
    >
      <Button onClick={onClick}>{buttonText}</Button>
    </VerticalTemplate>
  </PageLayout>
);

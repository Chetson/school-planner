import type { FC } from 'react';

import { IconKind } from '@shared/helpers';
import { VerticalTemplate } from '@shared/ui/VerticalTemplate';

export const NotFoundStub: FC = () => (
  <VerticalTemplate
    icon={IconKind.NOT_FOUND_ILLUSTRATION}
    title="Ничего не найдено"
    description="Измените параметры поиска"
  />
);

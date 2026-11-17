import { memo } from 'react';

import { useWidth } from '@shared/helpers';
import { Icon, Typography } from '@shared/ui';

import type { IconKind } from '@shared/helpers';
import type { FC, FormEvent, PropsWithChildren, ReactNode } from 'react';

export interface FormLayoutProps extends PropsWithChildren {
  title?: string;
  action: ReactNode;
  illustration?: IconKind;
}

interface OnSubmitProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const FormLayout: FC<FormLayoutProps & OnSubmitProps> = ({
  title,
  illustration,
  children,
  action,
  onSubmit,
}) => {
  const { isDesktop } = useWidth();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {title && (
        <Typography variant="h2" className="leading-none">
          {title}
        </Typography>
      )}
      <div className="flex mt-6 overflow-auto">
        <form onSubmit={onSubmit} className="pt-2 w-full max-w-120 space-y-8">
          <div className="flex flex-wrap gap-4">{children}</div>
          <div className="flex gap-4">{action}</div>
        </form>
        {isDesktop && illustration && (
          <div className="flex shrink grow items-center justify-center pl-15">
            <Icon kind={illustration} className="w-55" />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(FormLayout);

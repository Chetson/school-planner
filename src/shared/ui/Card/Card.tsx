import { Icon, Typography } from '@shared/ui';

import { CardListItem } from './ui/CardListItem';

import type { CardProps } from './lib/types';
import type { FC } from 'react';

export const Card: FC<CardProps> = ({
  title,
  icon,
  items,
  color = 'mint',
  isCounter = false,
  className,
}) => {
  return (
    <article className="bg-white px-10 py-8 rounded-2xl flex flex-col gap-4">
      <div className="flex">
        <div className="grow flex flex-col justify-center">
          <Typography variant="h3">
            {title}{' '}
            {!!items?.length && isCounter && (
              <Typography
                variant="caption1"
                className={`relative bottom-1/4 text-decorative-${color} font-bold`}
              >
                {items.length}
              </Typography>
            )}
          </Typography>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-bg-secondary flex flex-col justify-center">
          <div className="flex justify-center">
            <Icon kind={icon} className={`text-decorative-${color}`} />
          </div>
        </div>
      </div>
      <section className={className}>
        {!!items?.length && (
          <ul className={`flex flex-col gap-4 flex-wrap max-h-full`}>
            {items.map((item, index) => (
              <CardListItem
                key={index}
                icon={item?.icon}
                title={item.title}
                subtitle={item?.subtitle}
                color={color}
              />
            ))}
          </ul>
        )}
      </section>
    </article>
  );
};

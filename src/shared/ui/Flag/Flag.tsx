import { FC } from 'react';

import { FLAG_MAP, Country } from '@shared/helpers';
import clsx from 'clsx';

import styles from './flag.module.css';

export interface FlagProps {
  className?: string;
  iconClassName?: string;
  country: Country;
}

export const Flag: FC<FlagProps> = ({ country, className }) => {
  if (!country) {
    return null;
  }

  const IconComponent = FLAG_MAP[country];

  return (
    <div className={clsx(className, styles.wrapper)}>
      <IconComponent
        className={clsx(
          styles.flag,
          country === Country.KZ && '!translate-x-[-54%] ',
        )}
      />
    </div>
  );
};

import { FC, SVGAttributes } from 'react';

import * as assets from '@shared/assets';

export enum Country {
  RU = 'RU',
  UZ = 'UZ',
  AM = 'AM',
  TJ = 'TJ',
  AZ = 'AZ',
  BY = 'BY',
  KZ = 'KZ',
}

export const FLAG_MAP: Record<
  Country,
  FC<SVGAttributes<SVGElement> & { title?: string }>
> = {
  [Country.RU]: assets.RuFlag,
  [Country.UZ]: assets.UzFlag,
  [Country.AM]: assets.AmFlag,
  [Country.TJ]: assets.TjFlag,
  [Country.AZ]: assets.AzFlag,
  [Country.BY]: assets.ByFlag,
  [Country.KZ]: assets.KzFlag,
};

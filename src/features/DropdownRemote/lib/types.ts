import type { DropdownItemType } from '@shared/ui';

export type DropdownRemoteItemType<
  IdType,
  Model extends object,
> = DropdownItemType<IdType> & { value: Model };

export type MultiselectDropdownRemoteProps<Model extends object> =
  | {
      isMultiselect: true;
      onChange?: (value: Model[]) => void;
      value?: Model[] | null;
    }
  | {
      isMultiselect?: false;
      onChange?: (value: Model | null) => void;
      value?: Model | null;
    };

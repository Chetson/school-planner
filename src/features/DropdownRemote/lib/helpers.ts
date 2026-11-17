import type {
  DropdownRemoteItemType,
  MultiselectDropdownRemoteProps,
} from './types';
import type { ApiList } from '@shared/types';
import type { DropdownItemType, MultiselectDropdownProps } from '@shared/ui';
import type { InfiniteData } from '@tanstack/react-query';

export const normalizeInfiniteList = <
  IdType,
  Item extends DropdownItemType<IdType>,
  Model extends object,
  ModelList extends ApiList<Model>,
>(
  data: InfiniteData<ModelList, number>,
  normalize: (model: Model) => Item,
) => (data?.pages || []).flatMap((page) => page.results.map(normalize));

export const getDropdownProps = <
  Model extends object,
  Id,
  Item extends DropdownRemoteItemType<Id, Model>,
>(
  props: MultiselectDropdownRemoteProps<Model>,
  normalize: (value: Model) => Item,
): MultiselectDropdownProps<Id, Item> => {
  if (props.isMultiselect) {
    return {
      ...props,
      value: (props.value || []).map(normalize),
      onChange: (selected: Item[]) =>
        props.onChange?.(selected.map((item) => item.value)),
    };
  }

  return {
    ...props,
    value: props.value && normalize(props.value),
    onChange: (value) => props.onChange?.(value && value.value),
  };
};

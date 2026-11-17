export const uniqBy = <Item, Key>(
  array: Item[],
  getValue: (item: Item) => Key,
): Item[] => {
  const seen = new Map<Key, Item>();

  array.forEach((item) => {
    const keyValue = getValue(item);
    if (!seen.has(keyValue)) {
      seen.set(keyValue, item);
    }
  });

  return Array.from(seen.values());
};

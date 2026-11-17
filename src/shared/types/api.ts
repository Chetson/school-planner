export type ApiList<Item extends object = object> = {
  count: number;
  results: Item[];
};

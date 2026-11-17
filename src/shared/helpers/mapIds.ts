export const mapIds = <Model extends { id: number }>(list?: Model[] | null) =>
  (list || []).map(({ id }) => id);

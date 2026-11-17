type Params<D> = {
  current?: D[];
  updated?: D[];
  key: keyof D;
};

export const getArrayChangesBy = <D extends object>({
  current = [],
  updated = [],
  key,
}: Params<D>) => {
  const currentSet = new Set(current.map((item) => item[key]));
  const updatedSet = new Set(updated.map((item) => item[key]));

  return {
    removed: current.filter((item) => !updatedSet.has(item[key])),
    added: updated.filter((item) => !currentSet.has(item[key])),
  };
};

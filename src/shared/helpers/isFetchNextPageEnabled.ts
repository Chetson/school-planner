export const isFetchNextPageEnabled = (
  isFetching: boolean,
  totalFetched: number,
  totalDB: number,
  containerRefElement?: HTMLDivElement | null,
): boolean => {
  if (!containerRefElement) return false;

  const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

  const сontainerHeigth = containerRefElement.getBoundingClientRect().height;

  return (
    scrollHeight - scrollTop - clientHeight < сontainerHeigth * 0.9 &&
    !isFetching &&
    totalFetched < totalDB
  );
};

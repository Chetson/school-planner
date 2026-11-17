export const getCaptionColor = ({
  isDisabled,
  isError,
}: {
  isDisabled?: boolean;
  isError?: boolean;
}) => {
  if (isDisabled) return 'disable';
  if (isError) return 'critical';

  return 'secondary';
};

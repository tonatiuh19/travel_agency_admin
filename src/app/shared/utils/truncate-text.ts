export const truncateText = (value: string, limit: number = 20): string => {
  if (!value) return '';
  return value.length > limit ? value.substring(0, limit) + '...' : value;
};

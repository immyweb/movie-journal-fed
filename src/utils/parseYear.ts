// 2006-05-05 => 2006
export const parseYear = (date?: string): string | undefined => {
  return date?.slice(0, 4);
};

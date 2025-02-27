export const getMonthName = (
  dateString: string,
  locale: string = 'id'
): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
}

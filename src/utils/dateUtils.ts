export function extractDateParts(isoString: string): {
  day: number;
  month: number;
  year: number;
} {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return { day, month, year };
}

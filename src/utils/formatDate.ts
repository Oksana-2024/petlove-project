export const formatDateToUkrainian = (date: string | Date): string => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Unknown";

  return parsedDate.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
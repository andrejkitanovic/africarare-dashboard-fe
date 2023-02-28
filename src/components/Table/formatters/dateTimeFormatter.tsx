export const dateTimeFormatter = (date: Date | string | null | undefined) => {
  if (!date) return "-";

  const formattedDate = new Date(date);
  return (
    formattedDate.toLocaleDateString() +
    " " +
    formattedDate.toLocaleTimeString()
  );
};

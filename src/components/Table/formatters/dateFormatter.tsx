export const dateFormatter = (date: Date | string | null | undefined) =>
  date ? new Date(date).toLocaleDateString() : "-";

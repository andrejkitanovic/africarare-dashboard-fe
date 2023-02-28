export const precentageFormatter = (value: number | null | undefined) =>
  !Number.isNaN(value) ? `${value} %` : "-";

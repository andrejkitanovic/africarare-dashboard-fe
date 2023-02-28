import { formatNumber } from "utils/formatNumber";

export const priceFormatter = (value: number | null | undefined) =>
  formatNumber(value, {
    style: "currency",
    currency: "RSD",
    maximumFractionDigits: 2,
  });

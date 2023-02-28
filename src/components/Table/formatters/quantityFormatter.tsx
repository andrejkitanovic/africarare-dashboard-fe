import { formatNumber } from "utils/formatNumber";

import { unitFormatter } from "./unitFormatter";

export const quantityFormatter = ({
  quantity,
  unit,
}: {
  quantity: number | null | undefined;
  unit: string | null | undefined;
}) => {
  if (isNaN(quantity as number) || !unit) return "-";

  return (
    <>
      {formatNumber(quantity)} {unitFormatter(unit)}
    </>
  );
  // return `${formatNumber(quantity)} ${unitFormatter(unit)}`;
};

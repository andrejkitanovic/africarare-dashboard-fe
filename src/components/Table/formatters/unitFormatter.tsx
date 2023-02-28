import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";

export const unitFormatter = (unit: string | null | undefined) => {
  let translatedUnit: string | ReactElement | null | undefined = unit;
  if (translatedUnit === "pcs") {
    translatedUnit = <FormattedMessage id="GLOBAL.PCS" />;
  }

  return translatedUnit;
};

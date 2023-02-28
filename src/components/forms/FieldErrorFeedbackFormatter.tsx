import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { isObject } from "utils/isObject";

interface Props {
  error: any;
}

const FieldErrorFeedbackFormatter: FC<Props> = ({ error }) => {
  switch (true) {
    case typeof error === "string":
      return <FormattedMessage id={error} defaultMessage={error} />;

    case isObject(error) && error.hasOwnProperty("key"):
      return <FormattedMessage id={error.key} values={error.values} />;

    case isObject(error) && Object.values(error).length > 0:
      const firstError = Object.values(error)[0] as string;
      return <FormattedMessage id={firstError} defaultMessage={firstError} />;

    default:
      return <FormattedMessage id="FORMS.ERROR.DEFAULT_FIELD_ERROR" />;
  }
};

export default FieldErrorFeedbackFormatter;

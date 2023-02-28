import { DesktopDatePicker as DatePicker, DatePickerProps } from "@mui/lab";
import { TextField, TextFieldProps } from "@mui/material";
import { isValid } from "date-fns";
import { useField } from "formik";
import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import FieldErrorFeedbackFormatter from "components/forms/FieldErrorFeedbackFormatter";
import { MakeOptional } from "utils/types";

interface FormikDatePickerProps<T extends Date>
  extends MakeOptional<
    DatePickerProps<T>,
    "value" | "onChange" | "renderInput"
  > {
  name: string;
  label: string | ReactNode;
  fullWidth?: TextFieldProps["fullWidth"];
  helperText?: TextFieldProps["helperText"];
}
const FormikDatePicker = <T extends Date>({
  name,
  label,
  fullWidth = true,
  helperText,
  ...rest
}: FormikDatePickerProps<T>) => {
  const [field, meta, helpers] = useField<Date | string | null>(name);
  return (
    <DatePicker
      label={label}
      value={field.value}
      onChange={(newValue) => {
        if (newValue !== null) {
          if (isValid(newValue)) {
            // newValue?.setUTCHours(0, 0, 0, 0);
            helpers.setValue(newValue.toISOString());
          }
        } else {
          helpers.setValue(null);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth={fullWidth}
          error={meta.touched && !!meta.error}
          helperText={
            meta.touched && meta.error ? (
              <FieldErrorFeedbackFormatter error={meta.error} />
            ) : (
              helperText
            )
          }
        />
      )}
      clearText={<FormattedMessage id="GLOBAL.CLEAR" />}
      {...rest}
    />
  );
};

export default FormikDatePicker;

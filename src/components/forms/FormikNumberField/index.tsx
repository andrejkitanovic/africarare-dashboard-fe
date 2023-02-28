import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import React from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";

import FieldErrorFeedbackFormatter from "components/forms/FieldErrorFeedbackFormatter";
import { MakeRequired } from "utils/types";

type Props = MakeRequired<TextFieldProps, "name">;

const FormikNumberField = ({
  name,
  helperText,
  ...rest
}: NumberFormatProps<Props>) => {
  const [field, meta, helper] = useField<number>(name);

  let helperTextValue;
  if (helperText !== false) {
    helperTextValue =
      meta.touched && meta.error ? (
        <FieldErrorFeedbackFormatter error={meta.error} />
      ) : (
        helperText
      );
  }

  return (
    <NumberFormat
      fullWidth
      error={meta.touched && !!meta.error}
      helperText={helperTextValue}
      thousandSeparator
      {...field}
      {...rest}
      onChange={() => {}}
      onValueChange={(values) => {
        const { floatValue } = values;
        helper.setValue(floatValue as number);
      }}
      customInput={TextField}
    />
  );
};

export default FormikNumberField;

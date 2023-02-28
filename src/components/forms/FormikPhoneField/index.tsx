import { TextFieldProps } from "@mui/material";
import { useField } from "formik";
import { MuiTelInput } from "mui-tel-input";
import React from "react";

import FieldErrorFeedbackFormatter from "components/forms/FieldErrorFeedbackFormatter";
import { MakeRequired } from "utils/types";

type Props = MakeRequired<TextFieldProps, "name">;

const FormikPhoneField = ({ name, helperText, ...rest }: Props) => {
  const [field, meta, helpers] = useField<string>(name);

  const { value } = field;
  const { setValue } = helpers;

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
    <MuiTelInput
      defaultCountry="RS"
      variant="outlined"
      fullWidth
      error={meta.touched && !!meta.error}
      helperText={helperTextValue}
      {...field}
      {...rest}
      value={value}
      onChange={(number, data) => {
        const noSpaceNumber = number.replace(/\s/g, "");
        setValue(noSpaceNumber);
      }}
    />
  );
};

export default FormikPhoneField;

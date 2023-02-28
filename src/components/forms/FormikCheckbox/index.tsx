import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { useField } from "formik";
import React, { ReactElement } from "react";

import { MakeRequired } from "utils/types";

interface FormikCheckboxProps extends MakeRequired<CheckboxProps, "name"> {
  label: string | ReactElement;
  helperText?: string | ReactElement;
}

const FormikCheckbox = ({
  name,
  label,
  helperText,
  ...rest
}: FormikCheckboxProps) => {
  const [field] = useField<unknown>(name);

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox checked={Boolean(field.value)} {...field} {...rest} />
        }
        label={label}
        sx={{ mb: 0 }}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </>
  );
};

export default FormikCheckbox;

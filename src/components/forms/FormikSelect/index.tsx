import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  TextFieldProps,
} from "@mui/material";
import { useField } from "formik";
import React, { ReactNode } from "react";

export type AutocompleteOptiontType<T = any> = { label: string; value: T };

interface FormikSelectProps extends SelectProps {
  name: string;
  label: string | ReactNode;
  helperText?: TextFieldProps["helperText"];
  options: { value: string; label: string }[];
  renderOption?: (option: string) => string | JSX.Element;
}

const FormikSelect = ({
  name,
  options,
  label,
  size,
  helperText,
  ...rest
}: FormikSelectProps) => {
  const [field, meta] = useField<string | null>(name);

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        label={label}
        fullWidth
        size={size}
        error={meta.touched && !!meta.error}
        {...field}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {rest.renderOption ? rest.renderOption(option.value) : option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormikSelect;

import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  TextField,
  TextFieldProps,
  alpha,
  useTheme,
} from "@mui/material";
import { useField } from "formik";
import React, { ReactNode } from "react";

import FieldErrorFeedbackFormatter from "components/forms/FieldErrorFeedbackFormatter";
import { MakeOptional } from "utils/types";

export type AutocompleteOptiontType<T = any> = { label: string; value: T };

interface FormikAutocompleteProps<
  Option extends AutocompleteOptiontType,
  DisableClearable extends boolean | undefined = undefined
> extends MakeOptional<
    AutocompleteProps<Option, false, DisableClearable, false>,
    "renderInput"
  > {
  name: string;
  label: string | ReactNode;
  helperText?: TextFieldProps["helperText"];
}

/**
 * This Autocomplete does NOT accept:
 * - multiple choices
 * - free solo feature
 */
const FormikAutocomplete = <
  Option extends AutocompleteOptiontType,
  DisableClearable extends boolean | undefined = undefined
>({
  name,
  options,
  label,
  loading,
  size,
  helperText,
  ...rest
}: FormikAutocompleteProps<Option, DisableClearable>) => {
  const theme = useTheme();

  const [field, meta, helpers] = useField<string | null>(name);

  const autocompleteValue =
    options.find((option) => option.value === field.value) ?? null;

  return (
    <Autocomplete
      size={size}
      options={options}
      onChange={async (_e, value) => {
        helpers.setValue(value !== null ? value.value : null);
      }}
      // couldn't satisfy typescript, but 99.9% will work.
      // @ts-expect-error
      value={autocompleteValue}
      onBlur={field.onBlur}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          name={field.name}
          label={label}
          error={meta.touched && !!meta.error}
          helperText={
            meta.touched && meta.error ? (
              <FieldErrorFeedbackFormatter error={meta.error} />
            ) : (
              helperText
            )
          }
          size={size}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{
        "& .MuiAutocomplete-groupLabel": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.6),
        },
        ...rest.sx,
      }}
      {...rest}
    />
  );
};

export default FormikAutocomplete;

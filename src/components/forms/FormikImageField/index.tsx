import { Box, Typography } from "@mui/material";
import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  useField,
} from "formik";
import React, { FC, InputHTMLAttributes, ReactNode } from "react";

import FieldErrorFeedbackFormatter from "../FieldErrorFeedbackFormatter";

interface FormikImageFieldProps {
  name: string;
  helperText?: string;
  Element: ({
    field,
    meta,
    helpers,
  }: {
    field: FieldInputProps<File | string | null>;
    meta: FieldMetaProps<File | string | null>;
    helpers: FieldHelperProps<File | string | null>;
  }) => ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const FormikImageField: FC<FormikImageFieldProps> = ({
  name,
  helperText,
  Element,
  inputProps,
}) => {
  const [field, meta, helpers] = useField<File | string | null>(name);

  return (
    <>
      <input
        id={`file-upload-${field.name}`}
        name={field.name}
        type="file"
        hidden
        onInput={(e) => {
          //@ts-expect-error
          const file = e.target.files[0];

          helpers.setValue(file);
        }}
        {...inputProps}
      />
      <Box
        component="label"
        htmlFor={`file-upload-${field.name}`}
        sx={{ cursor: "pointer" }}
      >
        {Element({
          field,
          meta,
          helpers,
        })}
      </Box>
      {meta.touched && meta.error ? (
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: (theme) => theme.palette.error.main,
          }}
        >
          <FieldErrorFeedbackFormatter error={meta.error} />
        </Typography>
      ) : (
        <Typography variant="body2">{helperText}</Typography>
      )}
    </>
  );
};

export default FormikImageField;

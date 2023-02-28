import { Button, Stack } from "@mui/material";
import { Formik, Form as FormikForm } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as yup from "yup";

import FormikAutocomplete from "components/forms/FormikAutocomplete";
import FormikTextField from "components/forms/FormikTextField";

const SupportForm = () => {
  const { formatMessage } = useIntl();

  const supportOptions = [
    {
      label: formatMessage({ id: "SUPPORT.CATEGORY.USER_ACCOUNT" }),
      value: "user-account",
    },
    {
      label: formatMessage({ id: "SUPPORT.CATEGORY.TECHNICAL_BUG" }),
      value: "technical-bug",
    },
    {
      label: formatMessage({ id: "SUPPORT.CATEGORY.PAYMENT" }),
      value: "payment",
    },
    {
      label: formatMessage({ id: "SUPPORT.CATEGORY.INFO" }),
      value: "info",
    },
    {
      label: formatMessage({ id: "SUPPORT.CATEGORY.OTHER" }),
      value: "other",
    },
  ];

  return (
    <Formik
      initialValues={{
        category: "",
        description: "",
      }}
      onSubmit={() => {}}
      validationSchema={yup.object({
        category: yup.string().nullable().required(),
        description: yup.string().required(),
      })}
    >
      <FormikForm>
        <FormikAutocomplete
          label={<FormattedMessage id="SUPPORT.FORM.CATEGORY_LABEL" />}
          name="category"
          helperText={
            <FormattedMessage id="SUPPORT.FORM.CATEGORY_HELPER_TEXT" />
          }
          options={supportOptions}
        />
        <FormikTextField
          label={<FormattedMessage id="SUPPORT.FORM.DESCRIPTION_LABEL" />}
          name="description"
          helperText={
            <FormattedMessage id="SUPPORT.FORM.DESCRIPTION_HELPER_TEXT" />
          }
          multiline
          rows={4}
          maxRows={8}
        />

        <Stack sx={{}} alignItems="end">
          <Button type="submit" variant="contained">
            <FormattedMessage id="GLOBAL.SEND" />
          </Button>
        </Stack>
      </FormikForm>
    </Formik>
  );
};

export default SupportForm;

import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import { MutationStatus } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import * as yup from "yup";

import FormikTextField from "components/forms/FormikTextField";

export type OrganisationFormValues = {
  name: string;
  email: string;
  city: string;
  address: string;
  postcode: string;
  vat: string;
  registrationNumber: string;
};

interface IOrganisationForm {
  handleSubmit: (values: OrganisationFormValues) => void;
  handleClose: () => void;
  initialValues?: OrganisationFormValues;
  submitStatus?: MutationStatus;
}

const OrganisationForm: FC<IOrganisationForm> = ({
  handleSubmit,
  handleClose,
  initialValues = {
    name: "",
    email: "",
    city: "",
    address: "",
    postcode: "",
    vat: "",
    registrationNumber: "",
  },
  submitStatus,
}) => {
  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    postcode: yup.string().required(),
    vat: yup.string().required(),
    registrationNumber: yup.string().required(),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <DialogContent>
          <FormikTextField
            name="name"
            label={<FormattedMessage id="GLOBAL.NAME" />}
          />
          <FormikTextField
            name="email"
            label={<FormattedMessage id="GLOBAL.EMAIL" />}
          />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormikTextField
                name="city"
                label={<FormattedMessage id="GLOBAL.CITY" />}
              />
            </Grid>
            <Grid item xs={8}>
              <FormikTextField
                name="address"
                label={<FormattedMessage id="GLOBAL.ADDRESS" />}
              />
            </Grid>
          </Grid>

          <FormikTextField
            name="postcode"
            label={<FormattedMessage id="GLOBAL.POSTCODE" />}
          />
          <FormikTextField
            name="vat"
            label={<FormattedMessage id="GLOBAL.VAT" />}
          />
          <FormikTextField
            name="registrationNumber"
            label={<FormattedMessage id="GLOBAL.REGISTRATION_NUMBER" />}
          />
        </DialogContent>

        <DialogActions>
          <Button
            // data-testid="new-edit-port-close-button"
            onClick={handleClose}
          >
            <FormattedMessage id="GLOBAL.CLOSE" />
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={submitStatus === "loading"}
          >
            <FormattedMessage id="GLOBAL.SAVE" />
          </LoadingButton>
        </DialogActions>
      </FormikForm>
    </Formik>
  );
};

export default OrganisationForm;

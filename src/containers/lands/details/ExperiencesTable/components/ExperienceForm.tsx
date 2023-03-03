import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent } from "@mui/material";
import { MutationStatus } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import * as yup from "yup";

import FormikTextField from "components/forms/FormikTextField";

export type ExperienceFormValues = {
  name: string;
};

interface IExperienceForm {
  handleSubmit: (values: ExperienceFormValues) => void;
  handleClose: () => void;
  initialValues?: ExperienceFormValues;
  submitStatus?: MutationStatus;
}

const ExperienceForm: FC<IExperienceForm> = ({
  handleSubmit,
  handleClose,
  initialValues = {
    name: "",
  },
  submitStatus,
}) => {
  const schema = yup.object({
    name: yup.string().required(),
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

export default ExperienceForm;

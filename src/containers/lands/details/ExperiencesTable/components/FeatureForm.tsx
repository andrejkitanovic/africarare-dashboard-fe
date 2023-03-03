import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent } from "@mui/material";
import { MutationStatus } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as yup from "yup";

import { FeaturesTypeType } from "api/features/types";
import FormikAutocomplete from "components/forms/FormikAutocomplete";

export type FeatureFormValues = {
  type: FeaturesTypeType | null;
};
interface IFeatureForm {
  handleSubmit: (values: FeatureFormValues) => void;
  handleClose: () => void;
  initialValues?: FeatureFormValues;
  submitStatus?: MutationStatus;
}

const FeatureForm: FC<IFeatureForm> = ({
  handleSubmit,
  handleClose,
  initialValues = {
    type: null,
  },
  submitStatus,
}) => {
  const intl = useIntl();
  const schema = yup.object({
    type: yup.string().required().nullable(),
  });

  const featureTypeOptions = [
    {
      value: "access",
      label: intl.formatMessage({ id: "FEATURES.ACCESS" }),
    },
    {
      value: "chatlog",
      label: intl.formatMessage({ id: "FEATURES.CHATLOG" }),
    },
    {
      value: "experience-avatars",
      label: intl.formatMessage({ id: "FEATURES.EXPERIENCE_AVATARS" }),
    },
  ];

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <DialogContent>
          <FormikAutocomplete
            name="type"
            label={<FormattedMessage id="FEATURES.FEATURE_FORM.TYPE" />}
            options={featureTypeOptions}
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

export default FeatureForm;

import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent } from "@mui/material";
import { MutationStatus } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import React, { FC, useMemo } from "react";
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
  addedFeatures?: FeaturesTypeType[];
}

const FeatureForm: FC<IFeatureForm> = ({
  handleSubmit,
  handleClose,
  initialValues = {
    type: null,
  },
  submitStatus,
  addedFeatures,
}) => {
  const intl = useIntl();
  const schema = yup.object({
    type: yup.string().required().nullable(),
  });

  const featureTypeOptions = useMemo(() => {
    const allFeatures = [
      {
        value: "access",
        label: intl.formatMessage({ id: "FEATURES.ACCESS" }),
      },
      {
        value: "portal",
        label: intl.formatMessage({ id: "FEATURES.PORTAL" }),
      },
      {
        value: "leaderboard",
        label: intl.formatMessage({ id: "FEATURES.LEADERBOARD" }),
      },
      {
        value: "chatlog",
        label: intl.formatMessage({ id: "FEATURES.CHATLOG" }),
      },
      {
        value: "restricted-pen-drawing",
        label: intl.formatMessage({ id: "FEATURES.RESTRICTED_PEN_DRAWING" }),
      },
      {
        value: "experience-avatars",
        label: intl.formatMessage({ id: "FEATURES.EXPERIENCE_AVATARS" }),
      },
      {
        value: "presentation",
        label: intl.formatMessage({ id: "FEATURES.PRESENTATION" }),
      },
      {
        value: "participation",
        label: intl.formatMessage({ id: "FEATURES.PARTICIPATION" }),
      },
      {
        value: "info-pin",
        label: intl.formatMessage({ id: "FEATURES.INFO_PIN" }),
      },
    ];

    if (addedFeatures?.length) {
      return allFeatures.filter(
        //@ts-expect-error
        (feature) => !addedFeatures.includes(feature.value)
      );
    }

    return allFeatures;
  }, [addedFeatures, intl]);

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

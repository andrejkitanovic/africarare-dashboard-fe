import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent } from "@mui/material";
import { MutationStatus } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import * as yup from "yup";

import FormikTextField from "components/forms/FormikTextField";

export type LevelFormValues = {
  name: string;
  scene: string;
};
interface ILevelForm {
  handleSubmit: (values: LevelFormValues) => void;
  handleClose: () => void;
  initialValues?: LevelFormValues;
  submitStatus?: MutationStatus;
}

const LevelForm: FC<ILevelForm> = ({
  handleSubmit,
  handleClose,
  initialValues = {
    name: "",
    scene: "",
  },
  submitStatus,
}) => {
  const schema = yup.object({
    name: yup.string().required(),
    scene: yup.string().required(),
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
            label={<FormattedMessage id="LEVELS.LEVEL_FORM.NAME" />}
          />
          <FormikTextField
            name="scene"
            label={<FormattedMessage id="LEVELS.LEVEL_FORM.SCENE" />}
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

export default LevelForm;

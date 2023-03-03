import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent } from "@mui/material";
import { MutationStatus } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as yup from "yup";

import { UserOrgTypeRoleType } from "api/user/types";
import FormikAutocomplete from "components/forms/FormikAutocomplete";
import FormikTextField from "components/forms/FormikTextField";
import { hasRole } from "components/stores/UserStore";

export type UserFormValues = {
  name: string;
  email: string;
  role: UserOrgTypeRoleType | null;
};

interface IUserForm {
  handleSubmit: (values: UserFormValues) => void;
  handleClose: () => void;
  initialValues?: UserFormValues;
  submitStatus?: MutationStatus;
  confirmed?: boolean;
}

const UserForm: FC<IUserForm> = ({
  handleSubmit,
  handleClose,
  initialValues = {
    name: "",
    email: "",
    role: null,
  },
  submitStatus,
  confirmed,
}) => {
  const schema = yup.object({
    email: yup.string().required(),
    role: yup.string().nullable().required(),
  });
  const intl = useIntl();

  let roleOptions = [
    {
      value: "land-owner",
      label: intl.formatMessage({ id: "ROLE.LAND_OWNER" }),
    },
  ];

  if (hasRole("portal-admin")) {
    roleOptions = [
      {
        value: "portal-admin",
        label: intl.formatMessage({ id: "ROLE.PORTAL_ADMIN" }),
      },
      ...roleOptions,
    ];
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <DialogContent>
          {confirmed && (
            <FormikTextField
              name="name"
              type="text"
              label={<FormattedMessage id="USERS.TABLE.NAME" />}
            />
          )}
          <FormikTextField
            name="email"
            type="email"
            label={<FormattedMessage id="GLOBAL.EMAIL" />}
          />
          <FormikAutocomplete
            label={<FormattedMessage id="GLOBAL.ROLE" />}
            name="role"
            options={roleOptions}
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

export default UserForm;

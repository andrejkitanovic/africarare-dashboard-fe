import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import * as yup from "yup";

import { updateProfile as updateProfileAPI } from "api/user";
import { EditUserType } from "api/user/types";
import { usersKeys } from "api/users/queries";
import FormikPhoneField from "components/forms/FormikPhoneField";
import FormikTextField from "components/forms/FormikTextField";
import { useUserStore } from "components/stores/UserStore";

const ProfileForm = () => {
  const queryClient = useQueryClient();

  const [user, setUser] = useUserStore((s) => [s.user, s.setUser]);
  const intl = useIntl();

  const initialValues = {
    organisation: user?.organisation?._id || "",
    email: user?.email || "",
    name: user?.name || "",
    role: user?.role || null,
    phone: user?.phone || null,
  };

  const schema = yup.object({
    organisation: yup.string().required(),
    email: yup
      .string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    name: yup.string().required(),
  });

  const { mutateAsync: updateProfile, status } = useMutation(
    async (values: EditUserType) => {
      await updateProfileAPI(values);
    }
  );

  const handleSubmit = async (values: EditUserType) => {
    await updateProfile(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(usersKeys.history(user?._id ?? ""));
        if (user) setUser({ ...user, name: values.name, email: values.email });
      },
    });
  };

  const profileRole = {
    "portal-admin": intl.formatMessage({ id: "ROLE.PORTAL_ADMIN" }),
    "organisation-owner": intl.formatMessage({ id: "ROLE.ORGANISATION_OWNER" }),
    "organisation-employee": intl.formatMessage({
      id: "ROLE.ORGANISATION_EMPLOYEE",
    }),
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <FormikForm>
          <Box sx={{ p: 3 }}>
            <Grid container columnSpacing={2} rowSpacing={3}>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">
                  <FormattedMessage id="PROFILE.PERSONAL_INFO" />
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormikTextField
                  name="name"
                  label={<FormattedMessage id="GLOBAL.NAME" />}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  value={user?.organisation?.name}
                  label={<FormattedMessage id="GLOBAL.ORGANISATION" />}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  value={user?.role ? profileRole[user.role] : "-"}
                  label={<FormattedMessage id="GLOBAL.ROLE" />}
                  disabled
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Typography variant="h5">
                  <FormattedMessage id="PROFILE.CONTACT_INFO" />
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormikTextField
                  name="email"
                  label={<FormattedMessage id="GLOBAL.EMAIL" />}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormikPhoneField
                  name="phone"
                  type="tel"
                  label={<FormattedMessage id="GLOBAL.PHONE" />}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
            sx={{ p: 2 }}
          >
            <LoadingButton
              size="medium"
              // disabled={shouldSendBeDisabled}
              variant="contained"
              loading={status === "loading"}
              type="submit"
            >
              <FormattedMessage id="GLOBAL.SAVE" />
            </LoadingButton>
          </Stack>
        </FormikForm>
      </Formik>
    </>
  );
};

export default ProfileForm;

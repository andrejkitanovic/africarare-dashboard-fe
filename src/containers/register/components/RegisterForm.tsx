import { LoadingButton } from "@mui/lab";
import { Box, Paper, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

import { axiosInstance } from "api/request";
import { getUnregisteredData, postRegister } from "api/user";
import { userKeys } from "api/user/queries";
import { RegisterPayloadType } from "api/user/types";
import FormikTextField from "components/forms/FormikTextField";

const RegisterForm = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { data: registerData } = useQuery(
    userKeys.register(id),
    async () => {
      const { data: res } = await getUnregisteredData(id);
      return res.data;
    },
    { retry: false, onError: () => history.push("/login") }
  );

  const initialValues = {
    organisation: registerData?.organisation.name || "",
    email: registerData?.email || "",
    name: "",
    password: "",
    repeatPassword: "",
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
    password: yup
      .string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Password is required"),
    repeatPassword: yup
      .string()
      .required("Password confirmation is required")
      .when("password", {
        is: (val: string | any[]) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref("password")],
            "Password and Confirm Password didn't match"
          ),
      }),
  });
  const { mutateAsync: register, status } = useMutation(
    async (values: RegisterPayloadType) => {
      const { data: registerData } = await postRegister(values, id);

      localStorage.setItem("JWToken", registerData?.token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${registerData?.token}`;
    }
  );

  const handleSubmit = async (values: RegisterPayloadType) => {
    await register(
      {
        name: values.name,
        password: values.password,
      },
      {
        onSuccess: () => history.push("/dashboard"),
      }
    );
  };

  return (
    <Paper sx={{ borderRadius: 1, width: "420px" }}>
      <Box py={2} pt={2.5} borderBottom="1px solid rgba(172, 172, 172, 0.2);">
        <Typography textAlign="center" fontWeight="bold" variant="h4">
          <FormattedMessage id="REGISTER.FORM.TITLE" />
        </Typography>
      </Box>
      <Box pt={5} px={5} pb={6}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <FormikForm>
            <FormikTextField
              name="organisation"
              sx={{ mb: 1 }}
              InputLabelProps={{ shrink: true }}
              disabled
              autoComplete="none"
              label={<FormattedMessage id="GLOBAL.ORGANISATION" />}
            />
            <FormikTextField
              name="email"
              type="email"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 1 }}
              disabled
              autoComplete="none"
              label={<FormattedMessage id="GLOBAL.EMAIL" />}
            />
            <FormikTextField
              name="name"
              sx={{ mb: 1 }}
              label={<FormattedMessage id="USERS.TABLE.NAME" />}
            />
            <FormikTextField
              name="password"
              type="password"
              sx={{ mb: 1 }}
              label={<FormattedMessage id="GLOBAL.PASSWORD" />}
            />
            <FormikTextField
              name="repeatPassword"
              type="password"
              sx={{ mb: 1 }}
              label={<FormattedMessage id="REGISTER.FORM.REPEAT_PASS" />}
            />

            <LoadingButton
              sx={{ mt: 4.5, py: 1 }}
              type="submit"
              variant="contained"
              fullWidth
              loading={status === "loading"}
            >
              <FormattedMessage id="REGISTER.FORM.BUTTON" />
            </LoadingButton>
          </FormikForm>
        </Formik>
      </Box>
    </Paper>
  );
};

export default RegisterForm;

import { LoadingButton } from "@mui/lab";
import { Box, Link } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as yup from "yup";

import { axiosInstance } from "api/request";
import { postLogin } from "api/user";
import { LoginPayloadType } from "api/user/types";
import FormikTextField from "components/forms/FormikTextField";

const LoginForm = () => {
  const history = useHistory();
  const initialValues = {
    email: "",
    password: "",
  };
  const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const { mutateAsync: login, status } = useMutation(
    async (values: LoginPayloadType) => {
      const { data: loginData } = await postLogin(values);

      localStorage.setItem("JWToken", loginData?.token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${loginData?.token}`;
    }
  );

  const handleSubmit = async (values: LoginPayloadType) => {
    await login(values, {
      onSuccess: () => history.push("/dashboard"),
    });
  };

  return (
    <Box pt={5} px={5} pb={3}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <FormikForm data-cy="login-form">
          <FormikTextField
            name="email"
            type="email"
            sx={{ mb: 1 }}
            label={<FormattedMessage id="GLOBAL.EMAIL" />}
            data-cy="email-input"
          />
          <FormikTextField
            name="password"
            type="password"
            sx={{ mb: 1 }}
            label={<FormattedMessage id="GLOBAL.PASSWORD" />}
            data-cy="password-input"
          />
          <Link
            component={RouterLink}
            to={`/forgot-password`}
            sx={{ textDecoration: "none" }}
            data-cy="forgot-password-button"
          >
            <FormattedMessage id="LOGIN.FORM.FORGOT_PASS" />
          </Link>

          <LoadingButton
            sx={{ mt: 4.5, py: 1 }}
            type="submit"
            variant="contained"
            fullWidth
            loading={status === "loading"}
            data-cy="login-button"
          >
            <FormattedMessage id="LOGIN.FORM.BUTTON" />
          </LoadingButton>
        </FormikForm>
      </Formik>
    </Box>
  );
};

export default LoginForm;

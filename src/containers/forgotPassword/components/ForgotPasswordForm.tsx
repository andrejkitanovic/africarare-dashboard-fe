import { LoadingButton } from "@mui/lab";
import { Box, Link, Typography } from "@mui/material";
import { Formik, Form as FormikForm } from "formik";
import { FormattedMessage } from "react-intl";
import {
  Link as RouterLink,
  // useHistory
} from "react-router-dom";
import * as yup from "yup";

import FormikTextField from "components/forms/FormikTextField";
// import { postLogin } from "api/user";
// import { LoginPayloadType } from "api/user/types";
// import { axiosInstance } from "api/request";
// import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  // const history = useHistory();
  const initialValues = {
    email: "",
  };
  const schema = yup.object({
    email: yup.string().required(),
  });

  // const {mutateAsync:login,  status } = useMutation(async (values: LoginPayloadType) => {
  //   const { data: loginData } = await postLogin(values);

  //   localStorage.setItem("JWToken", loginData?.token);
  //   axiosInstance.defaults.headers.common[
  //     "Authorization"
  //   ] = `Bearer ${loginData?.token}`;
  // });

  const handleSubmit = async (values: any) => {
    // await login(values, {
    //   onSuccess: () => history.push("/dashboard"),
    // });
  };

  return (
    <>
      <Box py={2} pt={2.5} borderBottom="1px solid rgba(172, 172, 172, 0.2);">
        <Typography textAlign="center" fontWeight="bold" variant="h4">
          <FormattedMessage id="FORGOT_PASSWORD.FORM.TITLE" />
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
              name="email"
              type="email"
              sx={{ mb: 1 }}
              label={<FormattedMessage id="GLOBAL.EMAIL" />}
              data-cy="email-input"
            />
            <Link
              component={RouterLink}
              to={`/login`}
              sx={{ textDecoration: "none" }}
              data-cy="back-to-login-button"
            >
              <FormattedMessage id="FORGOT_PASSWORD.FORM.LOGIN" />
            </Link>

            <LoadingButton
              sx={{ mt: 4.5, py: 1 }}
              type="submit"
              variant="contained"
              fullWidth
              // loading={status === "loading"}
              data-cy="forgot-password-button"
            >
              <FormattedMessage id="FORGOT_PASSWORD.FORM.BUTTON" />
            </LoadingButton>
          </FormikForm>
        </Formik>
      </Box>
    </>
  );
};

export default LoginForm;

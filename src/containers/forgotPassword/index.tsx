import { Paper } from "@mui/material";

import LoginLayout from "containers/login/components/LoginLayout";

import ForgotPasswordForm from "./components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <LoginLayout>
      <Paper sx={{ borderRadius: 1, width: "420px", my: 4 }}>
        <ForgotPasswordForm />
      </Paper>
    </LoginLayout>
  );
};

export default ForgotPasswordPage;

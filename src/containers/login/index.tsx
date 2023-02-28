import { Box, Paper, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

// import AlternativeLogin from "./components/AlternativeLogin";
import LoginForm from "./components/LoginForm";
import LoginLayout from "./components/LoginLayout";

const LoginPage = () => {
  return (
    <LoginLayout>
      <Paper sx={{ borderRadius: 1, maxWidth: "420px", width: "100%", my: 4 }}>
        <Box py={2} pt={2.5} borderBottom="1px solid rgba(172, 172, 172, 0.2);">
          <Typography textAlign="center" fontWeight="bold" variant="h4">
            <FormattedMessage id="LOGIN.FORM.TITLE" />
          </Typography>
        </Box>

        <LoginForm />
        {/* <Divider />
        <AlternativeLogin /> */}
      </Paper>
    </LoginLayout>
  );
};

export default LoginPage;

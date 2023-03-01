import { Stack } from "@mui/material";

import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      p={5}
      minHeight="100vh"
      sx={{
        backgroundColor: (t) => t.palette.background.default,
      }}
    >
      <RegisterForm />
    </Stack>
  );
};

export default RegisterPage;

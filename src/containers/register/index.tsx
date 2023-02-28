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
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundImage: "url('/media/auth-bg.png')",
      }}
    >
      <RegisterForm />
    </Stack>
  );
};

export default RegisterPage;

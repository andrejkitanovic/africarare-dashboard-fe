import { Box, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

import Logo from "assets/logos/logo-white.svg";
import { WithChildren } from "utils/types";

// import LoginLanguageSwitcher from "./LoginLanguageSwitcher";

const LoginLayout: FC<WithChildren> = ({ children }) => {
  return (
    <Grid
      minHeight="100vh"
      container
      sx={{
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center center",
        // backgroundSize: "cover",
        // backgroundImage: "url('/media/auth-bg.png')",
        background: (t) => t.palette.background.default,
      }}
    >
      <Grid
        item
        lg={4}
        xs={12}
        order={{ lg: 1, xs: 2 }}
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "cover",
          backgroundImage: "url('/media/login-info-bg.png')",
        }}
      >
        <Stack
          direction="column"
          py={5}
          maxWidth="340px"
          height="100%"
          justifyContent="center"
          mx="auto"
        >
          <Box mb={4}>
            <img
              alt="Africarare"
              style={{
                height: 75,
                objectPosition: "0 50%",
              }}
              src={Logo}
            />
          </Box>
          <Typography color="#fff" mb={3}>
            <FormattedMessage id="LOGIN.INFO.DESCRIPTION" />
          </Typography>

          {/* <Typography
            color="#fff"
            fontWeight="semibold"
            position="absolute"
            bottom={30}
            left={50}
          >
            <FormattedMessage id="LOGIN.INFO.APP" />
          </Typography> */}
          {/* <LoginLanguageSwitcher /> */}
        </Stack>
      </Grid>
      <Grid item lg={8} xs={12} order={{ lg: 2, xs: 1 }}>
        <Stack
          direction="column"
          // py={5}
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LoginLayout;

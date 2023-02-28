import { Box, Button, Typography } from "@mui/material";
import React from "react";
import GoogleLogin from "react-google-login";
import { FormattedMessage } from "react-intl";

import { ReactComponent as GoogleSVG } from "assets/icons/google.svg";

const AlternativeLogin = () => {
  return (
    <Box py={3} px={5}>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ""}
        onSuccess={() => {}}
        onFailure={() => {}}
        cookiePolicy={"single_host_origin"}
        render={({ onClick, disabled }) => (
          <Button
            variant="outlined"
            sx={{
              py: 1,
              textTransform: "capitalize",
            }}
            fullWidth
            onClick={onClick}
            disabled={disabled}
          >
            <GoogleSVG
              style={{ marginRight: 8, height: 20, objectFit: "contain" }}
            />
            <Typography variant="body2">
              <FormattedMessage id="LOGIN.FORM.GOOGLE" />
            </Typography>
          </Button>
        )}
      />
    </Box>
  );
};

export default AlternativeLogin;

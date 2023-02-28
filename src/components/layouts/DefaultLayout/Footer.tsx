import { Link, Stack, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";

import Logo from "assets/logos/logo.svg";

const Footer = () => {
  return (
    <Stack
      component="footer"
      alignItems="center"
      sx={{
        minHeight: { xs: "auto", md: 46 },
        px: { xs: 1, md: 3 },
        py: { xs: 2, md: 0 },
        backgroundColor: (t) => t.palette.background.paper,
      }}
      justifyContent="space-between"
      data-cy="footer"
      direction={{ xs: "column", md: "row" }}
      spacing={2}
    >
      <Stack direction="row" alignItems="center">
        <img
          alt="Africarare"
          style={{
            height: 29,
            objectFit: "contain",
            objectPosition: "0 50%",
            paddingRight: 8,
          }}
          src={Logo}
        />
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={{ xs: 0.5, md: 2 }}
      >
        <Link
          component={RouterLink}
          to={`/support`}
          sx={{ textDecoration: "none" }}
        >
          <FormattedMessage id="FOOTER.SUPPORT" />
        </Link>
        <Link
          component={RouterLink}
          to={`/privacy-policy`}
          sx={{ textDecoration: "none" }}
        >
          <FormattedMessage id="FOOTER.PRIVACY_POLICY" />
        </Link>
        <Typography sx={{ color: (t) => t.palette.grey[500] }}>
          {new Date().getFullYear()} &copy;
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;

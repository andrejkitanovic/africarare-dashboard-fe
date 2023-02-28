import { useTheme } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

const SEO = () => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Helmet
      title={intl.formatMessage({ id: "DOCUMENT.TITLE" })}
      htmlAttributes={{ lang: intl.locale }}
      meta={[
        {
          name: `description`,
          content: intl.formatMessage({ id: "DOCUMENT.DESCRIPTION" }),
        },
        {
          name: "theme-color",
          content: theme.palette.primary.main,
        },
      ]}
    />
  );
};

export default SEO;

import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { FormattedMessage } from "react-intl";

import { WithChildren } from "utils/types";

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      height="100vh"
      p={2}
      sx={{
        backgroundColor: (t) => t.palette.background.default,
        color: "#fff",
      }}
    >
      <Typography
        mt={4}
        mb={3}
        variant="h1"
        className="text-3xl font-bold mb-6"
        fontWeight={700}
        textAlign="center"
      >
        <FormattedMessage id="ERROR_BOUNDARY.HEADER" />
      </Typography>

      <Typography fontSize={20}>
        <FormattedMessage id="ERROR_BOUNDARY.SUBHEADER1" />
      </Typography>
      <Typography mb={5} mt={7}>
        <FormattedMessage id="ERROR_BOUNDARY.SUBHEADER2" />
      </Typography>
      <Stack direction="row" alignItems="center">
        <Button
          size="medium"
          variant="contained"
          sx={{ fontWeight: "bold", width: 180, fontSize: "14px" }}
          onClick={resetErrorBoundary}
        >
          <FormattedMessage id="ERROR_BOUNDARY.BUTTON.DASHBOARD" />
        </Button>
        <Typography mx={2}>
          <FormattedMessage id="ERROR_BOUNDARY.OR" />
        </Typography>
        <Button
          size="medium"
          variant="contained"
          sx={{ fontWeight: "bold", width: 180, fontSize: "14px" }}
          onClick={() => window.location.reload()}
        >
          <FormattedMessage id="ERROR_BOUNDARY.BUTTON.REFRESH" />
        </Button>
      </Stack>
    </Stack>
  );
};

const GlobalErrorBoundary: FC<WithChildren> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        // we could send some error data to external system like DataDog etc. here
        console.error({ error, info });
      }}
      onReset={() => (window.location.pathname = "/dashboard")}
    >
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;

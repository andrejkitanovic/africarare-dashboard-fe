import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  // SnackbarKey,
  useSnackbar,
} from "notistack";
import React, { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";

import { WithChildren } from "utils/types";
// import { IconButton } from "@material-ui/core";
// import CloseIcon from "@material-ui/icons/Close";

const ReactQueryProvider: FC<WithChildren> = ({ children }) => {
  const {
    enqueueSnackbar,
    // closeSnackbar
  } = useSnackbar();

  // const action = useCallback(
  //   (key: SnackbarKey) => (
  //     <IconButton
  //       className="text-white"
  //       aria-label="delete"
  //       onClick={() => closeSnackbar(key)}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   ),
  //   [closeSnackbar]
  // );

  const handleError = useCallback(
    (error: any) => {
      enqueueSnackbar(
        error?.data?.message || <FormattedMessage id="GLOBAL.ERROR_MESSAGE" />,
        {
          variant: "error",
          // action
        }
      );
    },
    [
      enqueueSnackbar,
      // action
    ]
  );

  const handleSuccess = useCallback(
    (response: any) => {
      enqueueSnackbar(
        response?.message || <FormattedMessage id="GLOBAL.SUCCESS_MESSAGE" />,
        {
          variant: "success",
          // action,
        }
      );
    },
    [enqueueSnackbar]
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: handleError,
      },
      mutations: {
        onError: handleError,
        onSuccess: handleSuccess,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

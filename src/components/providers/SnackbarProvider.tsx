import { SnackbarProvider as SnackbarActualProvider } from "notistack";
import React, { FC } from "react";

import { WithChildren } from "utils/types";

const SnackbarProvider: FC<WithChildren> = ({ children }) => {
  return (
    <SnackbarActualProvider maxSnack={3}>{children}</SnackbarActualProvider>
  );
};

export default SnackbarProvider;

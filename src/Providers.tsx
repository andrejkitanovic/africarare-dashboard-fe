import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import enLocale from "date-fns/locale/en-GB";
import * as H from "history";
import React, { FC, Suspense } from "react";
import { Router } from "react-router-dom";

import GlobalErrorBoundary from "components/providers/GlobalErrorBoundary";
import { I18nProvider } from "components/providers/I18nProvider";
import { LangaugeProvider } from "i18n";
import theme from "theme";
import { WithChildren } from "utils/types";

import ReactQueryProvider from "./components/providers/ReactQueryProvider";
import SEOProvider from "./components/providers/SEOProvider";
import SnackbarProvider from "./components/providers/SnackbarProvider";
import SplashScreenProvider from "./components/providers/SplashScreenProvider";

const Providers: FC<WithChildren<{ history: H.History }>> = ({
  children,
  history,
}) => {
  return (
    <>
      <CssBaseline />
      <LangaugeProvider>
        <I18nProvider>
          <ThemeProvider theme={theme}>
            <SEOProvider />
            <LocalizationProvider dateAdapter={DateAdapter} locale={enLocale}>
              <GlobalErrorBoundary>
                <SplashScreenProvider>
                  <Suspense fallback={<></>}>
                    {/* 
                    // @ts-ignore */}
                    <Router history={history}>
                      <SnackbarProvider>
                        <ReactQueryProvider>{children}</ReactQueryProvider>
                      </SnackbarProvider>
                    </Router>
                  </Suspense>
                </SplashScreenProvider>
              </GlobalErrorBoundary>
            </LocalizationProvider>
          </ThemeProvider>
        </I18nProvider>
      </LangaugeProvider>
    </>
  );
};

export default Providers;

import React, { FC } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

import { LayoutSplashScreen } from "components/providers/SplashScreenProvider";

const AuthRoute: FC<RouteProps> = (props) => {
  const isAuthenticated = localStorage.getItem("JWToken");
  const location = useLocation<{ unauthorized401?: boolean }>();

  if (isAuthenticated) {
    if (location.state?.unauthorized401) {
      // logout({ returnTo: `${window.location.origin}/login` });
      return <LayoutSplashScreen />;
    }

    if (location.pathname === "/login" || location.pathname === "/register") {
      return <Redirect to="/" />;
    }
  }

  return <Route {...props} />;
};

export default AuthRoute;

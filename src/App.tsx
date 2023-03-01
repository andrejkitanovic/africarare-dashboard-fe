import { createBrowserHistory } from "history";
import React from "react";
import { Redirect, Switch } from "react-router-dom";

import ForgotPasswordPage from "containers/forgotPassword";
import LandsPage from "containers/lands";
import LoginPage from "containers/login";
import OrganisationsPage from "containers/organisations";
import OrganisationDetails from "containers/organisations/details";
import PrivacyPolicyPage from "containers/privacy-policy";
import RegisterPage from "containers/register";
import SupportPage from "containers/support";
import UserNotifications from "containers/user/notifications";
import UserProfile from "containers/user/profile";
import UsersPage from "containers/users";

import AuthRoute from "./components/routes/AuthRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import DashboardPage from "./containers/dashboard";
import Providers from "./Providers";

export const history = createBrowserHistory();

export default function App() {
  return (
    <Providers history={history}>
      <Switch>
        <AuthRoute exact component={LoginPage} path="/login" />
        <AuthRoute
          exact
          component={ForgotPasswordPage}
          path="/forgot-password"
        />
        <AuthRoute exact component={RegisterPage} path="/register/:id" />

        <PrivateRoute
          exact
          path="/dashboard"
          component={DashboardPage}
          breadcrumbs={[
            { translationId: "HEADER.DASHBOARD", pathname: "/dashboard" },
          ]}
          // requiredPermissions={[]}
        />
        <PrivateRoute
          exact
          path="/lands"
          component={LandsPage}
          breadcrumbs={[{ translationId: "HEADER.LANDS", pathname: "/lands" }]}
          // requiredPermissions={[]}
        />
        <PrivateRoute
          exact
          path="/users"
          component={UsersPage}
          breadcrumbs={[{ translationId: "HEADER.USERS", pathname: "/users" }]}
          requiredRole={["portal-admin", "land-owner"]}
          requiredPermissions={["read:users"]}
        />

        <PrivateRoute
          exact
          path="/organisations"
          component={OrganisationsPage}
          breadcrumbs={[
            {
              translationId: "HEADER.ORGANISATIONS",
              pathname: "/organisations",
            },
          ]}
          requiredRole={["portal-admin"]}
          requiredPermissions={["read:organisations"]}
        />
        <PrivateRoute
          exact
          path="/organisations/:organisationId"
          component={OrganisationDetails}
          breadcrumbs={[
            {
              translationId: "HEADER.ORGANISATIONS",
              pathname: "/organisations",
            },
            {
              translationId: "GLOBAL.DETAILS",
              pathname: "#",
            },
          ]}
          requiredRole={["portal-admin"]}
          requiredPermissions={["read:organisations"]}
        />

        <PrivateRoute
          exact
          path="/user/profile"
          component={UserProfile}
          breadcrumbs={[
            {
              translationId: "HEADER.USER",
              pathname: "/user/profile",
            },
            {
              translationId: "HEADER.PROFILE",
              pathname: "/user/profile",
            },
          ]}
        />
        <PrivateRoute
          exact
          path="/user/notifications"
          component={UserNotifications}
          breadcrumbs={[
            {
              translationId: "HEADER.USER",
              pathname: "/user/profile",
            },
            {
              translationId: "HEADER.NOTIFICATIONS",
              pathname: "/user/notifications",
            },
          ]}
        />

        <AuthRoute exact component={PrivacyPolicyPage} path="/privacy-policy" />
        <PrivateRoute exact component={SupportPage} path="/support" />

        <Redirect to="/dashboard" />
      </Switch>
    </Providers>
  );
}

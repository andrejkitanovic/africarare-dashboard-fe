import { Box } from "@mui/material";
import React, { ElementType, FC, useEffect } from "react";
import { Route, RouteProps, match, useHistory } from "react-router-dom";
import shallow from "zustand/shallow";

import { axiosInstance } from "api/request";
import { getCurrentUser } from "api/user";
import { UserOrgTypeRoleType } from "api/user/types";
import DefaultLayout from "components/layouts/DefaultLayout";
import { LayoutSplashScreen } from "components/providers/SplashScreenProvider";
import {
  hasPermissions,
  hasRole,
  useUserStore,
} from "components/stores/UserStore";
import { PermissionsType } from "components/stores/UserStore/permissions";

import useBreadcrumbStore, { Breadcrumb } from "../stores/BreadcrumbStore";
interface Props extends RouteProps {
  showBreadcrumbs?: boolean;
  computedMatch?: match;
  breadcrumbs?: Breadcrumb[];
  requiredPermissions?: PermissionsType[];
  requiredRole?: UserOrgTypeRoleType[];
  layout?: ElementType;
}

const PrivateRoute: FC<Props> = ({
  showBreadcrumbs = true,
  requiredPermissions = [],
  requiredRole = [],
  breadcrumbs,
  layout: Layout = DefaultLayout,
  ...rest
}) => {
  const history = useHistory();
  const { setBreadcrumbs } = useBreadcrumbStore(
    (s) => ({ setBreadcrumbs: s.setBreadcrumbs }),
    shallow
  );
  const [user, setToken, setUser] = useUserStore((s) => [
    s.user,
    s.setToken,
    s.setUser,
  ]);

  useEffect(() => {
    const getTokenAndInjectItInHeader = async () => {
      try {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("JWToken")}`;

        const { data: currentUser } = await getCurrentUser();
        const user = currentUser?.data;

        setUser(user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("JWToken");
        history.push("/login");
      }
    };

    if (localStorage.getItem("JWToken")) {
      getTokenAndInjectItInHeader();
    } else history.push("/login");
  }, [history, setToken, setUser]);

  useEffect(() => {
    if (!!user && breadcrumbs) {
      setBreadcrumbs(breadcrumbs, rest.computedMatch!.params);
    }
  }, [breadcrumbs, rest.computedMatch, setBreadcrumbs, user]);

  if (!!user) {
    if (hasPermissions(requiredPermissions) && hasRole(requiredRole)) {
      return (
        <Layout showBreadcrumbs={showBreadcrumbs}>
          <Route {...rest} />
        </Layout>
      );
    } else {
      // TODO | Add translations
      return (
        <Layout showBreadcrumbs={showBreadcrumbs}>
          <Box>You don't have access to this page</Box>
        </Layout>
      );
    }
  }

  return <LayoutSplashScreen />;
};

export default PrivateRoute;

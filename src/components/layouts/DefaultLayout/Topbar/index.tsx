import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useIsFetching } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import useBreadcrumbStore from "components/stores/BreadcrumbStore";
import { useUserStore } from "components/stores/UserStore";

import UserDrawer from "../UserDrawer";
import LanguageSwitcher from "./LanguageSwitcher";

interface TopbarProps {
  isMobile: boolean;
  toggleMobileDrawer: () => void;
  showBreadcrumbs: boolean;
}

const Topbar = ({
  isMobile,
  toggleMobileDrawer,
  showBreadcrumbs,
}: TopbarProps) => {
  const isFetching = useIsFetching();

  const { breadcrumbs } = useBreadcrumbStore((s) => ({
    breadcrumbs: s.breadcrumbs,
  }));

  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
  const toggleUserDrawer = () => setIsUserDrawerOpen((prev) => !prev);

  const [user] = useUserStore((s) => [s.user]);

  const userName = user?.name;

  const userInitials =
    userName
      ?.split(" ")
      .map((chunk: string) => chunk.charAt(0))
      .join("") || "";

  return (
    <AppBar
      color="inherit"
      position={isMobile ? "fixed" : "sticky"}
      elevation={0}
      sx={{
        borderTop: "none",
        borderRight: "none",
        borderLeft: "none",
        mt: -0.5,
        borderRadius: 0,
        borderBottom: "1px solid #363636",
      }}
    >
      <Toolbar disableGutters>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 1, mt: 1 }}
            onClick={toggleMobileDrawer}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          sx={{
            mt: 1,
            ml: isMobile ? 1 : 3,
            mr: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {showBreadcrumbs &&
              breadcrumbs.map((breadcrumb, i, arr) => {
                return (
                  <Fragment key={i}>
                    <Link
                      to={breadcrumb.pathname}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontWeight: "bold",
                          color: "#707070",
                          mt: 0.5,
                          // color: (theme) => theme.palette.primary.dark,
                          // ":hover": {
                          //   color: (theme) => theme.palette.primary.main,
                          // },
                        }}
                      >
                        {breadcrumb.translationId ? (
                          <FormattedMessage id={breadcrumb.translationId} />
                        ) : (
                          breadcrumb.title
                        )}
                      </Typography>
                    </Link>
                    {i < arr.length - 1 && (
                      <Typography
                        sx={{
                          mx: 0.5,
                          color: (theme) => theme.palette.grey[600],
                        }}
                        // variant="subtitle1"
                        component="span"
                      >
                        &#8226;
                      </Typography>
                    )}
                  </Fragment>
                );
              })}
          </Box>

          <Stack direction="row" alignItems="center">
            {!isMobile && <LanguageSwitcher />}
            <Box>
              <Button
                sx={{
                  boxShaodw: "none",
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  // color: (theme) => theme.palette.grey[800],
                  // ":hover": {
                  //   backgroundColor: (theme) => theme.palette.grey[200],
                  // },
                }}
                onClick={toggleUserDrawer}
                data-cy="user-drawer-button"
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  {!isMobile && (
                    <Typography sx={{ mt: 0.5, color: "#fff" }}>
                      {userName}
                    </Typography>
                  )}
                  <Avatar
                    sx={{
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: "#fff",
                      fontSize: Math.min(35, 40 / userInitials.length),
                      pt: 0.5,
                    }}
                    variant="rounded"
                  >
                    {userInitials.toUpperCase()}
                  </Avatar>
                </Stack>
              </Button>
              <UserDrawer
                isOpen={isUserDrawerOpen}
                onClose={toggleUserDrawer}
              />
            </Box>
          </Stack>
        </Box>
      </Toolbar>
      {isFetching ? <LinearProgress color="primary" /> : <Box height="4px" />}
    </AppBar>
  );
};

export default Topbar;

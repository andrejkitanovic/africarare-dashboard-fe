import { Box, Theme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";

import ScrollTopProvider from "components/providers/ScrollTopProvider";
import { WithChildren } from "utils/types";

import Footer from "./Footer";
import SidebarDrawer from "./SidebarDrawer";
import Topbar from "./Topbar";

interface DefaultLayoutProps {
  showBreadcrumbs: boolean;
}

const DefaultLayout = ({
  showBreadcrumbs,
  children,
}: WithChildren<DefaultLayoutProps>) => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  const previousSidebarState: boolean | null =
    localStorage.getItem("sidebar-state") &&
    JSON.parse(localStorage.getItem("sidebar-state") as string);

  const [isDesktopDrawerShrinked, setIsDesktopDrawerShrinked] = useState(
    previousSidebarState ?? false
  );
  const toggleDesktopDrawer = () =>
    setIsDesktopDrawerShrinked((prev) => {
      const newSidebarState = !prev;
      localStorage.setItem("sidebar-state", JSON.stringify(newSidebarState));
      return !prev;
    });

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const toggleMobileDrawer = () => setIsMobileDrawerOpen((prev) => !prev);

  return (
    <ScrollTopProvider>
      <Box
        display="grid"
        gridTemplateAreas="
        'sidebar topbar' 
        'sidebar content'
      "
        gridTemplateColumns="min-content 1fr"
        gridTemplateRows="min-content 1fr"
        height="100vh"
        width="100vw"
      >
        <Box gridArea="sidebar">
          <SidebarDrawer
            isMobile={isMobile}
            isMobileDrawerOpen={isMobileDrawerOpen}
            toggleMobileDrawer={toggleMobileDrawer}
            isDesktopDrawerShrinked={isDesktopDrawerShrinked}
            toggleDesktopDrawer={toggleDesktopDrawer}
          />
        </Box>

        <Box gridArea="topbar">
          <Topbar
            isMobile={isMobile}
            showBreadcrumbs={showBreadcrumbs}
            toggleMobileDrawer={toggleMobileDrawer}
          />
        </Box>

        <Box
          gridArea="content"
          minHeight="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          sx={{
            overflow: "auto",
            paddingTop: isMobile ? "64px" : 0,
          }}
          className="content"
        >
          {/* Place for Alert */}
          {/* <Alert
            onClose={() => {}}
            severity="error"
            sx={{ borderRadius: 0, overflow: "visible", alignItems: "center" }}
          >
            Poštovani, vaša pretplata ističe <b>1. Januara 2023.</b> molimo Vas
            produžite pretplatu
          </Alert> */}
          <Box
            component="main"
            sx={{
              position: "relative",
              flexGrow: 1,
              p: isMobile ? 2 : 3,
              py: isMobile ? 4 : 2,
              backgroundColor: (t) => t.palette.background.default,
            }}
          >
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </ScrollTopProvider>
  );
};

export default DefaultLayout;

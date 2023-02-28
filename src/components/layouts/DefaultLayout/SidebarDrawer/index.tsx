import { Box } from "@mui/material";
import React from "react";

import DesktopSidebarDrawer from "./DesktopSidebarDrawer";
import MobileSidebarDrawer from "./MobileSidebarDrawer";

interface Props {
  isMobile: boolean;
  isMobileDrawerOpen: boolean;
  toggleMobileDrawer: () => void;
  isDesktopDrawerShrinked: boolean;
  toggleDesktopDrawer: () => void;
}

const SidebarDrawer = ({
  isMobile,
  isMobileDrawerOpen,
  toggleMobileDrawer,
  isDesktopDrawerShrinked,
  toggleDesktopDrawer,
}: Props) => {
  const wideDrawerWidth = 225;
  const narrowDrawerWidth = 64;

  const menuDrawerWidth = isDesktopDrawerShrinked
    ? narrowDrawerWidth
    : wideDrawerWidth;

  return (
    <Box
      component="nav"
      sx={{ width: { md: menuDrawerWidth }, flexShrink: { md: 0 } }}
      data-cy="navigation"
    >
      {isMobile ? (
        <MobileSidebarDrawer
          wideDrawerWidth={wideDrawerWidth}
          isMobileDrawerOpen={isMobileDrawerOpen}
          toggleMobileDrawer={toggleMobileDrawer}
        />
      ) : (
        <DesktopSidebarDrawer
          wideDrawerWidth={wideDrawerWidth}
          menuDrawerWidth={menuDrawerWidth}
          isDesktopDrawerShrinked={isDesktopDrawerShrinked}
          toggleDesktopDrawer={toggleDesktopDrawer}
        />
      )}
    </Box>
  );
};

export default SidebarDrawer;

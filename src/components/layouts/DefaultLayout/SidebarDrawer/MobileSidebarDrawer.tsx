import { Box, Divider, Drawer, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

// LOGO:
import Logo from "assets/logos/logo.svg";

import SidebarMenu from "./SidebarMenu";

interface Props {
  wideDrawerWidth: number;
  isMobileDrawerOpen: boolean;
  toggleMobileDrawer: () => void;
}

const MobileSidebarDrawer = ({
  wideDrawerWidth,
  isMobileDrawerOpen,
  toggleMobileDrawer,
}: Props) => {
  return (
    <Drawer
      sx={{ "& .MuiDrawer-paper": { width: wideDrawerWidth } }}
      variant="temporary"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      open={isMobileDrawerOpen}
      onClose={toggleMobileDrawer}
    >
      <Toolbar disableGutters>
        <Box sx={{ pl: 2 }}>
          <Link to="/dashboard">
            <img
              alt="Africarare"
              style={{
                height: 25,
                objectFit: "contain",
                objectPosition: "0 50%",
              }}
              src={Logo}
            />
          </Link>
        </Box>
      </Toolbar>
      <Divider />
      <SidebarMenu onClose={toggleMobileDrawer} />
    </Drawer>
  );
};

export default MobileSidebarDrawer;

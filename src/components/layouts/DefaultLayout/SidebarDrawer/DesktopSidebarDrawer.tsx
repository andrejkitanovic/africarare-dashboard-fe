import {
  KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon,
  KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon,
} from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// LOGO:
import Logo from "assets/logos/logo.svg";

import SidebarMenu from "./SidebarMenu";

interface DesktopSidebarDrawerProps {
  wideDrawerWidth: number;
  menuDrawerWidth: number;
  isDesktopDrawerShrinked: boolean;
  toggleDesktopDrawer: () => void;
}

const DesktopSidebarDrawer = ({
  wideDrawerWidth,
  menuDrawerWidth,
  isDesktopDrawerShrinked,
  toggleDesktopDrawer,
}: DesktopSidebarDrawerProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width:
            isDesktopDrawerShrinked && isMouseOver
              ? wideDrawerWidth
              : menuDrawerWidth,
          transition: "width 0.1s ease-out",
          overflow: "hidden",
          border: "none",
          borderRadius: 0,
          borderRight: "1px solid #363636",
        },
      }}
    >
      <Box
        sx={{ height: "100%" }}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent:
              !isDesktopDrawerShrinked || isMouseOver
                ? "space-between"
                : "center",
            alignItems: "center",
            border: "none",
          }}
          disableGutters
        >
          {(!isDesktopDrawerShrinked || isMouseOver) && (
            <Box sx={{ pl: 2 }}>
              <Link to="/dashboard">
                <img
                  alt="Africarare"
                  style={{
                    height: 35,
                    // objectFit: "contain",
                    objectPosition: "0 50%",
                  }}
                  src={Logo}
                />
              </Link>
            </Box>
          )}

          <Box sx={{ px: 1 }}>
            <IconButton color="primary" onClick={toggleDesktopDrawer}>
              {isDesktopDrawerShrinked ? (
                <KeyboardDoubleArrowRightIcon />
              ) : (
                <KeyboardDoubleArrowLeftIcon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
        <Divider />
        <SidebarMenu />
      </Box>
    </Drawer>
  );
};

export default DesktopSidebarDrawer;

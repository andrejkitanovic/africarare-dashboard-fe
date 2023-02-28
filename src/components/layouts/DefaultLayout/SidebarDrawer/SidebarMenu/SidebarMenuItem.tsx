import { ListItemIcon, ListItemText, MenuItem, useTheme } from "@mui/material";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

export interface SidebarMenuItemsProps {
  icon: JSX.Element;
  text: string | JSX.Element;
  link: string;
  onClick?: () => void;
}

const SidebarMenuItem = ({
  icon,
  text,
  link,
  onClick,
}: SidebarMenuItemsProps) => {
  const theme = useTheme();
  const history = useHistory();
  const { pathname } = useLocation();

  const isSelected = pathname.includes(link);

  return (
    <MenuItem
      onClick={() => {
        history.push(link);
        onClick && onClick();
      }}
      sx={{
        py: 1.5,
        pl: 0,
        mb: 0.5,
        mx: 1,
        borderRadius: 2,
        overflow: "hidden",
        "&.Mui-selected": {
          backgroundColor: "#363636",
        },
        "&.Mui-selected:hover": {
          backgroundColor: "#464646",
        },
      }}
      selected={isSelected}
    >
      <ListItemIcon
        sx={{
          width: 48,
          justifyContent: "center",
          color: theme.palette.primary.main,
          "& svg g [fill]": {
            fill: theme.palette.primary.main,
          },
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        sx={{
          color: "#707070",
          ".MuiTypography-root": {
            mt: 0.15,
            mb: -0.15,
            fontWeight: 500,
          },
        }}
      >
        {text}
      </ListItemText>
    </MenuItem>
  );
};

export default SidebarMenuItem;

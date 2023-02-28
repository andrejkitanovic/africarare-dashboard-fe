import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  FiberManualRecord as FiberManualRecordIcon,
} from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem, useTheme } from "@mui/material";
import { Collapse } from "@mui/material";
import { List } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { UserOrgTypeRoleType } from "api/user/types";

import SidebarMenuItem, { SidebarMenuItemsProps } from "./SidebarMenuItem";

export interface SidebarMenuDropdownProps {
  icon: JSX.Element;
  text: string | JSX.Element;
  link: string;
  list: Array<
    Omit<
      SidebarMenuItemsProps & { requiredRole?: UserOrgTypeRoleType[] },
      "icon"
    >
  >;
  onClick?: () => void;
}

const SidebarMenuDropdown = ({
  icon,
  text,
  link,
  list,
  onClick,
}: SidebarMenuDropdownProps) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((p) => !p);
  };

  const isSelected = pathname.includes(link);

  return (
    <>
      <MenuItem
        onClick={handleClick}
        sx={{
          py: 1.3,
          pl: 0,
          mb: 0.5,
          mx: 1,
          borderRadius: 2,
          overflow: "hidden",
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
          }}
        >
          {text}
        </ListItemText>
        {open ? (
          <ExpandLessIcon
            sx={{
              color: "#707070",
            }}
          />
        ) : (
          <ExpandMoreIcon
            sx={{
              color: "#707070",
            }}
          />
        )}
      </MenuItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {list.map(({ text, link }) => (
            <SidebarMenuItem
              key={link}
              icon={<FiberManualRecordIcon sx={{ transform: "scale(0.5)" }} />}
              text={text}
              link={link}
              onClick={onClick}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarMenuDropdown;

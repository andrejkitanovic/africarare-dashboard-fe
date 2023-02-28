import {
  BusinessCenter as BusinessCenterIcon,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Terrain as Terrainicon,
} from "@mui/icons-material";
import { Box, Divider, MenuList, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

import { UserOrgTypeRoleType } from "api/user/types";
import { hasPermissions, hasRole } from "components/stores/UserStore";
import { PermissionsType } from "components/stores/UserStore/permissions";

import SidebarMenuDropdown from "./SidebarMenuDropdown";
import SidebarMenuItem, { SidebarMenuItemsProps } from "./SidebarMenuItem";

export type SidebarMenuListChild = Array<
  SidebarMenuItemsProps & {
    requiredPermissions?: PermissionsType[];
    requiredRole?: UserOrgTypeRoleType[];
    dropdown?: Array<
      Omit<
        SidebarMenuItemsProps & { requiredRole?: UserOrgTypeRoleType[] },
        "icon"
      >
    >;
  }
>;

type SidebarMenuList = Array<{
  id: string;
  text: string | JSX.Element;
  list: SidebarMenuListChild;
}>;

const sidebarMenuListOperational: SidebarMenuListChild = [
  {
    icon: <DashboardIcon />,
    text: <FormattedMessage id="HEADER.DASHBOARD" />,
    link: "/dashboard",
  },
  {
    icon: <Terrainicon />,
    text: <FormattedMessage id="HEADER.LANDS" />,
    link: "/lands",
  },
];

const sidebarMenuListAdmin: SidebarMenuListChild = [
  {
    icon: <GroupIcon />,
    text: <FormattedMessage id="HEADER.USERS" />,
    requiredPermissions: ["read:users"],
    requiredRole: ["portal-admin", "organisation-owner"],
    link: "/users",
  },
];

const sidebarMenuListSystem: SidebarMenuListChild = [
  {
    icon: <BusinessCenterIcon />,
    text: <FormattedMessage id="HEADER.ORGANISATIONS" />,
    requiredPermissions: ["read:organisations"],
    requiredRole: ["portal-admin"],
    link: "/organisations",
  },
];

const sidebarMenuList: SidebarMenuList = [
  {
    id: "operational",
    text: <FormattedMessage id="HEADER.OPERATIONAL" />,
    list: sidebarMenuListOperational,
  },
  {
    id: "admin",
    text: <FormattedMessage id="HEADER.ADMIN" />,
    list: sidebarMenuListAdmin,
  },
  {
    id: "system",
    text: <FormattedMessage id="HEADER.SYSTEM" />,
    list: sidebarMenuListSystem,
  },
];

interface Props {
  onClose?: () => void;
}

const SidebarMenu = ({ onClose }: Props) => {
  return (
    <MenuList
      sx={{
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "calc(100% - 45px)",
        pt: 0,
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {sidebarMenuList.map(({ id, list, text }) => {
        const filteredList = list.filter(
          ({ requiredRole, requiredPermissions }) =>
            hasPermissions(requiredPermissions) && hasRole(requiredRole)
        );

        if (!filteredList.length) {
          return null;
        }

        return (
          <Box key={id}>
            <Typography
              variant="body2"
              sx={{
                ml: 1,
                my: 1.5,
                width: "80%",
                overflowX: "hidden",
                textOverflow: "ellipsis",
                fontWeight: (t) => t.typography.fontWeightBold,
              }}
            >
              {text}
            </Typography>
            {filteredList.map(({ icon, text, link, dropdown }) => {
              if (dropdown) {
                return (
                  <SidebarMenuDropdown
                    key={link}
                    icon={icon}
                    text={text}
                    link={link}
                    list={dropdown}
                    onClick={onClose}
                  />
                );
              }

              return (
                <SidebarMenuItem
                  key={link}
                  icon={icon}
                  text={text}
                  link={link}
                  onClick={onClose}
                />
              );
            })}
            <Divider sx={{ mx: 1 }} />
          </Box>
        );
      })}
    </MenuList>
  );
};

export default SidebarMenu;

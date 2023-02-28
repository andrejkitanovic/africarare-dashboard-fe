import { ListItemAvatar } from "@material-ui/core";
import {
  BusinessCenterOutlined as BusinessCenterOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  LockOpenOutlined as LockOpenOutlinedIcon,
  ManageAccounts as ManageAccountsIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

import { useUserStore } from "components/stores/UserStore";
import { roleFormatter } from "components/Table/formatters/roleFormatter";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UserDrawer = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();

  const [user] = useUserStore((s) => [s.user]);
  // const { logout } = useAuth0();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("JWToken");
    queryClient.removeQueries([]);
    history.push("/login");
    // logout({ returnTo: `${window.location.origin}/login` });
    onClose();
  };

  const userName = user?.name;

  const userInitials =
    userName
      ?.split(" ")
      .map((chunk: string) => chunk.charAt(0))
      .join("") || "";

  return (
    <Drawer
      PaperProps={{
        sx: {
          width: { xs: "320px", sm: "400px" },
          p: { xs: 2, sm: 3 },
          borderRadius: 0,
          backgroundColor: (t) => t.palette.background.default,
        },
      }}
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={onClose}
      data-cy="user-drawer"
    >
      <Typography variant="h4" sx={{ p: 1 }}>
        <FormattedMessage id="USER_SIDEBAR.HEADER" />
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2, p: 1 }}>
        <Avatar
          variant="rounded"
          sx={{
            width: 67,
            height: 67,
            fontSize: Math.min(45, 65 / userInitials.length),
            bgcolor: "primary.main",
            color: "#fff",
            pt: 1,
          }}
        >
          {userInitials.toUpperCase()}
        </Avatar>
        <Stack sx={{ minWidth: 0 }}>
          <Typography
            variant="h4"
            noWrap
            sx={{ fontWeight: (t) => t.typography.fontWeightMedium }}
          >
            {userName}
          </Typography>
          <Button
            variant="contained"
            sx={{ width: "100%", mt: 1 }}
            onClick={handleLogout}
            data-cy="logout-button"
          >
            <FormattedMessage id="HEADER.LOGOUT" />
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3, mx: 1 }} />

      <Stack sx={{ minWidth: 0, mx: 1 }}>
        <Stack direction="row" sx={{ mb: 2 }}>
          <BusinessCenterOutlinedIcon sx={{ mr: 1 }} />
          <Typography noWrap>{user?.organisation.name}</Typography>
        </Stack>

        <Stack direction="row" sx={{ mb: 2 }}>
          <LockOpenOutlinedIcon sx={{ mr: 1 }} />
          <Typography noWrap>{roleFormatter(user?.role)}</Typography>
        </Stack>

        <Stack direction="row">
          <EmailOutlinedIcon sx={{ mr: 1 }} />
          <Typography noWrap>{user?.email}</Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3, mx: 1 }} />

      <List>
        <ListItemButton
          onClick={() => {
            history.push("/user/profile");
            onClose();
          }}
          sx={{ px: 1 }}
        >
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              sx={{
                backgroundColor: (t) => t.palette.grey[800],
                color: (t) => t.palette.primary.main,
              }}
            >
              <ManageAccountsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<FormattedMessage id="USER_SIDEBAR.MY_PROFILE.HEADER" />}
            secondary={
              <FormattedMessage id="USER_SIDEBAR.MY_PROFILE.SUBHEADER" />
            }
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default UserDrawer;

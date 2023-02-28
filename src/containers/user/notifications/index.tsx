import { Divider, Paper } from "@mui/material";
import { FC } from "react";

import NotificationsHeader from "./NotificationsHeader/NotificationsHeader";
import NotificationsTable from "./NotificationsTable/NotificationsTable";

const UserNotifications: FC = () => {
  return (
    <>
      <Paper>
        <NotificationsHeader />
        <Divider />
        <NotificationsTable />
      </Paper>
    </>
  );
};

export default UserNotifications;

import { Notifications as NotificationsIcon } from "@mui/icons-material";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import TableHeader from "components/Table/components/TableHeader";

const NotificationsHeader: FC = () => {
  return (
    <>
      <TableHeader
        icon={NotificationsIcon}
        label={<FormattedMessage id="HEADER.NOTIFICATIONS" />}
      ></TableHeader>
    </>
  );
};

export default NotificationsHeader;

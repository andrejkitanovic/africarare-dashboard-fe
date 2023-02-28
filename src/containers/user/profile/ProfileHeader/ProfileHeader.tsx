import { ManageAccounts as ManageAccountsIcon } from "@mui/icons-material";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import TableHeader from "components/Table/components/TableHeader";

const ProfileHeader: FC = () => {
  return (
    <>
      <TableHeader
        icon={ManageAccountsIcon}
        label={<FormattedMessage id="HEADER.PROFILE" />}
      ></TableHeader>
    </>
  );
};

export default ProfileHeader;

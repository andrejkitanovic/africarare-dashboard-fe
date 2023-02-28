import { History as HistoryIcon } from "@mui/icons-material";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import TableHeader from "components/Table/components/TableHeader";

const ProfileHistoryHeader: FC = () => {
  return (
    <>
      <TableHeader
        icon={HistoryIcon}
        label={<FormattedMessage id="PROFILE.HISTORY.TITLE" />}
      ></TableHeader>
    </>
  );
};

export default ProfileHistoryHeader;

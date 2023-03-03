import { Terrain as TerrainIcon } from "@mui/icons-material";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import TableHeader from "components/Table/components/TableHeader";

const LandsDetailsHeader: FC = () => {
  return (
    <>
      <TableHeader
        icon={TerrainIcon}
        label={<FormattedMessage id="LANDS.DETAILS.TABLE.TITLE" />}
      ></TableHeader>
    </>
  );
};

export default LandsDetailsHeader;

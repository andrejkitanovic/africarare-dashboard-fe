import {
  // Add as AddIcon,
  Terrain as TerrainIcon,
} from "@mui/icons-material";
// import { Button } from "@mui/material";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

// import { UsersType } from "api/users/types";
// import { hasPermissions } from "components/stores/UserStore";
import TableHeader from "components/Table/components/TableHeader";
// import { useModal } from "utils/hooks/useModal";

// import NewUserModal from "../LandsTable/components/NewUserModal";

const LandsHeader: FC = () => {
  // const { isOpen, handleClose, handleOpen } = useModal<UsersType>();

  return (
    <>
      <TableHeader
        icon={TerrainIcon}
        label={<FormattedMessage id="LANDS.TABLE.TITLE" />}
      >
        {/* {hasPermissions("write:lands") && (
          <Button
            // data-testid="new-port-button"
            variant="contained"
            onClick={() => handleOpen()}
          >
            <AddIcon sx={{ mr: 0.5 }} />
            <FormattedMessage id="LANDS.LANDS_FORM.NEW_FORM_TITLE" />
          </Button>
        )} */}
      </TableHeader>
      {/* {hasPermissions("write:lands") && (
        <>
          <NewUserModal isOpen={isOpen} handleClose={handleClose} />
        </>
      )} */}
    </>
  );
};

export default LandsHeader;

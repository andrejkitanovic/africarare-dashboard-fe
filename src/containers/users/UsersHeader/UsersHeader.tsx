import { Add as AddIcon, Group as GroupIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { UsersType } from "api/users/types";
import { hasPermissions } from "components/stores/UserStore";
import TableHeader from "components/Table/components/TableHeader";
import { useModal } from "utils/hooks/useModal";

import NewUserModal from "../UsersTable/components/NewUserModal";

const UsersHeader: FC = () => {
  const { isOpen, handleClose, handleOpen } = useModal<UsersType>();

  return (
    <>
      <TableHeader
        icon={GroupIcon}
        label={<FormattedMessage id="USERS.TABLE.TITLE" />}
      >
        {hasPermissions("write:users") && (
          <Button
            // data-testid="new-port-button"
            variant="contained"
            onClick={() => handleOpen()}
          >
            <AddIcon sx={{ mr: 0.5 }} />
            <FormattedMessage id="USERS.USERS_FORM.NEW_FORM_TITLE" />
          </Button>
        )}
      </TableHeader>
      {hasPermissions("write:users") && (
        <>
          <NewUserModal isOpen={isOpen} handleClose={handleClose} />
        </>
      )}
    </>
  );
};

export default UsersHeader;

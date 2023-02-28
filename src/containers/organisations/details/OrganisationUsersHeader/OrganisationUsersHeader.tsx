import { Add as AddIcon, Group as GroupIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { UsersType } from "api/users/types";
import { QueryParamsType } from "api/utils";
import { hasPermissions } from "components/stores/UserStore";
import TableHeader from "components/Table/components/TableHeader";
import NewUserModal from "containers/users/UsersTable/components/NewUserModal";
import { useModal } from "utils/hooks/useModal";

interface IOrganisationUsersHeader {
  additionalFilters?: QueryParamsType<UsersType>;
}

const OrganisationUsersHeader: FC<IOrganisationUsersHeader> = ({
  additionalFilters,
}) => {
  const { isOpen, handleClose, handleOpen } = useModal<UsersType>();

  return (
    <>
      <TableHeader
        icon={GroupIcon}
        label={<FormattedMessage id="ORGANISATION.USERS.TABLE.TITLE" />}
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
          <NewUserModal
            isOpen={isOpen}
            handleClose={handleClose}
            additionalFilters={additionalFilters}
          />
        </>
      )}
    </>
  );
};

export default OrganisationUsersHeader;

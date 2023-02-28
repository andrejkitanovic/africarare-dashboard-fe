import {
  Add as AddIcon,
  BusinessCenter as BusinessCenterIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { OrganisationsType } from "api/organisations/types";
import { hasPermissions } from "components/stores/UserStore";
import TableHeader from "components/Table/components/TableHeader";
import { useModal } from "utils/hooks/useModal";

import NewOrganisationModal from "../OrganisationsTable/components/NewOrganisationModal";

const OrganisationsHeader: FC = () => {
  const { isOpen, handleClose, handleOpen } = useModal<OrganisationsType>();

  return (
    <>
      <TableHeader
        icon={BusinessCenterIcon}
        label={<FormattedMessage id="ORGANISATIONS.TABLE.TITLE" />}
      >
        {hasPermissions("write:organisations") && (
          <Button
            // data-testid="new-port-button"
            variant="contained"
            onClick={() => handleOpen()}
          >
            <AddIcon sx={{ mr: 0.5 }} />
            <FormattedMessage id="ORGANISATIONS.ORGANISATIONS_FORM.NEW_FORM_TITLE" />
          </Button>
        )}
      </TableHeader>
      {hasPermissions("write:organisations") && (
        <>
          <NewOrganisationModal isOpen={isOpen} handleClose={handleClose} />
        </>
      )}
    </>
  );
};

export default OrganisationsHeader;

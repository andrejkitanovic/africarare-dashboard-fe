import {
  Add as AddIcon,
  Celebration as CelebrationIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { UsersType } from "api/users/types";
import { hasPermissions } from "components/stores/UserStore";
import TableHeader from "components/Table/components/TableHeader";
import { useModal } from "utils/hooks/useModal";

import NewExperienceModal from "../ExperiencesTable/components/NewExperienceModal";

const ExperiencesHeader: FC = () => {
  const { isOpen, handleClose, handleOpen } = useModal<UsersType>();

  return (
    <>
      <TableHeader
        icon={CelebrationIcon}
        label={<FormattedMessage id="EXPERIENCES.TABLE.TITLE" />}
      >
        {hasPermissions("write:experiences") && (
          <Button
            // data-testid="new-port-button"
            variant="contained"
            onClick={() => handleOpen()}
          >
            <AddIcon sx={{ mr: 0.5 }} />
            <FormattedMessage id="EXPERIENCES.EXPERIENCES_FORM.NEW_FORM_TITLE" />
          </Button>
        )}
      </TableHeader>
      {hasPermissions("write:experiences") && (
        <>
          <NewExperienceModal isOpen={isOpen} handleClose={handleClose} />{" "}
        </>
      )}
    </>
  );
};

export default ExperiencesHeader;

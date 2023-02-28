import {
  DeleteOutlined as DeleteIcon,
  EditOutlined as EditIcon,
  OutboxOutlined as OutboxOutlinedIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { CellProps } from "react-table";

import { UsersType } from "api/users/types";
import IconButtonWithTooltip from "components/Icons/IconButtonWithTooltip";
import { hasPermissions } from "components/stores/UserStore";

interface Props<T extends {}> extends CellProps<T> {
  handleOpenEdit: (ctx?: T) => void;
  handleOpenDelete: (ctx?: T) => void;
  handleRefresh: (ctx?: T) => void;
}

const ActionsFormatter = ({
  row,
  handleOpenDelete,
  handleOpenEdit,
  handleRefresh,
}: Props<UsersType>) => {
  return (
    <Box>
      {hasPermissions("write:users") && !row.original.confirmed && (
        <IconButtonWithTooltip
          tooltipText={
            <FormattedMessage id="USERS.TABLE.ACTIONS.RESEND_EMAIL" />
          }
          // data-testid="edit-port-button"
          color="primary"
          onClick={() => handleRefresh(row.original)}
        >
          <OutboxOutlinedIcon />
        </IconButtonWithTooltip>
      )}
      {hasPermissions("update:users") && (
        <IconButtonWithTooltip
          tooltipText={<FormattedMessage id="GLOBAL.EDIT" />}
          // data-testid="edit-port-button"
          color="primary"
          onClick={() => handleOpenEdit(row.original)}
        >
          <EditIcon />
        </IconButtonWithTooltip>
      )}
      {hasPermissions("delete:users") && (
        <IconButtonWithTooltip
          tooltipText={<FormattedMessage id="GLOBAL.DELETE" />}
          // data-testid="delete-port-button"
          color="primary"
          onClick={() => handleOpenDelete(row.original)}
        >
          <DeleteIcon />
        </IconButtonWithTooltip>
      )}
    </Box>
  );
};

export default ActionsFormatter;

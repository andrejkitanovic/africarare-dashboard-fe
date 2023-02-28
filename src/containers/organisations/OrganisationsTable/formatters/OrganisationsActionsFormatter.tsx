import {
  ToggleOn as ActivateIcon,
  BlockOutlined as BlockIcon,
  DeleteOutlined as DeleteIcon,
  EditOutlined as EditIcon,
  VisibilityOutlined as VisibilityIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { CellProps } from "react-table";

import { OrganisationsType } from "api/organisations/types";
import IconButtonWithTooltip from "components/Icons/IconButtonWithTooltip";
import { hasPermissions } from "components/stores/UserStore";

interface Props<T extends {}> extends CellProps<T> {
  handleOpenEdit: (ctx?: T) => void;
  handleOpenDelete: (ctx?: T) => void;
}

const ActionsFormatter = ({
  row,
  handleOpenEdit,
  handleOpenDelete,
}: Props<OrganisationsType>) => {
  const history = useHistory();

  return (
    <Box>
      <IconButtonWithTooltip
        tooltipText={<FormattedMessage id="GLOBAL.VIEW" />}
        color="primary"
        onClick={() => history.push(`/organisations/${row.original._id}`)}
      >
        <VisibilityIcon />
      </IconButtonWithTooltip>
      {hasPermissions("update:organisations") && (
        <IconButtonWithTooltip
          tooltipText={<FormattedMessage id="GLOBAL.EDIT" />}
          // data-testid="edit-port-button"
          color="primary"
          onClick={() => handleOpenEdit(row.original)}
        >
          <EditIcon />
        </IconButtonWithTooltip>
      )}
      {hasPermissions("delete:organisations") && row.original.active && (
        <IconButtonWithTooltip
          tooltipText={
            <FormattedMessage id="ORGANISATIONS.TABLE.ACTIONS.DISABLE" />
          }
          // data-testid="delete-port-button"
          color="primary"
          // onClick={() => handleOpenDelete(row.original)}
        >
          <BlockIcon />
        </IconButtonWithTooltip>
      )}
      {hasPermissions("write:organisations") && !row.original.active && (
        <IconButtonWithTooltip
          tooltipText={
            <FormattedMessage id="ORGANISATIONS.TABLE.ACTIONS.ENABLE" />
          }
          // data-testid="delete-port-button"
          color="primary"
          // onClick={() => handleOpenDelete(row.original)}
        >
          <ActivateIcon />
        </IconButtonWithTooltip>
      )}
      {hasPermissions("delete:organisations") && (
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

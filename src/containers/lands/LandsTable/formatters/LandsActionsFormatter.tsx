import {
  DeleteOutlined as DeleteIcon,
  EditOutlined as EditIcon,
  VisibilityOutlined as VisibilityIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { CellProps } from "react-table";

import { LandsType } from "api/lands/types";
import IconButtonWithTooltip from "components/Icons/IconButtonWithTooltip";
import { hasPermissions } from "components/stores/UserStore";

interface Props<T extends {}> extends CellProps<T> {
  handleOpenEdit: (ctx?: T) => void;
  handleOpenDelete: (ctx?: T) => void;
}

const ActionsFormatter = ({
  row,
  handleOpenDelete,
  handleOpenEdit,
}: Props<LandsType>) => {
  const history = useHistory();
  return (
    <Box>
      <IconButtonWithTooltip
        tooltipText={<FormattedMessage id="GLOBAL.VIEW" />}
        color="primary"
        onClick={() => history.push(`/lands/${row.original._id}`)}
      >
        <VisibilityIcon />
      </IconButtonWithTooltip>
      {hasPermissions("update:lands") && (
        <IconButtonWithTooltip
          tooltipText={<FormattedMessage id="GLOBAL.EDIT" />}
          // data-testid="edit-port-button"
          color="primary"
          onClick={() => handleOpenEdit(row.original)}
        >
          <EditIcon />
        </IconButtonWithTooltip>
      )}
      {hasPermissions("delete:lands") && (
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

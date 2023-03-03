import {
  AutoAwesome as AutoAwesomeIcon,
  DeleteOutlined as DeleteIcon,
  EditOutlined as EditIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { CellProps } from "react-table";

import { ExperiencesType } from "api/experiences/types";
import IconButtonWithTooltip from "components/Icons/IconButtonWithTooltip";
import { hasPermissions } from "components/stores/UserStore";

interface Props<T extends {}> extends CellProps<T> {
  handleOpenAddFeature: (ctx?: T) => void;
  handleOpenEdit: (ctx?: T) => void;
  handleOpenDelete: (ctx?: T) => void;
}

const ActionsFormatter = ({
  row,
  handleOpenAddFeature,
  handleOpenEdit,
  handleOpenDelete,
}: Props<ExperiencesType>) => {
  return (
    <Box>
      {hasPermissions("update:experiences") && (
        <IconButtonWithTooltip
          tooltipText={<FormattedMessage id="GLOBAL.ADD_FEATURE" />}
          // data-testid="edit-port-button"
          color="primary"
          onClick={() => handleOpenAddFeature(row.original)}
        >
          <AutoAwesomeIcon />
        </IconButtonWithTooltip>
      )}
      {hasPermissions("update:experiences") && (
        <IconButtonWithTooltip
          tooltipText={<FormattedMessage id="GLOBAL.EDIT" />}
          // data-testid="edit-port-button"
          color="primary"
          onClick={() => handleOpenEdit(row.original)}
        >
          <EditIcon />
        </IconButtonWithTooltip>
      )}
      {hasPermissions("delete:experiences") && (
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

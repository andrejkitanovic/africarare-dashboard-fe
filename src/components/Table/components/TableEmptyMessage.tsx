import { Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

const TableEmptyMessage = () => {
  return (
    <Stack sx={{ py: 10 }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        <FormattedMessage id="TABLE.EMPTY_MESSAGE" />
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        <FormattedMessage id="TABLE.EMPTY_MESSAGE2" />
      </Typography>
    </Stack>
  );
};

export default TableEmptyMessage;

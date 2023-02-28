import { Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

const TableErrorMessage = () => {
  return (
    <Stack sx={{ my: 10 }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        <FormattedMessage id="TABLE.ERROR_MESSAGE" />
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        <FormattedMessage id="TABLE.ERROR_MESSAGE2" />
      </Typography>
    </Stack>
  );
};

export default TableErrorMessage;

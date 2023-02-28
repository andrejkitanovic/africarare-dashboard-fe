import { Box, Paper, Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

import SupportForm from "./components/SupportForm";

const SupportPage = () => {
  return (
    <Stack direction="column" justifyContent="center" sx={{ height: "100%" }}>
      <Box sx={{ maxWidth: 650, width: "100%", mx: "auto" }}>
        <Stack sx={{ mb: 1 }}>
          <Typography variant="h1" sx={{ mb: 1.5, color: "#fff" }}>
            <FormattedMessage id="SUPPORT.HEADER" />
          </Typography>
        </Stack>

        <Paper sx={{ py: 1.5, px: 2 }}>
          <SupportForm />
        </Paper>
      </Box>
    </Stack>
  );
};

export default SupportPage;

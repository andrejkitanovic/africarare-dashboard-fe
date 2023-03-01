import { Paper } from "@mui/material";
import React from "react";

import LandsHeader from "./LandsHeader/LandsHeader";
import LandsTable from "./LandsTable";

const LandsPage = () => {
  return (
    <>
      <Paper>
        <LandsHeader />
        <LandsTable />
      </Paper>
    </>
  );
};

export default LandsPage;

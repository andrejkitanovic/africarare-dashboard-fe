import { Paper } from "@mui/material";

import OrganisationsHeader from "./OrganisationsHeader/OrganisationsHeader";
import OrganisationsTable from "./OrganisationsTable";

const OrganisationsPage = () => {
  return (
    <>
      <Paper>
        <OrganisationsHeader />
        <OrganisationsTable />
      </Paper>
    </>
  );
};

export default OrganisationsPage;

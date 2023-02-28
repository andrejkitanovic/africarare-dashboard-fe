import { Paper } from "@mui/material";

import UsersHeader from "./UsersHeader/UsersHeader";
import UsersTable from "./UsersTable";

const UsersPage = () => {
  return (
    <>
      <Paper>
        <UsersHeader />
        <UsersTable />
      </Paper>
    </>
  );
};

export default UsersPage;

import { Divider, Paper } from "@mui/material";
import { FC } from "react";

import ProfileForm from "./ProfileForm/ProfileForm";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileHistoryHeader from "./ProfileHistoryHeader/ProfileHistoryHeader";
import ProfileHistoryTable from "./ProfileHistoryTable/ProfileHistoryTable";

const UserProfile: FC = () => {
  return (
    <>
      <Paper>
        <ProfileHeader />
        <Divider />
        <ProfileForm />
      </Paper>

      <Paper sx={{ mt: 2 }}>
        <ProfileHistoryHeader />
        <Divider />
        <ProfileHistoryTable />
      </Paper>
    </>
  );
};

export default UserProfile;

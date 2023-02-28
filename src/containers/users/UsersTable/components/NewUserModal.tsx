import { Add as AddIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { inviteUser as inviteUserAPI } from "api/users";
import { usersKeys } from "api/users/queries";
import { NewUserPayloadType, UsersType } from "api/users/types";
import { QueryParamsType } from "api/utils";
import UserForm, {
  UserFormValues,
} from "containers/users/UsersTable/components/UserForm";

interface NewUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
  additionalFilters?: QueryParamsType<UsersType>;
}

const NewUserModal = ({
  isOpen,
  handleClose,
  additionalFilters,
}: NewUserModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: inviteUser, status } = useMutation(
    async (data: NewUserPayloadType) => {
      const res = await inviteUserAPI(data, additionalFilters);
      await queryClient.invalidateQueries(usersKeys.list());
      await queryClient.invalidateQueries(usersKeys.statistics());
      return res.data;
    }
  );

  const handleSubmit = async (values: UserFormValues) => {
    await inviteUser(values, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <AddIcon sx={{ mr: 1 }} />
          <FormattedMessage id="USERS.FORM.NEW_USER.HEADER" />
        </Stack>
      </DialogTitle>
      <Divider />

      <UserForm
        submitStatus={status}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

export default NewUserModal;

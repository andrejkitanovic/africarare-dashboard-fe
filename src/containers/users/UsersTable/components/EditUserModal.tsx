import { Add as AddIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { editUser as editUserAPI } from "api/users";
import { usersKeys } from "api/users/queries";
import { EditUserType, UsersType } from "api/users/types";
import { QueryParamsType } from "api/utils";

import UserForm, { UserFormValues } from "./UserForm";

interface NewUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
  user: UsersType | undefined;
  additionalFilters?: QueryParamsType<UsersType>;
}

const EditUserModal = ({
  isOpen,
  handleClose,
  user,
  additionalFilters,
}: NewUserModalProps) => {
  const queryClient = useQueryClient();

  const initialValues: UserFormValues = {
    role: user?.role || null,
    email: user?.email || "",
    name: user?.name || "",
  };

  const { mutateAsync: editUser, status } = useMutation(
    async (data: EditUserType) => {
      const res = await editUserAPI(data, additionalFilters);
      await queryClient.invalidateQueries(usersKeys.list());
      await queryClient.invalidateQueries(usersKeys.statistics());
      return res.data;
    }
  );

  const handleSubmit = async (values: UserFormValues) => {
    const mappedValues: EditUserType = {
      _id: user!._id,
      ...values,
    };
    await editUser(mappedValues, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <AddIcon sx={{ mr: 1 }} />
          <FormattedMessage id="USERS.EDIT.TITLE" />
        </Stack>
      </DialogTitle>
      <Divider />

      <UserForm
        submitStatus={status}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        initialValues={initialValues}
        confirmed={user?.confirmed}
      />
    </Dialog>
  );
};

export default EditUserModal;

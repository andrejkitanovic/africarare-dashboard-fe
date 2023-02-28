import { Delete as DeleteIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { deleteUser as deleteUserAPI } from "api/users";
import { usersKeys } from "api/users/queries";
import { UsersType } from "api/users/types";
import { QueryParamsType } from "api/utils";

interface DeleteUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
  user: UsersType | undefined;
  additionalFilters?: QueryParamsType<UsersType>;
}

const DeleteUserModal = ({
  isOpen,
  handleClose,
  user,
  additionalFilters,
}: DeleteUserModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteUser, status } = useMutation(
    async (userId: string) => {
      const res = await deleteUserAPI(userId, additionalFilters);
      await queryClient.invalidateQueries(usersKeys.list());
      await queryClient.invalidateQueries(usersKeys.statistics());
      return res.data;
    }
  );

  const handleDelete = async () => {
    await deleteUser(user!._id, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <DeleteIcon sx={{ mr: 1 }} />
          <FormattedMessage id="USERS.DELETE.TITLE" />
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <FormattedMessage
          id="USERS.DELETE.WARNING"
          values={{ userName: <b>{user?.email}</b> }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          <FormattedMessage
            // data-testid="delete-port-close-button"
            id="GLOBAL.CANCEL"
          />
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          onClick={handleDelete}
          loading={status === "loading"}
        >
          <FormattedMessage id="GLOBAL.DELETE" />
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;

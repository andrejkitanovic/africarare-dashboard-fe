import { OutboxOutlined as OutboxOutlinedIcon } from "@mui/icons-material";
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

import { reinviteUser as reinviteUserAPI } from "api/users";
import { usersKeys } from "api/users/queries";
import { UsersType } from "api/users/types";
import { QueryParamsType } from "api/utils";

interface ResendEmailModalProps {
  isOpen: boolean;
  handleClose: () => void;
  user: UsersType | undefined;
  additionalFilters?: QueryParamsType<UsersType>;
}

const ResendEmailModal = ({
  isOpen,
  handleClose,
  user,
  additionalFilters,
}: ResendEmailModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: reinviteUser, status } = useMutation(
    async (userId: string) => {
      const res = await reinviteUserAPI(userId, additionalFilters);
      await queryClient.invalidateQueries(usersKeys.list());
      await queryClient.invalidateQueries(usersKeys.statistics());
      return res.data;
    }
  );

  const handleDelete = async () => {
    await reinviteUser(user!._id, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <OutboxOutlinedIcon sx={{ mr: 1 }} />
          <FormattedMessage id="USERS.REINVITE.TITLE" />
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <FormattedMessage
          id="USERS.REINVITE.DESCRIPTION"
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
          <FormattedMessage id="GLOBAL.RESEND" />
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ResendEmailModal;

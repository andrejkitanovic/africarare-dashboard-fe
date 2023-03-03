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

import { deleteLand as deleteLandAPI } from "api/lands";
import { landsKeys } from "api/lands/queries";
import { LandsType } from "api/lands/types";

interface DeleteLandModalProps {
  isOpen: boolean;
  handleClose: () => void;
  land: LandsType | undefined;
}

const DeleteLandModal = ({
  isOpen,
  handleClose,
  land,
}: DeleteLandModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteLand, status } = useMutation(
    async (landId: string) => {
      const res = await deleteLandAPI(landId);
      await queryClient.invalidateQueries(landsKeys.list());
      return res.data;
    }
  );

  const handleDelete = async () => {
    await deleteLand(land!._id, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <DeleteIcon sx={{ mr: 1 }} />
          <FormattedMessage id="LANDS.DELETE.TITLE" />
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <FormattedMessage
          id="LANDS.DELETE.WARNING"
          values={{ landName: <b>{land?.name}</b> }}
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

export default DeleteLandModal;

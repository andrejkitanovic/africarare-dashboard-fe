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

import { experiencesKeys } from "api/experiences/queries";
import { deleteLevel as deleteLevelAPI } from "api/levels";
import { LevelsType } from "api/levels/types";

interface DeleteLevelModalProps {
  isOpen: boolean;
  handleClose: () => void;
  level: LevelsType | undefined;
}

const DeleteLevelModal = ({
  isOpen,
  handleClose,
  level,
}: DeleteLevelModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteLevel, status } = useMutation(
    async (levelId: string) => {
      const res = await deleteLevelAPI(levelId);
      await queryClient.invalidateQueries(experiencesKeys.list());
      return res.data;
    }
  );

  const handleDelete = async () => {
    await deleteLevel(level!._id, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <DeleteIcon sx={{ mr: 1 }} />
          <FormattedMessage id="LEVELS.DELETE.TITLE" />
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <FormattedMessage
          id="LEVELS.DELETE.WARNING"
          values={{ levelName: <b>{level?.name}</b> }}
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

export default DeleteLevelModal;

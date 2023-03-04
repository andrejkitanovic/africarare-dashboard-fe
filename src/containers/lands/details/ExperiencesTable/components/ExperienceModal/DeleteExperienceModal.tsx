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

import { deleteExperience as deleteExperienceAPI } from "api/experiences";
import { experiencesKeys } from "api/experiences/queries";
import { ExperiencesType } from "api/experiences/types";

interface DeleteExperienceModalProps {
  isOpen: boolean;
  handleClose: () => void;
  experience: ExperiencesType | undefined;
}

const DeleteExperienceModal = ({
  isOpen,
  handleClose,
  experience,
}: DeleteExperienceModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteExperience, status } = useMutation(
    async (experienceId: string) => {
      const res = await deleteExperienceAPI(experienceId);
      await queryClient.invalidateQueries(experiencesKeys.list());
      return res.data;
    }
  );

  const handleDelete = async () => {
    await deleteExperience(experience!._id, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <DeleteIcon sx={{ mr: 1 }} />
          <FormattedMessage id="EXPERIENCES.DELETE.TITLE" />
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <FormattedMessage
          id="EXPERIENCES.DELETE.WARNING"
          values={{ experienceName: <b>{experience?.name}</b> }}
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

export default DeleteExperienceModal;

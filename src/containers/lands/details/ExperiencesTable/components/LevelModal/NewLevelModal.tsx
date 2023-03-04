import { Add as AddIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { experiencesKeys } from "api/experiences/queries";
import { ExperiencesType } from "api/experiences/types";
import { addLevel as addLevelAPI } from "api/levels";
import { NewLevelPayloadType } from "api/levels/types";

import LevelForm, { LevelFormValues } from "./LevelForm";

interface NewLevelModalProps {
  isOpen: boolean;
  handleClose: () => void;
  experience: ExperiencesType | undefined;
}

const NewLevelModal = ({
  isOpen,
  handleClose,
  experience,
}: NewLevelModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: addLevel, status } = useMutation(
    async (data: NewLevelPayloadType) => {
      const res = await addLevelAPI(data);
      await queryClient.invalidateQueries(experiencesKeys.list());
      return res.data;
    }
  );

  const handleSubmit = async (values: LevelFormValues) => {
    await addLevel(
      { ...values, experience: experience?._id ?? "" },
      {
        onSuccess: () => handleClose(),
      }
    );
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <AddIcon sx={{ mr: 1 }} />
          <FormattedMessage id="LEVELS.FORM.NEW_LEVEL.HEADER" />
        </Stack>
      </DialogTitle>
      <Divider />

      <LevelForm
        submitStatus={status}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

export default NewLevelModal;

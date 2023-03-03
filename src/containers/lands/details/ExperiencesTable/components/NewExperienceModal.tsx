import { Add as AddIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { addExperience as addExperienceAPI } from "api/experiences";
import { experiencesKeys } from "api/experiences/queries";
import { NewExperiencePayloadType } from "api/experiences/types";

import ExperienceForm, { ExperienceFormValues } from "./ExperienceForm";

interface NewExperienceModalProps {
  isOpen: boolean;
  handleClose: () => void;
  landId: string;
}

const NewExperienceModal = ({
  isOpen,
  handleClose,
  landId,
}: NewExperienceModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: addExperience, status } = useMutation(
    async (data: NewExperiencePayloadType) => {
      const res = await addExperienceAPI(data);
      await queryClient.invalidateQueries(experiencesKeys.list());
      return res.data;
    }
  );

  const handleSubmit = async (values: ExperienceFormValues) => {
    await addExperience(
      { ...values, land: landId },
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
          <FormattedMessage id="EXPERIENCES.FORM.NEW_EXPERIENCE.HEADER" />
        </Stack>
      </DialogTitle>
      <Divider />

      <ExperienceForm
        submitStatus={status}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

export default NewExperienceModal;

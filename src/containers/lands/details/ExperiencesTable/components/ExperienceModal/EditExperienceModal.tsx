import { Edit as EditIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { editExperience as editExperienceAPI } from "api/experiences";
import { experiencesKeys } from "api/experiences/queries";
import { EditExperienceType, ExperiencesType } from "api/experiences/types";

import ExperienceForm, { ExperienceFormValues } from "./ExperienceForm";

interface EditExperienceModalProps {
  isOpen: boolean;
  handleClose: () => void;
  experience: ExperiencesType | undefined;
}

const EditExperienceModal = ({
  isOpen,
  handleClose,
  experience,
}: EditExperienceModalProps) => {
  const queryClient = useQueryClient();

  const initialValues: ExperienceFormValues = {
    name: experience?.name || "",
  };

  const { mutateAsync: editExperience, status } = useMutation(
    async (data: EditExperienceType) => {
      const res = await editExperienceAPI(data);
      await queryClient.invalidateQueries(experiencesKeys.list());
      return res.data;
    }
  );

  const handleSubmit = async (values: ExperienceFormValues) => {
    const mappedValues: EditExperienceType = {
      _id: experience!._id,
      ...values,
    };
    await editExperience(mappedValues, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <EditIcon sx={{ mr: 1 }} />
          <FormattedMessage id="ORGANISATIONS.EDIT.TITLE" />
        </Stack>
      </DialogTitle>
      <Divider />

      <ExperienceForm
        submitStatus={status}
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

export default EditExperienceModal;

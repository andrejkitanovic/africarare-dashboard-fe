import { Add as AddIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { experiencesKeys } from "api/experiences/queries";
import { ExperiencesType } from "api/experiences/types";
import { addFeature as addFeatureAPI } from "api/features";
import { NewFeaturePayloadType } from "api/features/types";

import FeatureForm, { FeatureFormValues } from "./FeatureForm";

interface NewExperienceFeatureModalProps {
  isOpen: boolean;
  handleClose: () => void;
  experience: ExperiencesType | undefined;
}

const NewExperienceFeatureModal = ({
  isOpen,
  handleClose,
  experience,
}: NewExperienceFeatureModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: addFeature, status } = useMutation(
    async (data: NewFeaturePayloadType) => {
      const res = await addFeatureAPI(data);
      await queryClient.invalidateQueries(experiencesKeys.list());
      return res.data;
    }
  );

  const handleSubmit = async (values: FeatureFormValues) => {
    await addFeature(
      { ...values, model: "experience", modelId: experience?._id ?? "" },
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
          <FormattedMessage id="FEATURES.FORM.NEW_FEATURE.HEADER" />
        </Stack>
      </DialogTitle>
      <Divider />

      <FeatureForm
        submitStatus={status}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

export default NewExperienceFeatureModal;

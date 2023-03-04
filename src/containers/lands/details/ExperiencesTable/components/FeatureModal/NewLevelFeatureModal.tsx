import { Add as AddIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { experiencesKeys } from "api/experiences/queries";
import { addFeature as addFeatureAPI } from "api/features";
import { NewFeaturePayloadType } from "api/features/types";
import { LevelsType } from "api/levels/types";

import FeatureForm, { FeatureFormValues } from "./FeatureForm";

interface NewLevelFeatureModalProps {
  isOpen: boolean;
  handleClose: () => void;
  level: LevelsType | undefined;
}

const NewLevelFeatureModal = ({
  isOpen,
  handleClose,
  level,
}: NewLevelFeatureModalProps) => {
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
      { ...values, model: "level", modelId: level?._id ?? "" },
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

export default NewLevelFeatureModal;

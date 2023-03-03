import { Add as AddIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { addLand as addLandAPI } from "api/lands";
import { landsKeys } from "api/lands/queries";
import { NewLandPayloadType } from "api/lands/types";

import LandForm, { LandFormValues } from "./LandForm";

interface NewLandModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const NewLandModal = ({ isOpen, handleClose }: NewLandModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: addLand, status } = useMutation(
    async (data: NewLandPayloadType) => {
      const res = await addLandAPI(data);
      await queryClient.invalidateQueries(landsKeys.list());
      return res.data;
    }
  );

  const handleSubmit = async (values: LandFormValues) => {
    await addLand(values, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <AddIcon sx={{ mr: 1 }} />
          <FormattedMessage id="LANDS.FORM.NEW_LAND.HEADER" />
        </Stack>
      </DialogTitle>
      <Divider />

      <LandForm
        submitStatus={status}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

export default NewLandModal;

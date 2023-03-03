import { Edit as EditIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { editLand as editLandAPI } from "api/lands";
import { landsKeys } from "api/lands/queries";
import { EditLandType, LandsType } from "api/lands/types";

import LandForm, { LandFormValues } from "./LandForm";

interface EditLandModalProps {
  isOpen: boolean;
  handleClose: () => void;
  land: LandsType | undefined;
}

const EditLandModal = ({ isOpen, handleClose, land }: EditLandModalProps) => {
  const queryClient = useQueryClient();

  const initialValues: LandFormValues = {
    name: land?.name || "",
    organisation: land?.organisation._id || null,
    mapId: land?.mapId || "",
  };

  const { mutateAsync: editLand, status } = useMutation(
    async (data: EditLandType) => {
      const res = await editLandAPI(data);
      await queryClient.invalidateQueries(landsKeys.list());
      return res.data;
    }
  );

  const handleSubmit = async (values: LandFormValues) => {
    const mappedValues: EditLandType = {
      _id: land!._id,
      ...values,
    };
    await editLand(mappedValues, {
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

      <LandForm
        submitStatus={status}
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

export default EditLandModal;

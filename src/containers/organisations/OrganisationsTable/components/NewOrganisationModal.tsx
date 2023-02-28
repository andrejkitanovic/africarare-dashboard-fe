import { Add as AddIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { addOrganisation as addOrganisationAPI } from "api/organisations";
import { organisationsKeys } from "api/organisations/queries";
import { NewOrganisationPayloadType } from "api/organisations/types";

import OrganisationForm, { OrganisationFormValues } from "./OrganisationForm";

interface NewOrganisationModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const NewOrganisationModal = ({
  isOpen,
  handleClose,
}: NewOrganisationModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: addOrganisation, status } = useMutation(
    async (data: NewOrganisationPayloadType) => {
      const res = await addOrganisationAPI(data);
      await queryClient.invalidateQueries(organisationsKeys.list());
      return res.data;
    }
  );

  const handleSubmit = async (values: OrganisationFormValues) => {
    await addOrganisation(values, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <AddIcon sx={{ mr: 1 }} />
          <FormattedMessage id="ORGANISATIONS.FORM.NEW_ORGANISATION.HEADER" />
        </Stack>
      </DialogTitle>
      <Divider />

      <OrganisationForm
        submitStatus={status}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

export default NewOrganisationModal;

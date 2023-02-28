import { Edit as EditIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormattedMessage } from "react-intl";

import { editOrganisation as editOrganisationAPI } from "api/organisations";
import { organisationsKeys } from "api/organisations/queries";
import {
  EditOrganisationType,
  OrganisationsType,
} from "api/organisations/types";
import { objectToFormData } from "utils/formData";

import OrganisationForm, { OrganisationFormValues } from "./OrganisationForm";

interface EditOrganisationModalProps {
  isOpen: boolean;
  handleClose: () => void;
  organisation: OrganisationsType | undefined;
}

const EditOrganisationModal = ({
  isOpen,
  handleClose,
  organisation,
}: EditOrganisationModalProps) => {
  const queryClient = useQueryClient();

  const initialValues: OrganisationFormValues = {
    name: organisation?.name || "",
    email: organisation?.email || "",
    city: organisation?.city || "",
    address: organisation?.address || "",
    postcode: organisation?.postcode || "",
    vat: organisation?.vat || "",
    registrationNumber: organisation?.registrationNumber || "",
  };

  const { mutateAsync: editOrganisation, status } = useMutation(
    async (data: EditOrganisationType) => {
      const formData = objectToFormData(data);

      const res = await editOrganisationAPI(data._id, formData);
      await queryClient.invalidateQueries(organisationsKeys.list());
      return res.data;
    }
  );

  const handleSubmit = async (values: OrganisationFormValues) => {
    const mappedValues: EditOrganisationType = {
      _id: organisation!._id,
      ...values,
    };
    await editOrganisation(mappedValues, {
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

      <OrganisationForm
        submitStatus={status}
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

export default EditOrganisationModal;

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

import { deleteOrganisation as deleteOrganisationAPI } from "api/organisations";
import { organisationsKeys } from "api/organisations/queries";
import { OrganisationsType } from "api/organisations/types";

interface DeleteOrganisationModalProps {
  isOpen: boolean;
  handleClose: () => void;
  organisation: OrganisationsType | undefined;
}

const DeleteOrganisationModal = ({
  isOpen,
  handleClose,
  organisation,
}: DeleteOrganisationModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteOrganisation, status } = useMutation(
    async (organisationId: string) => {
      const res = await deleteOrganisationAPI(organisationId);
      await queryClient.invalidateQueries(organisationsKeys.list());
      return res.data;
    }
  );

  const handleDelete = async () => {
    await deleteOrganisation(organisation!._id, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <DeleteIcon sx={{ mr: 1 }} />
          <FormattedMessage id="ORGANISATIONS.DELETE.TITLE" />
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <FormattedMessage
          id="ORGANISATIONS.DELETE.WARNING"
          values={{ organisationName: <b>{organisation?.name}</b> }}
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

export default DeleteOrganisationModal;

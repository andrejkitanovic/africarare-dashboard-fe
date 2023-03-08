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
import { useParams } from "react-router-dom";

import { experiencesKeys } from "api/experiences/queries";
import { ExperiencesType } from "api/experiences/types";
import { deleteFeature as deleteFeatureAPI } from "api/features";
import { Feature } from "api/generated";
import { QueryParamsType } from "api/utils";

import { featureTitleFormatted } from "./FeatureDrawer";

interface DeleteFeatureModalProps {
  isOpen: boolean;
  handleClose: () => void;
  feature: Feature | undefined;
}

const DeleteFeatureModal = ({
  isOpen,
  handleClose,
  feature,
}: DeleteFeatureModalProps) => {
  const queryClient = useQueryClient();
  const { landId } = useParams<{ landId: string }>();

  const filters: QueryParamsType<ExperiencesType> = {
    filter: [
      {
        field: "land",
        operator: "is",
        value: landId,
      },
    ],
  };

  const { mutateAsync: deleteFeature, status } = useMutation(
    async (organisationId: string) => {
      const res = await deleteFeatureAPI(organisationId);
      await queryClient.invalidateQueries(
        experiencesKeys.listFiltered(filters)
      );
      return res.data;
    }
  );

  const handleDelete = async () => {
    await deleteFeature(feature!._id, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <DeleteIcon sx={{ mr: 1 }} />
          <FormattedMessage id="FEATURE.DELETE.TITLE" />
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <FormattedMessage
          id="FEATURE.DELETE.WARNING"
          values={{
            feature: (
              <b>{feature?.type ? featureTitleFormatted[feature?.type] : ""}</b>
            ),
          }}
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

export default DeleteFeatureModal;

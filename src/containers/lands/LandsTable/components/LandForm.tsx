import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent } from "@mui/material";
import { MutationStatus, useQuery } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import React, { FC, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import * as yup from "yup";

import { getOrganisations } from "api/organisations";
import { organisationsKeys } from "api/organisations/queries";
import FormikAutocomplete from "components/forms/FormikAutocomplete";
import FormikTextField from "components/forms/FormikTextField";

export type LandFormValues = {
  name: string;
  organisation: string | null;
  mapId: string;
};

interface ILandForm {
  handleSubmit: (values: LandFormValues) => void;
  handleClose: () => void;
  initialValues?: LandFormValues;
  submitStatus?: MutationStatus;
}

const LandForm: FC<ILandForm> = ({
  handleSubmit,
  handleClose,
  initialValues = {
    name: "",
    mapId: "",
    organisation: null,
  },
  submitStatus,
}) => {
  const schema = yup.object({
    name: yup.string().required(),
    mapId: yup.string().required(),
    organisation: yup.string().required().nullable(),
  });

  const { data: organisations } = useQuery(
    organisationsKeys.list(),
    async () => {
      const { data: res } = await getOrganisations();
      return res.data;
    }
  );
  const organisationsOptions = useMemo(() => {
    if (organisations?.length) {
      return organisations.map((organisation) => ({
        value: organisation._id,
        label: organisation.name,
      }));
    }
    return [];
  }, [organisations]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <DialogContent>
          <FormikTextField
            name="name"
            label={<FormattedMessage id="GLOBAL.NAME" />}
          />
          <FormikTextField
            name="mapId"
            label={<FormattedMessage id="LANDS.LANDS_FORM.MAP_ID" />}
          />
          <FormikAutocomplete
            name="organisation"
            label={<FormattedMessage id="GLOBAL.ORGANISATION" />}
            options={organisationsOptions}
          />
        </DialogContent>

        <DialogActions>
          <Button
            // data-testid="new-edit-port-close-button"
            onClick={handleClose}
          >
            <FormattedMessage id="GLOBAL.CLOSE" />
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={submitStatus === "loading"}
          >
            <FormattedMessage id="GLOBAL.SAVE" />
          </LoadingButton>
        </DialogActions>
      </FormikForm>
    </Formik>
  );
};

export default LandForm;

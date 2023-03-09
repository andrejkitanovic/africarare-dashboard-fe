import {
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Stack } from "@mui/material";
import { MutationStatus } from "@tanstack/react-query";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import * as yup from "yup";

import FormikPhoneField from "components/forms/FormikPhoneField";
import FormikTextField from "components/forms/FormikTextField";

export type FeatureAccessFormValues = {
  schema: {
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
  }[];
};

interface IFeatureAccessForm {
  handleSubmit: (values: FeatureAccessFormValues) => void;
  initialValues?: FeatureAccessFormValues;
  submitStatus?: MutationStatus;
}

const FeatureAccessForm: FC<IFeatureAccessForm> = ({
  initialValues = {
    schema: [{ firstName: null, lastName: null, phone: null }],
  },
  handleSubmit,
  submitStatus,
}) => {
  const schema = yup.object({
    schema: yup.array().of(
      yup.object().shape({
        firstName: yup.string().nullable().required(),
        lastName: yup.string().nullable().required(),
        phone: yup.string().nullable().required(),
      })
    ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  const { values } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Box>
          <FieldArray
            name="schema"
            render={(arrayHelpers) => {
              return (
                <Box sx={{ mb: 1 }}>
                  {values.schema.map((user, index) => {
                    return (
                      <Grid
                        container
                        spacing={2}
                        sx={{ mb: 1.5 }}
                        key={`product-${index}`}
                      >
                        <Grid item xs={12} lg={11}>
                          <FormikTextField
                            label={<FormattedMessage id="GLOBAL.FIRST_NAME" />}
                            name={`schema.${index}.firstName`}
                          />
                          <FormikTextField
                            label={<FormattedMessage id="GLOBAL.LAST_NAME" />}
                            name={`schema.${index}.lastName`}
                          />
                          <FormikPhoneField
                            label={<FormattedMessage id="GLOBAL.PHONE" />}
                            name={`schema.${index}.phone`}
                          />
                        </Grid>
                        <Grid item xs={12} lg={1}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ height: "100%", maxHeight: "50px" }}
                          >
                            <IconButton
                              color="primary"
                              onClick={() => arrayHelpers.remove(index)}
                              disabled={values.schema.length <= 1}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    );
                  })}
                  <Stack
                    sx={{ height: "50px" }}
                    direction="row"
                    alignItems="center"
                    justifyContent="start"
                  >
                    <Button
                      variant="contained"
                      onClick={() => arrayHelpers.push({})}
                    >
                      <AddIcon sx={{ mr: 0.5 }} />
                      <FormattedMessage id="GLOBAL.ADD" />
                    </Button>
                  </Stack>
                </Box>
              );
            }}
          />
        </Box>
      </FormikProvider>
    </>
  );
};

export default FeatureAccessForm;

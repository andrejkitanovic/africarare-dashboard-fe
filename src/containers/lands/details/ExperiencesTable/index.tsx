import { Search as SearchIcon } from "@mui/icons-material";
import { Grid, InputAdornment, TextField } from "@mui/material";
import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CellProps } from "react-table";

import { getExperiences } from "api/experiences";
import { experiencesKeys } from "api/experiences/queries";
import { ExperiencesType } from "api/experiences/types";
import { hasPermissions } from "components/stores/UserStore";
import Table, { TableColumn } from "components/Table";
import useRemoteTableLogic from "components/Table/useRemoteTableLogic";
import { useModal } from "utils/hooks/useModal";

import DeleteExperienceModal from "./components/DeleteExperienceModal";
import EditExperienceModal from "./components/EditExperienceModal";
import ExperiencesActionsFormatter from "./formatters/ExperiencesActionsFormatter";
import { useExperiencesFilter } from "./useExperiencesFilter";

interface IExperiencesTable {
  landId: string;
}

const ExperiencesTable: FC<IExperiencesTable> = ({ landId }) => {
  const intl = useIntl();

  const { filters, searchField } = useExperiencesFilter({
    filter: [
      {
        field: "land",
        operator: "is",
        value: landId,
      },
    ],
  });

  const { data, status, sortOptions, paginationOptions } = useRemoteTableLogic(
    experiencesKeys.listFiltered(filters),
    getExperiences,
    filters
  );

  const {
    isOpen: isOpenDelete,
    handleClose: handleCloseDelete,
    handleOpen: handleOpenDelete,
    context: deleteContext,
  } = useModal<ExperiencesType>();

  const {
    isOpen: isEditOpen,
    handleClose: handleCloseEdit,
    handleOpen: handleOpenEdit,
    context: editContext,
  } = useModal<ExperiencesType>();

  const columns: TableColumn<ExperiencesType>[] = [
    {
      accessor: "name",
      Header: intl.formatMessage({ id: "EXPERIENCES.TABLE.NAME" }),
    },
    {
      id: "actions",
      Header: intl.formatMessage({ id: "GLOBAL.ACTIONS" }),
      Cell: (cell: CellProps<ExperiencesType>) => (
        <ExperiencesActionsFormatter
          {...cell}
          handleOpenEdit={handleOpenEdit}
          handleOpenDelete={handleOpenDelete}
        />
      ),
      align: "right",
    },
  ];

  return (
    <>
      <Grid container sx={{ pt: 1, px: 2 }}>
        <Grid item sm={4} xs={12}>
          <TextField
            fullWidth
            label={<FormattedMessage id="GLOBAL.SEARCH" />}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            helperText={<FormattedMessage id="EXPERIENCES.TABLE.SEARCH_BY" />}
            {...searchField}
          />
        </Grid>
      </Grid>
      <Table
        data={data}
        columns={columns}
        sort={sortOptions}
        pagination={paginationOptions}
        status={status}
      />
      {hasPermissions("delete:experiences") && (
        <>
          <DeleteExperienceModal
            isOpen={isOpenDelete}
            handleClose={handleCloseDelete}
            experience={deleteContext}
          />
        </>
      )}
      {hasPermissions("update:experiences") && (
        <EditExperienceModal
          isOpen={isEditOpen}
          handleClose={handleCloseEdit}
          experience={editContext}
        />
      )}
    </>
  );
};

export default ExperiencesTable;

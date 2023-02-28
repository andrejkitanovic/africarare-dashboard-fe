import { Search as SearchIcon } from "@mui/icons-material";
import { Grid, InputAdornment, TextField } from "@mui/material";
import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CellProps } from "react-table";

import { getOrganisations } from "api/organisations";
import { organisationsKeys } from "api/organisations/queries";
import { OrganisationsType } from "api/organisations/types";
import { hasPermissions } from "components/stores/UserStore";
import Table, { TableColumn } from "components/Table";
import useRemoteTableLogic from "components/Table/useRemoteTableLogic";
import { useModal } from "utils/hooks/useModal";

import DeleteOrganizationModal from "./components/DeleteOrganisationModal";
import EditOrganisationModal from "./components/EditOrganisationModal";
import OrganisationsActionsFormatter from "./formatters/OrganisationsActionsFormatter";
import { useOrganisationsFilter } from "./useOrganisationsFilter";

const OrganisationsTable: FC = () => {
  const intl = useIntl();

  const {
    isOpen: isOpenDelete,
    handleClose: handleCloseDelete,
    handleOpen: handleOpenDelete,
    context: deleteContext,
  } = useModal<OrganisationsType>();
  const {
    isOpen: isEditOpen,
    handleClose: handleCloseEdit,
    handleOpen: handleOpenEdit,
    context: editContext,
  } = useModal<OrganisationsType>();

  const { filters, searchField } = useOrganisationsFilter();

  const { data, status, sortOptions, paginationOptions } = useRemoteTableLogic(
    organisationsKeys.list(),
    getOrganisations,
    filters
  );

  const columns: TableColumn<OrganisationsType>[] = [
    {
      accessor: "name",
      Header: intl.formatMessage({ id: "GLOBAL.NAME" }),
    },
    {
      accessor: "email",
      Header: intl.formatMessage({ id: "GLOBAL.EMAIL" }),
    },
    {
      accessor: "city",
      Header: intl.formatMessage({ id: "GLOBAL.CITY" }),
    },
    {
      accessor: "address",
      Header: intl.formatMessage({ id: "GLOBAL.ADDRESS" }),
    },
    {
      accessor: "vat",
      Header: intl.formatMessage({ id: "GLOBAL.VAT" }),
    },
    {
      accessor: "registrationNumber",
      Header: intl.formatMessage({
        id: "GLOBAL.REGISTRATION_NUMBER",
      }),
    },
    {
      id: "actions",
      Header: intl.formatMessage({ id: "GLOBAL.ACTIONS" }),
      Cell: (cell: CellProps<OrganisationsType>) => (
        <OrganisationsActionsFormatter
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
            helperText={<FormattedMessage id="ORGANISATIONS.TABLE.SEARCH_BY" />}
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
      {hasPermissions("delete:organisations") && (
        <>
          <DeleteOrganizationModal
            isOpen={isOpenDelete}
            handleClose={handleCloseDelete}
            organisation={deleteContext}
          />
        </>
      )}
      {hasPermissions("update:organisations") && (
        <>
          <EditOrganisationModal
            isOpen={isEditOpen}
            handleClose={handleCloseEdit}
            organisation={editContext}
          />
        </>
      )}
    </>
  );
};

export default OrganisationsTable;

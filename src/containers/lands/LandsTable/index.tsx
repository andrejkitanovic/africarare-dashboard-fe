import { Search as SearchIcon } from "@mui/icons-material";
import { Grid, InputAdornment, TextField } from "@mui/material";
import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CellProps } from "react-table";

import { getLands } from "api/lands";
import { landsKeys } from "api/lands/queries";
import { LandsType } from "api/lands/types";
// import { QueryParamsType } from "api/utils";
// import { hasPermissions } from "components/stores/UserStore";
import Table, { TableColumn } from "components/Table";
// import { roleFormatter } from "components/Table/formatters/roleFormatter";
import useRemoteTableLogic from "components/Table/useRemoteTableLogic";
// import { hasPermissions } from "components/stores/LandStore";
// import { useModal } from "utils/hooks/useModal";

import LandsActionsFormatter from "./formatters/LandsActionsFormatter";
import { useLandsFilter } from "./useLandsFilter";

interface ILandsTable {}

const LandsTable: FC<ILandsTable> = () => {
  const intl = useIntl();

  const { filters, searchField } = useLandsFilter();

  const { data, status, sortOptions, paginationOptions } = useRemoteTableLogic(
    landsKeys.list(),
    getLands,
    filters
  );

  // const {
  //   isOpen: isOpenDelete,
  //   handleClose: handleCloseDelete,
  //   handleOpen: handleOpenDelete,
  //   context: deleteContext,
  // } = useModal<LandsType>();

  // const {
  //   isOpen: isEditOpen,
  //   handleClose: handleCloseEdit,
  //   handleOpen: handleOpenEdit,
  //   context: editContext,
  // } = useModal<LandsType>();

  // const {
  //   isOpen: isResendOpen,
  //   handleClose: handleCloseResend,
  //   handleOpen: handleOpenResend,
  //   context: resendContext,
  // } = useModal<LandsType>();

  const columns: TableColumn<LandsType>[] = [
    {
      accessor: "name",
      Header: intl.formatMessage({ id: "LANDS.TABLE.NAME" }),
    },
    {
      accessor: "mapId",
      Header: intl.formatMessage({ id: "LANDS.TABLE.MAP_ID" }),
    },
    {
      id: "actions",
      Header: intl.formatMessage({ id: "GLOBAL.ACTIONS" }),
      Cell: (cell: CellProps<LandsType>) => (
        <LandsActionsFormatter
          {...cell}
          handleOpenEdit={() => {}}
          handleOpenDelete={() => {}}
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
            helperText={<FormattedMessage id="LANDS.TABLE.SEARCH_BY" />}
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
      {/* {hasPermissions("delete:lands") && (
        <>
          <DeleteLandModal
            additionalFilters={additionalFilters}
            isOpen={isOpenDelete}
            handleClose={handleCloseDelete}
            user={deleteContext}
          />
        </>
      )}
      {hasPermissions("update:lands") && (
        <EditLandModal
          additionalFilters={additionalFilters}
          isOpen={isEditOpen}
          handleClose={handleCloseEdit}
          user={editContext}
        />
      )} */}
    </>
  );
};

export default LandsTable;

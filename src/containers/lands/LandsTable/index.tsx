import { Search as SearchIcon } from "@mui/icons-material";
import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CellProps } from "react-table";

import { getLands } from "api/lands";
import { landsKeys } from "api/lands/queries";
import { LandsType } from "api/lands/types";
import PreviewImageDefaultPNG from "assets/imgs/preview-image-default.png";
import { hasPermissions } from "components/stores/UserStore";
import Table, { TableColumn } from "components/Table";
import useRemoteTableLogic from "components/Table/useRemoteTableLogic";
import { useModal } from "utils/hooks/useModal";

import DeleteLandModal from "./components/DeleteLandModal";
import EditLandModal from "./components/EditLandModal";
import LandsActionsFormatter from "./formatters/LandsActionsFormatter";
import { useLandsFilter } from "./useLandsFilter";

interface ILandsTable {}

const LandsTable: FC<ILandsTable> = () => {
  const intl = useIntl();

  const { filters, searchField } = useLandsFilter();

  const { data, status, sortOptions, paginationOptions } = useRemoteTableLogic(
    landsKeys.listFiltered(filters),
    getLands,
    filters
  );

  const {
    isOpen: isOpenDelete,
    handleClose: handleCloseDelete,
    handleOpen: handleOpenDelete,
    context: deleteContext,
  } = useModal<LandsType>();

  const {
    isOpen: isEditOpen,
    handleClose: handleCloseEdit,
    handleOpen: handleOpenEdit,
    context: editContext,
  } = useModal<LandsType>();

  const columns: TableColumn<LandsType>[] = [
    {
      accessor: "previewImage",
      Header: intl.formatMessage({ id: "LANDS.TABLE.PREVIEW_IMAGE" }),
      Cell: ({ value, row }) => (
        <Box
          component="img"
          sx={{
            objectFit: "cover",
            mr: 1,
          }}
          src={value || PreviewImageDefaultPNG}
          width="120px"
          height="80px"
          alt={row.original.name}
        />
      ),
    },
    {
      accessor: "name",
      Header: intl.formatMessage({ id: "LANDS.TABLE.NAME" }),
    },
    {
      accessor: "mapId",
      Header: intl.formatMessage({ id: "LANDS.TABLE.MAP_ID" }),
    },
    {
      accessor: "organisation",
      Header: intl.formatMessage({ id: "GLOBAL.ORGANISATION" }),
      Cell: ({ value }) => value.name,
    },
    {
      id: "actions",
      Header: intl.formatMessage({ id: "GLOBAL.ACTIONS" }),
      Cell: (cell: CellProps<LandsType>) => (
        <LandsActionsFormatter
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
      {hasPermissions("delete:lands") && (
        <>
          <DeleteLandModal
            isOpen={isOpenDelete}
            handleClose={handleCloseDelete}
            land={deleteContext}
          />
        </>
      )}
      {hasPermissions("update:lands") && (
        <EditLandModal
          isOpen={isEditOpen}
          handleClose={handleCloseEdit}
          land={editContext}
        />
      )}
    </>
  );
};

export default LandsTable;

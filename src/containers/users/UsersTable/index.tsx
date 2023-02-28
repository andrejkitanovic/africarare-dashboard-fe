import { Search as SearchIcon } from "@mui/icons-material";
import { Grid, InputAdornment, TextField } from "@mui/material";
import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CellProps } from "react-table";

import { getUsers } from "api/users";
import { usersKeys } from "api/users/queries";
import { UsersType } from "api/users/types";
import { QueryParamsType } from "api/utils";
import { hasPermissions } from "components/stores/UserStore";
import Table, { TableColumn } from "components/Table";
import { roleFormatter } from "components/Table/formatters/roleFormatter";
import useRemoteTableLogic from "components/Table/useRemoteTableLogic";
// import { hasPermissions } from "components/stores/UserStore";
import { useModal } from "utils/hooks/useModal";

import DeleteUserModal from "./components/DeleteUserModal";
import EditUserModal from "./components/EditUserModal";
import ResendEmailModal from "./components/ResendEmailModal";
import UsersActionsFormatter from "./formatters/UsersActionsFormatter";
import { useUsersFilter } from "./useUsersFilter";

interface IUsersTable {
  additionalFilters?: QueryParamsType<UsersType>;
}

const UsersTable: FC<IUsersTable> = ({ additionalFilters }) => {
  const intl = useIntl();

  const { filters, searchField } = useUsersFilter(additionalFilters);

  const { data, status, sortOptions, paginationOptions } = useRemoteTableLogic(
    usersKeys.list(),
    getUsers,
    filters
  );

  const {
    isOpen: isOpenDelete,
    handleClose: handleCloseDelete,
    handleOpen: handleOpenDelete,
    context: deleteContext,
  } = useModal<UsersType>();

  const {
    isOpen: isEditOpen,
    handleClose: handleCloseEdit,
    handleOpen: handleOpenEdit,
    context: editContext,
  } = useModal<UsersType>();

  const {
    isOpen: isResendOpen,
    handleClose: handleCloseResend,
    handleOpen: handleOpenResend,
    context: resendContext,
  } = useModal<UsersType>();

  const columns: TableColumn<UsersType>[] = [
    {
      accessor: "name",
      Header: intl.formatMessage({ id: "USERS.TABLE.NAME" }),
    },
    {
      accessor: "email",
      Header: intl.formatMessage({ id: "GLOBAL.EMAIL" }),
    },
    {
      accessor: "confirmed",
      Header: intl.formatMessage({ id: "GLOBAL.CONFIRMED" }),
      Cell: ({ value }: CellProps<UsersType>) =>
        value ? (
          <FormattedMessage id="GLOBAL.CONFIRMED" />
        ) : (
          <FormattedMessage id="GLOBAL.NOT_CONFIRMED" />
        ),
    },
    {
      accessor: "role",
      Header: intl.formatMessage({ id: "GLOBAL.ROLE" }),
      Cell: ({ value }: CellProps<UsersType>) => <>{roleFormatter(value)}</>,
    },
    {
      id: "actions",
      Header: intl.formatMessage({ id: "GLOBAL.ACTIONS" }),
      Cell: (cell: CellProps<UsersType>) => (
        <UsersActionsFormatter
          {...cell}
          handleOpenEdit={handleOpenEdit}
          handleOpenDelete={handleOpenDelete}
          handleRefresh={handleOpenResend}
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
            helperText={<FormattedMessage id="USERS.TABLE.SEARCH_BY" />}
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
      {hasPermissions("delete:users") && (
        <>
          <DeleteUserModal
            additionalFilters={additionalFilters}
            isOpen={isOpenDelete}
            handleClose={handleCloseDelete}
            user={deleteContext}
          />
        </>
      )}
      {hasPermissions("update:users") && (
        <EditUserModal
          additionalFilters={additionalFilters}
          isOpen={isEditOpen}
          handleClose={handleCloseEdit}
          user={editContext}
        />
      )}
      {hasPermissions("write:users") && (
        <ResendEmailModal
          additionalFilters={additionalFilters}
          isOpen={isResendOpen}
          handleClose={handleCloseResend}
          user={resendContext}
        />
      )}
    </>
  );
};

export default UsersTable;

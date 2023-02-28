import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { useIntl } from "react-intl";
import { CellProps } from "react-table";

import { getUserHistory } from "api/users";
import { usersKeys } from "api/users/queries";
import { UsersType } from "api/users/types";
import { useUserStore } from "components/stores/UserStore";
import Table, { TableColumn } from "components/Table";
import { dateTimeFormatter } from "components/Table/formatters/dateTimeFormatter";

interface IProfileHistoryTable {}

const ProfileHistoryTable: FC<IProfileHistoryTable> = () => {
  const intl = useIntl();

  const [user] = useUserStore((s) => [s.user]);

  const { data, status } = useQuery(
    usersKeys.history(user?._id ?? ""),
    async () => {
      const { data: res } = await getUserHistory(user?._id ?? "");

      return res.data?.history;
    },
    {
      enabled: Boolean(user?._id),
    }
  );

  const columns: TableColumn<UsersType>[] = [
    {
      id: "field",
      Header: intl.formatMessage({ id: "GLOBAL.FIELD" }),
    },
    {
      id: "changedTo",
      Header: intl.formatMessage({ id: "GLOBAL.CHANGED_TO" }),
    },
    {
      //@ts-expect-error
      accessor: "updatedAt",
      Header: intl.formatMessage({ id: "GLOBAL.UPDATED_AT" }),
      align: "right",
      Cell: ({ value }: CellProps<UsersType>) => (
        <>{dateTimeFormatter(value)}</>
      ),
    },
  ];

  return (
    <>
      <Table
        data={data ?? []}
        columns={columns}
        // sort={sortOptions}
        // pagination={paginationOptions}
        status={status}
      />
    </>
  );
};

export default ProfileHistoryTable;

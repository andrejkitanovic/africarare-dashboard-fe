import { useIntl } from "react-intl";

import { NotificationsType } from "api/user/types";
import Table, { TableColumn } from "components/Table";

const NotificationsTable = () => {
  const intl = useIntl();
  const columns: TableColumn<NotificationsType>[] = [
    {
      accessor: "name",
      Header: intl.formatMessage({ id: "GLOBAL.NAME" }),
    },
    {
      accessor: "sms",
      Header: intl.formatMessage({ id: "GLOBAL.SMS" }),
      disableSortBy: true,
      align: "right",
    },
    {
      accessor: "email",
      Header: intl.formatMessage({ id: "GLOBAL.EMAIL" }),
      disableSortBy: true,
      align: "right",
    },
  ];
  return (
    <>
      <Table
        data={[]}
        columns={columns}
        // sort={sortOptions}
        // pagination={paginationOptions}
        // status={status}
      />
    </>
  );
};

export default NotificationsTable;

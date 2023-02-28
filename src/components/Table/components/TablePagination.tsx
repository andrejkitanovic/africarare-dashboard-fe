import { MenuItem, Pagination, Select, Stack, Typography } from "@mui/material";
import { UsePaginationProps } from "@mui/material/usePagination/usePagination";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { UsePaginationInstanceProps, UsePaginationState } from "react-table";

const availablePageLimitOptions = [20, 50, 100, 200] as const;
export type TablePageLimitType = typeof availablePageLimitOptions[number];

interface Props<T extends object> {
  pageCount: UsePaginationInstanceProps<T>["pageCount"];
  pageIndex: UsePaginationState<T>["pageIndex"];
  pageSize: UsePaginationState<T>["pageSize"];
  setPageSize: UsePaginationInstanceProps<T>["setPageSize"];
  gotoPage: UsePaginationInstanceProps<T>["gotoPage"];
}

const TablePagination = <T extends object>({
  pageCount,
  pageIndex,
  pageSize,
  setPageSize,
  gotoPage,
}: Props<T>) => {
  const handlePaginationChange = useCallback<
    Required<UsePaginationProps>["onChange"]
  >(
    (_event, page) => {
      gotoPage(page - 1);
    },
    [gotoPage]
  );

  return (
    <Stack
      sx={{ p: 2 }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Pagination
        count={pageCount}
        page={pageIndex + 1}
        onChange={handlePaginationChange}
      />

      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>
          <FormattedMessage id="TABLE.PAGINATION.PAGE_SIZE" />
        </Typography>
        <Select
          variant="standard"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {availablePageLimitOptions.map((limit) => (
            <MenuItem key={limit} value={limit}>
              {limit}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};

export default TablePagination;

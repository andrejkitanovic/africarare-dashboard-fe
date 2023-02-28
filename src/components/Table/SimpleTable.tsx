import { KeyboardArrowDown, KeyboardArrowUp, Sort } from "@mui/icons-material";
import {
  Box,
  Table as MUITable,
  TableBody as MUITableBody,
  TableProps as MUITableProps,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { QueryStatus } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import {
  Row,
  TableOptions,
  useExpanded,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { QueryParamsType } from "api/utils";

import TableBodyLoading from "./components/TableBodyLoading";
import TableEmptyMessage from "./components/TableEmptyMessage";
import TableErrorMessage from "./components/TableErrorMessage";
import TablePagination, {
  TablePageLimitType,
} from "./components/TablePagination";

export type TableSortingOptions = {
  disable?: boolean;
  remote?: {
    onSortChange: (sortBy: QueryParamsType["sort"]) => void;
  };
};

export type TablePaginationOptions = {
  remote?: {
    pageCount: number | undefined;
    onPageChange: (page: number, limit: TablePageLimitType) => void;
    totalResults?: number;
    initialPageSize?: TablePageLimitType;
  };
};

type TableProps<T extends object> = TableOptions<T> & {
  sort?: TableSortingOptions;
  pagination?: TablePaginationOptions;
  /**
   * Must be memoized, otherwise will reset pagination too frequently
   */
  filters?: unknown;
  status?: QueryStatus;
  // TODO: Improve typescript
  getRowProps?: (row: Row<T>) => object;
  size?: MUITableProps["size"];
  emptyMessage?: string | ReactNode;
};

const Table = <T extends object>({
  columns,
  data,
  initialState,
  // custom props
  sort,
  pagination,
  status,
  getRowProps,
  size,
  emptyMessage,
  filters,
  // rest
  ...rest
}: TableProps<T>) => {
  // sorting
  const manualSortBy = Boolean(sort?.remote);
  const disableSortBy = Boolean(sort?.disable);
  const onSortChange = sort?.remote?.onSortChange;

  // pagination
  const remotePagination = Boolean(pagination?.remote);
  const remotePageCount = pagination?.remote?.pageCount;
  const onPageChange = pagination?.remote?.onPageChange;
  const initialPageSize = pagination?.remote?.initialPageSize;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    // pagination
    gotoPage,
    setPageSize,
    pageCount,
    // global filter
    setGlobalFilter,
    // state
    state: { sortBy, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualGroupBy: true,
      // sorting
      disableSortBy: false,
      manualSortBy,
      disableMultiSort: true,
      // pagination
      manualPagination: remotePagination,
      pageCount: remotePageCount,
      // global filter,
      manualGlobalFilter: true,
      // initialState
      initialState: { pageSize: initialPageSize || 20, ...initialState },
      ...rest,
    },
    useGroupBy,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  /**
   * remote sorting only:
   */
  useEffect(() => {
    if (!disableSortBy && manualSortBy) {
      if (sortBy.length) {
        const sortObject = sortBy[0];
        onSortChange &&
          onSortChange({
            field: sortObject.id,
            order: sortObject.desc ? "desc" : "asc",
          });
      } else {
        onSortChange && onSortChange(undefined);
      }
    }
  }, [sortBy, sort?.remote, onSortChange, disableSortBy, manualSortBy]);

  // necessary to reset page when changing filters
  useEffect(() => {
    setGlobalFilter(filters);
  }, [setGlobalFilter, filters]);

  /**
   * remote pagination only:
   */
  useEffect(() => {
    if (remotePagination) {
      onPageChange &&
        onPageChange(pageIndex + 1, pageSize as TablePageLimitType);
    }
  }, [remotePagination, pageIndex, pageSize, onPageChange]);

  return (
    <>
      <Box sx={{ overflowX: "auto" }}>
        <MUITable size={size} {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        textAlign: column.align,
                        "&:hover": { svg: { color: "primary.main" } },
                      }}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.canSort && (
                        <Box
                          component="span"
                          sx={{
                            mx: 0.5,
                            fontSize: "1.3em",
                          }}
                        >
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <KeyboardArrowDown fontSize="inherit" />
                            ) : (
                              <KeyboardArrowUp fontSize="inherit" />
                            )
                          ) : (
                            <Sort fontSize="inherit" />
                          )}
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>

          {/** Status: loading -> displays skeleton */}
          {status === "loading" && (
            <TableBodyLoading
              rows={initialPageSize || 20}
              headerGroups={headerGroups}
            />
          )}

          {/**
           * When status is not used, it will just display rows
           * Status: success -> displays rows
           */}
          {(status === "success" || status === undefined) && (
            <MUITableBody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow
                    sx={{
                      bgcolor: row.depth === 1 ? "grey.200" : "white",
                    }}
                    {...row.getRowProps(getRowProps ? getRowProps(row) : {})}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <TableCell
                          sx={{
                            textAlign: cell.column.align,
                          }}
                          {...cell.getCellProps()}
                        >
                          {row.depth === 1
                            ? cell.render("Cell")
                            : cell.render("Aggregated")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </MUITableBody>
          )}
        </MUITable>

        {/**
         * Status: success and empty data -> displays empty message
         */}
        {status === "success" &&
          data.length === 0 &&
          ((emptyMessage && <>{emptyMessage}</>) || <TableEmptyMessage />)}

        {/**
         * Status: error -> displays error message
         */}
        {status === "error" && <TableErrorMessage />}
      </Box>
      {pageCount > 1 && (
        <TablePagination
          gotoPage={gotoPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </>
  );
};

export default Table;

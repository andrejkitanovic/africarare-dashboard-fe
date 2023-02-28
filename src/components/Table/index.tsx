import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreVert,
  Sort,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Table as MUITable,
  TableBody as MUITableBody,
  TableProps as MUITableProps,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { QueryStatus } from "@tanstack/react-query";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { ReactNode, useEffect, useMemo } from "react";
import {
  Column,
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
import TableColumnsPopover from "./components/TableColumnsPopover";
import TableEmptyMessage from "./components/TableEmptyMessage";
import TableErrorMessage from "./components/TableErrorMessage";
import TablePagination, {
  TablePageLimitType,
} from "./components/TablePagination";
import useTableFields from "./useTableFields";

export type TableColumn<T extends object = {}> = Column<T> & {
  display?: boolean;
};

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
  columns: readonly TableColumn<T>[];
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

  const { tableFields, setTableFields } = useTableFields(
    columns
      ?.filter((column) => (column as TableColumn).display !== false)
      .map((column) => column.id || String(column.accessor))
  );

  const shownColumns = useMemo(() => {
    if (tableFields) {
      const result: TableColumn<T>[] = [];

      tableFields.forEach((columnId) => {
        const foundColumn = columns.find(
          (column) => column.id === columnId || column.accessor === columnId
        );

        if (foundColumn) {
          result.push(foundColumn);
        }
      });

      return result;
    }

    return columns;
  }, [columns, tableFields]);

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
      columns: shownColumns,
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
      <Box sx={{ overflowX: "auto", mx: 2, my: 3, mt: 1.5 }}>
        <MUITable
          size={size}
          {...getTableProps()}
          sx={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <TableHead
            sx={{
              background: (t) => t.palette.grey[800],
              height: 56,
            }}
          >
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
                <TableCell
                  sx={{
                    fontWeight: 600,
                    textAlign: "right",
                    svg: { color: "#fff" },
                    width: "20px",
                  }}
                >
                  <PopupState
                    variant="popover"
                    // popupId="language-switcher-popover"
                  >
                    {(popupState: any) => (
                      <>
                        <IconButton {...bindTrigger(popupState)}>
                          <MoreVert />
                        </IconButton>
                        <TableColumnsPopover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          //@ts-expect-error
                          fields={
                            columns?.map((column) => ({
                              value: column.id || String(column.accessor),
                              label: column.Header ?? "",
                              display: tableFields?.includes(
                                column.id || String(column.accessor)
                              ),
                            })) || []
                          }
                          setFields={(fields) => {
                            setTableFields(fields);
                          }}
                        />
                      </>
                    )}
                  </PopupState>
                </TableCell>
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
                    sx={
                      {
                        // bgcolor: row.depth === 1 ? "grey.200" : "white",
                      }
                    }
                    {...row.getRowProps(getRowProps ? getRowProps(row) : {})}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <TableCell
                          sx={{
                            textAlign: cell.column.align,
                            height: 47,
                          }}
                          {...cell.getCellProps()}
                        >
                          {row.depth === 1
                            ? cell.render("Cell")
                            : cell.render("Aggregated")}
                        </TableCell>
                      );
                    })}

                    <TableCell sx={{ width: "20px" }}></TableCell>
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

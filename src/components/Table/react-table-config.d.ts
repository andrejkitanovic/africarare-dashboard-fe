// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-table/Readme.md
import { CSSProperties } from "react";
import {
  // UseColumnOrderInstanceProps,
  // UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  // UseFiltersColumnOptions,
  // UseFiltersColumnProps,
  // UseFiltersInstanceProps,
  // UseFiltersOptions,
  // UseFiltersState,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  // UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  // UseResizeColumnsColumnOptions,
  // UseResizeColumnsColumnProps,
  // UseResizeColumnsOptions,
  // UseResizeColumnsState,
  // UseRowSelectHooks,
  // UseRowSelectInstanceProps,
  // UseRowSelectOptions,
  // UseRowSelectRowProps,
  // UseRowSelectState,
  // UseRowStateCellProps,
  // UseRowStateInstanceProps,
  // UseRowStateOptions,
  // UseRowStateRowProps,
  // UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from "react-table";

declare module "react-table" {
  // CUSTOM OVERRIDES: using Declaration Merging (https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface UseTableColumnOptions<D extends object> {
    // aligns both Header and Cell in Column using text-align css property
    align?: CSSProperties["textAlign"];
  }
  export interface TableOptions<D extends Record<string, unknown>> // UseFiltersOptions<D>,
    extends UsePaginationOptions<D>,
      // UseGlobalFiltersOptions<D>,
      UseExpandedOptions<D>,
      UseGroupByOptions<D>,
      // UseResizeColumnsOptions<D>,
      // UseRowSelectOptions<D>,
      // UseRowStateOptions<D>,
      UseSortByOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, any> {}

  export interface Hooks<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseExpandedHooks<D>,
      UseGroupByHooks<D>,
      // UseRowSelectHooks<D>,
      UseSortByHooks<D> {}

  export interface TableInstance<
      D extends Record<string, unknown> = Record<string, unknown>
    > // UseColumnOrderInstanceProps<D>, // UseFiltersInstanceProps<D>,
    extends UsePaginationInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D>,
      UseExpandedInstanceProps<D>,
      UseGroupByInstanceProps<D>,
      // UseRowSelectInstanceProps<D>,
      // UseRowStateInstanceProps<D>,
      UseSortByInstanceProps<D> {}

  export interface TableState<
      D extends Record<string, unknown> = Record<string, unknown>
    > // UseColumnOrderState<D>, // UseFiltersState<D>,
    extends UsePaginationState<D>,
      UseGlobalFiltersState<D>,
      UseExpandedState<D>,
      UseGroupByState<D>,
      // UseResizeColumnsState<D>,
      // UseRowSelectState<D>,
      // UseRowStateState<D>,
      UseSortByState<D> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByColumnOptions<D>,
      UseGroupByColumnOptions<D>,
      UseGlobalFiltersColumnOptions<D> {} // UseFiltersColumnOptions<D>, // UseResizeColumnsColumnOptions<D>,

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseSortByColumnProps<D>,
      UseGroupByColumnProps<D> {} // UseFiltersColumnProps<D>, // UseResizeColumnsColumnProps<D>,

  export interface CellProps<
    D extends Record<string, unknown> = Record<string, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    V = any
  > extends UseGroupByCellProps<D> {} // UseRowStateCellProps<D>

  export interface Row<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseExpandedRowProps<D>,
      UseGroupByRowProps<D> {} //   UseRowStateRowProps<D> //   UseRowSelectRowProps<D>,
}

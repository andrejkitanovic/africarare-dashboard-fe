import { AxiosResponse } from "axios";

import { isEmptyObject } from "../utils/isEmptyObject";

export type APICall<T> = Promise<AxiosResponse<T>>;

export type PaginationMeta = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
};

export type StatisticsMeta = {
  total: number;
  average: number;
  max: number;
  min: number;
};

export type Paginated<T> = {
  data: T;
  meta: {
    pagination: PaginationMeta;
  };
};

export type Statistics<T> = {
  data: T;
  meta: {
    statistics: StatisticsMeta;
  };
};

export type QueryParamsSortType<T = Record<string, unknown>> = {
  field: keyof T;
  order: "asc" | "desc";
};

export type QueryParamsSingleFilterType<T = Record<string, unknown>> = {
  field: keyof T;
  operator: "is" | "eq" | "ne" | "gt" | "lt" | "gte" | "lte";
  value: string | null;
};

export type QueryParamsType<T = Record<string, unknown>> = {
  sort?: QueryParamsSortType<T>;
  filter?: QueryParamsSingleFilterType<T>[] | null;
  page?: number;
  limit?: number;
  [key: string]: unknown;
};

export type QueryStatisticsParamsType<T = Record<string, unknown>> = {
  filter?: QueryParamsSingleFilterType<T>[] | null;
  [key: string]: unknown;
};

const parseParams = <T>(object: QueryParamsType<T>) => {
  const queryParams = new URLSearchParams();
  Object.entries(object).forEach(([key, value]) => {
    if (key === "sort") {
      const sortValue = value as QueryParamsType["sort"];
      if (sortValue) {
        const prefix = sortValue.order === "asc" ? "" : "-";
        const parsedSort = `${prefix}${sortValue.field}`;
        queryParams.append("sort", parsedSort);
      }
      return;
    }

    if (key === "filter") {
      const filterValue = value as QueryParamsType["filter"];
      if (filterValue?.length) {
        const parsedFilter = filterValue
          .map(
            ({ field, operator, value }) => `${field}::${operator}::${value}`
          )
          .join(",");
        queryParams.append("filter", parsedFilter);
      }
      return;
    }

    if (value) {
      const otherParamValue = value as string | number;
      queryParams.append(key, otherParamValue.toString());
      return;
    }
  });
  return queryParams;
};

export const normalizeQueryParams = <T>(object?: QueryParamsType<T>) => {
  if (!object) {
    return "";
  }
  if (isEmptyObject(object)) {
    return "";
  }
  return `?${new URLSearchParams(parseParams(object)).toString()}`;
};

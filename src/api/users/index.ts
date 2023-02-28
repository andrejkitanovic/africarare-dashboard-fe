import { History } from "api/history/type";
import {
  Paginated,
  QueryParamsType,
  QueryStatisticsParamsType,
  Statistics,
  normalizeQueryParams,
} from "api/utils";

import request, { APICall } from "../request";
import {
  EditUserType,
  NewUserPayloadType,
  StatsType,
  UsersType,
} from "./types";

export const getUsers = (
  queryParams?: QueryParamsType<UsersType>
): APICall<Paginated<UsersType[]>> =>
  request({
    url: `/user${normalizeQueryParams(queryParams)}`,
    method: "GET",
  });

export const inviteUser = (
  user: NewUserPayloadType,
  queryParams?: QueryParamsType<UsersType>
): APICall<UsersType> =>
  request({
    data: user,
    url: `/user/invite${normalizeQueryParams(queryParams)}`,
    method: "POST",
  });

export const editUser = (
  user: EditUserType,
  queryParams?: QueryParamsType<UsersType>
): APICall<EditUserType> =>
  request({
    data: user,
    url: `/user/${user._id}${normalizeQueryParams(queryParams)}`,
    method: "PUT",
  });

export const deleteUser = (
  userId: string,
  queryParams?: QueryParamsType<UsersType>
): APICall<null> =>
  request({
    url: `/user/${userId}${normalizeQueryParams(queryParams)}`,
    method: "DELETE",
  });

export const reinviteUser = (
  userId: string,
  queryParams?: QueryParamsType<UsersType>
): APICall<UsersType> =>
  request({
    url: `/user/resend-email/${userId}${normalizeQueryParams(queryParams)}`,
    method: "POST",
  });

export const getUsersStatistics = (
  queryParams?: QueryStatisticsParamsType<UsersType>
): APICall<Statistics<StatsType>> =>
  request({
    url: `/user/statistics${normalizeQueryParams(queryParams)}`,
    method: "GET",
  });

export const getUserHistory = (
  userId: string
): APICall<{ data: History<UsersType> }> =>
  request({
    url: `/user/history/${userId}`,
    method: "GET",
  });

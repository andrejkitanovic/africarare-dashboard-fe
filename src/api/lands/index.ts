import { Paginated, QueryParamsType, normalizeQueryParams } from "api/utils";

import request, { APICall } from "../request";
import { EditLandType, LandsType, NewLandPayloadType } from "./types";

export const getLands = (
  queryParams?: QueryParamsType<LandsType>
): APICall<Paginated<LandsType[]>> =>
  request({
    url: `/land${normalizeQueryParams(queryParams)}`,
    method: "GET",
  });

export const addLand = (land: NewLandPayloadType): APICall<LandsType> =>
  request({
    data: land,
    url: "/land",
    method: "POST",
  });

export const editLand = (
  land: EditLandType,
  queryParams?: QueryParamsType<LandsType>
): APICall<EditLandType> =>
  request({
    data: land,
    url: `/land/${land._id}${normalizeQueryParams(queryParams)}`,
    method: "PUT",
  });

export const deleteLand = (landId: string): APICall<null> =>
  request({
    url: `/land/${landId}`,
    method: "DELETE",
  });

export const getSingleLand = (landId: string): APICall<{ data: LandsType }> =>
  request({
    url: `/land/${landId}`,
    method: "GET",
  });

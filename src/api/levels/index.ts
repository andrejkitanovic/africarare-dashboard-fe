import { QueryParamsType, normalizeQueryParams } from "api/utils";

import request, { APICall } from "../request";
import { EditLevelType, LevelsType, NewLevelPayloadType } from "./types";

export const addLevel = (level: NewLevelPayloadType): APICall<LevelsType> =>
  request({
    data: level,
    url: "/level",
    method: "POST",
  });

export const editLevel = (
  level: EditLevelType,
  queryParams?: QueryParamsType<LevelsType>
): APICall<EditLevelType> =>
  request({
    data: level,
    url: `/level/${level._id}${normalizeQueryParams(queryParams)}`,
    method: "PUT",
  });

export const deleteLevel = (levelId: string): APICall<null> =>
  request({
    url: `/level/${levelId}`,
    method: "DELETE",
  });

export const getSingleLevel = (
  levelId: string
): APICall<{ data: LevelsType }> =>
  request({
    url: `/level/${levelId}`,
    method: "GET",
  });

import { QueryParamsType, normalizeQueryParams } from "api/utils";

import request, { APICall } from "../request";
import { EditFeatureType, FeaturesType, NewFeaturePayloadType } from "./types";

export const addFeature = (
  feature: NewFeaturePayloadType
): APICall<FeaturesType> =>
  request({
    data: feature,
    url: "/feature",
    method: "POST",
  });

export const editFeature = (
  feature: EditFeatureType,
  queryParams?: QueryParamsType<FeaturesType>
): APICall<EditFeatureType> =>
  request({
    data: feature,
    url: `/feature/${feature._id}${normalizeQueryParams(queryParams)}`,
    method: "PUT",
  });

export const deleteFeature = (featureId: string): APICall<null> =>
  request({
    url: `/feature/${featureId}`,
    method: "DELETE",
  });

export const getSingleFeature = (
  featureId: string
): APICall<{ data: FeaturesType }> =>
  request({
    url: `/feature/${featureId}`,
    method: "GET",
  });

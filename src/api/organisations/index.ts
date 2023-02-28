import { Paginated, QueryParamsType, normalizeQueryParams } from "api/utils";

import request, { APICall } from "../request";
import {
  EditOrganisationType,
  NewOrganisationPayloadType,
  OrganisationsType,
} from "./types";

export const getOrganisations = (
  queryParams?: QueryParamsType<OrganisationsType>
): APICall<Paginated<OrganisationsType[]>> =>
  request({
    url: `/organisation${normalizeQueryParams(queryParams)}`,
    method: "GET",
  });

export const addOrganisation = (
  organisation: NewOrganisationPayloadType
): APICall<OrganisationsType> =>
  request({
    data: organisation,
    url: "/organisation",
    method: "POST",
  });

export const editOrganisation = (
  organisationId: string,
  organisation: FormData
): APICall<EditOrganisationType> =>
  request({
    data: organisation,
    url: `/organisation/${organisationId}`,
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      type: "formData",
    },
  });

export const deleteOrganisation = (organisationId: string): APICall<null> =>
  request({
    url: `/organisation/${organisationId}`,
    method: "DELETE",
  });

export const deactivateOrganisation = (organisationId: string): APICall<null> =>
  request({
    url: `/organisation/deactivate/${organisationId}`,
    method: "DELETE",
  });

export const getSingleOrganisation = (
  organisationId: string
): APICall<{ data: OrganisationsType }> =>
  request({
    url: `/organisation/${organisationId}`,
    method: "GET",
  });

export const getMyOrganisation = (
  queryParams?: QueryParamsType<OrganisationsType>
): APICall<Paginated<OrganisationsType>> =>
  request({
    url: `/organisation/mine${normalizeQueryParams(queryParams)}`,
    method: "GET",
  });

export const editMyOrganisation = (
  organisation: Omit<EditOrganisationType, "_id">
): APICall<EditOrganisationType> =>
  request({
    data: organisation,
    url: `/organisation/mine`,
    method: "PUT",
  });

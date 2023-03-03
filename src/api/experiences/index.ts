import { Paginated, QueryParamsType, normalizeQueryParams } from "api/utils";

import request, { APICall } from "../request";
import {
  EditExperienceType,
  ExperiencesType,
  NewExperiencePayloadType,
} from "./types";

export const getExperiences = (
  queryParams?: QueryParamsType<ExperiencesType>
): APICall<Paginated<ExperiencesType[]>> =>
  request({
    url: `/experience${normalizeQueryParams(queryParams)}`,
    method: "GET",
  });

export const addExperience = (
  experience: NewExperiencePayloadType
): APICall<ExperiencesType> =>
  request({
    data: experience,
    url: "/experience",
    method: "POST",
  });

export const editExperience = (
  experience: EditExperienceType,
  queryParams?: QueryParamsType<ExperiencesType>
): APICall<EditExperienceType> =>
  request({
    data: experience,
    url: `/experience/${experience._id}${normalizeQueryParams(queryParams)}`,
    method: "PUT",
  });

export const deleteExperience = (experienceId: string): APICall<null> =>
  request({
    url: `/experience/${experienceId}`,
    method: "DELETE",
  });

export const getSingleExperience = (
  experienceId: string
): APICall<{ data: ExperiencesType }> =>
  request({
    url: `/experience/${experienceId}`,
    method: "GET",
  });

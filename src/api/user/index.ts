import request, { APICall } from "../request";
import {
  CurrentUserType,
  EditUserType,
  LoginPayloadType,
  LoginType,
  RegisterPayloadType,
  UnregisteredUserType,
} from "./types";

export const getCurrentUser = (): APICall<{ data: CurrentUserType }> =>
  request({
    url: `/auth/me`,
    method: "GET",
  });

export const postLogin = (body: LoginPayloadType): APICall<LoginType> =>
  request({
    data: body,
    url: `/auth/login`,
    method: "POST",
  });

export const postRegister = (
  body: RegisterPayloadType,
  id: string
): APICall<LoginType> =>
  request({
    data: body,
    url: `/auth/register/${id}`,
    method: "POST",
  });

export const getUnregisteredData = (
  id: string
): APICall<{ data: UnregisteredUserType }> =>
  request({
    url: `/user/unconfirmed/${id}`,
    method: "GET",
  });

export const updateProfile = (body: EditUserType): APICall<null> =>
  request({
    data: body,
    url: `/auth/me`,
    method: "PUT",
  });

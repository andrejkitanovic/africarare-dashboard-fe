import { User as GeneratedUser } from "api/generated/models/User";
import { OrganisationsType } from "api/organisations/types";
import { UsersType } from "api/users/types";
import { PermissionsType } from "components/stores/UserStore/permissions";

export type LoginType = {
  token: string;
};

export type LoginPayloadType = {
  email: UsersType["email"];
  password: string;
};

export type UnregisteredUserType = {
  organisation: OrganisationsType;
  email: UsersType["email"];
  name: UsersType["name"];
  password: string;
};

export type RegisterPayloadType = {
  name: UsersType["name"];
  password: string;
};

export type CurrentUserType = UsersType & {
  organisation: OrganisationsType;
  permissions: PermissionsType[];
};

export type EditUserType = {
  organisation: string;
  email: UsersType["email"];
  name: UsersType["name"];
  role: UserOrgTypeRoleType | null;
  phone: string | null;
};

export type NotificationsType = {
  name: string;
  sms: boolean;
  email: boolean;
};

export type UserOrgTypeRoleType = `${GeneratedUser.role}`;

import { User as UsersType } from "api/generated/models/User";
import { UserOrgTypeRoleType } from "api/user/types";

export type StatsType = {
  keys: string[];
  values: number[];
};

export type NewUserPayloadType = {
  email: UsersType["email"];
  role: UserOrgTypeRoleType | null;
};

export interface EditUserType extends NewUserPayloadType {
  _id: UsersType["_id"];
}

export type { UsersType };

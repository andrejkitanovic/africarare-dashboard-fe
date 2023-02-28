/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Organisation } from "./Organisation";

export type User = {
  /**
   * User ID.
   * @example 507f191e810c19729de860ea
   */
  _id: string;
  /**
   * User assigned Organisation.
   */
  organisation: Organisation;
  /**
   * User Role.
   * @example organisation-owner
   */
  role: User.role;
  /**
   * User Permissions.
   * @example ['read:users', 'write:users']
   */
  permissions: Array<string>;
  /**
   * User Email.
   * @example user@gmail.com
   */
  email: string;
  /**
   * User Password Encrypted.
   */
  password: string;
  /**
   * User Name.
   * @example John Johnson
   */
  name?: string;
  /**
   * User Confirmation Status.
   * @example true
   */
  confirmed: boolean;
  /**
   * User Phone Number.
   * @example +38161234567
   */
  phone?: string;
};

export namespace User {
  /**
   * User Role.
   * @example organisation-owner
   */
  export enum role {
    PORTAL_ADMIN = "portal-admin",
    ORGANISATION_OWNER = "organisation-owner",
    ORGANISATION_EMPLOYEE = "organisation-employee",
  }
}

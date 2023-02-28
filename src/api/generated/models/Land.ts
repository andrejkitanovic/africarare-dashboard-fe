/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Organisation } from "./Organisation";

export type Land = {
  /**
   * Land ID.
   * @example 507f191e810c19729de860ea
   */
  _id: string;
  /**
   * Assigned Organisation.
   */
  organisation: Organisation;
  /**
   * Land Name.
   * @example Africarare land
   */
  name: string;
  /**
   * Land mapId.
   * @example 507f191e810c34729de860ea
   */
  mapId: string;
};

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Land } from "./Land";

export type Experience = {
  /**
   * Experience ID.
   * @example 507f191e810c19729de870ea
   */
  _id: string;
  /**
   * Assigned Land.
   */
  land: Land;
  /**
   * Experience Name.
   * @example Africarare experience
   */
  name: string;
};

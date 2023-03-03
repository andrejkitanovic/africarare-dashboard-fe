/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Feature } from "./Feature";
import type { Land } from "./Land";
import type { Level } from "./Level";

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
  features?: Array<Feature>;
  levels?: Array<Level>;
};

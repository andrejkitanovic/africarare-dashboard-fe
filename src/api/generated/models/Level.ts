/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Feature } from "./Feature";

export type Level = {
  /**
   * Level ID.
   * @example 40gh191e910c19729de870ea
   */
  _id: string;
  /**
   * Experience Name.
   */
  name?: string;
  /**
   * Experience Scene.
   * @example test
   */
  scene: string;
  features?: Array<Feature>;
};

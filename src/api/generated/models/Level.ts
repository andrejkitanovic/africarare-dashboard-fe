/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Experience } from "./Experience";

export type Level = {
  /**
   * Level ID.
   * @example 40gh191e910c19729de870ea
   */
  _id: string;
  /**
   * Assigned experience.
   */
  experience: Experience;
  /**
   * Experience Scene.
   * @example test
   */
  scene: string;
};

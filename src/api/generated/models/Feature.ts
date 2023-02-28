/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Experience } from "./Experience";
import type { Level } from "./Level";

export type Feature = {
  /**
   * Feature ID.
   * @example 63fccc1a9ea295650b283124
   */
  _id: string;
  /**
   * Assigned experience.
   */
  experience: Experience;
  /**
   * Assigned level.
   */
  level?: Level;
  /**
   * Feature type.
   * @example chatlog
   */
  type?: Feature.type;
};

export namespace Feature {
  /**
   * Feature type.
   * @example chatlog
   */
  export enum type {
    ACCESS = "access",
    CHATLOG = "chatlog",
    EXPERIENCE_AVATARS = "experience-avatars",
  }
}

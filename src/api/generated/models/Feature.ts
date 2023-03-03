/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Feature = {
  /**
   * Feature ID.
   * @example 63fccc1a9ea295650b283124
   */
  _id: string;
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

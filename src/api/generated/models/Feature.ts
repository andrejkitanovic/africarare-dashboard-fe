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
    PORTAL = "portal",
    LEADERBOARD = "leaderboard",
    CHATLOG = "chatlog",
    RESTRICTED_PEN_DRAWING = "restricted-pen-drawing",
    EXPERIENCE_AVATARS = "experience-avatars",
    PRESENTATION = "presentation",
    PARTICIPATION = "participation",
    INFO_PIN = "info-pin",
  }
}

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
  /**
   * Land preview image.
   * @example https://africarare-assets.appafricarare.io/files/7e8a2939-f38a-4f00-9aeb-7877697ed5ab.jpg
   */
  previewImage?: string;
};

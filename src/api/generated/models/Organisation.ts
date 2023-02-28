/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from "./Location";

export type Organisation = {
  /**
   * Organisation ID.
   * @example 507f191e810c19729de860ea
   */
  _id: string;
  /**
   * Organisation Logo.
   * @example https://destilerija-be.herokuapp.com/uploads/logo.png
   */
  logo?: string;
  /**
   * Organisation Name.
   * @example Zerox Destillery
   */
  name: string;
  /**
   * Organisation Email.
   * @example zerox@gmail.com
   */
  email: string;
  /**
   * Organisation City.
   * @example Nis
   */
  city: string;
  /**
   * Organisation Address.
   * @example Dusanova 1
   */
  address: string;
  /**
   * Organisation Postcode.
   * @example 18000
   */
  postcode: string;
  /**
   * Organisation Location.
   */
  location: Location;
  /**
   * Organisation VAT.
   * @example 123456
   */
  vat: string;
  /**
   * Organisation Registration Number.
   * @example 123456789
   */
  registrationNumber: string;
  /**
   * Organisation Active Status.
   * @example true
   */
  active: boolean;
  /**
   * Organisation Phone.
   * @example +381123456
   */
  phone?: string;
  /**
   * Organisation Bank.
   */
  bank?: {
    /**
     * Organisation Bank Name.
     * @example Erste Bank
     */
    name?: string;
    /**
     * Organisation Bank Account Number.
     * @example 130-5341235236
     */
    accountNumber?: string;
    /**
     * Organisation Foreign Accoutn Number.
     * @example RS35123162342
     */
    foreignAccountNumber?: string;
  };
};

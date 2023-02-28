import { Organisation as OrganisationsType } from "api/generated/models/Organisation";

export type NewOrganisationPayloadType = {
  name: OrganisationsType["name"];
  email: OrganisationsType["email"];
  city: OrganisationsType["city"];
  address: OrganisationsType["address"];
  postcode: OrganisationsType["postcode"];
  vat: OrganisationsType["vat"];
  registrationNumber: OrganisationsType["registrationNumber"];
};

export interface EditOrganisationType extends NewOrganisationPayloadType {
  _id: OrganisationsType["_id"];
  bank?: OrganisationsType["bank"];
}

export type { OrganisationsType };

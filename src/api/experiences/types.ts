import { Experience as ExperiencesType } from "api/generated/models/Experience";

export type NewExperiencePayloadType = {
  name: ExperiencesType["name"];
};

export interface EditExperienceType extends NewExperiencePayloadType {
  _id: ExperiencesType["_id"];
}

export type { ExperiencesType };

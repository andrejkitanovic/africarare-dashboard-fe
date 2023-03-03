import { Experience as ExperiencesType } from "api/generated/models/Experience";

export type NewExperiencePayloadType = {
  name: ExperiencesType["name"];
  land: string;
};

export interface EditExperienceType
  extends Omit<NewExperiencePayloadType, "land"> {
  _id: ExperiencesType["_id"];
}

export type { ExperiencesType };

import { Level as LevelsType } from "api/generated/models/Level";

export type NewLevelPayloadType = {
  name: LevelsType["name"];
  scene: LevelsType["name"];
  experience: string;
};

export interface EditLevelType extends Omit<NewLevelPayloadType, "land"> {
  _id: LevelsType["_id"];
}

export type { LevelsType };

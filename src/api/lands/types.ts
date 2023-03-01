import { Land as LandsType } from "api/generated/models/Land";

export type NewLandPayloadType = {};

export interface EditLandType extends NewLandPayloadType {
  _id: LandsType["_id"];
}

export type { LandsType };

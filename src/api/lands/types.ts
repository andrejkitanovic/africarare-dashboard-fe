import { Land as LandsType } from "api/generated/models/Land";

export type NewLandPayloadType = {
  name: LandsType["name"];
  organisation: string | null;
  mapId: LandsType["mapId"];
};

export interface EditLandType extends NewLandPayloadType {
  _id: LandsType["_id"];
}

export type { LandsType };

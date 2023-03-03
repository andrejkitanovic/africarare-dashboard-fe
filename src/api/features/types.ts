import { Feature as FeaturesType } from "api/generated/models/Feature";

export type FeaturesTypeType = FeaturesType["type"];
export type NewFeaturePayloadType = {
  type: FeaturesType["type"] | null;
  model: "experience" | "level";
  modelId: string;
};

export interface EditFeatureType extends Omit<NewFeaturePayloadType, "land"> {
  _id: FeaturesType["_id"];
}

export type { FeaturesType };

import { Edit as EditIcon } from "@mui/icons-material";
import { Chip } from "@mui/material";

import { FeaturesTypeType } from "api/features/types";

const featureBackgroundColor = {
  access: "#3481d6",
  chatlog: "#ff0051",
  "experience-avatars": "#F0A631",
};

export const FeatureFormatter = ({ type }: { type: FeaturesTypeType }) => {
  return (
    <Chip
      label={type}
      variant="filled"
      //@ts-expect-error
      sx={{ background: featureBackgroundColor[type] }}
      deleteIcon={<EditIcon />}
      onDelete={() => {}}
    />
  );
};

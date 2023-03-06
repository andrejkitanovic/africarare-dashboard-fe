import { Edit as EditIcon } from "@mui/icons-material";
import { Chip, ChipProps } from "@mui/material";
import { FC } from "react";

import { FeaturesTypeType } from "api/features/types";

const featureBackgroundColor = {
  access: "#3481d6",
  chatlog: "#ff0051",
  "experience-avatars": "#F0A631",
  leaderboard: "#D2612B",
  portal: "#a642cb",
  "restricted-pen-drawing": "#000",
  "info-pin": "#4f61fb",
  participation: "#6185a3",
  presentation: "#2c892c",
};

interface IFeatureFormatter extends ChipProps {
  type: FeaturesTypeType;
}

export const FeatureFormatter: FC<IFeatureFormatter> = ({ type, ...rest }) => {
  return (
    <Chip
      {...rest}
      label={type}
      variant="filled"
      sx={{
        //@ts-expect-error
        background: featureBackgroundColor[type],
        ...(rest?.sx ?? {}),
      }}
      deleteIcon={<EditIcon />}
      onDelete={() => {}}
    />
  );
};

import { AutoAwesome as AutoAwesomeIcon } from "@mui/icons-material";
import { Box, BoxProps, Typography } from "@mui/material";
import { FC } from "react";

import { FeaturesTypeType } from "api/features/types";

export const featureBackgroundColor = {
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

interface IFeatureFormatter extends BoxProps {
  type: FeaturesTypeType;
}

export const FeatureFormatter: FC<IFeatureFormatter> = ({ type, ...rest }) => {
  return (
    <Box
      {...rest}
      sx={{
        p: 0.5,
        px: 1.5,
        borderRadius: 3,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        //@ts-expect-error
        background: featureBackgroundColor[type],
        ...(rest?.sx ?? {}),
      }}
    >
      <Typography
        variant="body2"
        fontSize="14px"
        mt={0.2}
        mr={0.5}
        fontWeight="medium"
      >
        {type}
      </Typography>
      <AutoAwesomeIcon sx={{ fontSize: "16px" }} />
    </Box>
  );
};

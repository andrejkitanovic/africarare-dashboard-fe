import { Divider, Drawer, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormattedMessage } from "react-intl";

import { Feature } from "api/generated/models/Feature";

import { featureBackgroundColor } from "../../formatters/FeaturesFormatter";

interface Props {
  onClose: () => void;
  feature: Feature | null;
}

const featureTitleFormatted = {
  access: <FormattedMessage id="FEATURES.ACCESS" />,
  chatlog: <FormattedMessage id="FEATURES.CHATLOG" />,
  "experience-avatars": <FormattedMessage id="FEATURES.EXPERIENCE_AVATARS" />,
  leaderboard: <FormattedMessage id="FEATURES.LEADERBOARD" />,
  portal: <FormattedMessage id="FEATURES.PORTAL" />,
  "restricted-pen-drawing": (
    <FormattedMessage id="FEATURES.RESTRICTED_PEN_DRAWING" />
  ),
  "info-pin": <FormattedMessage id="FEATURES.INFO_PIN" />,
  participation: <FormattedMessage id="FEATURES.PARTICIPATION" />,
  presentation: <FormattedMessage id="FEATURES.PRESENTATION" />,
};

const FeatureDrawer = ({ onClose, feature }: Props) => {
  return (
    <Drawer
      PaperProps={{
        sx: {
          width: { xs: "320px", sm: "400px" },
          // p: { xs: 2, sm: 3 },
          borderRadius: 0,
          backgroundColor: (t) => t.palette.background.default,
        },
      }}
      variant="temporary"
      anchor="right"
      open={Boolean(feature)}
      onClose={onClose}
      data-cy="user-drawer"
    >
      <Box
        sx={{
          background: feature?.type
            ? featureBackgroundColor[feature.type]
            : "#000",
          p: 1,
        }}
      >
        <Typography variant="h4" sx={{ p: 1 }}>
          {feature?.type ? featureTitleFormatted[feature?.type] : ""}
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack direction="row" spacing={2} sx={{ mt: 2, p: 1 }}></Stack>

        <Divider sx={{ my: 3, mx: 1 }} />
      </Box>
    </Drawer>
  );
};

export default FeatureDrawer;

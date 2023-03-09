import { Button, Drawer, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormattedMessage } from "react-intl";

import { Feature } from "api/generated/models/Feature";

import { featureBackgroundColor } from "../../formatters/FeaturesFormatter";
import FeatureAccessForm from "./SingleFeatureForm/FeatureAccessForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  feature: Feature | undefined;
  handleOpenDelete: (ctx?: Feature) => void;
}

export const featureTitleFormatted = {
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

const FeatureDrawer = ({
  isOpen,
  onClose,
  feature,
  handleOpenDelete,
}: Props) => {
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
      open={isOpen}
      onClose={onClose}
      data-cy="user-drawer"
    >
      <Stack direction="column" sx={{ height: "100%" }}>
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

        {/* CONTENT */}
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {feature?.type === "access" && (
            <FeatureAccessForm handleSubmit={() => {}} />
          )}
        </Box>

        {/* FOOTER */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: "auto", p: { xs: 2, sm: 3 } }}
        >
          <Button
            sx={{ width: "50%" }}
            color="error"
            variant="contained"
            onClick={() => handleOpenDelete(feature)}
          >
            <FormattedMessage id="GLOBAL.DELETE" />
          </Button>
          <Button sx={{ width: "50%" }} variant="contained">
            <FormattedMessage id="GLOBAL.SAVE" />
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default FeatureDrawer;

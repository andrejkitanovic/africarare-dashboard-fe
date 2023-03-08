import { Box, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

import { getSingleLand } from "api/lands";
import { landsKeys } from "api/lands/queries";
import PreviewImageDefaultPNG from "assets/imgs/preview-image-default.png";

import ExperiencesHeader from "./ExperiencesHeader/ExperiencesHeader";
import ExperiencesTable from "./ExperiencesTable";
import LandsDetailsHeader from "./LandsDetailsHeader/LandsDetailsHeader";

const ExperiencesPage = () => {
  const { landId } = useParams<{ landId: string }>();

  const { data: land } = useQuery(landsKeys.details(landId), async () => {
    const { data: res } = await getSingleLand(landId);
    return res.data;
  });

  return (
    <>
      <Paper>
        <LandsDetailsHeader />
        <Stack direction="row">
          <img
            src={land?.previewImage || PreviewImageDefaultPNG}
            alt="land"
            height="400"
            width="100%"
            style={{ objectFit: "cover", maxHeight: "20vw", maxWidth: "70%" }}
          />
          <Stack
            direction="column"
            textAlign="center"
            sx={{ width: "30%", p: 3 }}
            justifyContent="space-between"
          >
            <Box>
              <Typography fontWeight="bold" fontSize="20px" mb={1}>
                Page Views
              </Typography>
              <Typography fontSize="18px">0</Typography>
            </Box>

            <Box>
              <Typography fontWeight="bold" fontSize="20px" mb={1}>
                Unique Visitors
              </Typography>
              <Typography fontSize="18px">0</Typography>
            </Box>

            <Box>
              <Typography fontWeight="bold" fontSize="20px" mb={1}>
                Live Users
              </Typography>
              <Typography fontSize="18px">0/20</Typography>
            </Box>
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ mt: 2 }}>
        <ExperiencesHeader landId={landId} />
        <ExperiencesTable landId={landId} />
      </Paper>
    </>
  );
};

export default ExperiencesPage;

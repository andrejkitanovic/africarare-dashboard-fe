import { Paper } from "@mui/material";
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
        <img
          src={land?.previewImage || PreviewImageDefaultPNG}
          alt="land"
          height="400"
          width="100%"
          style={{ objectFit: "cover", maxHeight: "20vw" }}
        />
      </Paper>

      <Paper sx={{ mt: 2 }}>
        <ExperiencesHeader />
        <ExperiencesTable landId={landId} />
      </Paper>
    </>
  );
};

export default ExperiencesPage;

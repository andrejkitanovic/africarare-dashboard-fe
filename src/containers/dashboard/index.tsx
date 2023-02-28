import { Stack } from "@mui/material";

const DashboardPage = () => {
  return (
    <Stack
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        background: (t) => t.palette.background.paper,
      }}
    >
      <iframe
        title="Africarare Map"
        src="https://www.africarare.io/map"
        frameBorder="0"
        scrolling="no"
        style={{
          width: "100%",
          height: "calc(100% + 118px)",
          marginTop: "-118px",
          overflow: "hidden",
        }}
      />
    </Stack>
  );
};

export default DashboardPage;

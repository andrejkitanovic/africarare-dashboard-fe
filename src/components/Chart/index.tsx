import { CircularProgress, Stack, useTheme } from "@mui/material";
import { MutationStatus, QueryStatus } from "@tanstack/react-query";
import { ApexOptions } from "apexcharts";
import ApexChart, { Props as ApexChartProps } from "react-apexcharts";

interface IChart extends ApexChartProps {
  status?: QueryStatus | MutationStatus;
}

const Chart = ({
  options: propOptions,
  series,
  type,
  height,
  width,
  status,
}: IChart) => {
  const theme = useTheme();

  const options: ApexOptions = {
    colors: [theme.palette.primary.main],
    ...propOptions,
    chart: {
      fontFamily: "Raleway",
      toolbar: {
        show: false,
      },
      ...propOptions?.chart,
    },
    grid: {
      padding: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
        ...propOptions?.grid?.padding,
      },
      ...propOptions?.grid,
    },
  };

  if (status === "loading") {
    return (
      <Stack
        sx={{ width: width ?? "100%", height: height ?? "100%" }}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <ApexChart
      options={options}
      series={series}
      type={type}
      height={height}
      width={width}
    />
  );
};

export default Chart;

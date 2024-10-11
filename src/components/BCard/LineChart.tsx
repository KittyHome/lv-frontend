import React from "react";
import { AxisOptions, Chart } from "react-charts";

interface ChartData {
  label?: string;
  data: { primary: string; secondary: number }[];
}

interface LineChartProps {
  data: ChartData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const primaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
      showGrid: true,
      show: false,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        show: false,
        showGrid: true,
        elementType: "line",
      },
    ],
    []
  );

  const getSeriesStyle = React.useMemo(() => {
    return () => {
      const gradientId = "lineGradient";
      return {
        stroke: `url(#${gradientId})`,
        fill: "none",
        width: "8px",
      };
    };
  }, []);

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        getSeriesStyle,
      }}
    />
  );
};

export default LineChart;

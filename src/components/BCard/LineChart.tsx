import React from "react";
import { AxisOptions, Chart } from "react-charts";

interface ChartData {
  label?: string;
  data: { primary: string; secondary: number }[];
}

interface LineChartProps {
  data: ChartData[];
  max: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, max }) => {
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
        max,
        elementType: "bubble",
      },
    ],
    []
  );

  const getSeriesStyle = React.useMemo(() => {
    return () => {
      const gradientId = "lineGradient";
      return {
        stroke: `url(#${gradientId})`,
        fill: "#EE1D4F",
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

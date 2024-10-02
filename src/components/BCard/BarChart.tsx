import React from "react";
import { AxisOptions, Chart } from "react-charts";

interface ChartData {
  label?: string;
  data: { primary: string; secondary: number }[];
}

interface BarChartProps {
  data: ChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const globalMaxSecondaryValue = React.useMemo(() => {
    return data.reduce((max, series) => {
      const seriesMax = Math.max(...series.data.map((d) => d.secondary));
      return Math.max(max, seriesMax);
    }, 0);
  }, [data]);

  const primaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
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
        elementType: "bar",
      },
    ],
    []
  );

  const getSeriesStyle = React.useMemo(() => {
    return ({ originalSeries }: { originalSeries: ChartData }) => {
      const hue =
        (Math.max(...originalSeries.data.map((d) => d.secondary)) /
          globalMaxSecondaryValue) *
        300;
      const color = `hsl(${hue}, 100%, 50%)`;
      return { stroke: color, fill: color };
    };
  }, [globalMaxSecondaryValue]);

  return (
    <div style={{ width: "100%", height: "100px" }}>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          getSeriesStyle,
        }}
      />
    </div>
  );
};

export default BarChart;

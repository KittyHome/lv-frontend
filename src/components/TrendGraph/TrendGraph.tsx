import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

interface ChartData {
  label?: string;
  data: { primary: string; secondary: number }[];
}

interface TrendGraphProps {
  data: ChartData[];
}

const TrendGraph: React.FC<TrendGraphProps> = ({ data }) => {
  const formattedData = data.flatMap((item) =>
    item.data.map((d) => ({
      name: d.primary,
      [item.label as string]: d.secondary,
    }))
  );

  const combinedData = formattedData.reduce((acc: any, cur) => {
    const foundIndex = acc.findIndex((item: any) => item.name === cur.name);
    if (foundIndex >= 0) {
      acc[foundIndex] = { ...acc[foundIndex], ...cur };
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);

  const blackContrastPalette = [
    "#00ffff",
    "#ff0000",
    "#00ff00",
    "#ffa500",
    "#ffff00",
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={combinedData}
        margin={{
          top: 10,
          right: 40,
          left: 40,
          bottom: 10,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--color-background-100)"
        />
        <XAxis
          dataKey="name"
          stroke="var(--color-text-100)"
          tick={{ fontSize: "10px" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-background-100)",
            borderColor: "var(--color-background-100)",
          }}
        />
        <Legend />
        {data.map((series, index) => (
          <Line
            key={index}
            type="step"
            dataKey={series.label}
            stroke={blackContrastPalette[index % blackContrastPalette.length]}
            activeDot={{ r: 5 }}
            dot={{ r: 1 }}
          />
        ))}
        <Brush dataKey="name" height={20} fill="var(--color-background-100)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendGraph;

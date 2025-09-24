"use client";

import { Chart, useChart } from "@chakra-ui/charts";
import { Stack } from "@chakra-ui/react";

import { Line, LineChart } from "recharts";

import { Card } from "./Card";

/**
 * This component renders a list of stats to be displayed on the user's dashboard
 */
export const StatsList = () => {
  return (
    <Card title="Stats">
      <Card.Placeholder
        placeholder={
          <Stack margin="auto">
            Track your accuracy, streak, and improvement once you’ve started
            training.
            <Demo />
          </Stack>
        }
      />
    </Card>
  );
};

const Demo = () => {
  const chart = useChart({
    data: [
      { value: 10 },
      { value: 16 },
      { value: 19 },
      { value: 15 },
      { value: 12 },
      { value: 15 },
      { value: 10 },
      { value: 18 },
    ],
    series: [{ name: "value", color: "teal.solid" }],
  });

  return (
    <Chart.Root width="28" height="12" chart={chart}>
      <LineChart data={chart.data}>
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </Chart.Root>
  );
};

"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a label list";

interface LearningPieChartProps {
  data: {
    title: string;
    total_time: number;
    color: string;
  }[];
}

export function LearningPieChart({ data }: LearningPieChartProps) {
  const chartConfig: {
    [key: string]: {
      label: string;
      color?: string;
    };
  } = {
    hours: {
      label: "Hours",
    },
  } satisfies ChartConfig;

  data?.forEach((category, index) => {
    if (category.title) {
      const configKey = category.title.toLowerCase().replace(/\s+/g, "_");
      chartConfig[configKey] = {
        label: category.title,
        color: category.color || `var(--chart-${index + 1})`,
      };
    }
  });

  const chartData =
    data?.map((item) => {
      if (item.total_time !== 0) {
        return {
          category: item.title?.toLowerCase().replace(/\s+/g, "_"),
          hours: +(item.total_time / 60).toFixed(2),
          fill: item.color,
        };
      }
    }) ?? [];

  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-text]:fill-white mx-auto aspect-square min-w-[25vw]"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="hours" hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="hours"
          nameKey="hours"
          animationDuration={700}
          animationBegin={0}
        >
          <LabelList
            dataKey="category"
            className="font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            fill="black"
            stroke="none"
            fontSize={12}
            formatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
